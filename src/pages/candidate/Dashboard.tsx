import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, TrendingUp, FileText } from "lucide-react";

const CandidateDashboard = () => {
  const recommendedJobs = [
    {
      title: "Full Stack Developer",
      company: "Infosys",
      location: "Sholinganallur, Chennai",
      type: "Full-time",
      salary: "₹10-15 LPA",
      posted: "2 days ago",
    },
    {
      title: "React Developer",
      company: "Cognizant",
      location: "Tambaram, Chennai",
      type: "Full-time",
      salary: "₹8-12 LPA",
      posted: "1 week ago",
    },
  ];

  const applications = [
    { company: "TCS Chennai", position: "Senior Developer", status: "Under Review", date: "2 days ago" },
    { company: "Wipro", position: "Tech Lead", status: "Interview Scheduled", date: "1 week ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome in, Rajesh</h1>
        <p className="text-sm text-muted-foreground">
          Ready to find your next opportunity in Chennai?
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Profile Completeness */}
        <Card className="dashboard-card lg:col-span-1">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-lg text-foreground">Profile Completeness</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall</span>
                  <span className="text-sm font-semibold text-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2.5" />
              </div>
              <div className="pt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  ✓ Basic Information
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  ✓ Education & Skills
                </p>
                <p className="flex items-center gap-2 text-primary">
                  ○ Upload Resume
                </p>
              </div>
              <Link to="/candidate/profile">
                <Button className="w-full" variant="outline">
                  Complete Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          <Card className="dashboard-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Applications</p>
                  <p className="text-3xl font-bold text-foreground tracking-tight">12</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profile Views</p>
                  <p className="text-3xl font-bold text-foreground tracking-tight">48</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recommended Jobs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
            <Link to="/jobs">
              <Button variant="ghost" size="sm" className="text-foreground">View All</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recommendedJobs.map((job, index) => (
              <Card key={index} className="dashboard-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{job.title}</h3>
                  <p className="text-muted-foreground mb-4">{job.company}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="font-semibold text-primary">{job.salary}</span>
                    <Link to="/jobs">
                      <Button size="sm">Apply Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Recent Applications</h2>
            <Link to="/candidate/applications">
              <Button variant="ghost" size="sm" className="text-foreground">View All</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {applications.map((app, index) => (
              <Card key={index} className="dashboard-card">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-1 text-foreground">{app.position}</h3>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-lg border-0 ${
                      app.status === "Interview Scheduled" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Applied {app.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
