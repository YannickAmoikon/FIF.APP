import {Loader2} from "lucide-react";
import React from "react";

export default function Loader() {
    return (
        <main className="flex-1 flex h-full items-center justify-center">
            <div className="relative flex-1 h-full w-full bg-gray-200 animate-pulse">
                <Loader2 className="absolute inset-0 m-auto h-12 w-12 text-green-600 animate-spin"/>
            </div>
        </main>
    )
}