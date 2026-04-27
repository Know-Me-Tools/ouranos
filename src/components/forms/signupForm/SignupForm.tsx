"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdAlternateEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { PiUserPlusBold } from "react-icons/pi";
import Input from "@/components/inputs/input/Input";
import Label from "@/components/inputs/label/Label";
import Button from "@/components/actions/button/Button";
import { createAccount } from "@/app/api/auth/signup/actions";

export default function SignupForm() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const result = await createAccount({
      handle,
      email,
      password,
      inviteCode: inviteCode || undefined,
    });

    if (!result.success) {
      setError(result.error ?? "Account creation failed");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("bluesky", {
      handle,
      password,
      redirect: false,
      callbackUrl: "/dashboard/home",
    });

    if (signInResult?.error) {
      setError("Account created! Please log in.");
      setLoading(false);
      router.push("/login");
      return;
    }

    router.push("/dashboard/home");
  };

  return (
    <section className="bg-skin-base border border-skin-base max-w-xs rounded-2xl p-5 shadow-2xl shadow-primary-light/30">
      <Image
        src="/logo.svg"
        alt="KnowMe"
        width={180}
        height={56}
        className="mx-auto mb-3"
      />
      <h1 className="text-skin-base mb-1 text-xl font-semibold">
        Create an account
      </h1>
      <p className="text-skin-secondary mb-3 text-sm font-medium">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-skin-link-base hover:text-skin-link-hover"
        >
          Log in
        </Link>
      </p>
      <form
        className="mt-5 text-sm font-medium"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <span>
          <Label htmlFor="handle">Handle</Label>
          <Input
            required
            type="text"
            name="handle"
            icon={<MdAlternateEmail />}
            placeholder="yourname.pds.know-me.tools"
            value={handle}
            onChange={(e) => {
              setError("");
              setHandle(e.target.value);
            }}
          />
        </span>
        <span className="mt-3 block">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            type="email"
            name="email"
            icon={<MdEmail />}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          />
        </span>
        <span className="mt-3 block">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type="password"
            name="password"
            icon={<BiSolidLockAlt />}
            placeholder="password"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
        </span>
        <span className="mt-3 block">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            required
            type="password"
            name="confirmPassword"
            icon={<BiSolidLockAlt />}
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setError("");
              setConfirmPassword(e.target.value);
            }}
          />
        </span>
        <span className="mt-3 block">
          <Label htmlFor="inviteCode">Invite Code (if required)</Label>
          <Input
            type="text"
            name="inviteCode"
            icon={<MdAlternateEmail />}
            placeholder="optional"
            value={inviteCode}
            onChange={(e) => {
              setError("");
              setInviteCode(e.target.value);
            }}
          />
        </span>
        {error && (
          <small className="text-status-danger mt-1 block font-medium">
            {error}
          </small>
        )}
        <Button
          type="submit"
          className={`text-skin-inverted bg-skin-inverted hover:bg-skin-inverted ml-auto mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-3 font-semibold disabled:cursor-not-allowed ${
            loading && "animate-pulse animate-duration-1000"
          }`}
          disabled={loading}
          aria-disabled={loading}
        >
          <PiUserPlusBold className="text-lg" />
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </section>
  );
}
