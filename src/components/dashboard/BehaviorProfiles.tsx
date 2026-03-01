
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Heart, Users, PiggyBank, Zap } from "lucide-react";

const profileData = [
  {
    title: "The Spontaneous Splurger",
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    description: "Driven by immediate gratification and sales alerts. Often forgets the original purpose of a shopping trip.",
    risk: "High",
    stats: "Average Score: 78/100"
  },
  {
    title: "The Emotional Shopper",
    icon: <Heart className="w-6 h-6 text-red-500" />,
    description: "Spending patterns are highly correlated with emotional peaks or stress. Uses shopping as a coping mechanism.",
    risk: "Moderate",
    stats: "Average Score: 55/100"
  },
  {
    title: "The Social Follower",
    icon: <Users className="w-6 h-6 text-blue-500" />,
    description: "Spending increases significantly when in group settings or influenced by social media trends.",
    risk: "Moderate",
    stats: "Average Score: 62/100"
  },
  {
    title: "The Budget-Conscious Saver",
    icon: <PiggyBank className="w-6 h-6 text-green-500" />,
    description: "Highly disciplined with money, but may experience occasional 'rebound' impulse spending after strict periods.",
    risk: "Low",
    stats: "Average Score: 24/100"
  }
];

export function BehaviorProfiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {profileData.map((p) => (
        <Card key={p.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              {p.icon}
              <Badge variant={p.risk === "High" ? "destructive" : p.risk === "Low" ? "outline" : "secondary"}>
                {p.risk} Risk
              </Badge>
            </div>
            <CardTitle className="text-base pt-2">{p.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {p.description}
            </p>
            <div className="text-xs font-semibold text-primary/70">
              {p.stats}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
