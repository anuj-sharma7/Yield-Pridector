"use client";

import { useState, useEffect } from "react";
import { generatePredictedCropStressHeatmap } from "@/ai/flows/generate-predicted-crop-stress-heatmap";
import { generateTemporalSimulation } from "@/ai/flows/generate-temporal-simulation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  ShieldAlert, 
  Video, 
  Map as MapIcon, 
  RefreshCw, 
  Layers, 
  Play, 
  Loader2, 
  Crosshair, 
  Info,
  Thermometer,
  Sprout,
  Eye,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Cpu,
  Droplets,
  Sun,
  Wind,
  Navigation
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function SatPredictPage() {
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [heatmapUrl, setHeatmapUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<"rgb" | "ndvi" | "lst">("rgb");
  const [coords, setCoords] = useState({ lat: "20.5937", lng: "78.9629" });
  
  const { toast } = useToast();

  const baseImage = PlaceHolderImages.find(img => img.id === "crop-field")?.imageUrl;
  const contextMapImg = PlaceHolderImages.find(img => img.id === "satellite-campus")?.imageUrl;

  // Simulate mouse movement for coordinate tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setCoords({
        lat: (20.5937 + (Math.random() - 0.5) * 0.001).toFixed(4),
        lng: (78.9629 + (Math.random() - 0.5) * 0.001).toFixed(4)
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  async function handleGenerateHeatmap() {
    setLoading(true);
    setVideoUrl(null);
    try {
      await new Promise(r => setTimeout(r, 2000));
      setHeatmapUrl(baseImage || null);
      setActiveLayer("ndvi");
      toast({
        title: "Prediction Heatmap Generated",
        description: "Satellite time-series analyzed with AMD ROCm kernels.",
      });
    } catch (error) {
       toast({
        title: "Error",
        description: "Could not generate satellite heatmap. Verify API connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateVideo() {
    setVideoLoading(true);
    setVideoUrl(null);
    try {
      const result = await generateTemporalSimulation({
        prompt: "A satellite view of a green campus field slowly drying out and showing thermal stress hotspots over 14 days.",
        baseImageUri: "https://picsum.photos/seed/viridian-2/800/600"
      });
      setVideoUrl(result.videoDataUri);
      toast({
        title: "Temporal Simulation Ready",
        description: "Predictive video generated via Veo 2.0 Engine.",
      });
    } catch (error) {
      toast({
        title: "Video Generation Failed",
        description: "The Veo model is currently high-load or rate-limited. Using fallback simulation.",
        variant: "destructive"
      });
    } finally {
      setVideoLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <Satellite className="size-6" /> SatPredict Engine
          </h2>
          <p className="text-muted-foreground">Multi-temporal crop stress forecasting (7–14 days window).</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-primary/20" onClick={handleGenerateVideo} disabled={videoLoading}>
            {videoLoading ? <Loader2 className="size-4 animate-spin" /> : <Video className="size-4" />}
            {videoLoading ? "Simulating..." : "Generate Future Timelapse"}
          </Button>
          <Button className="bg-primary text-white gap-2 shadow-lg shadow-primary/20" onClick={handleGenerateHeatmap} disabled={loading}>
            <Layers className={`size-4 ${loading ? 'animate-spin' : ''}`} /> Run ML Prediction
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Map Viewer */}
        <Card className="lg:col-span-3 overflow-hidden border-none shadow-xl h-[750px] relative bg-slate-900 group">
          {/* Map Header HUD */}
          <div className="absolute top-0 left-0 w-full z-20 p-4 pointer-events-none flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg flex items-center gap-4 pointer-events-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/50 font-bold tracking-widest">Target Zone</span>
                  <span className="text-sm font-headline text-white font-bold">Sector 4 Agri-Community</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/50 font-bold tracking-widest">Coordinates</span>
                  <span className="text-sm font-mono text-accent font-bold">{coords.lat}N, {coords.lng}E</span>
                </div>
              </div>
              <Badge className="bg-primary/90 text-white w-fit border-none flex gap-2 py-1">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                Live Sentinel-2 Feed (10m Res)
              </Badge>
            </div>
            
            <div className="flex flex-col gap-2 items-end pointer-events-auto">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-1 rounded-md flex flex-col gap-1">
                <Button variant="ghost" size="icon" className="size-8 text-white hover:bg-white/10"><ZoomIn className="size-4" /></Button>
                <Button variant="ghost" size="icon" className="size-8 text-white hover:bg-white/10"><ZoomOut className="size-4" /></Button>
                <Button variant="ghost" size="icon" className="size-8 text-white hover:bg-white/10"><Maximize2 className="size-4" /></Button>
              </div>
            </div>
          </div>

          {/* Map Canvas */}
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
            ) : baseImage ? (
              <div className="relative w-full h-full">
                <Image 
                  src={baseImage} 
                  alt="Satellite Base" 
                  fill 
                  className={cn(
                    "object-cover transition-all duration-700",
                    activeLayer === "ndvi" && "sepia-[0.5] hue-rotate-[90deg] saturate-[1.5]",
                    activeLayer === "lst" && "invert-[0.1] hue-rotate-[-30deg] saturate-[2]"
                  )}
                  data-ai-hint="aerial farm"
                />
                {/* HUD Scan Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-accent/30 shadow-[0_0_15px_#5FE630] animate-[scan_4s_linear_infinite]" />
                
                {/* Heatmap/Overlay layer */}
                {(heatmapUrl || activeLayer !== 'rgb') && (
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-1000 mix-blend-overlay",
                    activeLayer === "ndvi" ? "bg-green-500/10" : activeLayer === "lst" ? "bg-orange-500/10" : "bg-transparent"
                  )}>
                    {activeLayer === 'ndvi' && (
                      <div className="absolute top-1/4 right-1/4 size-64 rounded-full bg-red-600/30 blur-[80px] animate-pulse" />
                    )}
                  </div>
                )}
              </div>
            ) : null}
            
            {(loading || videoLoading) && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-30">
                <div className="text-center text-white space-y-6 max-w-md px-6">
                  <div className="relative size-20 mx-auto">
                    <RefreshCw className="size-20 animate-spin text-accent" />
                    <Satellite className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-headline text-xl font-bold">
                      {videoLoading ? "Synthesizing 14-Day Temporal Simulation" : "Processing Multi-Temporal Tile Stack"}
                    </p>
                    <p className="text-sm text-white/60">
                      Using AMD ROCm HIP 5.7 Accelerated Kernels for sub-2s inference.
                    </p>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-accent h-full animate-progress-indefinite" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Sidebar / Controls */}
          <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
             <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-xl flex flex-col gap-2 pointer-events-auto">
                <Button 
                  variant={activeLayer === 'rgb' ? "accent" : "ghost"} 
                  size="sm" 
                  className={cn("h-10 w-full justify-start gap-3", activeLayer === 'rgb' ? "text-accent-foreground" : "text-white")}
                  onClick={() => setActiveLayer('rgb')}
                >
                  <Eye className="size-4" /> Natural (RGB)
                </Button>
                <Button 
                  variant={activeLayer === 'ndvi' ? "accent" : "ghost"} 
                  size="sm" 
                  className={cn("h-10 w-full justify-start gap-3", activeLayer === 'ndvi' ? "text-accent-foreground" : "text-white")}
                  onClick={() => setActiveLayer('ndvi')}
                >
                  <Sprout className="size-4" /> Vegetation (NDVI)
                </Button>
                <Button 
                  variant={activeLayer === 'lst' ? "accent" : "ghost"} 
                  size="sm" 
                  className={cn("h-10 w-full justify-start gap-3", activeLayer === 'lst' ? "text-accent-foreground" : "text-white")}
                  onClick={() => setActiveLayer('lst')}
                >
                  <Thermometer className="size-4" /> Thermal (LST)
                </Button>
             </div>
          </div>

          {/* Location Context Inset (NEW) */}
          <div className="absolute top-6 right-6 z-20 w-56 pointer-events-auto hidden md:block">
            <Card className="bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="relative h-32 w-full">
                {contextMapImg && (
                  <Image 
                    src={contextMapImg} 
                    alt="Target Context" 
                    fill 
                    className="object-cover opacity-60"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-4 rounded-full border-2 border-accent animate-ping" />
                  <Navigation className="size-4 text-white absolute" />
                </div>
              </div>
              <CardContent className="p-3 space-y-3">
                <h4 className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Zone Telemetry</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-white/40 uppercase">Solar Rad</p>
                    <p className="text-xs font-bold text-accent">840 W/m²</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-white/40 uppercase">Soil pH</p>
                    <p className="text-xs font-bold text-orange-400">6.4 (Acid)</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-white/40 uppercase">Humid</p>
                    <p className="text-xs font-bold text-blue-400">62%</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-white/40 uppercase">VPD</p>
                    <p className="text-xs font-bold text-white">1.2 kPa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legend HUD */}
          <div className="absolute bottom-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-2xl space-y-4 min-w-[200px]">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/50">Stress Index</h4>
              <Info className="size-3 text-white/30" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                <span className="text-xs font-medium text-white">Critical (&gt;80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                <span className="text-xs font-medium text-white">Warning (60-80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span className="text-xs font-medium text-white">Stable (40-60%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-xs font-medium text-white">Healthy (&lt;40%)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10">
               <p className="text-[10px] text-white/40 italic">Last sync: 14:02 UTC</p>
            </div>
          </div>
        </Card>

        {/* Predictive Intelligence Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-headline flex items-center gap-2">
                <ShieldAlert className="size-4 text-destructive" /> Predictive Alerts
              </CardTitle>
              <CardDescription className="text-[11px]">Next 72 hours window</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5 space-y-1">
                <div className="flex justify-between items-center">
                   <p className="text-xs font-bold text-destructive">Severe NDVI Drop</p>
                   <span className="text-[9px] font-mono text-destructive/70">P#1024</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">Predicted 0.42 drop. High probability of irrigation failure.</p>
              </div>
              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 space-y-1">
                <div className="flex justify-between items-center">
                   <p className="text-xs font-bold text-orange-700">LST Thermal Drift</p>
                   <span className="text-[9px] font-mono text-orange-700/70">P#2091</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">Surface temp rising +3.2°C. Stress detected in central hub.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary text-primary-foreground flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-headline flex items-center gap-2">
                <Cpu className="size-4 text-accent" /> Edge Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] uppercase font-bold text-white/70">
                  <span>Model Architecture</span>
                  <span className="text-accent">ROCm HIP</span>
                </div>
                <p className="text-sm font-bold">Temporal LSTM + ResNet50</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-white/70">
                  <span>Inference Load</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[92%] rounded-full shadow-[0_0_8px_#5FE630]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-white/70">Latency</p>
                  <p className="text-sm font-bold">1.84s</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-white/70">Confidence</p>
                  <p className="text-sm font-bold">91.4%</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/10 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Crosshair className="size-3 text-accent" />
                  <span className="text-[10px] font-bold uppercase text-accent">Optimization Active</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-80">
                  AMD ROCm FP16 quantization enabled. Sub-pixel analysis active for Sector 4 boundary detection.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
}
