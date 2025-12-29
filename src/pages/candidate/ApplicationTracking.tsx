import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Calendar, MapPin, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const ApplicationTracking = () => {
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "TCS Chennai",
      appliedDate: "2025-01-15",
      status: "Interview Scheduled",
      stages: [
        { name: "Applied", date: "2025-01-15", completed: true },
        { name: "Shortlisted", date: "2025-01-18", completed: true },
        { name: "Interview Scheduled", date: "2025-01-25", completed: true },
        { name: "Interview Completed", date: null, completed: false },
      ],
      interviewDate: "2025-01-25",
      interviewTime: "10:00 AM",
      location: "TCS Campus, Anna Nagar, Chennai",
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      company: "Freshworks",
      appliedDate: "2025-01-10",
      status: "Shortlisted",
      stages: [
        { name: "Applied", date: "2025-01-10", completed: true },
        { name: "Shortlisted", date: "2025-01-12", completed: true },
        { name: "Interview Scheduled", date: null, completed: false },
        { name: "Interview Completed", date: null, completed: false },
      ],
      interviewDate: null,
      interviewTime: null,
      location: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return "bg-primary/10 text-primary";
      case "Shortlisted":
        return "bg-blue-100 text-blue-700";
      case "Applied":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
            <h1 className="text-4xl font-bold mb-4">Application Tracking</h1>
            <p className="text-xl text-muted-foreground">Track the status of your job applications</p>
          </motion.div>

          <div className="space-y-6">
            {applications.map((app, appIndex) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: appIndex * 0.1 }}
              >
                <Card className="apple-card border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{app.jobTitle}</h2>
                        <p className="text-muted-foreground font-medium">{app.company}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                      {app.stages.map((stage, index) => (
                        <div key={index} className="flex gap-4 mb-6 last:mb-0">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              stage.completed
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {stage.completed ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            {index < app.stages.length - 1 && (
                              <div className={`w-0.5 h-12 mt-2 ${
                                stage.completed ? "bg-primary" : "bg-muted"
                              }`} />
                            )}
                          </div>
                          <div className="flex-1 pb-6 last:pb-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{stage.name}</h3>
                              {stage.date && (
                                <span className="text-sm text-muted-foreground">
                                  {new Date(stage.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            {stage.name === "Interview Scheduled" && app.interviewDate && (
                              <div className="mt-2 p-3 bg-secondary rounded-xl space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-primary" />
                                  <span>
                                    {new Date(app.interviewDate).toLocaleDateString()} at {app.interviewTime}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span>{app.location}</span>
                                </div>
                              </div>
                            )}
                            {stage.name === "Interview Scheduled" && !app.interviewDate && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Interview details will be shared soon
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <Link to={`/jobs/${app.id}`}>
                        <button className="text-primary hover:underline text-sm font-medium">
                          View Job Details →
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {applications.length === 0 && (
            <Card className="apple-card border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start applying to jobs to track your progress here
                </p>
                <Link to="/jobs">
                  <button className="text-primary hover:underline font-medium">
                    Browse Jobs →
                  </button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracking;

