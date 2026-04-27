"use server";

import { createAgent } from "@/lib/api/bsky/agent";
import { DEFAULT_SERVICE } from "@/lib/consts/general";

interface SignupParams {
  handle: string;
  email: string;
  password: string;
  inviteCode?: string;
}

interface SignupResult {
  success: boolean;
  error?: string;
}

export async function createAccount(params: SignupParams): Promise<SignupResult> {
  try {
    const agent = createAgent(DEFAULT_SERVICE);

    await agent.com.atproto.server.createAccount({
      handle: params.handle,
      email: params.email,
      password: params.password,
      ...(params.inviteCode ? { inviteCode: params.inviteCode } : {}),
    });

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Account creation failed";
    return { success: false, error: message };
  }
}
