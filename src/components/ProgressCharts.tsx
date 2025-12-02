import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProgressChartProps {
    totalXp: number;
    level: number;
    lessonsCompleted: number;
    challengesCompleted: number;
    examsPassed: number;
}

export function ProgressCharts({ totalXp, level, lessonsCompleted, challengesCompleted, examsPassed }: ProgressChartProps) {
    const xpForNextLevel = useMemo(() => {
        return level * 1000; // Simple formula: each level requires level * 1000 XP
    }, [level]);

    const currentLevelXp = useMemo(() => {
        return totalXp % xpForNextLevel;
    }, [totalXp, xpForNextLevel]);

    const xpProgress = useMemo(() => {
        return (currentLevelXp / xpForNextLevel) * 100;
    }, [currentLevelXp, xpForNextLevel]);

    const stats = [
        { label: "Lessons", value: lessonsCompleted, color: "text-primary", bgColor: "bg-primary/10" },
        { label: "Challenges", value: challengesCompleted, color: "text-warning", bgColor: "bg-warning/10" },
        { label: "Exams", value: examsPassed, color: "text-success", bgColor: "bg-success/10" },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {/* Level Progress */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-bold text-gradient-primary">Level {level}</p>
                                <p className="text-sm text-muted-foreground">
                                    {currentLevelXp} / {xpForNextLevel} XP
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{Math.round(xpProgress)}%</p>
                                <p className="text-xs text-muted-foreground">to next level</p>
                            </div>
                        </div>
                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full transition-all duration-500"
                                style={{ width: `${xpProgress}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className={`${stat.bgColor} rounded-lg p-3 mb-2`}>
                                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
