import {Toaster} from "@/components/ui/toaster";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function HelpPage() {
    return (
        <main className="flex flex-1 bg-secondary  h-full">
            <Toaster/>
            <Card className="flex-1 bg-secondary  rounded-none shadow-none border-0">
                <CardHeader className="border-b-2">
                    <CardTitle className="uppercase">Aide</CardTitle>
                    <CardDescription>Informations sur l'application</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </main>
                )
                }