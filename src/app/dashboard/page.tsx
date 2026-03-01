"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Sprout, 
  Droplets, 
  Recycle, 
  ArrowUpRight, 
  AlertTriangle,
  Satellite,
  Activity,
  Crosshair,
  RefreshCw,
  Globe,
  Navigation,
  Layers,
  Terminal
} from "lucide-react";
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
  const [coords, setCoords] = useState({ lat: "21.1458", lng: "79.0882" }); // Nagpur, Central India
  const [logs, setLogs] = useState<string[]>([]);
  const satelliteImg = PlaceHolderImages.find(img => img.id === "satellite-campus")?.imageUrl;

  // Live coordinate jitter and log simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCoords({
        lat: (21.1458 + (Math.random() - 0.5) * 0.0001).toFixed(4),
        lng: (79.0882 + (Math.random() - 0.5) * 0.0001).toFixed(4)
      });
      
      const messages = [
        "FETCHING TILE S2B_14Q...",
        "ATMOSPHERIC CORRECTION: LEVEL-2A",
        "B04/B08 SPECTRAL SYNC",
        "AMD ROCm INFERENCE: ACTIVE",
        "NDVI CALCULATED: 0.68"
      ];
      setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 4));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Alert Bar */}
      <div className="flex items-center gap-4 rounded-xl bg-accent/10 p-4 border border-accent/20 backdrop-blur-sm shadow-sm">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-foreground border border-accent/30 shadow-[0_0_15px_rgba(95,230,48,0.2)]">
          <AlertTriangle className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-primary">Predicted Stress Alert</p>
          <p className="text-xs text-muted-foreground">South sector wheat fields (Zone-B) predicted to show critical water stress in 7 days.</p>
        </div>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90 shadow-md">View Advisory</Button>
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
          subValue="Multi-temporal analysis stable"
          icon={Sprout}
          trend={{ value: "Optimal", isUp: true }}
        />
        <StatCard
          title="Waste Diverted"
          value="850 kg"
          subValue="BioLoop Nexus active"
          icon={Recycle}
          trend={{ value: "12% up", isUp: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Enhanced Satellite Intel Layer - India Location */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl bg-slate-900 h-[550px] relative group">
          <CardHeader className="absolute top-0 left-0 w-full z-20 pointer-events-none flex flex-row items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="pointer-events-auto">
              <CardTitle className="font-headline text-xl text-white flex items-center gap-2">
                <Satellite className="size-5 text-accent animate-pulse" /> Live Sentinel Intel
              </CardTitle>
              <CardDescription className="text-white/60 text-xs font-mono flex items-center gap-2">
                <Globe className="size-3" /> Region: Nagpur, India • Lat: {coords.lat} • Lng: {coords.lng}
              </CardDescription>
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <Badge className="bg-primary/90 text-white border-none backdrop-blur-md">NDVI: 0.68</Badge>
              <Badge variant="secondary" className="bg-accent/80 text-accent-foreground border-none backdrop-blur-md">LST: 31.4°C</Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 relative h-full">
            {satelliteImg ? (
              <>
                <Image
                  src={satelliteImg}
                  alt="India Satellite View"
                  fill
                  className="object-cover opacity-80 grayscale-[0.2] contrast-[1.1]"
                  data-ai-hint="satellite view india map"
                />
                
                {/* HUD Overlays */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Tactical Grid Overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Scan Line Animation */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 shadow-[0_0_15px_#5FE630] animate-[scan_6s_linear_infinite]" />
                  
                  {/* Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Crosshair className="size-16 text-accent/30 stroke-[0.5]" />
                  </div>

                  {/* Live Feed Logs - Top Right */}
                  <div className="absolute top-20 right-4 w-52 bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl p-3 space-y-2 pointer-events-auto overflow-hidden">
                    <div className="flex items-center justify-between text-[8px] uppercase font-bold text-accent tracking-widest">
                      <span>Feed Telemetry</span>
                      <Terminal className="size-2" />
                    </div>
                    <div className="space-y-1 font-mono text-[9px] text-white/70">
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <span className="text-accent/50">›</span>
                          <span className="truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Satellite Metadata Overlay */}
                  <div className="absolute bottom-4 right-4 w-56 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-4 pointer-events-auto">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white/50 tracking-widest">
                      <span>Live Spectral Data</span>
                      <Activity className="size-2 text-accent" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="text-white/60">Chlorophyll (B8)</span>
                          <span className="text-accent font-bold">68.2%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[68%]" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="text-white/60">Thermal Flux (B11)</span>
                          <span className="text-orange-400 font-bold">42.1%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400 w-[42%]" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <div className="text-center">
                        <p className="text-[7px] uppercase text-white/40">Cloud Cover</p>
                        <p className="text-[10px] font-bold text-white">4.2%</p>
                      </div>
                      <div className="text-center border-l border-white/10">
                        <p className="text-[7px] uppercase text-white/40">Res</p>
                        <p className="text-[10px] font-bold text-white">10m/px</p>
                      </div>
                    </div>
                  </div>

                  {/* Live Status HUD */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-2.5 flex items-center gap-3 pointer-events-auto">
                    <div className="size-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#5FE630]" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-bold text-white uppercase tracking-widest">AMD ROCm Engine Linked</span>
                      <span className="text-[7px] text-white/40 font-mono italic">Nagpur-SEC-A-4</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-4">
                <RefreshCw className="size-8 text-accent animate-spin" />
                <p className="text-sm text-white/40 font-mono tracking-tighter">INITIALIZING SAT-STACK...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Circular Economy Sidebar */}
        <Card className="border-none shadow-xl bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
              <Recycle className="size-5 text-accent" /> BioLoop Nexus
            </CardTitle>
            <CardDescription className="text-primary-foreground/70">Circular resource routing optimizer.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span>Compost Maturity (Batch #24)</span>
                <span className="text-accent">82%</span>
              </div>
              <Progress value={82} className="bg-white/10 h-2" />
              <div className="flex items-center gap-2 text-[10px] text-primary-foreground/60">
                <Activity className="size-3" /> Ready for routing in 4 days.
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-4 border border-white/20 space-y-3 shadow-inner">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <ArrowUpRight className="size-4 text-accent" /> Routing Suggestion
              </h4>
              <p className="text-xs text-primary-foreground/80 leading-relaxed">
                Satellite NDVI detected high moisture deficit in <strong className="text-accent">Sector 7 Farm</strong>. Routing 200kg of mature batch.
              </p>
              <Button variant="secondary" size="sm" className="w-full font-bold bg-white text-primary hover:bg-accent hover:text-accent-foreground border-none">
                Confirm Resource Route
              </Button>
            </div>

            <div className="space-y-4 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Green Leaderboard</h4>
              {[
                { name: "Hostel A (Alpha)", pts: 982, save: "14%", trend: "up" },
                { name: "Engineering Block", pts: 945, save: "12%", trend: "up" },
                { name: "Hostel B (Beta)", pts: 910, save: "18%", trend: "down" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-headline font-bold text-accent italic">#{idx + 1}</span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <Badge variant="outline" className="text-white border-white/20 font-mono text-[10px]">
                    {item.save} {item.trend === 'up' ? '▲' : '▼'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Chart with Predictive Legend */}
      <Card className="border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="flex flex-row items-center justify-between bg-primary/5 border-b py-4">
          <div>
            <CardTitle className="font-headline text-xl text-primary">Intelligence Forecasting</CardTitle>
            <CardDescription>Energy & Water utilization with AMD-accelerated LSTM forecasting.</CardDescription>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-primary" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-accent" />
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Water</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="energy" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEnergy)" strokeWidth={3} />
                <Area type="monotone" dataKey="water" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorWater)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <style jsx global>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
}
