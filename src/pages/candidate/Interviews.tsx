import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Video, CalendarPlus, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Interviews = () => {
  const upcomingInterviews = [
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "TCS Chennai",
      type: "Technical Interview",
      date: "2025-01-25",
      time: "10:00 AM - 11:00 AM",
      mode: "In-office",
      location: "TCS Campus, Anna Nagar, Chennai, Tamil Nadu",
      interviewer: "Rajesh Iyer",
      status: "Scheduled",
      reminder: true,
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      company: "Freshworks",
      type: "HR Round",
      date: "2025-01-28",
      time: "2:00 PM - 3:00 PM",
      mode: "In-office",
      location: "Freshworks Office, OMR, Chennai, Tamil Nadu",
      interviewer: "Priya Menon",
      status: "Scheduled",
      reminder: false,
    },
  ];

  const pastInterviews = [
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "Zoho Corporation",
      type: "Design Review",
      date: "2025-01-20",
      time: "11:00 AM - 12:00 PM",
      mode: "In-office",
      location: "Zoho Office, Velachery, Chennai",
      interviewer: "Meera Nair",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">My Interviews</h1>
            <p className="text-xl text-muted-foreground">Manage your upcoming and past interviews</p>
          </motion.div>

          {/* Upcoming Interviews */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Upcoming Interviews</h2>
            <div className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="apple-card border-0">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{interview.jobTitle}</h3>
                          <p className="text-muted-foreground font-medium">{interview.company}</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary">
                          {interview.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date & Time</p>
                            <p className="font-semibold">
                              {new Date(interview.date).toLocaleDateString()} • {interview.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-semibold text-sm">{interview.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Video className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Mode</p>
                            <p className="font-semibold">{interview.mode}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Interviewer</p>
                            <p className="font-semibold">{interview.interviewer}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{interview.type}</Badge>
                          {interview.reminder && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Bell className="w-3 h-3" />
                              Reminder Set
                            </Badge>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <CalendarPlus className="w-4 h-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Past Interviews */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Past Interviews</h2>
            <div className="space-y-4">
              {pastInterviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="apple-card border-0 opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{interview.jobTitle}</h3>
                          <p className="text-muted-foreground font-medium">{interview.company}</p>
                        </div>
                        <Badge variant="secondary">{interview.status}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-semibold">
                              {new Date(interview.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-semibold text-sm">{interview.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {upcomingInterviews.length === 0 && pastInterviews.length === 0 && (
            <Card className="apple-card border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Interviews Scheduled</h3>
                <p className="text-muted-foreground">
                  Your interview schedule will appear here once scheduled
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interviews;

