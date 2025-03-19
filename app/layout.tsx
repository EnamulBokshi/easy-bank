import type { Metadata } from "next";
import { Geist, Geist_Mono,IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const imbPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight:['400','700'],

})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyBankBD",
  description: "EasyBankBD is a digital modern bank that provides a range of financial services.",
  icons:{
    icon:'/favicon.ico',
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${imbPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
