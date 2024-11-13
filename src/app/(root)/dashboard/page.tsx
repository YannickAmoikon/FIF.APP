import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

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
                <CardContent className="p-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card
                            className="bg-secondary transition-shadow hover:shadow-md cursor-pointer rounded-sm h-[150px]  border shadow-sm">

                        </Card>

                        <Card
                            className="bg-secondary transition-shadow hover:shadow-md cursor-pointer rounded-sm h-[150px]  border shadow-sm">

                        </Card>

                        <Card
                            className="bg-secondary transition-shadow hover:shadow-md cursor-pointer rounded-sm h-[150px] border shadow-sm">

                        </Card>

                        <Card
                            className="bg-secondary transition-shadow hover:shadow-md cursor-pointer rounded-sm h-[150px] border shadow-sm">

                        </Card>
                    </div>

                    {/* Graphique */}
                    <div className="mt-4">
                        <Card className="bg-white rounded-sm border shadow-sm">

                        </Card>
                    </div>
                </CardContent>
            </Card>
        </main>
            )
            }