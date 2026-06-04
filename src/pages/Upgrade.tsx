import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "30 days",
    features: [
      "Full access to all courses",
      "Code playground",
      "AI tutor chat",
      "Progress tracking",
    ],
    cta: "Current Plan",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    features: [
      "Everything in Free Trial",
      "Unlimited AI questions",
      "Priority support",
      "Certificate generation",
      "Advanced analytics",
      "Offline access",
    ],
    cta: "Coming Soon",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    features: [
      "Everything in Premium",
      "Teacher role access",
      "Create and publish exams",
      "Student management",
      "Custom learning paths",
      "API access",
    ],
    cta: "Coming Soon",
    variant: "outline" as const,
    popular: false,
  },
];

export default function Upgrade() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Upgrade Your Learning</h1>
        <p className="text-muted-foreground text-lg">
          Choose the plan that fits your learning journey
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.popular ? "border-primary shadow-lg ring-1 ring-primary" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.variant} className="w-full" disabled={plan.cta === "Coming Soon"}>
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
