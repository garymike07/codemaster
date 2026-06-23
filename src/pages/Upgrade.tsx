import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";
import { COURSE_CATALOG } from "@/lib/constants";

const freePlanFeatures = [
  `All ${COURSE_CATALOG.length} courses (JavaScript, Python, AI)`,
  "Interactive code editor",
  "Practice playground",
  "Progress tracking & streaks",
  "JavaScript quizzes",
  "AI tutor chat in lessons",
];

export default function Upgrade() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 min-h-11">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Your Learning Plan</h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to learn JavaScript is included free during the trial
        </p>
      </div>

      <Card className="max-w-lg mx-auto border-primary shadow-lg ring-1 ring-primary">
        <CardHeader className="text-center pt-8">
          <Badge className="w-fit mx-auto mb-4 bg-primary text-primary-foreground">
            <Sparkles className="w-3 h-3 mr-1" />
            Current Plan
          </Badge>
          <CardTitle className="text-xl">Free Trial</CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold">Free</span>
            <span className="text-muted-foreground ml-1">for 30 days</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-3">
            {freePlanFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full min-h-11" asChild>
            <Link to="/courses">Continue Learning</Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Premium plans with certificates and advanced analytics are coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
