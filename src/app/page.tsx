"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { BehaviorProfiles } from "@/components/dashboard/BehaviorProfiles";
import { RiskScoreInfo } from "@/components/dashboard/RiskScoreInfo";
import { NudgeTool } from "@/components/dashboard/NudgeTool";
import { ImpulseSimulator } from "@/components/dashboard/ImpulseSimulator";
import { LayoutDashboard, Users, Sparkles, TrendingUp, Github, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {/* Dashboard Topbar */}
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-bold text-xl text-primary cursor-pointer">
              <TrendingUp className="w-6 h-6" />
              FinPulse Insight
            </div>
            <div className="hidden md:flex gap-6">
              <Link href="#overview" className="text-sm font-medium hover:text-secondary">Overview</Link>
              <Link href="#simulator" className="text-sm font-medium hover:text-secondary">Simulator</Link>
              <Link href="#profiles" className="text-sm font-medium hover:text-secondary">Profiles</Link>
              <Link href="#genai" className="text-sm font-medium hover:text-secondary">AI Nudges</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="https://github.com"><Github className="w-4 h-4 mr-2" /> View Code</Link>
            </Button>
            <Badge variant="secondary" className="hidden sm:inline-flex">Hackathon Live</Badge>
            <div className="w-8 h-8 rounded-full bg-secondary" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Detecting Financial <span className="text-secondary">Impulse Behavior</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-driven behavioral analysis platform to help young adults visualize and mitigate spontaneous financial decisions.
          </p>
        </section>

        {/* Risk Score Section */}
        <section id="overview" className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <LayoutDashboard className="w-5 h-5" />
            <h2 className="text-2xl font-bold">Research Insights Overview</h2>
          </div>
          <RiskScoreInfo />
          <OverviewCharts />
        </section>

        {/* Impulse Simulator Section */}
        <section id="simulator" className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5 text-secondary" />
            <h2 className="text-2xl font-bold">Impulse Decision Simulator</h2>
          </div>
          <ImpulseSimulator />
        </section>

        {/* Behavior Profiles Section */}
        <section id="profiles" className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            <h2 className="text-2xl font-bold">Identified Behavior Profiles</h2>
          </div>
          <BehaviorProfiles />
        </section>

        {/* GenAI Nudge Tool Section */}
        <section id="genai" className="space-y-6 pb-12">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-2xl font-bold">AI-Driven Behavioral Interventions</h2>
          </div>
          <NudgeTool />
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-accent/5">
        FinPulse Insight &copy; {new Date().getFullYear()} — Built for Data Clarity with Next.js, Genkit & Gemini.
      </footer>
    </div>
  );
}
