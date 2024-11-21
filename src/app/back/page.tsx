"use client"

import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

export default function BackLandingPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-secondary">
            <div className="flex flex-col items-center justify-center w-full px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="mb-8 flex justify-center">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="border-2 border-orange-400 p-3 rounded-sm"
                        />
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4">
                        Bienvenue sur le Panel d'Administration
                    </h1>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                        Gérez vos élections, candidats et électeurs en toute simplicité.
                        Connectez-vous pour accéder à toutes les fonctionnalités.
                    </p>

                    <div className="flex flex-col gap-4 items-center">
                        <Button
                            size="lg"
                            onClick={() => router.push('/back/login')}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-sm px-8"
                        >
                            Se connecter
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                            <div className="w-2 h-2 rounded-full bg-orange-400" />
                            <span>Accès réservé aux administrateurs</span>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 border rounded-sm">
                            <h3 className="font-semibold mb-2">Gestion des Élections</h3>
                            <p className="text-sm text-gray-500">
                                Créez et gérez vos élections en quelques clics
                            </p>
                        </div>
                        <div className="p-6 border rounded-sm">
                            <h3 className="font-semibold mb-2">Suivi en Temps Réel</h3>
                            <p className="text-sm text-gray-500">
                                Visualisez les résultats et statistiques en direct
                            </p>
                        </div>
                        <div className="p-6 border rounded-sm">
                            <h3 className="font-semibold mb-2">Sécurité Maximale</h3>
                            <p className="text-sm text-gray-500">
                                Vos données sont protégées et sécurisées
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}