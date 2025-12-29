import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock, User, Building2, Bookmark, Share2, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const job = {
    id: 1,
    title: "Senior Software Engineer",
    company: "TCS Chennai",
    hrAdmin: "Aravind Kumar",
    location: "Anna Nagar, Chennai",
    officeLocation: "TCS Campus, Anna Nagar East, Chennai, Tamil Nadu - 600102",
    salary: "₹12-18 LPA",
    experience: "5-8 years",
    type: "Full-time",
    department: "Engineering",
    description: "We are looking for an experienced Senior Software Engineer to join our dynamic team in Chennai. You will be responsible for designing, developing, and maintaining scalable web applications.",
    responsibilities: [
      "Design and develop high-quality software solutions",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews",
      "Optimize application performance",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with cloud platforms (AWS/Azure)",
      "Excellent problem-solving skills",
    ],
    skills: ["React", "TypeScript", "Node.js", "AWS", "MongoDB", "Docker"],
    aboutCompany: "TCS is a leading global IT services, consulting and business solutions organization. We have been partnering with many of the world's largest businesses in their transformation journeys for over 50 years.",
  };

  const handleApply = () => {
    navigate(`/jobs/${id}/apply`);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Job removed from saved" : "Job saved successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/jobs" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Jobs
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSave}>
                  <Bookmark className={`w-4 h-4 mr-2 ${saved ? "fill-current" : ""}`} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="apple-card border-0">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Job Description</h2>
                  <p className="text-muted-foreground mb-6">{job.description}</p>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card border-0">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">About the Company</h2>
                  <p className="text-muted-foreground">{job.aboutCompany}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="apple-card border-0 sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Job Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Salary</p>
                        <p className="font-semibold">{job.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="font-semibold">{job.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Job Type</p>
                        <p className="font-semibold">{job.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">HR Admin</p>
                        <p className="font-semibold">{job.hrAdmin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Office Location</p>
                        <p className="font-semibold text-sm">{job.officeLocation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-3">
                    <Button onClick={handleApply} className="w-full" size="lg">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card border-0">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Office Location</h3>
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                    <p className="text-muted-foreground">Google Map (Mock)</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">{job.officeLocation}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

