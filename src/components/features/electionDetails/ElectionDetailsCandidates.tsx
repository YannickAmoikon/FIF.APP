import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Card} from "@/components/ui/card";
import {SearchInput} from "@/components/app/SearchInput";

export default function ElectionDetailsCandidates() {
    let value;
    return(
        <ScrollArea className="h-full p-2">
            <div className="mb-6 flex flex-col">
                <h3 className="font-semibold border-b pb-2">Liste des candiats</h3>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <SearchInput value={value} onChange={onchange}/>
                    <Button size="sm" variant="secondary" className="rounded-sm border">
                        <Plus className="h-4 w-4 mr-1"/>
                        Nouveau candidat
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="p-4 rounded-sm bg-secondary">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-secondary border-2 rounded-full"/>
                                <div>
                                    <h4 className="font-medium">Candidat {i}</h4>
                                    <p className="text-sm text-gray-500">Je mettrais une info pertinente</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}