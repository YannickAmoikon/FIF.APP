import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
        <main className="flex flex-col bg-secondary  min-h-screen items-center space-y-10 justify-center">
            <h1 className="text-xl border-b-2 border-black">{"Page d'accueil de l'application"}</h1>
         <Link href="/login">
             <Button
                 size="sm"
                 className="rounded-sm hover:bg-green-600 hover:text-white hover:border-green-600 border-2 border-black font-semibold duration-700"
                 variant="outline"
             >
                 <Play className="mr-1" />
                 {"Commencer"}
             </Button>
         </Link>
        </main>
  );
}
