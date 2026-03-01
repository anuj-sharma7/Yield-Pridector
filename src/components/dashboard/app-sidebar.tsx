
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Satellite,
  Zap,
  Sprout,
  Recycle,
  CloudSun,
  Trophy,
  MessageSquare,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "SatPredict Engine",
    url: "/dashboard/sat-predict",
    icon: Satellite,
  },
  {
    title: "CampusGuard AI",
    url: "/dashboard/campus-guard",
    icon: Zap,
  },
  {
    title: "SatFarm Advisor",
    url: "/dashboard/sat-farm",
    icon: Sprout,
  },
  {
    title: "BioLoop Nexus",
    url: "/dashboard/bioloop",
    icon: Recycle,
  },
  {
    title: "ClimateScope",
    url: "/dashboard/climate-scope",
    icon: CloudSun,
  },
  {
    title: "Leaderboard",
    url: "/dashboard/leaderboard",
    icon: Trophy,
  },
  {
    title: "AI Assistant",
    url: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    title: "Edge Runtime",
    url: "/dashboard/edge",
    icon: Cpu,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center gap-2 px-4 py-4">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Satellite className="size-5" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
          <span className="font-headline text-lg font-bold tracking-tight text-primary">VIRIDIAN AI</span>
          <span className="text-xs text-muted-foreground">Predictive Intelligence</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
