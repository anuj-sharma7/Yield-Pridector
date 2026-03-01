
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Medal, Star, TrendingUp, TrendingDown, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const rankings = [
  { id: 1, name: "Hostel A (Alpha)", score: 982, energySave: "14%", waterSave: "8%", badge: "Platinum" },
  { id: 2, name: "Engineering Block L3", score: 945, energySave: "12%", waterSave: "15%", badge: "Gold" },
  { id: 3, name: "Hostel B (Beta)", score: 910, energySave: "18%", waterSave: "-2%", badge: "Gold" },
  { id: 4, name: "Canteen Area", score: 885, energySave: "5%", waterSave: "22%", badge: "Silver" },
  { id: 5, name: "Hostel C (Gamma)", score: 820, energySave: "2%", waterSave: "4%", badge: "Silver" },
];

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
          <Trophy className="size-6" /> Green Leaderboard
        </h2>
        <p className="text-muted-foreground">Gamified sustainability tracking across campus departments and residential blocks.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="font-headline">Department Standings</CardTitle>
            <CardDescription>Based on real-time resource saving vs predicted baseline.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {rankings.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 font-headline font-bold text-lg text-muted-foreground">
                      {r.id === 1 ? <Medal className="text-yellow-500" /> : r.id === 2 ? <Medal className="text-gray-400" /> : r.id === 3 ? <Medal className="text-amber-600" /> : r.id}
                    </div>
                    <Avatar className="size-10 border">
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                        {r.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm">{r.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {r.badge}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Score: {r.score}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-8 text-right pr-4">
                    <div className="hidden sm:block">
                      <p className="text-[10px] uppercase text-muted-foreground font-bold">Energy</p>
                      <p className={`text-xs font-bold flex items-center justify-end gap-1 ${r.energySave.startsWith('-') ? 'text-destructive' : 'text-primary'}`}>
                        {r.energySave} {r.energySave.startsWith('-') ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground font-bold">Water</p>
                      <p className={`text-xs font-bold flex items-center justify-end gap-1 ${r.waterSave.startsWith('-') ? 'text-destructive' : 'text-primary'}`}>
                        {r.waterSave} {r.waterSave.startsWith('-') ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-sm bg-accent text-accent-foreground">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Star className="size-5" /> Champion of the Week
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center py-6">
              <div className="size-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <Award className="size-10" />
              </div>
              <h4 className="text-xl font-bold">Hostel A</h4>
              <p className="text-sm opacity-90 mt-1">Saved ₹12,400 in energy bills this week through automated "Eco-Sleep" mandates.</p>
              <div className="mt-6 flex gap-4 w-full">
                <div className="flex-1 p-2 rounded-lg bg-white/10">
                  <p className="text-[10px] uppercase font-bold">Streak</p>
                  <p className="text-lg font-bold">3 Weeks</p>
                </div>
                <div className="flex-1 p-2 rounded-lg bg-white/10">
                  <p className="text-[10px] uppercase font-bold">Points</p>
                  <p className="text-lg font-bold">+240</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-headline">Upcoming Challenges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border bg-secondary/20">
                <p className="text-xs font-bold">Shower Siphon-Down</p>
                <p className="text-[10px] text-muted-foreground">Reduce water spike probability in hostels by 10%.</p>
                <div className="mt-2 text-[10px] font-bold text-primary">Reward: 100 GHG Credits</div>
              </div>
              <div className="p-3 rounded-lg border bg-secondary/20 opacity-50">
                <p className="text-xs font-bold">Zero-Waste Convocation</p>
                <p className="text-[10px] text-muted-foreground">Starts in 12 days. Prepare resource routing.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
