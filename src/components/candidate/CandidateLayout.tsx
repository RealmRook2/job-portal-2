import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  User,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const CandidateLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  // Top navigation items matching the image
  const topNavItems = [
    { label: "Dashboard", path: "/candidate/dashboard" },
    { label: "Jobs", path: "/jobs" },
    { label: "Applications", path: "/candidate/applications" },
    { label: "Interviews", path: "/candidate/interviews" },
    { label: "Profile", path: "/candidate/profile" },
  ];

  // Sidebar menu items
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/candidate/dashboard" },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: FileText, label: "Applications", path: "/candidate/applications" },
    { icon: Calendar, label: "Interviews", path: "/candidate/interviews" },
    { icon: MessageSquare, label: "Messages", path: "/candidate/chat" },
    { icon: Bell, label: "Notifications", path: "/candidate/notifications" },
    { icon: User, label: "Profile", path: "/candidate/profile" },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar - Matching Image Design */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Company Logo */}
          <div className="flex items-center gap-3">
            <Logo variant="compact" showText={false} />
          </div>

          {/* Center: Navigation Tabs */}
          <div className="flex-1 flex items-center justify-center gap-1">
            {topNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(item.path)
                    ? "bg-foreground text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Icons (Settings, Notifications, User) */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-lg hover:bg-gray-50"
              onClick={() => navigate("/candidate/profile")}
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-lg hover:bg-gray-50 relative"
              onClick={() => navigate("/candidate/notifications")}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 rounded-lg hover:bg-gray-50"
                >
                  <User className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-lg border border-gray-100 shadow-lg">
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate("/candidate/profile")}
                  className="rounded-lg cursor-pointer"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="rounded-lg cursor-pointer text-destructive hover:text-destructive focus:text-destructive bg-transparent hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2 text-destructive" />
                  <span className="text-destructive">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Left Floating Sidebar - Matching Image */}
        <aside
          className={cn(
            "fixed top-20 left-4 h-[calc(100vh-5rem)] bg-white border border-gray-100 z-40 transition-all duration-300 rounded-xl shadow-lg",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            sidebarCollapsed ? "w-[80px]" : "w-72"
          )}
          style={sidebarCollapsed ? { 
            width: '80px', 
            padding: 0, 
            margin: 0
          } : undefined}
        >
          {/* User Profile Card Section - Matching Image */}
          {!sidebarCollapsed && (
            <div className="p-4 border-b border-gray-100">
              <div className="relative bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-foreground text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                      $1,200
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-foreground">Rajesh Kumar</h3>
                    <p className="text-xs text-muted-foreground">Software Developer</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs justify-start hover:bg-gray-50"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <ChevronLeft className="w-3 h-3 mr-2" />
                  Collapse
                </Button>
              </div>
            </div>
          )}
          
          {sidebarCollapsed && (
            <div className="p-3 border-b border-gray-100 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg hover:bg-gray-50 transition-all duration-200"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          <ScrollArea className={cn("transition-all duration-300", sidebarCollapsed ? "h-[calc(100%-6rem)]" : "h-[calc(100%-6rem)]")}>
            <nav className={cn(
              "transition-all duration-300",
              sidebarCollapsed ? "p-2 space-y-1.5" : "p-4 space-y-2"
            )}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg transition-all duration-200 group relative",
                      sidebarCollapsed ? "justify-center py-3 w-full mx-auto" : "gap-3 px-4 py-3",
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground/70 hover:bg-gray-50 hover:text-foreground font-medium"
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <div className="relative flex-shrink-0">
                      <Icon className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isActive(item.path) ? "text-primary-foreground" : "text-foreground/70 group-hover:text-foreground"
                      )} />
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <span className={cn(
                          "text-sm tracking-tight flex-1 transition-colors",
                          isActive(item.path) ? "text-primary-foreground font-semibold" : "text-foreground/70 group-hover:text-foreground"
                        )}>
                          {item.label}
                        </span>
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarCollapsed ? "p-6 lg:px-4 lg:py-8" : "p-6 lg:p-8"
          )}
          style={sidebarCollapsed ? { marginLeft: 'calc(80px + 1rem)' } : { marginLeft: 'calc(288px + 1rem)' }}
        >
          <div className={cn(
            "mx-auto",
            sidebarCollapsed ? "max-w-full" : "max-w-[1400px]"
          )}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;

