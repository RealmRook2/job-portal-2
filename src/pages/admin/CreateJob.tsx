import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Save, Check, ChevronsUpDown, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CreateJob = () => {
  const navigate = useNavigate();
  const [collegeOpen, setCollegeOpen] = useState(false);
  
  // Mock colleges data - in real app, this would come from API/context
  const colleges = [
    { id: 1, name: "Anna University", location: "Guindy, Chennai" },
    { id: 2, name: "SRM Institute of Science and Technology", location: "Kattankulathur, Chennai" },
    { id: 3, name: "VIT University", location: "Vandalur, Chennai" },
    { id: 4, name: "Loyola College", location: "Nungambakkam, Chennai" },
    { id: 5, name: "Madras Christian College", location: "Tambaram, Chennai" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    salaryMin: "",
    salaryMax: "",
    location: "Chennai, Tamil Nadu",
    experience: "",
    description: "",
    responsibilities: "",
    requirements: "",
    keywords: "",
    status: "Open",
    jobType: "", // "oncampus" or "offcampus"
    collegeId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.jobType === "oncampus" && !formData.collegeId) {
      toast.error("Please select a college for on-campus job");
      return;
    }
    
    toast.success("Job created successfully!");
    navigate("/admin/jobs");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-6 border-b border-border/30"
      >
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/jobs")} 
          className="mb-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-foreground hover:text-foreground transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
          Create New Job
        </h1>
        <p className="text-lg text-muted-foreground/80">Post a new job opportunity</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Job Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Senior Software Engineer"
                className="h-12 rounded-2xl border-border/30"
                required
              />
            </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Salary Range (Min) *</Label>
                <Input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  placeholder="12"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Salary Range (Max) *</Label>
                <Input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  placeholder="18"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Location *</Label>
                <Input
                  value={formData.location}
                  readOnly
                  className="bg-secondary/50 h-12 rounded-2xl border-border/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Experience *</Label>
                <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select experience" />
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
                <Label className="text-sm font-semibold">Job Type *</Label>
                <Select 
                  value={formData.jobType} 
                  onValueChange={(value) => {
                    setFormData({ ...formData, jobType: value, collegeId: value === "offcampus" ? "" : formData.collegeId });
                  }}
                >
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oncampus">On Campus</SelectItem>
                    <SelectItem value="offcampus">Off Campus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.jobType === "oncampus" && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">College *</Label>
                  <Popover open={collegeOpen} onOpenChange={setCollegeOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={collegeOpen}
                        className="w-full justify-between h-12 rounded-2xl border-border/30"
                      >
                        {formData.collegeId
                          ? colleges.find((college) => college.id.toString() === formData.collegeId)?.name
                          : "Select college..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search college..." />
                        <CommandList>
                          <CommandEmpty>No college found.</CommandEmpty>
                          <CommandGroup>
                            {colleges.map((college) => (
                              <CommandItem
                                key={college.id}
                                value={`${college.name} ${college.location}`}
                                onSelect={() => {
                                  setFormData({ ...formData, collegeId: college.id.toString() });
                                  setCollegeOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.collegeId === college.id.toString() ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span>{college.name}</span>
                                  <span className="text-xs text-muted-foreground">{college.location}</span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Job Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the role and responsibilities..."
                rows={4}
                className="rounded-2xl border-border/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Key Responsibilities *</Label>
              <Textarea
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                placeholder="List key responsibilities (one per line)..."
                rows={4}
                className="rounded-2xl border-border/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Requirements *</Label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List requirements (one per line)..."
                rows={4}
                className="rounded-2xl border-border/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Keywords (comma-separated)</Label>
              <Input
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="React, TypeScript, Node.js"
                className="h-12 rounded-2xl border-border/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="h-12 rounded-2xl border-border/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border/30">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/jobs")} className="rounded-2xl h-12 px-6">
            Cancel
          </Button>
          <Button type="submit" className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
            <Save className="w-5 h-5 mr-2" />
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;

