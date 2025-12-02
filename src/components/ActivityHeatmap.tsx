import { useMemo } from "react";

interface ActivityDay {
    date: string;
    count: number;
}

interface ActivityHeatmapProps {
    data: ActivityDay[];
    maxCount?: number;
}

export function ActivityHeatmap({ data, maxCount = 10 }: ActivityHeatmapProps) {
    const weeks = useMemo(() => {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 364); // Last 52 weeks

        const days: ActivityDay[] = [];
        const dataMap = new Map(data.map((d) => [d.date, d.count]));

        for (let i = 0; i < 365; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const dateStr = date.toISOString().split("T")[0];
            days.push({
                date: dateStr,
                count: dataMap.get(dateStr) || 0,
            });
        }

        // Group by weeks
        const weeksArray: ActivityDay[][] = [];
        for (let i = 0; i < days.length; i += 7) {
            weeksArray.push(days.slice(i, i + 7));
        }

        return weeksArray;
    }, [data]);

    const getColor = (count: number) => {
        if (count === 0) return "bg-muted/30";
        const intensity = Math.min(count / maxCount, 1);
        if (intensity < 0.25) return "bg-success/30";
        if (intensity < 0.5) return "bg-success/50";
        if (intensity < 0.75) return "bg-success/70";
        return "bg-success";
    };

    const getTooltipText = (day: ActivityDay) => {
        const date = new Date(day.date);
        const formatted = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        return `${day.count} ${day.count === 1 ? "lesson" : "lessons"} on ${formatted}`;
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="inline-flex gap-1">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day) => (
                            <div
                                key={day.date}
                                className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-all hover:ring-2 hover:ring-primary cursor-pointer`}
                                title={getTooltipText(day)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-muted/30" />
                    <div className="w-3 h-3 rounded-sm bg-success/30" />
                    <div className="w-3 h-3 rounded-sm bg-success/50" />
                    <div className="w-3 h-3 rounded-sm bg-success/70" />
                    <div className="w-3 h-3 rounded-sm bg-success" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}
