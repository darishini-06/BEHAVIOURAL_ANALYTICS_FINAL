
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { BehaviorProfiles } from "@/components/dashboard/BehaviorProfiles";
import { RiskScoreInfo } from "@/components/dashboard/RiskScoreInfo";
import { NudgeTool } from "@/components/dashboard/NudgeTool";
import { LayoutDashboard, Target, Users, Sparkles, TrendingUp, ChevronRight, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!showDashboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-accent/20">
        <header className="fixed top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <TrendingUp className="w-6 h-6" />
            FinPulse Insight
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com"><Github className="w-4 h-4 mr-2" /> Codebase</Link>
            </Button>
          </div>
        </header>

        <main className="max-w-4xl text-center space-y-8 mt-12">
          <Badge variant="secondary" className="px-4 py-1 text-sm rounded-full mb-4 animate-pulse">
            Hackathon Project: Data Science & AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary">
            Detecting Financial <span className="text-secondary">Impulse Behavior</span> in Young Adults
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            An advanced behavioral analysis platform leveraging data science and Gemini AI to identify, visualize, and mitigate spontaneous financial decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={() => setShowDashboard(true)}>
              View Results Dashboard <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
              Read Research Paper
            </Button>
          </div>
        </main>

        <footer className="fixed bottom-0 w-full p-8 text-center text-sm text-muted-foreground">
          Built with Next.js, Genkit & Gemini Pro. Designed for Data Clarity.
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Topbar */}
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-bold text-xl text-primary cursor-pointer" onClick={() => setShowDashboard(false)}>
              <TrendingUp className="w-6 h-6" />
              FinPulse
            </div>
            <div className="hidden md:flex gap-6">
              <Link href="#overview" className="text-sm font-medium hover:text-secondary">Overview</Link>
              <Link href="#profiles" className="text-sm font-medium hover:text-secondary">Profiles</Link>
              <Link href="#genai" className="text-sm font-medium hover:text-secondary">AI Nudges</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={() => setShowDashboard(false)}>Exit Preview</Button>
            <div className="w-8 h-8 rounded-full bg-secondary" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        {/* Risk Score Section */}
        <section id="overview" className="space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <LayoutDashboard className="w-5 h-5" />
            <h2 className="text-2xl font-bold">Research Insights Overview</h2>
          </div>
          <RiskScoreInfo />
          <OverviewCharts />
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
      </div>
    </div>
  );
}

function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: string, className?: string }) {
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input text-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
