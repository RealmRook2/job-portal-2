import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, Calendar, MessageSquare, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "application",
      title: "Application Status Update",
      message: "Your application for Senior Software Engineer at TCS Chennai has been shortlisted.",
      time: "2 hours ago",
      read: false,
      icon: CheckCircle2,
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Reminder",
      message: "Your interview for Product Manager at Freshworks is scheduled for tomorrow at 2:00 PM.",
      time: "5 hours ago",
      read: false,
      icon: Calendar,
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "Aravind Kumar sent you a message about your application.",
      time: "1 day ago",
      read: true,
      icon: MessageSquare,
    },
    {
      id: 4,
      type: "system",
      title: "System Alert",
      message: "Your profile has been viewed by 5 recruiters this week.",
      time: "2 days ago",
      read: true,
      icon: Bell,
    },
    {
      id: 5,
      type: "application",
      title: "Application Status Update",
      message: "Your application for UI/UX Designer at Zoho Corporation is under review.",
      time: "3 days ago",
      read: true,
      icon: FileText,
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
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">Notifications</h1>
                <p className="text-xl text-muted-foreground">Stay updated with your job applications</p>
              </div>
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
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
                  <Card className={`apple-card border-0 ${!notification.read ? "border-l-4 border-l-primary" : ""}`}>
                    <CardContent className="pt-6">
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
            <Card className="apple-card border-0">
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
      </div>
    </div>
  );
};

export default Notifications;

