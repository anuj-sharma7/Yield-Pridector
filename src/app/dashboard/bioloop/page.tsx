
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Recycle, Truck, Leaf, Beaker, ArrowRight, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

export default function BioLoopPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <Recycle className="size-6" /> BioLoop Nexus
        </h2>
        <p className="text-muted-foreground">Circular economy engine: Waste-to-compost-to-farm routing.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Organic Waste" value="4.2 Tons" icon={Recycle} subValue="This month" />
        <StatCard title="Active Compost Batches" value="12 Active" icon={Beaker} />
        <StatCard title="Circular Score" value="94/100" icon={Leaf} trend={{ value: "Top Tier", isUp: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Compost Maturity Pipeline</CardTitle>
            <CardDescription>Real-time telemetry from IoT-enabled composting pits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { id: "CP-24", stage: "Curing", progress: 85, moisture: "42%", temp: "55°C", start: "12 Feb" },
              { id: "CP-25", stage: "Active Composting", progress: 45, moisture: "58%", temp: "62°C", start: "28 Feb" },
              { id: "CP-26", stage: "Mesophilic", progress: 20, moisture: "60%", temp: "38°C", start: "05 Mar" },
            ].map((pit) => (
              <div key={pit.id} className="p-4 rounded-xl border bg-card space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{pit.id}</span>
                    <Badge variant="secondary" className="text-[10px]">{pit.stage}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">Pit Sensor: Active</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Maturity</span>
                    <span>{pit.progress}%</span>
                  </div>
                  <Progress value={pit.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 rounded-lg bg-secondary/30">
                    <p className="text-[10px] text-muted-foreground uppercase">Moisture</p>
                    <p className="text-sm font-bold">{pit.moisture}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/30">
                    <p className="text-[10px] text-muted-foreground uppercase">Temp</p>
                    <p className="text-sm font-bold">{pit.temp}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/30">
                    <p className="text-[10px] text-muted-foreground uppercase">Started</p>
                    <p className="text-sm font-bold">{pit.start}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Truck className="size-5" /> Resource Routing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" /> Routing Ready
              </h4>
              <p className="text-xs opacity-90 leading-relaxed">
                Batch <strong>CP-24</strong> is 85% mature. Satellite NDVI analysis shows soil moisture deficit in <strong>Sector 7 Wheat Field</strong>.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-[10px] uppercase opacity-70">Supply</p>
                  <p className="text-sm font-bold">200kg</p>
                </div>
                <ArrowRight className="size-4" />
                <div className="text-center">
                  <p className="text-[10px] uppercase opacity-70">ETA</p>
                  <p className="text-sm font-bold">24 hrs</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-80">Previous Routes</h4>
              {[
                { target: "Hostel G Garden", qty: "50kg", date: "02 Mar" },
                { target: "North Rice Fields", qty: "450kg", date: "25 Feb" },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center text-xs py-2 border-b border-white/10">
                  <span>{r.target}</span>
                  <span className="font-mono">{r.qty}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
