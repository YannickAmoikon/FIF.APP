"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    LogOut,
    Vote,
    Info,
    AlertTriangle, Check
} from "lucide-react";
import { signOut } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const items = [
    { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
    { title: "Élections", url: "/dashboard/election", icon: Vote },
];

export default function SideBar({ className = "" }: { className?: string }) {
    const pathname = usePathname();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const isActive = (url: string) => {
        if (url === "/dashboard") {
            return pathname === url;
        }
        return pathname.startsWith(url);
    };

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: "/login" });
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const LinkItem = ({ item }: { item: (typeof items)[0] }) => (
        <Link
            href={item.url}
            className={`flex rounded-sm text-sm items-center gap-3 px-3 py-2.5 transition-all
        ${
                isActive(item.url)
                    ? "bg-green-600 text-white font-semibold"
                    : "text-gray-600 hover:bg-orange-100 font-semibold hover:text-orange-600"
            }`}
        >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
        </Link>
    );

    return (
        <>
            <aside
                className={`bg-secondary text-gray-900 w-64 min-h-screen flex-col shadow-lg hidden md:flex border-r ${className}`}
            >
                <div className="flex h-20 space-x-1.5 items-center justify-center px-3 border-b bg-orange-500">
                    <Image
                        src="/logo.png"
                        alt="Logo FIF"
                        width={38}
                        height={38}
                        className="rounded-sm bg-white p-1"
                        priority
                    />
                    <div>
                        <h1 className="text-sm font-bold text-white">FEDERATION <br/> IVOIRIENNE DE FOOTBALL </h1>
                    </div>
                </div>

                <nav className="flex-1 overflow-auto py-6 px-3">
                    <div className="space-y-1">
                        {items.map((item) => (
                            <LinkItem key={item.title} item={item} />
                        ))}
                    </div>
                </nav>

                <div className="p-4 border-t-2">
                    <Link
                        href={"/dashboard/help"}
                        className={`flex rounded-sm text-sm items-center gap-3 px-3 py-2.5 transition-all
                        ${
                            pathname === "/dashboard/help"
                                ? "bg-green-600 text-white font-semibold"
                                : "text-gray-600 hover:bg-orange-100 font-semibold hover:text-orange-600"
                        }`}
                    >
                        <Info className="h-5 w-5" />
                        <span>Aide</span>
                    </Link>
                    <button
                        onClick={() => setIsLogoutDialogOpen(true)}
                        className="flex rounded-sm text-sm items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-all w-full mt-2"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            Confirmation de déconnexion
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            Êtes-vous sûr de vouloir vous déconnecter ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-sm"
                            onClick={() => setIsLogoutDialogOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            size="sm"
                            className="rounded-sm bg-green-600 hover:bg-green-600"
                            onClick={handleLogout}
                        >
                            <Check className="mr-1" size={14}/>
                            Oui
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}