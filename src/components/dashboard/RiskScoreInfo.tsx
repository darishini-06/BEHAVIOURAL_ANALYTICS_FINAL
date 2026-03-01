
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, BarChart3, TrendingUp, AlertCircle } from "lucide-react";

export function RiskScoreInfo() {
  return (
    <Card className="bg-primary text-primary-foreground overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          The Impulse Risk Score (IRS)
        </CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <BarChart3 className="w-4 h-4 text-secondary" />
            Quantification
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            IRS uses machine learning to score financial behavior from 0-100 based on transaction volatility, time-of-day habits, and category deviations.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <TrendingUp className="w-4 h-4 text-secondary" />
            Significance
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            A higher score indicates a stronger tendency toward immediate gratification over long-term financial stability, predicting future debt risk.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 text-secondary" />
            Thresholds
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Scores above 65 are considered "High Intervention Zones" where behavioral nudges and automated cooling-off periods are recommended.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
