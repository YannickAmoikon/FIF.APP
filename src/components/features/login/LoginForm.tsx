"use client"

import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useLoginMutation} from "@/services/auth.services";

export default function LoginForm() {
    const router = useRouter();
    const [login, {isLoading}] = useLoginMutation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Appel de l'API de connexion
            const response = await login({
                email: formData.email,
                password: formData.password,
            }).unwrap();

            // Notification de succès
            showToast({
                title: "Connexion réussie !",
                description: "Vous allez être redirigé vers le dashboard.",
                variant: "success",
            });

            // Redirection vers le dashboard
            router.push("/dashboard");

        } catch (error: any) {
            // Gestion des erreurs
            showToast({
                title: "Erreur de connexion",
                description: error?.data?.message || "Une erreur est survenue",
                variant: "error",
            });
        }
    };

    const [open, setOpen] = useState(false);

    const showToast = (toast: {
        title: string;
        description: string;
        variant: "success" | "error" | "default";
    }) => {
        setOpen(true);
        setTimeout(() => setOpen(false), 3000);
    };
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="hidden w-7/12 lg:block">
                <div className="relative h-full w-full">
                    <Image
                        src="/login.jpeg"
                        alt="Image"
                        layout="fill"
                        objectFit="cover"
                        className="dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
            <div className="flex flex-col w-full items-center justify-center lg:w-5/12">
                <div className="items-start mb-8 flex">
                    <Image
                        src="/logo.png"
                        alt=""
                        width={75}
                        height={75}
                        className="border-2 border-orange-400 p-2 rounded-sm"
                    />
                </div>
                <div className="w-full max-w-[350px] px-4">
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">Connexion | </h1>
                            <p className="text-green-600 underline pr-8">
                                Panel Administration
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Mot de passe</Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    size="sm"
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-1/2 bg-green-600 rounded-sm text-md hover:bg-green-600"
                                >
                                    {isLoading ? "Connexion..." : "Connexion"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}