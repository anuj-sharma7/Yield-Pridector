
"use client";

import { useState } from "react";
import { generatePersonalizedEnergyNudge } from "@/ai/flows/generate-personalized-energy-nudge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Droplets, Bell, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { useToast } from "@/hooks/use-toast";

const anomalies = [
  { id: 1, type: "energy", location: "Hostel B - Lab AC", status: "predicted", waste: "₹2,400", time: "Next 24h", score: 88 },
  { id: 2, type: "water", location: "Canteen Block A", status: "detected", waste: "150L", time: "Ongoing", score: 94 },
  { id: 3, type: "energy", location: "Engineering Dept L3", status: "predicted", waste: "₹1,200", time: "Overnight", score: 72 },
];

export default function CampusGuardPage() {
  const [sendingId, setSendingId] = useState<number | null>(null);
  const { toast } = useToast();

  async function handleSendNudge(anomaly: typeof anomalies[0]) {
    setSendingId(anomaly.id);
    try {
      const { message } = await generatePersonalizedEnergyNudge({
        nudgeType: anomaly.type as "energy" | "water",
        location: anomaly.location,
        estimatedWaste: anomaly.waste,
        timeframe: anomaly.time,
        actionSuggestion: anomaly.type === "energy" ? "Switch off AC by 10pm" : "Check for leaky taps",
        targetUser: "warden",
        language: "English"
      });

      toast({
        title: "Nudge Generated & Sent",
        description: `Message: "${message.substring(0, 50)}..."`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI nudge.",
        variant: "destructive"
      });
    } finally {
      setSendingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <Zap className="size-6" /> CampusGuard AI
        </h2>
        <p className="text-muted-foreground">Predictive anomaly detection and automated intervention system.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active Predictions" value="5 Alerts" icon={Bell} trend={{ value: "High Priority", isUp: true }} />
        <StatCard title="Prevented Waste" value="₹12,450" icon={Zap} trend={{ value: "This Month", isUp: true }} />
        <StatCard title="System Health" value="AMD Edge: Active" icon={CheckCircle2} />
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Anomalies & Predicted Spikes</CardTitle>
          <CardDescription>Real-time telemetry processed via AMD ROCm Isolation Forest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {anomalies.map((a) => (
              <div key={a.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border bg-card transition-all hover:border-primary/30">
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-full flex items-center justify-center ${a.type === 'energy' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {a.type === 'energy' ? <Zap className="size-5" /> : <Droplets className="size-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{a.location}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={a.status === 'predicted' ? 'outline' : 'destructive'} className="text-[10px] py-0">
                        {a.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Anomaly Score: {a.score}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Est. Waste</p>
                    <p className="text-sm font-bold text-primary">{a.waste}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">Window</p>
                    <p className="text-sm font-medium">{a.time}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary text-white gap-2"
                    onClick={() => handleSendNudge(a)}
                    disabled={sendingId === a.id}
                  >
                    {sendingId === a.id ? "Generating..." : <><Send className="size-4" /> AI Nudge</>}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-accent/5">
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2">
            <AlertCircle className="size-5 text-accent-foreground" /> Automated Rule-Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Current automated actions for detected/predicted anomalies:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 rounded-lg bg-white border border-border">
              <p className="text-xs font-bold text-primary">Rule: Overnight Power Cutoff</p>
              <p className="text-[11px] text-muted-foreground mt-1">Trigger: LSTM prediction of &gt;2kW idle load in Computer Labs after 11 PM.</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-border">
              <p className="text-xs font-bold text-primary">Rule: Leakage Lockdown</p>
              <p className="text-[11px] text-muted-foreground mt-1">Trigger: Isolation Forest detected constant flow in Hostel B between 2-4 AM.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
