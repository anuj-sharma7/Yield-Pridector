
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Zap, Activity, ShieldCheck, Database, Server, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function EdgePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <Cpu className="size-6" /> Edge Intelligence Runtime
        </h2>
        <p className="text-muted-foreground">Real-time status of AMD ROCm accelerated inference nodes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Nodes", val: "14/15", icon: Server },
          { label: "GPU Load", val: "42%", icon: Cpu },
          { label: "Inference Latency", val: "1.8s", icon: Zap },
          { label: "Data Pipeline", val: "99.9%", icon: Activity },
        ].map((item, idx) => (
          <Card key={idx} className="border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
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
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">GPU Telemetry (ROCm HIP 5.7)</CardTitle>
              <CardDescription>Memory and core utilization across the local cluster.</CardDescription>
            </div>
            <Badge className="bg-accent text-accent-foreground font-mono">STABLE</Badge>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-bold">Node-01 (Master Inference)</span>
                </div>
                <span className="text-xs font-mono">1.2ms Sync</span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-medium uppercase tracking-wider">VRAM Usage</span>
                    <span className="font-bold">14.2 / 24 GB</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-medium uppercase tracking-wider">Core Clock</span>
                    <span className="font-bold">2.4 GHz</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border bg-secondary/20 space-y-4">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <RefreshCw className="size-4" /> Active Kernels
              </h4>
              <div className="space-y-2">
                {[
                  { name: "satellite_tile_preprocessor.hip", status: "Running", time: "0.4s" },
                  { name: "ndvi_temporal_lstm.bin", status: "Loaded", time: "Idle" },
                  { name: "anomaly_forest_inference.hip", status: "Running", time: "1.2s" },
                ].map((k, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded bg-white/50 border text-[11px]">
                    <span className="font-mono">{k.name}</span>
                    <div className="flex gap-4">
                      <span className="text-accent font-bold">{k.status}</span>
                      <span className="text-muted-foreground">{k.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="font-headline text-lg">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Zero-Knowledge Encrypted</p>
                  <p className="text-[10px] opacity-70">Telemetry streams are processed in-memory with local encryption keys.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="size-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Cold Storage Sync</p>
                  <p className="text-[10px] opacity-70">Historical tiles archived to Firebase Cloud Storage every 24h.</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-white/10 border border-white/20">
                <p className="text-[10px] uppercase font-bold opacity-70">Inference Queue</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[20%]" />
                  </div>
                  <span className="text-xs font-bold">2 Tasks</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-headline">AMD ROCm Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-black p-4 h-full min-h-[120px] font-mono text-[10px] text-green-500 overflow-y-auto">
                <p>[ROCm] Initializing HIP kernels...</p>
                <p>[Inference] Loading weights: lstm_ndvi_v4.2</p>
                <p>[System] Node-01 handshake successful.</p>
                <p className="animate-pulse">[Live] Processing tile 10928/3...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
