
"use client";

import { useState } from "react";
import { generateFarmerVoiceAdvisory } from "@/ai/flows/generate-farmer-voice-advisory";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, Volume2, MapPin, Loader2, PlayCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "@/components/dashboard/stat-card";

const fields = [
  { id: "F1", name: "Sector 7 - Wheat", coords: "20.5937, 78.9629", crop: "Wheat", moisture: "32%", status: "Needs Irrigation" },
  { id: "F2", name: "North Block - Rice", coords: "20.6100, 78.9800", crop: "Rice", moisture: "68%", status: "Healthy" },
  { id: "F3", name: "Hostel G - Organic Garden", coords: "20.5850, 78.9550", crop: "Vegetables", moisture: "45%", status: "Monitor Pests" },
];

export default function SatFarmPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleGenerateAdvisory(field: typeof fields[0]) {
    setLoadingId(field.id);
    setAudioUri(null);
    try {
      const result = await generateFarmerVoiceAdvisory({
        gpsCoordinates: field.coords,
        cropType: field.crop,
        language: "English",
        irrigationRecommendation: field.moisture === "32%" ? "Irrigate with 10mm water tomorrow morning." : "Standard moisture levels maintained.",
        pestAlert: field.id === "F3" ? "Possible Aphid detection in Sector 4. Use neem oil spray." : "No pest threats detected in this tile."
      });

      setAudioUri(result.audioDataUri);
      toast({
        title: "Voice Advisory Generated",
        description: `AI advisory ready for ${field.name}`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not reach the TTS engine. Check your connection.",
        variant: "destructive"
      });
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <Sprout className="size-6" /> SatFarm Advisor
        </h2>
        <p className="text-muted-foreground">Precision agriculture insights powered by multi-temporal satellite data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Arable Area" value="12.4 Ha" icon={MapPin} />
        <StatCard title="Avg. Soil Moisture" value="48.2%" icon={Sprout} trend={{ value: "Stable", isUp: true }} />
        <StatCard title="Active Advisories" value="3 Pending" icon={Volume2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline">Managed Fields</CardTitle>
              <CardDescription>Select a field to generate a personalized AI voice advisory.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((f) => (
                  <div key={f.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border bg-card transition-all hover:border-primary/20">
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                        <Sprout className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{f.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="size-3" /> {f.coords}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Moisture</p>
                        <p className="text-sm font-bold text-primary">{f.moisture}</p>
                      </div>
                      <Badge variant={f.status === 'Healthy' ? 'outline' : 'destructive'} className="text-[10px]">
                        {f.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="gap-2"
                        onClick={() => handleGenerateAdvisory(f)}
                        disabled={loadingId !== null}
                      >
                        {loadingId === f.id ? <Loader2 className="size-4 animate-spin" /> : <Volume2 className="size-4" />}
                        {loadingId === f.id ? "Synthesizing..." : "Voice Advisory"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {audioUri && (
            <Card className="border-2 border-primary/50 bg-primary/5 shadow-lg animate-in fade-in slide-in-from-bottom-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-headline flex items-center gap-2">
                  <PlayCircle className="size-5 text-primary" /> Generated Voice Advisory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <audio controls className="w-full">
                  <source src={audioUri} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                  Synthesized via Gemini 2.5 TTS (Algenib Voice Profile)
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="border-none shadow-sm bg-accent/10">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2 text-accent-foreground">
              <Info className="size-5" /> Agronomic Context
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">NDVI Sensitivity</p>
              <p className="text-sm text-muted-foreground">Currently monitoring chlorophyll absorption in Red-Edge bands. Early detection of nitrogen deficiency active.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Temporal Forecast</p>
              <p className="text-sm text-muted-foreground">Dry spell predicted for next 48 hours. LST analysis shows soil temperature rising by 2.4°C.</p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-border">
              <p className="text-xs font-bold mb-1">Local Resource Match</p>
              <p className="text-[11px] text-muted-foreground">BioLoop Nexus has 200kg of mature compost ready for Sector 7 routing.</p>
              <Button size="sm" className="w-full mt-3 text-xs" variant="outline">Route Fertilizer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
