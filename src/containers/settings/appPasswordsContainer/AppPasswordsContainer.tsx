"use client";

import { useState } from "react";
import { BiSolidTrash, BiSolidKey } from "react-icons/bi";
import { PiPlusBold } from "react-icons/pi";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/input/Input";
import {
  useListAppPasswords,
  useCreateAppPassword,
  useRevokeAppPassword,
} from "@/lib/hooks/bsky/actor/useAppPasswords";

export default function AppPasswordsContainer() {
  const [newName, setNewName] = useState("");
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);
  const { data: passwords, isLoading } = useListAppPasswords();
  const createMutation = useCreateAppPassword();
  const revokeMutation = useRevokeAppPassword();

  const handleCreate = async () => {
    if (!newName.trim()) return;
    const result = await createMutation.mutateAsync({ name: newName.trim() });
    setCreatedPassword(result.password);
    setNewName("");
  };

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        App Passwords
      </h2>
      <p className="text-skin-secondary mx-3 text-sm md:mx-0">
        App passwords let third-party apps access your account with limited
        permissions. Use one to log in to other ATProto clients.
      </p>

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Create New
        </h3>
        <div className="border-skin-base flex flex-col gap-3 rounded-none border border-x-0 p-3 md:rounded-2xl md:border-x">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Password name (e.g. my-app)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              icon={<BiSolidKey />}
              className="flex-1"
            />
            <Button
              onClick={handleCreate}
              disabled={createMutation.isPending || !newName.trim()}
              className="bg-primary hover:bg-primary-dark text-skin-icon-inverted flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PiPlusBold />
              {createMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </div>
          {createdPassword && (
            <div className="bg-status-success/10 border-status-success/30 rounded-xl border p-3">
              <p className="text-status-success mb-1 text-sm font-semibold">
                App password created — copy it now, it won&apos;t be shown again.
              </p>
              <code className="text-skin-base break-all rounded bg-black/10 px-2 py-1 text-sm font-mono">
                {createdPassword}
              </code>
              <Button
                onClick={() => setCreatedPassword(null)}
                className="text-skin-secondary mt-2 block text-xs underline"
              >
                Dismiss
              </Button>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Active Passwords
        </h3>
        <div className="flex flex-col">
          {isLoading && (
            <div className="border-skin-base border border-x-0 p-3 md:rounded-2xl md:border-x">
              <span className="text-skin-tertiary text-sm">Loading...</span>
            </div>
          )}
          {!isLoading && (!passwords || passwords.length === 0) && (
            <div className="border-skin-base border border-x-0 p-3 md:rounded-2xl md:border-x">
              <span className="text-skin-tertiary text-sm">
                No app passwords yet.
              </span>
            </div>
          )}
          {passwords?.map((pw) => (
            <div
              key={pw.name}
              className="border-skin-base flex items-center justify-between gap-3 border border-x-0 p-3 last:border-b md:border-x md:first:rounded-t-2xl md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
            >
              <div className="flex flex-col">
                <span className="text-skin-base font-medium">{pw.name}</span>
                {pw.createdAt && (
                  <span className="text-skin-tertiary text-xs">
                    Created{" "}
                    {new Date(pw.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>
              <Button
                onClick={() => revokeMutation.mutate(pw.name)}
                disabled={revokeMutation.isPending}
                className="text-status-danger hover:bg-status-danger/10 flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BiSolidTrash />
                Revoke
              </Button>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
