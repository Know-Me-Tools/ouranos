import AppPasswordsContainer from "@/containers/settings/appPasswordsContainer/AppPasswordsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Passwords",
  description: "Manage app passwords for your account",
};

export default function Page() {
  return <AppPasswordsContainer />;
}
