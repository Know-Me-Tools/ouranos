/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto mt-0 p-5 md:mt-16">
      <header className="mx-auto flex max-w-xl items-center justify-between animate-fade">
        <div className="flex items-center gap-3">
          <Image
            src="/ouranos.svg"
            alt="KnowMe logo"
            width={40}
            height={40}
            className="block transition-transform duration-700 ease-in-out hover:rotate-180"
          />
          <Image
            src="/ouranosText.svg"
            alt="KnowMe"
            width={100}
            height={24}
          />
        </div>{" "}
        <Link
          href="/"
          className="text-skin-secondary hover:text-skin-base font-medium"
        >
          Home
        </Link>
      </header>
      <section className="animate-fade mx-auto mt-16 max-w-xl">
        <h1 className="text-skin-base mb-6 max-w-lg text-4xl font-medium">
          About
        </h1>
        <p className="text-skin-base">
          KnowMe is a social client built on{" "}
          <Link
            href="https://blueskyweb.xyz/"
            className="underline underline-offset-2"
          >
            Bluesky
          </Link>{" "}
          and the{" "}
          <Link
            href="https://atproto.com/"
            className="underline underline-offset-2"
          >
            AT Protocol
          </Link>
          , a decentralized networking technology for social media. It is built
          using{" "}
          <Link
            href="https://nextjs.org/"
            className="underline underline-offset-2"
          >
            Next.js
          </Link>{" "}
          and runs on a fully self-hosted stack.
        </p>

        <p className="text-skin-base mt-3">
          KnowMe is powered by AI that understands you — bringing
          context-aware social experiences to the open social web.
        </p>

        <h2 className="text-skin-base mb-6 mt-12 text-2xl font-medium">
          Frequently Asked Questions
        </h2>

        <h3 className="text-skin-base mb-1 text-lg font-semibold">
          Is anything stored on your servers?
        </h3>
        <p className="text-skin-base">
          Nothing from Bluesky is stored, every request goes through the
          official Bluesky servers. When you log in, your session is stored
          using cookies on your web browser. Any extra feature that exists (or
          will be added) stores information{" "}
          <Link
            href="https://javascript.info/localstorage"
            className="underline underline-offset-2"
          >
            locally
          </Link>{" "}
          on your web browser.
        </p>

        <p className="text-skin-base mt-3">
          Note: When you visit the site,{" "}
          <Link
            href="https://vercel.com/analytics"
            className="underline underline-offset-2"
          >
            Vercel Analytics
          </Link>{" "}
          is used to gather anonymized information to help me get a general idea
          and provide better support. These include number of visitors, top
          visited pages, countries, operating systems, and web browsers. No
          cookies and nothing personal is collected that can be linked back to
          you. If you are using an ad blocker, tracking is likely disabled.
        </p>

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          Why do you recommend using an app password to log in?
        </h3>
        <p className="text-skin-base">
          App passwords allow you to log in and use the app, but restrict
          third-party clients (ex. KnowMe) from certain functionalities such as
          account deletion or generating additional app passwords.
        </p>
        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          Where can I see progress updates?
        </h3>
        <p className="text-skin-base">
          You can follow progress on our{" "}
          <Link
            href="https://github.com/Know-Me-Tools/ouranos"
            className="underline underline-offset-2"
          >
            GitHub repository
          </Link>
          .
        </p>

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          How can I provide feedback?
        </h3>
        <p className="text-skin-base">
          Open an issue on our{" "}
          <Link
            href="https://github.com/Know-Me-Tools/ouranos"
            className="underline underline-offset-2"
          >
            GitHub repository
          </Link>
          .
        </p>

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          Can I support the project?
        </h3>
        <p className="text-skin-base mt-3">
          Stay tuned for more information! If you enjoy using KnowMe,
          we&apos;d love to hear from you.
        </p>
      </section>
      <footer className="text-skin-tertiary mt-16 text-center text-sm font-medium">
        KNOWME · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
