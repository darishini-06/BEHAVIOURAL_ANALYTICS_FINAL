"use client";

import { useState } from "react";
import { analyzeImpulse, type AnalyzeImpulseOutput } from "@/ai/flows/analyze-impulse-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, Timer, PiggyBank, ArrowRight } from "lucide-react";

const moods = ["Calm", "Stressed", "Bored", "Excited", "Sad", "Anxious"];

export function ImpulseSimulator() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [mood, setMood] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeImpulseOutput | null>(null);

  const handleAnalyze = async () => {
    if (!itemName || !price || !mood) return;
    setLoading(true);
    try {
      const output = await analyzeImpulse({
        itemName,
        price: parseFloat(price),
        mood,
        isOnSale,
      });
      setResult(output);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (score: number) => {
    if (score > 70) return "bg-destructive";
    if (score > 40) return "bg-orange-500";
    return "bg-secondary";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Impulse Reality Check</CardTitle>
          <CardDescription>
            Thinking of buying something right now? Let's run a quick behavioral check.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="item">What's the item?</Label>
            <Input 
              id="item" 
              placeholder="e.g. Designer Sneakers, New Video Game" 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                type="number" 
                placeholder="0.00" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Your Current Mood</Label>
              <Select onValueChange={setMood} value={mood}>
                <SelectTrigger>
                  <SelectValue placeholder="How do you feel?" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <div className="space-y-0.5">
              <Label className="text-base">Is it on sale?</Label>
              <p className="text-xs text-muted-foreground">Sales create artificial urgency.</p>
            </div>
            <Switch checked={isOnSale} onCheckedChange={setIsOnSale} />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-12 text-lg rounded-xl" 
            onClick={handleAnalyze}
            disabled={loading || !itemName || !price || !mood}
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Check Impulse Risk"}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-6">
        {result ? (
          <>
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-accent/10">
              <div className={`h-2 ${getRatingColor(result.impulseRating)}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Analysis Result</CardTitle>
                  <Badge variant={result.impulseRating > 60 ? "destructive" : "secondary"} className="px-3 py-1">
                    Risk Score: {result.impulseRating}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Impulsivity Level</span>
                    <span>{result.impulseRating}%</span>
                  </div>
                  <Progress value={result.impulseRating} className="h-2" />
                </div>

                <div className="p-4 rounded-xl bg-background border shadow-sm italic text-muted-foreground text-sm leading-relaxed">
                  "{result.analysis}"
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-white">
                    <Timer className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-primary">Cool-off Time</p>
                      <p className="text-sm font-semibold">{result.recommendation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-white">
                    <PiggyBank className="w-5 h-5 text-secondary shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase text-secondary">Alternative Action</p>
                      <p className="text-sm font-semibold">{result.alternativeAction}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/30 p-2 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                  <span>{result.savingsGoalImpact}</span>
                </div>
              </CardContent>
            </Card>

            <Button variant="ghost" className="w-fit self-center" onClick={() => setResult(null)}>
              Check another item
            </Button>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 text-center text-muted-foreground bg-accent/5">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <ArrowRight className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
            <p className="max-w-[300px] text-sm leading-relaxed">
              Enter your purchase details to see if your brain is playing tricks on you or if it's a solid decision.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
