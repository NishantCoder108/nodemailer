import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nodemailer App",
    description: "Send mail through nodemailer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isDevelopment = process.env.NODE_ENV === "development";
    if (!isDevelopment) {
        console.log = () => {};
    }
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
