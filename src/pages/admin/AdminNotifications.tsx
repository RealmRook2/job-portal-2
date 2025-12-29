import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, Calendar, MessageSquare, FileText, X, Users, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const AdminNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      message: "Rajesh Kumar applied for Senior Software Engineer position.",
      time: "2 hours ago",
      read: false,
      icon: Briefcase,
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Scheduled",
      message: "Interview with Priya Sharma for Product Manager role scheduled for tomorrow at 2:00 PM.",
      time: "5 hours ago",
      read: false,
      icon: Calendar,
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "Aravind Kumar sent you a message about candidate Rajesh Kumar.",
      time: "1 day ago",
      read: true,
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "system",
      title: "System Alert",
      message: "5 new candidates were added to the system today.",
      time: "2 days ago",
      read: true,
      icon: Bell,
    },
    {
      id: 5,
      type: "application",
      title: "Application Status Update",
      message: "Meera Nair's application for UI/UX Designer is under review.",
      time: "3 days ago",
      read: true,
      icon: FileText,
    },
    {
      id: 6,
      type: "candidate",
      title: "New Candidate Added",
      message: "A new candidate profile was added by HR Admin Priya Menon.",
      time: "4 days ago",
      read: true,
      icon: Users,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "application":
        return "bg-primary/10 text-primary";
      case "interview":
        return "bg-blue-100 text-blue-700";
      case "message":
        return "bg-green-100 text-green-700";
      case "system":
        return "bg-muted text-muted-foreground";
      case "candidate":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between pb-4 border-b border-border/30"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
            Notifications
          </h1>
          <p className="text-base text-muted-foreground/80">Stay updated with system activities and updates</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
            {unreadCount} unread
          </Badge>
        )}
      </motion.div>

      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className={`border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl ${
                !notification.read ? "border-l-4 border-l-primary" : ""
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      getTypeColor(notification.type)
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">{notification.title}</h3>
                          <p className="text-muted-foreground text-sm">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        <Badge variant="outline" className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
          <CardContent className="pt-12 pb-12 text-center">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! New notifications will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminNotifications;

