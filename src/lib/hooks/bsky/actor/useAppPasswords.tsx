"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

export function useListAppPasswords() {
  const agent = useAgent();
  return useQuery({
    queryKey: ["appPasswords"],
    queryFn: async () => {
      const res = await agent.com.atproto.server.listAppPasswords();
      return res.data.passwords;
    },
  });
}

export function useCreateAppPassword() {
  const agent = useAgent();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, privileged }: { name: string; privileged?: boolean }) => {
      const res = await agent.com.atproto.server.createAppPassword({ name, privileged });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appPasswords"] });
    },
    onError: () => {
      toast.error("Could not create app password", { id: "app-password-create-error" });
    },
  });
}

export function useRevokeAppPassword() {
  const agent = useAgent();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      await agent.com.atproto.server.revokeAppPassword({ name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appPasswords"] });
      toast.success("App password revoked");
    },
    onError: () => {
      toast.error("Could not revoke app password", { id: "app-password-revoke-error" });
    },
  });
}
