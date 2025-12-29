import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Calendar, FileText, ArrowRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const HRDashboard = () => {
  // Stats for HR Dashboard - Minimalistic
  const stats = [
    { 
      label: "My Assigned Jobs", 
      value: "12", 
      icon: Briefcase, 
      change: "+3 this week", 
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      link: "/admin/jobs"
    },
    { 
      label: "My Candidates", 
      value: "156", 
      icon: Users, 
      change: "+8 today", 
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      link: "/admin/candidates"
    },
    { 
      label: "My Interviews", 
      value: "8", 
      icon: Calendar, 
      change: "3 today", 
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      link: "/admin/interviews"
    },
    { 
      label: "Pending Reviews", 
      value: "24", 
      icon: FileText, 
      change: "5 urgent", 
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      link: "/admin/applications"
    },
  ];

  // Upcoming Interviews
  const upcomingInterviews = [
    { 
      candidate: "Rajesh Kumar", 
      job: "Senior Software Engineer", 
      time: "Today, 2:00 PM", 
      status: "Scheduled",
      priority: "high"
    },
    { 
      candidate: "Priya Sharma", 
      job: "Product Manager", 
      time: "Today, 4:30 PM", 
      status: "Scheduled",
      priority: "high"
    },
    { 
      candidate: "Aravind Menon", 
      job: "Full Stack Developer", 
      time: "Tomorrow, 10:00 AM", 
      status: "Scheduled",
      priority: "medium"
    },
    { 
      candidate: "Meera Nair", 
      job: "Data Analyst", 
      time: "Tomorrow, 3:00 PM", 
      status: "Scheduled",
      priority: "medium"
    },
  ];

  // Recent Activity
  const recentActivity = [
    { action: "Reviewed application", candidate: "Rajesh Kumar", job: "Senior Software Engineer", time: "2 hours ago", status: "shortlisted" },
    { action: "Scheduled interview", candidate: "Priya Sharma", job: "Product Manager", time: "4 hours ago", status: "scheduled" },
    { action: "Added candidate", candidate: "Aravind Menon", job: "Full Stack Developer", time: "1 day ago", status: "new" },
    { action: "Updated job posting", candidate: "Senior Software Engineer", job: "Job updated", time: "2 days ago", status: "updated" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-4 border-b border-border/40"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground tracking-tight">
            HR Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here's your overview</p>
        </div>
      </motion.div>

      {/* Minimalistic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link to={stat.link}>
                <Card className="dashboard-card cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-105`}>
                        <Icon className={`w-6 h-6 ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`} strokeWidth={2.5} />
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border-0">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold mb-1 text-foreground tracking-tight">{stat.value}</p>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-primary font-semibold group-hover:gap-2 transition-all">
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Interviews */}
        <Card className="dashboard-card">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Interviews
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/interviews" className="text-xs">
                  View All
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-3">
              {upcomingInterviews.map((interview, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1 text-foreground">{interview.candidate}</p>
                      <p className="text-xs text-muted-foreground">{interview.job}</p>
                    </div>
                    <Badge 
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg border-0",
                        interview.priority === "high" 
                          ? "bg-red-50 text-red-600" 
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {interview.priority === "high" ? "Urgent" : "Normal"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {interview.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="dashboard-card">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.status === "shortlisted" ? "bg-primary/10" :
                    activity.status === "scheduled" ? "bg-primary/10" :
                    activity.status === "new" ? "bg-primary/10" :
                    "bg-primary/10"
                  }`}>
                    {activity.status === "shortlisted" ? (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    ) : activity.status === "scheduled" ? (
                      <Calendar className="w-4 h-4 text-primary" />
                    ) : (
                      <FileText className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1 text-foreground">
                      {activity.action} - <span className="font-semibold">{activity.candidate}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">{activity.job}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;

