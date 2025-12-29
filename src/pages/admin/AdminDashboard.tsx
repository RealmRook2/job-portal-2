import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Building2, Calendar, TrendingUp, MapPin } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Jobs", value: "245", icon: Briefcase, trend: "+12%" },
    { label: "Applications", value: "1,234", icon: Users, trend: "+18%" },
    { label: "Companies", value: "89", icon: Building2, trend: "+5%" },
    { label: "Interviews", value: "45", icon: Calendar, trend: "+8%" },
  ];

  const recentApplications = [
    {
      candidate: "Priya Sharma",
      position: "Senior Developer",
      company: "TCS Chennai",
      location: "Anna Nagar",
      date: "Today, 10:30 AM",
      status: "New",
    },
    {
      candidate: "Arun Kumar",
      position: "Product Manager",
      company: "Freshworks",
      location: "OMR",
      date: "Today, 9:15 AM",
      status: "Reviewed",
    },
    {
      candidate: "Lakshmi Devi",
      position: "UI/UX Designer",
      company: "Zoho",
      location: "Velachery",
      date: "Yesterday, 4:20 PM",
      status: "Shortlisted",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-fixed" style={{
        background: 'linear-gradient(135deg, rgba(3, 9, 58, 0.08) 0%, rgba(3, 9, 58, 0.04) 40%, rgba(238, 49, 39, 0.04) 60%, rgba(238, 49, 39, 0.08) 100%), #fafafa'
      }}>
        <AdminSidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-slide-up">
              <h1 className="text-3xl font-bold mb-2 text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Overview of your recruitment operations
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="minimal-card hover:shadow-md transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary">{stat.trend}</span>
                    </div>
                    <p className="text-3xl font-bold mb-1 text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Applications */}
            <Card className="minimal-card">
              <CardHeader>
                <CardTitle className="text-2xl">Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{app.candidate}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {app.position} • {app.company}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {app.location}, Chennai
                          </span>
                          <span>{app.date}</span>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          app.status === "New"
                            ? "bg-primary/10 text-primary"
                            : app.status === "Shortlisted"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chennai Analytics */}
            <div className="grid lg:grid-cols-2 gap-4 mt-6">
              <Card className="minimal-card">
                <CardHeader>
                  <CardTitle>Top Hiring Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { area: "OMR", count: 89, percentage: 35 },
                      { area: "Anna Nagar", count: 65, percentage: 28 },
                      { area: "Velachery", count: 52, percentage: 22 },
                      { area: "Tambaram", count: 38, percentage: 15 },
                    ].map((location, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{location.area}</span>
                          <span className="text-muted-foreground">{location.count} jobs</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary-light"
                            style={{ width: `${location.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "10:00 AM", candidate: "Vijay Raj", position: "Senior Developer" },
                      { time: "2:30 PM", candidate: "Meera Krishnan", position: "Product Manager" },
                      { time: "4:00 PM", candidate: "Karthik Subramanian", position: "UI Designer" },
                    ].map((interview, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-background/50"
                      >
                        <div className="w-16 text-center">
                          <p className="text-sm font-semibold text-primary">{interview.time}</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{interview.candidate}</p>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
