"use client";

import "../styles/globals.css";
import LocalFont from 'next/font/local'
import {Providers} from "@/components/providers/providers";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

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

const loginRoute = "/login";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                const userStr = localStorage.getItem("user");
                const user = userStr ? JSON.parse(userStr) : null;

                if (!token && pathname !== loginRoute) {
                    router.replace(loginRoute);
                } else if (token && pathname === loginRoute) {
                    const defaultRoute = user?.role_id !== 4 ? "/dashboard" : "/dashboard/marketPlace/gestion";
                    router.replace(defaultRoute);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error);
                router.replace(loginRoute);
            }
        };
        checkAuth();
    }, [router, pathname]);

    return (
        <html lang="fr">
        <body className={`${font.variable} ${fontMono.variable} antialiased font-normal`}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}