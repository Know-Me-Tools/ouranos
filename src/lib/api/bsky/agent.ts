import { AtpAgent } from "@atproto/api";
import { redirect } from "next/navigation";
import { getSessionFromServer } from "../auth/session";
import { DEFAULT_SERVICE, APPVIEW_SERVICE } from "@/lib/consts/general";
import { getSession } from "next-auth/react";
import { isServer } from "@/lib/utils/general";
import { isSessionExpired } from "@/lib/utils/session";

export const createAgent = (service: string) => {
  return new AtpAgent({
    service,
  });
};

export const getBskySession = async () => {
  try {
    const session = isServer()
      ? await getSessionFromServer()
      : await getSession();

    if (!session?.user.bskySession) {
      throw new Error("No session found");
    }

    const agent = createAgent(session.user.service);

    if (isSessionExpired(session.user.bskySession)) {
      const result = await agent.resumeSession(session.user.bskySession);

      if (!result.success) {
        throw new Error("Could not resume session");
      }
    }

    // session is not expired, use the current one
    agent.sessionManager.session = session.user.bskySession;

    return agent;
  } catch (e) {
    throw new Error("Could not get session");
  }
};

export const getAgentFromServer = async () => {
  try {
    const agent = await getBskySession();
    return agent;
  } catch (error) {
    console.error(error);
    redirect("/");
  }
};

// Returns an agent pointed at the AppView service (for app.bsky.* queries)
// with the user's authenticated session applied so personalized results are returned.
// All app.bsky.* XRPC calls must go to the AppView, not the PDS.
export const getAppViewAgentFromServer = async () => {
  try {
    const sessionAgent = await getBskySession();
    const appviewAgent = createAgent(APPVIEW_SERVICE);
    if (sessionAgent?.sessionManager?.session) {
      appviewAgent.sessionManager.session = sessionAgent.sessionManager.session;
    }
    return appviewAgent;
  } catch (error) {
    console.error(error);
    redirect("/");
  }
};
