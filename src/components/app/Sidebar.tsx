"use client";

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {AlertTriangle, BookMarked, Check, Info, LayoutDashboard, LogOut, Medal} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";

const items = [
    {title: "Tableau de bord", url: "/back/dashboard", icon: LayoutDashboard},
    {title: "Élections", url: "/back/dashboard/election", icon: BookMarked},
    {title: "Sondages", url: "/back/dashboard/poll", icon: Medal},

];

export default function SideBar({className = ""}: { className?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const {toast} = useToast();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const isActive = (url: string) => {
        // Correspondance exacte pour le tableau de bord, préfixe pour les autres routes
        return pathname === url ||
            (url !== "/back/dashboard" && pathname.startsWith(url));
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setTimeout(() => {
                router.push("/back/login");
                router.refresh();
            }, 1000);

        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la déconnexion",
                variant: "destructive",
            });
        }
    };

    const LinkItem = ({item}: { item: (typeof items)[0] }) => (
        <Link
            href={item.url}
            className={`flex rounded-sm text-sm items-center gap-3 px-3 py-2.5 transition-all
                ${isActive(item.url)
                ? "bg-white text-orange-500 font-semibold"
                : "text-white hover:bg-orange-400 hover:text-white"
            }`}
        >
            <item.icon className="h-5 w-5"/>
            <span>{item.title}</span>
        </Link>
    );

    return (
        <>
            <aside
                className={`bg-orange-500 text-gray-900 w-64 min-h-screen flex-col shadow-lg hidden md:flex border-r ${className}`}>
                <div
                    className="h-[107px] flex items-center justify-between px-6 border-b-2 border-white/40 bg-orange-500">
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/logo.png"
                            alt="Logo FIF"
                            width={75}
                            height={75}
                            className="rounded-md bg-white p-1 cursor-pointer shadow-md transform transition-transform hover:scale-105"
                            priority
                        />
                        <div className="cursor-pointer">
                            <h1 className="text-white text-xl font-black uppercase tracking-wider leading-tight">
                                FIF
                            </h1>
                            <p className="text-white text-xs font-medium tracking-wide">
                                Fédération Ivoirienne de Football
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-auto py-6 px-3">
                    <div className="space-y-1">
                        {items.map((item) => (
                            <LinkItem key={item.title} item={item}/>
                        ))}
                    </div>
                </nav>

                <div className="p-4">
                    <Link
                        href="/back/dashboard/help"
                        className={`flex rounded-sm text-sm items-center gap-3 px-3 py-2.5 transition-all
                            ${isActive("/back/dashboard/help")
                            ? "bg-white text-orange-500 font-semibold"
                            : "text-white hover:bg-orange-300 hover:text-white"
                        }`}
                    >
                        <Info className="h-5 w-5"/>
                        <span>Aide</span>
                    </Link>
                    <button
                        onClick={() => setIsLogoutDialogOpen(true)}
                        className="flex rounded-sm text-sm items-center gap-3 px-3 py-2.5 text-white hover:bg-orange-400 hover:text-white transition-all w-full mt-2"
                    >
                        <LogOut className="h-5 w-5"/>
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500"/>
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