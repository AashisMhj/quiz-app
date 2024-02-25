import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "The Quiz App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen w-full ">
          <div className="bg-background text-foreground" >
            <div className="max-w-[110rem] mx-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
