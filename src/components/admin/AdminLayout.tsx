import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Logo from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  UserCog,
  GraduationCap,
  LogOut,
  Menu,
  X,
  User,
  Building2,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  DollarSign,
  Star,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop collapse
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleEnabled, setToggleEnabled] = useState(true);

  // Mock user data - replace with actual user data from context/auth
  const userName = "Krish";
  const userInitials = "KC";

  const handleLogout = () => {
    // Add logout logic here
    navigate("/");
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Mock counts for menu items
  const menuItemCounts: Record<string, number> = {
    "/admin/jobs": 245,
    "/admin/candidates": 8456,
    "/admin/applications": 42, // Pending applications
    "/admin/interviews": 23, // Upcoming interviews
    "/admin/colleges": 156,
    "/admin/employee-data": 156,
    "/admin/chats": 8, // Unread messages
    "/admin/notifications": 12, // Unread notifications
    "/admin/hr-admins": 24,
  };

  // Sidebar menu items
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Briefcase, label: "Jobs", path: "/admin/jobs" },
    { icon: Users, label: "Candidates", path: "/admin/candidates" },
    { icon: FileText, label: "Applied Jobs", path: "/admin/applications" },
    { icon: Calendar, label: "Interviews", path: "/admin/interviews" },
    { icon: GraduationCap, label: "Colleges", path: "/admin/colleges" },
    { icon: Building2, label: "Employee Data", path: "/admin/employee-data" },
    { icon: MessageSquare, label: "Chats", path: "/admin/chats" },
    { icon: Bell, label: "Notifications", path: "/admin/notifications" },
    { icon: UserCog, label: "HR Admins", path: "/admin/hr-admins" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-fixed" style={{
      background: `
        radial-gradient(circle at 20% 50%, rgba(3, 9, 58, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(238, 49, 39, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(3, 9, 58, 0.025) 0%, transparent 40%),
        linear-gradient(135deg, rgba(3, 9, 58, 0.02) 0%, rgba(3, 9, 58, 0.01) 30%, rgba(238, 49, 39, 0.01) 70%, rgba(238, 49, 39, 0.02) 100%),
        #fafafa
      `
    }}>
      {/* Top Navbar - White Theme Design */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Logo variant="compact" showText={false} />
          </div>

          {/* Center: Greeting */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-primary leading-tight">
                HI {userName}, {getGreeting()}!
              </p>
              <p className="text-xs text-muted-foreground leading-tight">
                Let's Learn something new today
              </p>
            </div>
          </div>

          {/* Right: Notifications and Profile */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notifications Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-lg hover:bg-gray-100 relative"
              onClick={() => navigate("/admin/notifications")}
            >
              <Bell className="w-5 h-5 text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ee3127] rounded-full"></span>
            </Button>

            {/* User Profile with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 px-2 rounded-lg hover:bg-gray-100 gap-2"
                >
                  <span className="text-sm font-medium text-primary hidden sm:block">{userName} C.</span>
                  <ChevronDown className="w-4 h-4 text-primary hidden sm:block" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-[#ee3127]/20 border-2 border-primary/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{userInitials}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-lg border border-gray-100 shadow-lg">
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate("/admin/settings")}
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
            "fixed top-[3.75rem] left-4 h-[calc(100vh-4.5rem)] bg-white border border-gray-100 z-40 transition-all duration-300 rounded-xl shadow-2xl flex flex-col overflow-hidden",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            sidebarCollapsed ? "w-[80px]" : "w-72"
          )}
          style={sidebarCollapsed ? { 
            width: '80px', 
            padding: 0, 
            margin: 0
          } : undefined}
        >
          {/* Collapse/Expand Button */}
          <div className="p-2 border-b border-gray-100 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg hover:bg-gray-50 transition-all duration-200"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
              {sidebarCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
              </Button>
            </div>

          <div className={cn("transition-all duration-300 flex-1 overflow-hidden flex flex-col", sidebarCollapsed ? "h-[calc(100%-3.5rem)]" : "h-[calc(100%-3.5rem)]")}>
            <nav className={cn(
              "transition-all duration-300 flex-1 overflow-hidden",
              sidebarCollapsed ? "p-1.5 space-y-1" : "p-2 space-y-1"
            )}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasCount = menuItemCounts[item.path] !== undefined;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center rounded-lg transition-all duration-200 group relative",
                      sidebarCollapsed ? "justify-center py-2 w-full mx-auto" : "gap-2 px-3 py-2",
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground/70 hover:bg-secondary hover:text-foreground font-medium"
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={cn(
                        "p-1.5 rounded-lg transition-all duration-200",
                        isActive(item.path) 
                          ? "bg-primary-foreground/10" 
                          : "bg-transparent group-hover:bg-primary/5"
                      )}>
                        <Icon className={cn(
                          "w-4 h-4 transition-all duration-200",
                          isActive(item.path) ? "text-primary-foreground" : "text-foreground/70 group-hover:text-foreground"
                        )} strokeWidth={2} />
                      </div>
                      {hasCount && (
                        <Badge 
                          variant={isActive(item.path) ? "secondary" : "default"}
                          className={cn(
                            "absolute flex items-center justify-center rounded-full text-[9px] font-bold",
                            sidebarCollapsed 
                              ? "top-0 right-0 min-w-[12px] h-3 px-0.5 -translate-y-1/2 translate-x-1/2" 
                              : "-top-1 -right-1 min-w-[16px] h-4 px-0.5",
                            isActive(item.path) 
                              ? "bg-white/90 text-[#ee3127] border-white/50 shadow-sm" 
                              : "bg-[#ee3127] text-white"
                          )}
                        >
                          {menuItemCounts[item.path] > 99 ? "99+" : menuItemCounts[item.path]}
                        </Badge>
                      )}
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <span className={cn(
                          "text-xs tracking-tight flex-1 transition-colors",
                          isActive(item.path) ? "text-primary-foreground font-semibold" : "text-foreground/70 group-hover:text-foreground"
                        )}>
                          {item.label}
                        </span>
                        {!hasCount && isActive(item.path) && (
                          <div className="absolute right-3 w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
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
            "flex-1 transition-all duration-300 overflow-x-hidden",
            sidebarCollapsed ? "p-6 lg:px-4 lg:py-8" : "p-6 lg:p-8"
          )}
          style={sidebarCollapsed ? { marginLeft: 'calc(80px + 1rem)' } : { marginLeft: 'calc(288px + 1rem)' }}
        >
          <div className={cn(
            "mx-auto w-full",
            sidebarCollapsed ? "max-w-full" : "max-w-[1400px]"
          )}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

