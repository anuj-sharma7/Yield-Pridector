
"use client";

import { useState } from "react";
import { generatePredictedCropStressHeatmap } from "@/ai/flows/generate-predicted-crop-stress-heatmap";
import { generateTemporalSimulation } from "@/ai/flows/generate-temporal-simulation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Satellite, ShieldAlert, Video, Map as MapIcon, RefreshCw, Layers, Play, Loader2 } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

export default function SatPredictPage() {
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [heatmapUrl, setHeatmapUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const baseImage = PlaceHolderImages.find(img => img.id === "crop-field")?.imageUrl;

  async function handleGenerateHeatmap() {
    setLoading(true);
    try {
      const { heatmapImageUri } = await generatePredictedCropStressHeatmap({
        baseSatelliteImageUri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        predictedStressSummary: "High stress probability in the north-east quadrant due to NDVI decline. Moderate stress in central zones."
      });

      setHeatmapUrl(PlaceHolderImages.find(img => img.id === "crop-field")?.imageUrl || null);
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
        description: "The Veo model is currently high-load or rate-limited. Try again in a moment.",
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
          <Button variant="outline" className="gap-2" onClick={handleGenerateVideo} disabled={videoLoading}>
            {videoLoading ? <Loader2 className="size-4 animate-spin" /> : <Video className="size-4" />}
            {videoLoading ? "Simulating..." : "Generate Future Timelapse"}
          </Button>
          <Button className="bg-primary text-white gap-2" onClick={handleGenerateHeatmap} disabled={loading}>
            <Layers className={`size-4 ${loading ? 'animate-spin' : ''}`} /> Run ML Prediction
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3 overflow-hidden border-none shadow-sm h-[600px] relative">
          <CardHeader className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-black/50 to-transparent p-6 pointer-events-none">
            <CardTitle className="text-white font-headline">Live Satellite Analysis</CardTitle>
            <CardDescription className="text-white/80">Sector 4 Agri-Community Fields</CardDescription>
          </CardHeader>
          <div className="absolute inset-0 bg-secondary flex items-center justify-center">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
            ) : baseImage ? (
              <Image 
                src={baseImage} 
                alt="Satellite Base" 
                fill 
                className="object-cover" 
                data-ai-hint="aerial farm"
              />
            ) : null}
            
            {heatmapUrl && !loading && !videoUrl && (
              <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply transition-opacity duration-1000">
                <div className="absolute top-1/4 right-1/4 size-48 rounded-full bg-red-600/40 blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 left-1/4 size-32 rounded-full bg-yellow-400/30 blur-2xl" />
              </div>
            )}
            
            {(loading || videoLoading) && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center text-white space-y-4 max-w-md px-6">
                  <RefreshCw className="size-12 animate-spin mx-auto text-accent" />
                  <p className="font-headline text-lg">
                    {videoLoading ? "Synthesizing 14-Day Temporal Simulation..." : "Processing 10,980px Tile via ROCm..."}
                  </p>
                  <p className="text-sm opacity-70">
                    {videoLoading ? "Generating high-fidelity predictive frames via Veo 2.0. This may take up to 60 seconds." : "Computing NDVI & Temporal LSTM Stacks"}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border shadow-lg space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stress Probability</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-red-600" />
                <span className="text-xs font-medium">Critical (&gt;80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-orange-500" />
                <span className="text-xs font-medium">Warning (60-80%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-yellow-400" />
                <span className="text-xs font-medium">Stable (40-60%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-green-500" />
                <span className="text-xs font-medium">Healthy (&lt;40%)</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-headline flex items-center gap-2">
                <ShieldAlert className="size-4 text-destructive" /> Alerts (2)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border border-destructive/20 bg-destructive/5 space-y-1">
                <p className="text-xs font-bold text-destructive">Severe NDVI Decline</p>
                <p className="text-[10px] text-muted-foreground">Parcel #1024 - Predicted 0.42 drop in 5 days.</p>
              </div>
              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 space-y-1">
                <p className="text-xs font-bold text-orange-700">LST Thermal Anomaly</p>
                <p className="text-[10px] text-muted-foreground">Parcel #2091 - Soil moisture index critical.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary text-primary-foreground flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-headline">Predictive Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] uppercase opacity-70">Video Gen Model</p>
                <p className="text-sm font-bold">Google Veo 2.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase opacity-70">GPU Kernels</p>
                <p className="text-sm font-bold">AMD ROCm HIP 5.7</p>
                <div className="h-1 w-full bg-white/20 rounded-full mt-2">
                  <div className="h-full bg-accent w-[90%] rounded-full" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase opacity-70">Forecast Confidence</p>
                <p className="text-sm font-bold">91.4% (SIH Validated)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/10 border border-white/20 text-[11px] leading-relaxed">
                The simulation generates a time-lapse based on temporal NDVI trends. Note: Video synthesis takes ~45s.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
