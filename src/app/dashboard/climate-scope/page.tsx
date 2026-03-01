
"use client";

import { useState } from "react";
import { generateCampusPolicyRecommendation } from "@/ai/flows/generate-campus-policy-recommendation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudSun, Thermometer, Wind, Zap, Sparkles, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClimateScopePage() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleGeneratePolicy() {
    setLoading(true);
    try {
      const result = await generateCampusPolicyRecommendation({
        campusDescription: "Modern technical campus with 40% concrete coverage and 15 student hostels.",
        heatIslandData: "Hostel B and Admin Block show +4.2°C LST vs central library gardens.",
        ndviLossDescription: "12% reduction in green cover near North Entrance due to new parking project.",
        airQualitySummary: "PM2.5 spike detected during peak hours (8-10 AM) near Gate 1.",
        carbonFootprintSummary: "Energy consumption up by 14% year-on-year, primarily HVAC load."
      });
      setRecommendation(result.policyRecommendations);
      toast({ title: "Policy Engine Complete", description: "AI has generated data-driven recommendations." });
    } catch (error) {
      toast({ title: "Policy Engine Error", description: "Could not generate recommendations.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <CloudSun className="size-6" /> ClimateScope AI
        </h2>
        <p className="text-muted-foreground">Hyper-local climate intelligence and automated policy generation.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Heat Index", val: "34°C", icon: Thermometer, color: "text-orange-600", bg: "bg-orange-100" },
          { label: "Air Quality", val: "82 (Fair)", icon: Wind, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Carbon Save", val: "1.2 Tons", icon: Zap, color: "text-primary", bg: "bg-primary/10" },
          { label: "Heat Hotspots", val: "3 Active", icon: Thermometer, color: "text-destructive", bg: "bg-destructive/10" },
        ].map((item, idx) => (
          <Card key={idx} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`size-10 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                <item.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold">{item.val}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm min-h-[400px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Data-Driven Policy Assistant</CardTitle>
              <CardDescription>Generates actionable sustainability mandates based on telemetry data.</CardDescription>
            </div>
            <Button onClick={handleGeneratePolicy} disabled={loading} className="gap-2 bg-primary">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Generate Policy
            </Button>
          </CardHeader>
          <CardContent>
            {recommendation ? (
              <div className="prose prose-sm max-w-none bg-secondary/20 p-6 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-4 text-primary font-bold border-b pb-2">
                  <FileText className="size-4" /> AI Recommendation Draft
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {recommendation}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-50">
                <Sparkles className="size-12 mb-4 text-muted-foreground" />
                <p>Run the AI Engine to analyze campus environmental stressors.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-sm font-headline">Live Heat Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <span className="text-xs">Library Zone</span>
                <span className="text-xs font-bold">29.4°C</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <span className="text-xs">Parking Lot A</span>
                <span className="text-xs font-bold text-accent">36.8°C</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <span className="text-xs">Hostel B Facade</span>
                <span className="text-xs font-bold text-accent">34.2°C</span>
              </div>
              <p className="text-[11px] opacity-80 mt-2 italic">Recommendation: Overlay with "Cool Roof" white coating for 3°C reduction.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-headline">Air Quality Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-24 w-full bg-secondary/30 rounded-lg flex items-end gap-1 p-2">
                {[40, 60, 45, 90, 85, 40, 30, 50, 70, 45].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t ${h > 80 ? 'bg-destructive' : 'bg-primary'}`} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>08:00</span>
                <span>Peak</span>
                <span>18:00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
