"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/app/StatCard";
import React from "react";
import { BookMarked, BookMinus, Medal, Megaphone } from "lucide-react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const DashboardChart = dynamic(
  () =>
    import("@/components/features/dashboard/DashboardChart").then(
      (mod) => mod.DashboardChart,
    ),
  { ssr: false },
);

const tabs: { title: string; value: string }[] = [
  { title: "Élections", value: "elections" },
  { title: "Sondages", value: "polls" },
];

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "elections";
  const handleTabChange = (value: string) => {
    router.push(`/back/dashboard?tab=${value}`);
  };
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
            <StatCard
              title="Total d'élections"
              value="0"
              icon={<BookMarked size={24} />}
            />
            <StatCard
              title="Élections à venir"
              value="0"
              icon={<BookMinus size={24} />}
            />
            <StatCard
              title="Total de sondages"
              value="0"
              icon={<Medal size={24} />}
            />
            <StatCard
              title="Sondages à venir"
              value="0"
              icon={<Megaphone size={24} />}
            />
          </div>
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={handleTabChange}
            className="flex-1 flex  flex-col"
          >
            <div className="flex-1 mt-4 min-h-0">
              <Card className="bg-secondary space-y-9 h-full p-4 rounded-sm">
                <div className="flex justify-between">
                  <div>
                    <CardHeader className="">
                      <CardTitle>
                        Statistiques des huit{" "}
                        {activeTab === "elections"
                          ? "dernières élections"
                          : "derniers sondages"}
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <TabsList className="space-x-2 w-1/6 flex items-center rounded-sm justify-start py-5 border-b-2 border-gray-200">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="w-6/12 py-1.5 px-4 border text-xs rounded-none font-normal transition-colors duration-200 border-secondary data-[state=active]:bg-secondary data-[state=active]:border-gray-300 data-[state=active]:text-gray-800"
                      >
                        {tab.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                <TabsContent value="elections" className="h-[calc(100%-100px)]">
                  <DashboardChart />
                </TabsContent>
                <TabsContent value="polls" className="h-[calc(100%-100px)]">
                  <DashboardChart />
                </TabsContent>
              </Card>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
