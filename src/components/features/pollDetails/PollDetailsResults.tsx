import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export default function PollDetailsResults() {
  const totalVotes = 250;
  const votesDetails = {
    votesValides: 230,
    votesNuls: 15,
    votesAbstention: 5,
  };

  return (
    <ScrollArea className="h-full p-2">
      <div className="mb-6 flex flex-col">
        <h3 className="font-semibold border-b pb-2">Résultats de l'élection</h3>
      </div>

      <div className="space-y-6">
        <div className="flex justify-end items-center">
          <Button size="sm" variant="secondary" className="rounded-sm border">
            <FileDown className="mr-1 w-5 h-5" />
            Exporter les résultats
          </Button>
        </div>

        <div className="space-y-4">
          {[
            { name: "Oui / Pour", votes: 120, percentage: 48 },
            { name: "Non / Contre", votes: 85, percentage: 34 },
            { name: "Neutre / Je m'abstiens", votes: 45, percentage: 18 },
          ].map((candidat) => (
            <div key={candidat.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span>{candidat.name}</span>
                  <span className="text-xs text-gray-500">
                    ({candidat.votes} votes)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {candidat.votes}/{votesDetails.votesValides} votes valides
                  </span>
                  <span className="font-medium">{candidat.percentage}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${candidat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex gap-8">
              <div className="flex gap-2">
                <span>Total des votes:</span>
                <span>{totalVotes}</span>
              </div>
              <div className="flex gap-2">
                <span>Votes valides:</span>
                <span>{votesDetails.votesValides}</span>
              </div>
              <div className="flex gap-2">
                <span>Votes nuls:</span>
                <span>{votesDetails.votesNuls}</span>
              </div>
              <div className="flex gap-2">
                <span>Abstentions:</span>
                <span>{votesDetails.votesAbstention}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
