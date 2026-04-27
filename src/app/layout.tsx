import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import SessionProvider from "./providers/session";
import QueryProvider from "./providers/query";
import { ComposerProvider } from "./providers/composer";
import ToastProvider from "./providers/toast";
import { ScrollProvider } from "./providers/scroll";
import { getSessionFromServer } from "@/lib/api/auth/session";
import ThemeProvider from "./providers/theme";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: { template: "%s — KnowMe", default: "KnowMe" },
  description: "AI that understands you",
  metadataBase: new URL("https://social.know-me.tools"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();

  return (
    <html lang="en" className="bg-skin-base">
      <head>
        {/* for making the page fullscreen on iOS when added to home */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          <SessionProvider session={session}>
            <ScrollProvider>
              <QueryProvider>
                <ComposerProvider>{children}</ComposerProvider>
              </QueryProvider>
              <ToastProvider />
            </ScrollProvider>
          </SessionProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
