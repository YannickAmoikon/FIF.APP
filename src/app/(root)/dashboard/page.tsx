"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {StatCard} from "@/components/app/StatCard";
import React from "react";
import {BookCheck, BookCopy, Book, BookText} from "lucide-react";
import dynamic from 'next/dynamic';

const DashboardChart = dynamic(
    () => import('@/components/features/dashboard/DashboardChart').then(mod => mod.DashboardChart),
    { ssr: false }
);

export default function DashboardPage() {
    return (
        <main className="flex bg-secondary flex-1 h-full">
            <Card className="flex-1 bg-secondary rounded-none shadow-none border-0">
                <CardHeader className="border-b-2">
                    <CardTitle className="uppercase">TABLEAU DE BORD</CardTitle>
                    <CardDescription>
                        Accéder à une vue générale de l'application
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 h-[calc(100vh-120px)] flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <StatCard title="Total d'élections" value="9" icon={<BookCopy size={24}/>}/>
                        <StatCard title="Elections terminées" value="3" icon={<BookCheck size={24}/>}/>
                        <StatCard title="Elections à venir" value="4" icon={<Book size={24}/>}/>
                        <StatCard title="Elections en cours" value="2" icon={<BookText size={24}/>}/>
                    </div>

                    <div className="flex-1 mt-4 min-h-0">
                        <Card className="bg-secondary h-full p-4 rounded-sm">
                            <CardHeader className="pb-2">
                                <CardTitle>
                                    Statistiques des élections
                                </CardTitle>
                                <CardDescription>
                                    Données des 8 dernières élections
                                </CardDescription>
                            </CardHeader>
                            <div className="h-[calc(100%-100px)]">
                                <DashboardChart />
                            </div>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}