import { useEffect } from "react";
import { Scan, LayoutDashboard, User, TrendingUp, MessageSquare, Landmark, Briefcase } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import { isFounderUser } from "@/lib/access";

const baseItems = [
  { title: "Dashboard", url: "/beta-dashboard", icon: LayoutDashboard },
  { title: "BodyScan", url: "/beta-dashboard/bodyscan", icon: Scan },
  { title: "Chat to Lema", url: "/beta-dashboard/chat", icon: MessageSquare },
  { title: "Stats", url: "/beta-dashboard/stats", icon: TrendingUp },
  { title: "Profile", url: "/beta-dashboard/profile", icon: User },
];

const founderItems = [
  { title: "Founder Dashboard", url: "/beta-dashboard/founder", icon: Landmark },
  { title: "Investor Dashboard", url: "/beta-dashboard/investor", icon: Briefcase },
];

export function AppSidebar() {
  const {
    state,
    isMobile,
    setOpenMobile
  } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const founderAccess =
    isFounderUser();
  const items =
    founderAccess
      ? [...baseItems, ...founderItems]
      : baseItems;

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, location.pathname, setOpenMobile]);

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <div className="p-4 pb-20">
        <Logo />
      </div>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Navigation</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  item.url === "/beta-dashboard"
                    ? location.pathname === item.url
                    : location.pathname.startsWith(item.url);

                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={
                      isActive
                        ? "!text-white hover:!text-green-600"
                        : "!text-white hover:!text-green-600"
                    }
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/beta-dashboard"}
                      className="font-medium"
                      onClick={handleNavClick}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
