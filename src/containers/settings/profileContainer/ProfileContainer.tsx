import { getSessionFromServer } from "@/lib/api/auth/session";
import { getProfile } from "@/lib/api/bsky/actor";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import EditProfile from "@/components/actions/editProfile/EditProfile";
import Image from "next/image";
import FallbackBanner from "@/assets/images/fallbackBanner.png";

export default async function ProfileContainer() {
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.handle);

  if (!profile) return null;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-skin-base mx-3 mb-2 text-2xl font-semibold md:mx-0">
        Profile
      </h2>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Preview
        </h3>
        <div className="border-skin-base overflow-hidden rounded-none border border-x-0 md:rounded-2xl md:border-x">
          <div className="relative">
            <Image
              src={profile.banner ?? FallbackBanner}
              alt="Banner"
              width={800}
              height={200}
              className="h-32 w-full object-cover"
            />
            <div className="absolute bottom-0 translate-y-1/2 px-4">
              <Avatar
                src={profile.avatar?.replace("avatar", "avatar_thumbnail")}
                size="lg"
              />
            </div>
          </div>
          <div className="mt-12 px-4 pb-4">
            <p className="text-skin-base font-semibold">
              {profile.displayName || profile.handle}
            </p>
            <p className="text-skin-tertiary text-sm">@{profile.handle}</p>
            {profile.description && (
              <p className="text-skin-secondary mt-2 text-sm whitespace-pre-wrap">
                {profile.description}
              </p>
            )}
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-skin-base mx-3 mb-2 text-xl font-semibold md:mx-0">
          Edit
        </h3>
        <div className="border-skin-base flex flex-col gap-3 rounded-none border border-x-0 p-4 md:rounded-2xl md:border-x">
          <p className="text-skin-secondary text-sm">
            Update your display name, bio, avatar, and banner image.
          </p>
          <div>
            <EditProfile profile={profile} />
          </div>
        </div>
      </section>
    </section>
  );
}
