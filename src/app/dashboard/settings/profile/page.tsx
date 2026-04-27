import ProfileContainer from "@/containers/settings/profileContainer/ProfileContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Edit your profile",
};

export default function Page() {
  return <ProfileContainer />;
}
