import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Users, FileText, Calendar, MessageSquare, ArrowRight, MapPin, TrendingUp, Activity, Target, Clock, CheckCircle2, AlertCircle, Building2 } from "lucide-react";
import { ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadialBarChart, RadialBar } from "recharts";
import { motion } from "framer-motion";

const AdminDashboardNew = () => {

  // Upcoming Tasks
  const upcomingTasks = [
    { task: "Review 12 pending applications", priority: "high", due: "Today", icon: AlertCircle, color: "text-red-600" },
    { task: "Schedule interviews for 5 candidates", priority: "medium", due: "Tomorrow", icon: Clock, color: "text-orange-600" },
    { task: "Follow up with 3 colleges", priority: "low", due: "This week", icon: Building2, color: "text-blue-600" },
  ];

  // Applications trend data
  const applicationsTrend = [
    { month: "Jan", applications: 120, interviews: 45 },
    { month: "Feb", applications: 190, interviews: 68 },
    { month: "Mar", applications: 150, interviews: 55 },
    { month: "Apr", applications: 220, interviews: 82 },
    { month: "May", applications: 280, interviews: 105 },
    { month: "Jun", applications: 240, interviews: 95 },
  ];

  // Job categories distribution - Colorful
  const jobCategories = [
    { name: "Engineering", value: 45, color: "#FF6B6B" }, // Red
    { name: "Product", value: 30, color: "#4ECDC4" }, // Teal
    { name: "Design", value: 20, color: "#FFE66D" }, // Yellow
    { name: "Marketing", value: 15, color: "#FF8C42" }, // Orange
    { name: "Sales", value: 10, color: "#95E1D3" }, // Light Teal
  ];

  // Department performance data
  const departmentData = [
    { name: "Engineering", value: 75, color: "#FF6B6B" },
    { name: "Product", value: 58, color: "#4ECDC4" },
    { name: "Design", value: 45, color: "#FFE66D" },
    { name: "Marketing", value: 32, color: "#FF8C42" },
    { name: "Sales", value: 68, color: "#95E1D3" },
  ];

  // Candidate status distribution
  const candidateStatus = [
    { name: "Active", value: 65, color: "#4ECDC4" },
    { name: "Interviewing", value: 25, color: "#FFE66D" },
    { name: "Hired", value: 8, color: "#95E1D3" },
    { name: "Rejected", value: 2, color: "#FF6B6B" },
  ];

  // Monthly performance bars
  const monthlyPerformance = [
    { month: "Jan", applications: 45, interviews: 30, hires: 12 },
    { month: "Feb", applications: 52, interviews: 38, hires: 15 },
    { month: "Mar", applications: 48, interviews: 35, hires: 14 },
    { month: "Apr", applications: 61, interviews: 42, hires: 18 },
    { month: "May", applications: 55, interviews: 40, hires: 16 },
    { month: "Jun", applications: 68, interviews: 48, hires: 22 },
  ];

  // Triangular pyramid data
  const pyramidData = [
    { name: "Level 1", value: 100, color: "#4ECDC4" }, // Teal - Top
    { name: "Level 2", value: 75, color: "#FF8C42" }, // Orange
    { name: "Level 3", value: 50, color: "#FFE66D" }, // Yellow
    { name: "Level 4", value: 25, color: "#FF6B6B" }, // Red - Bottom
  ];

  // Puzzle piece circular data
  const puzzleData = [
    { name: "Engineering", value: 30, color: "#FF6B6B" }, // Red
    { name: "Product", value: 25, color: "#FF8C42" }, // Orange
    { name: "Design", value: 20, color: "#FFE66D" }, // Yellow
    { name: "Marketing", value: 15, color: "#4ECDC4" }, // Teal
    { name: "Sales", value: 10, color: "#95E1D3" }, // Light Teal
  ];

  // Horizontal bar chart data
  const horizontalBarData = [
    { name: "Engineering", value: 75, color: "#FF8C42" },
    { name: "Product", value: 60, color: "#FFE66D" },
    { name: "Design", value: 50, color: "#4ECDC4" },
    { name: "Marketing", value: 40, color: "#FF6B6B" },
  ];

  // Stats with red and blue alternating colors
  const stats = [
    { 
      label: "Total Jobs", 
      value: "245", 
      icon: Briefcase, 
      iconColor: "#ee3127", // Red
      gradientFrom: "from-[#ee3127]/20",
      gradientTo: "to-[#ee3127]/5",
      shadowColor: "shadow-[#ee3127]/20",
      hoverEffect: "hover:scale-105 hover:rotate-1"
    },
    { 
      label: "Total Applications", 
      value: "1.2k", 
      icon: FileText, 
      iconColor: "#03093a", // Blue
      gradientFrom: "from-[#03093a]/20",
      gradientTo: "to-[#03093a]/5",
      shadowColor: "shadow-[#03093a]/20",
      hoverEffect: "hover:scale-105 hover:-rotate-1"
    },
    { 
      label: "Total Candidates", 
      value: "8.5k", 
      icon: Users, 
      iconColor: "#ee3127", // Red
      gradientFrom: "from-[#ee3127]/20",
      gradientTo: "to-[#ee3127]/5",
      shadowColor: "shadow-[#ee3127]/20",
      hoverEffect: "hover:scale-105 hover:rotate-1"
    },
    { 
      label: "Total Interviews", 
      value: "2.5k", 
      icon: Calendar, 
      iconColor: "#03093a", // Blue
      gradientFrom: "from-[#03093a]/20",
      gradientTo: "to-[#03093a]/5",
      shadowColor: "shadow-[#03093a]/20",
      hoverEffect: "hover:scale-105 hover:-rotate-1"
    },
  ];

  // Activity Log for Super Admin
  const activityLog = [
    { 
      loginName: "admin@acefins.com", 
      activity: "Created new job posting", 
      details: "Senior Software Engineer at TCS Chennai",
      timestamp: "2024-06-15 14:32:15",
      type: "job_created",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10"
    },
    { 
      loginName: "hr.admin@acefins.com", 
      activity: "Scheduled interview", 
      details: "Interview with Rajesh Kumar for Product Manager role",
      timestamp: "2024-06-15 13:45:22",
      type: "interview_scheduled",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-500/10"
    },
    { 
      loginName: "admin@acefins.com", 
      activity: "Updated candidate status", 
      details: "Changed Priya Sharma status to Shortlisted",
      timestamp: "2024-06-15 12:18:45",
      type: "status_updated",
      icon: CheckCircle2,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10"
    },
    { 
      loginName: "hr.admin@acefins.com", 
      activity: "Added new candidate", 
      details: "Meera Nair added to system",
      timestamp: "2024-06-15 11:30:10",
      type: "candidate_added",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10"
    },
    { 
      loginName: "admin@acefins.com", 
      activity: "Deleted job posting", 
      details: "Removed expired job: Junior Developer",
      timestamp: "2024-06-15 10:15:33",
      type: "job_deleted",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-500/10"
    },
    { 
      loginName: "hr.admin@acefins.com", 
      activity: "Sent message to candidate", 
      details: "Message sent to Rajesh Kumar",
      timestamp: "2024-06-15 09:42:18",
      type: "message_sent",
      icon: MessageSquare,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10"
    },
  ];


  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-4 border-b border-border/40"
      >
        <h1 
          className="text-4xl font-bold mb-2 text-foreground tracking-tight"
          style={{ fontFamily: 'system-ui, -apple-system, "SF Pro Display", sans-serif', letterSpacing: '-0.02em' }}
        >
          Admin Dashboard
        </h1>
        <p 
          className="text-sm font-normal text-muted-foreground"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          Welcome back! Here's what's happening at ACE FINS TECH.
        </p>
      </motion.div>

      {/* Today's Summary - Colorful Stats Cards */}
      <div>
        <div className="mb-5">
          <h2 className="text-2xl font-normal text-foreground tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Today's Summary
          </h2>
          <p className="text-sm font-normal text-muted-foreground mt-0.5" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Summary
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`bg-white border-0 shadow-lg ${stat.shadowColor} ${stat.hoverEffect} transition-all duration-300 overflow-hidden relative group cursor-pointer`}>
                  {/* Colored gradient overlay with hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  
                  <CardContent className="p-6 relative z-10">
                    {/* Icon at top with hover animation */}
                    <div className="mb-5 flex justify-start">
                      <div 
                        className={`p-3.5 rounded-xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                        style={{ 
                          backgroundColor: `${stat.iconColor}12`,
                          boxShadow: `0 3px 10px ${stat.iconColor}25`
                        }}
                      >
                        <Icon 
                          className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" 
                          style={{ color: stat.iconColor }}
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                    
                    {/* Large value with hover effect */}
                    <div className="mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      <p 
                        className="text-5xl font-normal text-foreground tracking-tighter group-hover:text-[#03093a] transition-colors duration-300"
                        style={{ fontFamily: 'system-ui, -apple-system, "SF Pro Display", sans-serif', letterSpacing: '-0.02em' }}
                      >
                        {stat.value}
                      </p>
                    </div>
                    
                    {/* Label below value */}
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <p 
                        className="text-sm font-normal text-muted-foreground uppercase tracking-wider"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                  
                  {/* Colored bottom accent with hover expansion */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-1.5 group-hover:h-2 transition-all duration-300`}
                    style={{ backgroundColor: stat.iconColor }}
                  ></div>
                  
                  {/* Hover glow effect */}
                  <div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stat.shadowColor} blur-xl`}
                    style={{ 
                      background: `radial-gradient(circle at center, ${stat.iconColor}20, transparent 70%)`
                    }}
                  ></div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="grid lg:grid-cols-1 gap-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle 
                    className="text-xl font-normal text-foreground tracking-tight"
                    style={{ fontFamily: 'system-ui, -apple-system, "SF Pro Display", sans-serif', letterSpacing: '-0.01em' }}
                  >
                    Upcoming Tasks
                  </CardTitle>
                  <p 
                    className="text-sm font-normal text-muted-foreground mt-1"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    Things that need your attention
                  </p>
                </div>
                <Clock className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => {
                  const Icon = task.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          <Icon className={`w-4 h-4 ${task.color} mt-0.5`} />
                          <p className="text-sm font-normal text-foreground group-hover:text-primary transition-colors">{task.task}</p>
                        </div>
                        <Badge 
                          variant="secondary"
                          className={`text-xs font-normal px-2.5 py-1 rounded-lg border-0 ${
                            task.priority === "high" 
                              ? "bg-red-50 text-red-600" 
                              : task.priority === "medium"
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground ml-7">Due: {task.due}</p>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Colorful Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        {/* Vertical Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-normal text-foreground">Monthly Performance</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Applications and interviews by month</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[280px]">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyPerformance}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "white",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }} 
                  />
                  <Bar dataKey="applications" fill="#FF8C42" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="interviews" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="hires" fill="#FFE66D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Candidate Status Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-normal text-foreground">Candidate Status</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Distribution of candidate status</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[280px]">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={candidateStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {candidateStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "white",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: "10px" }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Triangular & Puzzle Visualizations */}
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {/* Triangular Pyramid Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-normal text-foreground">Performance Pyramid</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Hierarchical performance levels</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[280px] flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-end">
                {pyramidData.map((level, index) => {
                  const width = `${level.value}%`;
                  const height = `${100 / pyramidData.length}%`;
                  return (
                    <div
                      key={index}
                      className="relative mb-1 transition-all duration-300 hover:scale-105"
                      style={{
                        width: width,
                        height: height,
                        minHeight: '40px',
                        backgroundColor: level.color,
                        clipPath: index === 0 
                          ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                          : index === pyramidData.length - 1
                          ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                          : 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
                        boxShadow: `0 4px 12px ${level.color}40`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-normal text-sm">{level.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Puzzle Piece Circular Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-normal text-foreground">Department Puzzle</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Interconnected departments</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[280px] flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg width="192" height="192" viewBox="0 0 192 192" className="w-full h-full">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                  {puzzleData.map((piece, index) => {
                    const total = puzzleData.reduce((sum, p) => sum + p.value, 0);
                    const startAngle = puzzleData.slice(0, index).reduce((sum, p) => sum + (p.value / total) * 360, 0) - 90;
                    const endAngle = startAngle + (piece.value / total) * 360;
                    const largeArc = piece.value / total > 0.5 ? 1 : 0;
                    
                    const startX = 96 + 80 * Math.cos((startAngle * Math.PI) / 180);
                    const startY = 96 + 80 * Math.sin((startAngle * Math.PI) / 180);
                    const endX = 96 + 80 * Math.cos((endAngle * Math.PI) / 180);
                    const endY = 96 + 80 * Math.sin((endAngle * Math.PI) / 180);
                    
                    const path = `
                      M ${96} ${96}
                      L ${startX} ${startY}
                      A 80 80 0 ${largeArc} 1 ${endX} ${endY}
                      L ${96} ${96}
                      Z
                    `;
                    
                    const midAngle = (startAngle + endAngle) / 2;
                    
                    return (
                      <g key={index}>
                        <path
                          d={path}
                          fill={piece.color}
                          stroke="white"
                          strokeWidth="2"
                          className="transition-all duration-300 hover:opacity-80"
                        />
                        <text
                          x={96 + 50 * Math.cos((midAngle * Math.PI) / 180)}
                          y={96 + 50 * Math.sin((midAngle * Math.PI) / 180)}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-normal fill-white"
                        >
                          {piece.value}%
                        </text>
                      </g>
                    );
                  })}
                  {/* Center circle with icon */}
                  <circle cx="96" cy="96" r="40" fill="#03093a" opacity="0.1" />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Users className="w-8 h-8 text-[#03093a]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Horizontal Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-normal text-foreground">Department Metrics</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Performance by department</p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[280px]">
              <div className="space-y-4 h-full flex flex-col justify-center">
                {horizontalBarData.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 2px 8px ${item.color}50`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity Log & Quick Links */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-normal text-foreground">Activity Log</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Recent system activities and user actions</p>
                </div>
                <Activity className="w-5 h-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {activityLog.map((activity, index) => {
                  const Icon = activity.icon;
                  const formatTimestamp = (timestamp: string) => {
                    const date = new Date(timestamp);
                    const now = new Date();
                    const diffMs = now.getTime() - date.getTime();
                    const diffMins = Math.floor(diffMs / 60000);
                    const diffHours = Math.floor(diffMs / 3600000);
                    const diffDays = Math.floor(diffMs / 86400000);

                    if (diffMins < 1) return "Just now";
                    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
                    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                  };

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-lg ${activity.bgColor} transition-transform flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-normal text-sm text-foreground group-hover:text-primary transition-colors">
                              {activity.activity}
                            </p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1.5">
                            {activity.details}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <p className="text-xs font-medium text-muted-foreground">
                              {activity.loginName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="dashboard-card">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div>
                <CardTitle className="text-lg font-normal text-foreground">Quick Links</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Navigate to key sections</p>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Briefcase, label: "Jobs", path: "/admin/jobs", count: 245 },
                  { icon: Users, label: "Candidates", path: "/admin/candidates", count: 8456 },
                  { icon: Calendar, label: "Interviews", path: "/admin/interviews", count: 23 },
                  { icon: MessageSquare, label: "Chats", path: "/admin/chats", count: 8 },
                ].map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.path} to={link.path}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card className="dashboard-card group">
                          <CardContent className="p-5 flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300 relative shadow-md group-hover:shadow-lg group-hover:scale-105">
                              <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                              {link.count !== undefined && (
                                <Badge 
                                  variant="default"
                                  className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] font-normal bg-[#ee3127] text-white border-2 border-white shadow-md z-10"
                                >
                                  {link.count > 99 ? "99+" : link.count}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-normal text-xs text-foreground">{link.label}</span>
                              {link.count !== undefined && (
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  {link.count > 99 ? "99+" : link.count.toLocaleString()} items
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardNew;
