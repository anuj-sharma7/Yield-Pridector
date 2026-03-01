
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Satellite, ShieldCheck, Cpu, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#EFF6F3] overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[100px]" />
      </div>

      <nav className="relative z-10 container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Satellite className="size-8 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">VIRIDIAN AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#impact" className="text-sm font-medium hover:text-primary transition-colors">Impact</Link>
          <Link href="#amd" className="text-sm font-medium hover:text-primary transition-colors">AMD Edge</Link>
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link href="/dashboard">Launch Platform</Link>
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-bold text-accent-foreground mb-8">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            SATELLITE-POWERED PREDICTIVE INTELLIGENCE
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-6">
            Forecast Sustainability <span className="text-accent italic">7–14 Days Ahead</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            The world's first predictive engine for crop stress, campus energy spikes, and water scarcity. 
            Automating resource routing to prevent crises before they happen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="h-14 px-8 bg-primary text-white text-lg font-semibold w-full sm:w-auto">
              <Link href="/dashboard">Access Dashboard</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold w-full sm:w-auto border-primary text-primary hover:bg-primary/5">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="container mx-auto px-4 mt-32 grid gap-8 md:grid-cols-3">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <ShieldCheck className="size-6 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">SIH Validated Science</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nationally validated satellite ML pipeline directly extending our Smart India Hackathon award-winning research.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="size-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
              <Cpu className="size-6 text-accent-foreground" />
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">AMD ROCm Accelerated</h3>
            <p className="text-muted-foreground leading-relaxed">
              10x faster satellite tile processing using AMD GPU edge nodes. Inference in under 2 seconds.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
            <div className="size-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <Globe className="size-6 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">Zero Satellite Cost</h3>
            <p className="text-muted-foreground leading-relaxed">
              Powered by free public data from ESA, NASA, and ISRO. Scalable to thousands of campuses at near-zero marginal cost.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t py-12 bg-white/50 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Satellite className="size-6 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">VIRIDIAN AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 VIRIDIAN AI Intelligence Platform. Sustainable AI Track.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
