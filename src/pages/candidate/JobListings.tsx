import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock, CheckCircle2, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const JobListings = () => {
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    salaryRange: "",
    department: "",
    jobType: "",
  });

  const chennaiLocations = [
    "All Locations",
    "T Nagar",
    "Velachery",
    "OMR",
    "Guindy",
    "Anna Nagar",
    "Kodambakkam",
    "Tambaram",
    "Adyar",
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TCS Chennai",
      location: "Anna Nagar, Chennai",
      salary: "₹12-18 LPA",
      experience: "5-8 years",
      type: "Full-time",
      department: "Engineering",
      applied: false,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Freshworks",
      location: "OMR, Chennai",
      salary: "₹18-25 LPA",
      experience: "6-10 years",
      type: "Full-time",
      department: "Product",
      applied: true,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Zoho Corporation",
      location: "Velachery, Chennai",
      salary: "₹8-12 LPA",
      experience: "3-5 years",
      type: "Full-time",
      department: "Design",
      applied: false,
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Infosys",
      location: "Guindy, Chennai",
      salary: "₹6-10 LPA",
      experience: "2-4 years",
      type: "Full-time",
      department: "Analytics",
      applied: false,
    },
    {
      id: 5,
      title: "Marketing Manager",
      company: "HCL Technologies",
      location: "T Nagar, Chennai",
      salary: "₹10-15 LPA",
      experience: "4-7 years",
      type: "Full-time",
      department: "Marketing",
      applied: true,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Wipro",
      location: "Kodambakkam, Chennai",
      salary: "₹9-14 LPA",
      experience: "3-6 years",
      type: "Full-time",
      department: "Engineering",
      applied: false,
    },
  ];

  const filteredJobs = jobs.filter(job => {
    if (filters.location && filters.location !== "All Locations" && !job.location.includes(filters.location)) return false;
    if (filters.department && job.department !== filters.department) return false;
    if (filters.jobType && job.type !== filters.jobType) return false;
    return true;
  });

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
            <h1 className="text-4xl font-bold mb-4">Job Opportunities in Chennai</h1>
            <p className="text-xl text-muted-foreground">Find your perfect role in the heart of Tamil Nadu</p>
          </motion.div>

          {/* Filters */}
          <Card className="apple-card border-0 mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {chennaiLocations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience</label>
                  <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="5-8">5-8 years</SelectItem>
                      <SelectItem value="8+">8+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary Range</label>
                  <Select value={filters.salaryRange} onValueChange={(value) => setFilters(prev => ({ ...prev, salaryRange: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">₹0-5 LPA</SelectItem>
                      <SelectItem value="5-10">₹5-10 LPA</SelectItem>
                      <SelectItem value="10-15">₹10-15 LPA</SelectItem>
                      <SelectItem value="15+">₹15+ LPA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select value={filters.department} onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <Select value={filters.jobType} onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="apple-card border-0 h-full group">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground font-medium">{job.company}</p>
                      </div>
                      {job.applied && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Applied
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Link to={`/jobs/${job.id}`}>
                        <Button className="w-full" variant={job.applied ? "outline" : "default"}>
                          {job.applied ? "View Application" : "Apply Now"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListings;

