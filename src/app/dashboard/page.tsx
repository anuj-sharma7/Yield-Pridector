"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Sprout, Droplets, Recycle, Map as MapIcon, ArrowUpRight, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", energy: 4000, water: 2400 },
  { name: "Tue", energy: 3000, water: 1398 },
  { name: "Wed", energy: 2000, water: 9800 },
  { name: "Thu", energy: 2780, water: 3908 },
  { name: "Fri", energy: 1890, water: 4800 },
  { name: "Sat", energy: 2390, water: 3800 },
  { name: "Sun", energy: 3490, water: 4300 },
];

export default function OverviewPage() {
  const satelliteImg = PlaceHolderImages.find(img => img.id === "satellite-campus")?.imageUrl;

  return (
    <div className="flex flex-col gap-6">
      {/* Alert Bar */}
      <div className="flex items-center gap-4 rounded-lg bg-accent/10 p-4 border border-accent/20">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
          <AlertTriangle className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Predicted Stress Detected</p>
          <p className="text-xs text-muted-foreground">South sector wheat fields predicted to show water stress in 7-10 days. Recommendation: Increase irrigation by 15%.</p>
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">View Advisory</Button>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Campus Energy"
          value="1,240 kWh"
          subValue="Predicted: 1,450 kWh (+16%)"
          icon={Zap}
          trend={{ value: "4% vs baseline", isUp: true }}
        />
        <StatCard
          title="Water Usage"
          value="45.2 KL"
          subValue="Spike predicted in Hostel B"
          icon={Droplets}
          trend={{ value: "2% saving", isUp: false }}
        />
        <StatCard
          title="Vegetation Health"
          value="0.68 NDVI"
          subValue="Stable across campus"
          icon={Sprout}
          trend={{ value: "Healthy", isUp: true }}
        />
        <StatCard
          title="Waste Diverted"
          value="850 kg"
          subValue="Circular score: 92/100"
          icon={Recycle}
          trend={{ value: "12% up", isUp: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Satellite Map Preview */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="font-headline text-xl">Satellite Intel Layer</CardTitle>
              <CardDescription>Latest Sentinel-2 imagery (updated 2 days ago)</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <MapIcon className="size-4" /> Full Map
            </Button>
          </CardHeader>
          <CardContent className="p-0 relative h-[400px]">
            {satelliteImg ? (
              <Image
                src={satelliteImg}
                alt="Campus Satellite"
                fill
                className="object-cover opacity-90"
                data-ai-hint="satellite campus"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Satellite image unavailable</p>
              </div>
            )}
            {/* Mock Overlays */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-primary/80 backdrop-blur-sm border-none">NDVI Overlay Active</Badge>
              <Badge variant="secondary" className="bg-accent/80 backdrop-blur-sm border-none">LST Heat Analysis</Badge>
            </div>
            {/* Pulsing Hotspot */}
            <div className="absolute top-1/2 left-1/3 size-16">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></span>
              <span className="relative inline-flex rounded-full size-16 bg-accent/40 border-2 border-accent"></span>
            </div>
          </CardContent>
        </Card>

        {/* Circular Economy Sidebar */}
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Recycle className="size-5" /> BioLoop Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Compost Maturity (Batch #24)</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="bg-white/20" />
              <p className="text-xs text-primary-foreground/70">Ready for routing in 4 days.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <ArrowUpRight className="size-4" /> Routing Match
              </h4>
              <p className="text-xs text-primary-foreground/80">Satellite analysis shows Soil Moisture deficit in Sector 7 Farms. Routing 200kg compost.</p>
              <Button variant="secondary" size="sm" className="w-full">Confirm Routing</Button>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Green Leaderboard</h4>
              {[
                { name: "Hostel A", pts: 98, save: "4.2k kWh" },
                { name: "Hostel B", pts: 84, save: "3.6k kWh" },
                { name: "Hostel C", pts: 76, save: "2.9k kWh" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-accent">{idx + 1}</span>
                    <span>{item.name}</span>
                  </div>
                  <Badge variant="outline" className="text-white border-white/30">{item.save}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Chart */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Consumption Trends & Predictions</CardTitle>
          <CardDescription>Energy and water utilization with AMD-accelerated forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="energy" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEnergy)" strokeWidth={2} />
                <Area type="monotone" dataKey="water" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorWater)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
