import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EZ-Code",
  description: "임시 description",
  icons: {
    icon: "/images/ezcode.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
