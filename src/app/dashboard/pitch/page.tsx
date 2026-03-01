"use client";

import { useState } from "react";
import { generatePitchScript, GeneratePitchScriptOutput } from "@/ai/flows/generate-pitch-script";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Clapperboard, Sparkles, Loader2, Video, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function PitchPage() {
  const [loading, setLoading] = useState(false);
  const [scriptData, setScriptData] = useState<GeneratePitchScriptOutput | null>(null);
  const [audience, setAudience] = useState("campus-admins");
  const [duration, setDuration] = useState("3min");
  const [tone, setTone] = useState("inspiring");
  const { toast } = useToast();

  async function handleGenerateScript() {
    setLoading(true);
    try {
      const result = await generatePitchScript({
        targetAudience: audience as any,
        videoDuration: duration as any,
        tone: tone as any,
      });
      setScriptData(result);
      toast({
        title: "Pitch Script Ready",
        description: "Your professional demo script has been generated.",
      });
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to connect to the Script Engine.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <Clapperboard className="size-6" /> AI Pitch Studio
        </h2>
        <p className="text-muted-foreground">Generate high-converting demo scripts for your sustainability pitch.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1 border-none shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-headline">Script Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investors">Investors / VCs</SelectItem>
                  <SelectItem value="campus-admins">Campus Administrators</SelectItem>
                  <SelectItem value="farmers">Agricultural Cooperatives</SelectItem>
                  <SelectItem value="general">General Public / ESG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Video Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60s">60-Second Teaser</SelectItem>
                  <SelectItem value="3min">3-Minute Standard Demo</SelectItem>
                  <SelectItem value="5min">5-Minute Deep Dive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inspiring">Inspiring & Bold</SelectItem>
                  <SelectItem value="professional">Professional / Corporate</SelectItem>
                  <SelectItem value="technical">Technical / Scientific</SelectItem>
                  <SelectItem value="urgent">Urgent / Crisis-Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateScript} disabled={loading} className="w-full gap-2 bg-primary">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Generate Script
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm min-h-[600px]">
          <CardHeader className="border-b bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-headline">Demo Script & Recording Guide</CardTitle>
                <CardDescription>Synthesized narrative covering all 6 core modules.</CardDescription>
              </div>
              {scriptData && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="size-4" /> Export PDF
                  </Button>
                  <Button size="sm" className="gap-2 bg-accent text-accent-foreground">
                    <Video className="size-4" /> Start Recording
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {scriptData ? (
              <div className="divide-y">
                {scriptData.script.map((scene, idx) => (
                  <div key={idx} className="p-6 grid md:grid-cols-12 gap-6 hover:bg-secondary/5 transition-colors">
                    <div className="md:col-span-1">
                      <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="md:col-span-5 space-y-2">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-1">
                        <Video className="size-3" /> Visual Direction
                      </p>
                      <p className="text-sm italic text-foreground/80 leading-relaxed bg-accent/5 p-3 rounded-lg border border-accent/10">
                        {scene.scene}
                      </p>
                      <Badge variant="secondary" className="text-[10px]">
                        Feature: {scene.featureHighlight}
                      </Badge>
                    </div>
                    <div className="md:col-span-6 space-y-2">
                      <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Audio / Voiceover</p>
                      <p className="text-sm font-medium leading-relaxed">
                        {scene.audio}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="p-8 bg-primary/10 border-t border-primary/20">
                  <h4 className="font-headline font-bold text-primary flex items-center gap-2 mb-2">
                    <CheckCircle2 className="size-5" /> Final Call to Action
                  </h4>
                  <p className="text-lg font-bold text-primary leading-tight">
                    "{scriptData.closingCallToAction}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-20 opacity-40">
                <Clapperboard className="size-20 mb-6 text-muted-foreground" />
                <h3 className="text-xl font-headline font-bold">Ready for your demo?</h3>
                <p className="max-w-md mx-auto mt-2">
                  Configure your audience and tone on the left, then generate a scene-by-scene recording script to showcase VIRIDIAN AI's capabilities.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
