import React from "react";
import {Metadata} from "next";
import SideBar from "@/components/app/Sidebar";

export const metadata: Metadata = {
    title : " FIF - Tableau de bord",
    description : "Tableau de bord de l'application"
}

export default function DashboardRootLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar/>
            <div className="flex flex-col flex-1 overflow-hidden">
                <main className="flex-1 bg-secondary overflow-auto p-4">{children}</main>
            </div>
        </div>
    )
}