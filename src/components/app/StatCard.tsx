import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react";

export const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <Card className="bg-secondary  hover:shadow-md rounded-sm cursor-pointer transition-shadow duration-200 border shadow-sm">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-700 font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-lg text-gray-700 flex items-center justify-between font-bold"><span>{value}</span>{icon}</div>
        </CardContent>
    </Card>
);