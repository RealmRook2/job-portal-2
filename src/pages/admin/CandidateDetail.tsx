import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, User, GraduationCap, Briefcase, FileText, MessageSquare, Calendar, Upload, Download, Trash2, Eye, Folder, File, Search, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResumeFile {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedDate: string;
  version?: number;
}

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumes, setResumes] = useState<ResumeFile[]>([
    {
      id: 1,
      name: "resume_rajesh_kumar_v2.pdf",
      size: 245678,
      type: "application/pdf",
      uploadedDate: "2025-01-20",
      version: 2,
    },
    {
      id: 2,
      name: "resume_rajesh_kumar_v1.pdf",
      size: 238901,
      type: "application/pdf",
      uploadedDate: "2025-01-15",
      version: 1,
    },
    {
      id: 3,
      name: "Rajesh_Kumar_CV.docx",
      size: 189234,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      uploadedDate: "2025-01-10",
    },
  ]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock candidate data
  const candidate = {
    id: id,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    location: "T Nagar, Chennai, Tamil Nadu",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    education: [
      {
        degree: "Bachelor of Technology",
        field: "Computer Science",
        institution: "Anna University, Chennai",
        year: "2012",
      },
    ],
    experience: [
      {
        company: "TCS Chennai",
        position: "Software Engineer",
        startDate: "2015-06",
        endDate: "2020-03",
        location: "Anna Nagar, Chennai",
      },
    ],
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    applications: [
      { jobTitle: "Senior Software Engineer", company: "TCS Chennai", status: "Shortlisted", date: "2025-01-15" },
    ],
    interviews: [
      { jobTitle: "Senior Software Engineer", date: "2025-01-25", time: "10:00 AM", status: "Scheduled" },
    ],
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    toast.success("Candidate deleted successfully");
    setDeleteDialogOpen(false);
    navigate("/admin/candidates");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between pb-6 border-b border-border/30"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin/candidates")} 
            className="rounded-2xl bg-gray-100 hover:bg-gray-200 text-foreground hover:text-foreground transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
              {candidate.name}
            </h1>
            <p className="text-lg text-muted-foreground/80">{candidate.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/admin/chats`)} 
            className="rounded-2xl hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
          <Button variant="destructive" onClick={handleDeleteClick} className="rounded-2xl">
            Delete
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-secondary/30 p-1.5 rounded-2xl border border-border/30">
          <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Profile</TabsTrigger>
          <TabsTrigger value="resume" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Resume</TabsTrigger>
          <TabsTrigger value="skills" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Skills</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Documents</TabsTrigger>
          <TabsTrigger value="applications" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Applications</TabsTrigger>
          <TabsTrigger value="interviews" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
            <CardHeader className="pb-6 border-b border-border/30">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{candidate.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{candidate.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">{candidate.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{candidate.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold">{new Date(candidate.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-semibold">{candidate.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-2xl mb-4">
                  <p className="font-semibold">{edu.degree} in {edu.field}</p>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">Year: {edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="apple-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              {candidate.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-2xl mb-4">
                  <p className="font-semibold">{exp.position}</p>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resume">
          <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
            <CardHeader className="pb-6 border-b border-border/30">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  Resume Storage
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-xl"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-xl"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search and Upload Bar */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-border/30"
                  />
                </div>
                <Button
                  onClick={() => setUploadDialogOpen(true)}
                  className="rounded-xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-11 px-6"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
              </div>

              {/* Storage Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <p className="text-sm text-muted-foreground">Total Files</p>
                  <p className="text-2xl font-bold">{resumes.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-2xl font-bold">
                    {(resumes.reduce((acc, r) => acc + r.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <p className="text-sm text-muted-foreground">Latest Upload</p>
                  <p className="text-lg font-semibold">
                    {resumes.length > 0 ? new Date(resumes[0].uploadedDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              {/* File Browser */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resumes
                    .filter((resume) =>
                      resume.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((resume) => (
                      <motion.div
                        key={resume.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group p-4 rounded-xl border border-border/30 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer bg-white/50 hover:bg-white"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          {resume.version && (
                            <Badge variant="secondary" className="rounded-full text-xs">
                              v{resume.version}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold mb-1 truncate">{resume.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {(resume.size / 1024).toFixed(2)} KB
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {new Date(resume.uploadedDate).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setResumes(resumes.filter((r) => r.id !== resume.id));
                              toast.success("Resume deleted");
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {resumes
                    .filter((resume) =>
                      resume.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((resume) => (
                      <div
                        key={resume.id}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/50 hover:bg-white/50 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{resume.name}</h3>
                            {resume.version && (
                              <Badge variant="secondary" className="rounded-full text-xs">
                                v{resume.version}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{(resume.size / 1024).toFixed(2)} KB</span>
                            <span>•</span>
                            <span>{new Date(resume.uploadedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="rounded-xl">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-xl">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              setResumes(resumes.filter((r) => r.id !== resume.id));
                              toast.success("Resume deleted");
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {resumes.filter((resume) =>
                resume.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No resumes found matching your search" : "No resumes uploaded yet"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Dialog */}
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent className="rounded-3xl max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Upload Resume</DialogTitle>
                <DialogDescription>Upload a new resume file (PDF, DOC, DOCX)</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select File</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("File size should be less than 5MB");
                          return;
                        }
                        setSelectedFile(file);
                      }
                    }}
                    className="h-12 rounded-xl border-border/30 cursor-pointer"
                  />
                </div>
                {selectedFile && (
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(selectedFile.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadDialogOpen(false);
                    setSelectedFile(null);
                  }}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (!selectedFile) {
                      toast.error("Please select a file");
                      return;
                    }
                    const newResume: ResumeFile = {
                      id: resumes.length + 1,
                      name: selectedFile.name,
                      size: selectedFile.size,
                      type: selectedFile.type,
                      uploadedDate: new Date().toISOString().split("T")[0],
                      version: resumes.length > 0 ? Math.max(...resumes.map((r) => r.version || 0)) + 1 : 1,
                    };
                    setResumes([newResume, ...resumes]);
                    toast.success("Resume uploaded successfully");
                    setUploadDialogOpen(false);
                    setSelectedFile(null);
                  }}
                  className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90"
                >
                  Upload
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="skills">
          <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
            <CardHeader className="pb-6 border-b border-border/30">
              <CardTitle className="text-2xl">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
            <CardHeader className="pb-6 border-b border-border/30">
              <CardTitle className="text-2xl">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No additional documents uploaded</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
            <CardHeader className="pb-6 border-b border-border/30">
              <CardTitle className="text-2xl">Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.applications.map((app, index) => (
                  <div key={index} className="p-4 border rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{app.jobTitle}</p>
                        <p className="text-muted-foreground">{app.company}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Applied on {new Date(app.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">{app.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviews">
          <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
            <CardHeader className="pb-6 border-b border-border/30">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Interview History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.interviews.map((interview, index) => (
                  <div key={index} className="p-4 border rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{interview.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(interview.date).toLocaleDateString()} at {interview.time}
                        </p>
                      </div>
                      <Badge variant="secondary">{interview.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the candidate record and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground rounded-2xl">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CandidateDetail;

