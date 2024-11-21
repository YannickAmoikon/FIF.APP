"use client";

import "@/styles/globals.css";
import LocalFont from 'next/font/local'
import {Providers} from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";

const font = LocalFont({
    src: '../fonts/GeistVF.woff',
    variable: '--font-geist',
    weight: '100 900',
});

const fontMono = LocalFont({
    src: '../fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${font.variable} ${fontMono.variable} antialiased font-normal`}>
                <Providers>
                    {children}
                </Providers>
                <Toaster/>
            </body>
        </html>
    );
}