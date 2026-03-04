import React, { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import "@/styles/globals.css";

export const metadata = {
  title: "EQScholar – Emotional Intelligence Journey",
  description:
    "Master emotional intelligence through interactive games and lessons",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
