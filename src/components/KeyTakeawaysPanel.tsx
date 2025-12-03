import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Target } from "lucide-react";

interface KeyTakeawaysPanelProps {
    takeaways: string[];
    onQuizMe?: () => void;
}

export function KeyTakeawaysPanel({ takeaways, onQuizMe }: KeyTakeawaysPanelProps) {
    if (!takeaways || takeaways.length === 0) {
        return null;
    }

    return (
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Key Takeaways
                    </h3>
                    {onQuizMe && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={onQuizMe}
                            className="gap-2"
                        >
                            <span className="emoji-icon">🎯</span>
                            Quiz Me
                        </Button>
                    )}
                </div>

                <ul className="space-y-3">
                    {takeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-3 group">
                            <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span className="flex-1">{takeaway}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
