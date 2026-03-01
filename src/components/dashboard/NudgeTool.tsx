
"use client";

import { useState } from "react";
import { generatePersonalizedNudge, type GeneratePersonalizedNudgeOutput } from "@/ai/flows/personalized-nudge-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Send } from "lucide-react";

const profiles = [
  "Impulsive Spender",
  "Emotional Shopper",
  "Budget-Conscious Saver",
  "Social Follower",
  "Spontaneous Splurger",
];

export function NudgeTool() {
  const [profile, setProfile] = useState<string>("");
  const [concern, setConcern] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratePersonalizedNudgeOutput | null>(null);

  const handleGenerate = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const output = await generatePersonalizedNudge({
        financialBehaviorProfile: profile,
        specificConcern: concern,
      });
      setResult(output);
    } catch (error) {
      console.error("Error generating nudge:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            Nudge Generator
          </CardTitle>
          <CardDescription>
            Simulate a profile to get AI-generated behavioral interventions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Behavior Profile</label>
            <Select onValueChange={setProfile} value={profile}>
              <SelectTrigger>
                <SelectValue placeholder="Select a profile" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Specific Concern (Optional)</label>
            <Textarea 
              placeholder="E.g., overspending on food deliveries after work"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="resize-none h-24"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full gap-2" 
            onClick={handleGenerate} 
            disabled={!profile || loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Generate Advice
          </Button>
        </CardFooter>
      </Card>

      <div className="lg:col-span-2">
        {result ? (
          <Card className="h-full border-secondary/20 bg-secondary/5">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">Your Personalized Nudge</CardTitle>
                <Badge variant={result.riskCategory.includes("High") ? "destructive" : "secondary"}>
                  {result.riskCategory}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-background p-4 rounded-lg border italic text-muted-foreground leading-relaxed">
                "{result.nudge}"
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-primary">Actionable Steps</h4>
                <ul className="grid gap-3">
                  {result.actionableSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </div>
                      <span className="leading-tight">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
            <p className="max-w-[280px]">Fill in the profile details to see behavioral insights powered by Gemini AI.</p>
          </div>
        )}
      </div>
    </div>
  );
}
