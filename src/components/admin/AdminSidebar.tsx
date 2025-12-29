import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const AdminSidebar = () => {
  const { open } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Jobs", url: "/admin/jobs", icon: Briefcase },
    { title: "Candidates", url: "/admin/candidates", icon: Users },
    { title: "Interviews", url: "/admin/interviews", icon: Calendar },
    { title: "Messages", url: "/admin/messages", icon: MessageSquare },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={`${!open ? "w-20" : "w-64"} border-r transition-all duration-300`}>
      {/* Header */}
      <div className="h-16 border-b flex items-center px-6 justify-between">
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Admin</span>
          </div>
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 right-0 px-3">
          <Link to="/">
            <SidebarMenuButton className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {open && <span>Logout</span>}
            </SidebarMenuButton>
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
