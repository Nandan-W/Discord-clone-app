import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
//for authetication
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatt uwu App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          font.className,
          "bg-white  dark:bg-[#313338]" )}>
            {/* this allows us to provide a greyish colour for dark mode, which is normal for discord */}
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              
              enableSystem={false}
              storageKey="discord-theme">
              <ModalProvider></ModalProvider>
              {children}
          </ThemeProvider>
        </body>
      </html>

    </ClerkProvider>
  );
}
