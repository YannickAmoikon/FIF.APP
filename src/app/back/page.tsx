"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BackLandingPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="flex flex-col items-center justify-center w-full px-6 lg:px-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="rounded-md shadow-md"
            />
          </div>

          {/* Welcome Message */}
          <h1 className="text-5xl font-extrabold text-gray-800">
            Bienvenue sur le Panel d'Administration
          </h1>
          <p className="text-xl text-gray-600">
            Gérez vos élections, candidats et électeurs avec une interface intuitive et sécurisée. Connectez-vous pour découvrir toutes les fonctionnalités.
          </p>

          {/* Call to Action */}
          <Button
            size="lg"
            onClick={() => router.push("/back/login")}
            className="bg-green-600 hover:bg-green-600 text-white px-10 py-3 rounded-lg shadow-md"
          >
            Authentifiez vous
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          {/* Disclaimer */}
          <p className="text-sm text-gray-500 italic mt-4">
            Accès réservé exclusivement aux administrateurs autorisés.
          </p>
        </div>

        {/* Feature Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          {/* Feature 1 */}
          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300">
            <h3 className="text-xl font-bold text-green-700 mb-3">
              Gestion des Élections
            </h3>
            <p className="text-gray-600">
              Planifiez et gérez vos élections avec des outils avancés en toute simplicité.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300">
            <h3 className="text-xl font-bold text-green-700 mb-3">
              Résultats en Temps Réel
            </h3>
            <p className="text-gray-600">
              Accédez aux statistiques et résultats actualisés instantanément.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300">
            <h3 className="text-xl font-bold text-green-700 mb-3">
              Sécurité Renforcée
            </h3>
            <p className="text-gray-600">
              Vos données et celles de vos électeurs sont entièrement protégées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
