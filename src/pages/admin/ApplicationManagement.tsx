import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, CheckCircle2, X, XCircle, FileText, User, Briefcase, Calendar, Mail, Phone, Filter, MoreVertical, MapPin, Video, Clock, Send, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

const ApplicationManagement = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [shortlistDialogOpen, setShortlistDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [pendingStatusChange, setPendingStatusChange] = useState<{ id: number; newStatus: string } | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAppForView, setSelectedAppForView] = useState<typeof applications[0] | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);

  // Available filter options
  const statusOptions = ["Under Review", "Shortlisted", "Interview Scheduled", "Rejected", "Hired"];

  const [applications, setApplications] = useState([
    {
      id: 1,
      candidateName: "Rajesh Kumar",
      candidateEmail: "rajesh.kumar@example.com",
      candidatePhone: "+91 98765 43210",
      jobTitle: "Senior Software Engineer",
      jobId: 101,
      status: "Under Review",
      appliedDate: "2025-01-15",
      appliedVia: "mobile_app",
      distance: 5.2, // km
      candidateLocation: { lat: 13.0827, lng: 80.2707 }, // Chennai coordinates
      coverLetter: "I am excited to apply for the Senior Software Engineer position. With 5 years of experience in React and Node.js, I believe I would be a great fit for your team.",
      resume: "resume_rajesh_kumar.pdf",
      candidateId: 1,
    },
    {
      id: 2,
      candidateName: "Priya Sharma",
      candidateEmail: "priya.sharma@example.com",
      candidatePhone: "+91 98765 43211",
      jobTitle: "Product Manager",
      jobId: 102,
      status: "Shortlisted",
      appliedDate: "2025-01-14",
      appliedVia: "mobile_app",
      distance: 8.5, // km
      candidateLocation: { lat: 12.9352, lng: 80.1094 },
      coverLetter: "I am interested in the Product Manager role. My experience in product development and team leadership makes me a strong candidate.",
      resume: "resume_priya_sharma.pdf",
      candidateId: 2,
    },
    {
      id: 3,
      candidateName: "Meera Nair",
      candidateEmail: "meera.nair@example.com",
      candidatePhone: "+91 98765 43212",
      jobTitle: "UI/UX Designer",
      jobId: 103,
      status: "Rejected",
      appliedDate: "2025-01-13",
      appliedVia: "mobile_app",
      distance: 12.3, // km
      candidateLocation: { lat: 12.9716, lng: 80.2206 },
      coverLetter: "I am applying for the UI/UX Designer position. I have a strong portfolio in modern design systems and user experience.",
      resume: "resume_meera_nair.pdf",
      candidateId: 3,
    },
  ]);

  const [interviewInviteDialogOpen, setInterviewInviteDialogOpen] = useState(false);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<typeof applications[0] | null>(null);
  const [interviewFormData, setInterviewFormData] = useState({
    date: "",
    time: "",
    mode: "Online",
    location: "",
  });

  const handleView = (applicationId: number) => {
    const app = applications.find(a => a.id === applicationId);
    if (app) {
      setSelectedAppForView(app);
      setViewDialogOpen(true);
    }
  };

  const handleShortlistClick = (id: number) => {
    setSelectedApplication(id);
    setShortlistDialogOpen(true);
  };

  const handleShortlistConfirm = () => {
    if (selectedApplication) {
      setApplications(applications.map(app => 
        app.id === selectedApplication ? { ...app, status: "Shortlisted" } : app
      ));
      toast.success("Application shortlisted successfully");
      setShortlistDialogOpen(false);
      setSelectedApplication(null);
    }
  };

  const handleRejectClick = (id: number) => {
    setSelectedApplication(id);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (selectedApplication) {
      setApplications(applications.map(app => 
        app.id === selectedApplication ? { ...app, status: "Rejected" } : app
      ));
      toast.success("Application rejected");
      setRejectDialogOpen(false);
      setSelectedApplication(null);
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setPendingStatusChange({ id, newStatus });
    setStatusChangeDialogOpen(true);
  };

  const handleStatusChangeConfirm = () => {
    if (pendingStatusChange) {
      setApplications(applications.map(app => 
        app.id === pendingStatusChange.id ? { ...app, status: pendingStatusChange.newStatus } : app
      ));
      toast.success(`Application status updated to ${pendingStatusChange.newStatus}`);
      setStatusChangeDialogOpen(false);
      setPendingStatusChange(null);
    }
  };

  const handleInterviewInvite = (id: number) => {
    const app = applications.find(a => a.id === id);
    if (app) {
      setSelectedAppForInterview(app);
      setInterviewFormData({
        date: "",
        time: "",
        mode: "Online",
        location: "",
      });
      setInterviewInviteDialogOpen(true);
    }
  };

  const handleInterviewInviteSubmit = () => {
    if (!interviewFormData.date || !interviewFormData.time || !interviewFormData.mode) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (interviewFormData.mode === "Offline" && !interviewFormData.location) {
      toast.error("Please provide location for offline interview");
      return;
    }

    if (selectedAppForInterview) {
      // Update application status
      setApplications(applications.map(app => 
        app.id === selectedAppForInterview.id ? { ...app, status: "Interview Scheduled" } : app
      ));

      // Send notification to candidate
      toast.success(`Interview invite sent to ${selectedAppForInterview.candidateName}! Notification has been sent to the candidate.`);
      
      // Here you would typically send a notification to the candidate
      // For now, we'll just show a success message
      console.log("Interview scheduled:", {
        candidateId: selectedAppForInterview.candidateId,
        candidateName: selectedAppForInterview.candidateName,
        candidateEmail: selectedAppForInterview.candidateEmail,
        jobTitle: selectedAppForInterview.jobTitle,
        date: interviewFormData.date,
        time: interviewFormData.time,
        mode: interviewFormData.mode,
        location: interviewFormData.location,
      });

      setInterviewInviteDialogOpen(false);
      setSelectedAppForInterview(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedApplication(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedApplication) {
      setApplications(applications.filter(app => app.id !== selectedApplication));
      toast.success("Application deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedApplication(null);
    }
  };

  // Filter applications - only show mobile app applications
  const filteredApplications = applications.filter((app) => {
    // Only show applications from mobile app
    if (app.appliedVia !== "mobile_app") return false;
    if (filters.status && filters.status !== "all" && app.status !== filters.status) return false;
    if (filters.dateFrom && app.appliedDate < filters.dateFrom) return false;
    if (filters.dateTo && app.appliedDate > filters.dateTo) return false;
    return true;
  });

  const toggleFilter = (type: "status", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({ status: "all", dateFrom: "", dateTo: "" });
  };

  const hasActiveFilters = filters.status !== "all" || filters.dateFrom || filters.dateTo;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-4 border-b border-border/30"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
          Applied Jobs
        </h1>
        <p className="text-base text-muted-foreground/80">Review and manage job applications from mobile app</p>
      </motion.div>

      {/* Premium Filter Section */}
      <Card className="border-0 shadow-2xl shadow-[#03093a]/10 bg-gradient-to-br from-white via-white to-[#03093a]/5 backdrop-blur-xl rounded-3xl border border-[#03093a]/10">
        <CardHeader className="pb-3 border-b border-border/30">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-4 h-4" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearAllFilters} className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                <X className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Status Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Status:</span>
              {statusOptions.map((status) => (
                <Badge
                  key={status}
                  onClick={() => toggleFilter("status", status)}
                  className={cn(
                    "cursor-pointer px-4 py-1.5 text-xs rounded-full font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 shadow-sm",
                    filters.status === status
                      ? "bg-gradient-to-r from-[#03093a] to-[#03093a]/90 text-white border-2 border-[#03093a] shadow-lg shadow-[#03093a]/30 scale-105"
                      : status === "Rejected" 
                        ? "bg-white text-foreground border-2 border-border hover:bg-gradient-to-r hover:from-[#ee3127]/15 hover:to-[#ee3127]/5 hover:border-[#ee3127]/50 hover:shadow-md hover:scale-105 hover:text-[#ee3127]"
                        : "bg-white text-foreground border-2 border-border hover:bg-gradient-to-r hover:from-[#03093a]/10 hover:to-[#03093a]/5 hover:border-[#03093a]/40 hover:shadow-md hover:scale-105"
                  )}
                >
                  {status}
                </Badge>
              ))}
            </div>

            {/* Date Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Date From:</span>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="h-8 px-2 text-xs rounded-xl border-border/30 w-auto"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Date To:</span>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="h-8 px-2 text-xs rounded-xl border-border/30 w-auto"
              />
            </div>
          </div>
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <span className="text-xs text-muted-foreground">
                Showing {filteredApplications.length} of {applications.length} applications
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-2xl shadow-[#03093a]/10 bg-gradient-to-br from-white via-white to-[#03093a]/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#03093a]/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#03093a]/10 via-[#03093a]/8 to-[#03093a]/10 border-b-2 border-[#03093a]/20 shadow-sm">
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider w-12">
                    <CheckboxComponent
                      checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedApplications(filteredApplications.map(app => app.id));
                        } else {
                          setSelectedApplications([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Candidate Name</TableHead>
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Job Title</TableHead>
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Distance</TableHead>
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Status</TableHead>
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Applied Date</TableHead>
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No applications found matching the filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((app, index) => {
                    const appData = app as any;
                    return (
                    <TableRow
                      key={app.id}
                      className={cn(
                        "border-b border-border/20 transition-all duration-200 ease-out group cursor-pointer relative",
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30",
                        selectedApplications.includes(app.id)
                          ? "bg-gradient-to-r from-[#03093a]/12 via-[#03093a]/8 to-[#03093a]/12 border-l-[3px] border-l-[#03093a] shadow-sm"
                          : "hover:bg-gradient-to-r hover:from-[#03093a]/8 hover:via-[#03093a]/5 hover:to-transparent hover:border-l-[3px] hover:border-l-[#ee3127] hover:shadow-[0_2px_8px_rgba(3,9,58,0.12)]"
                      )}
                    >
                      <TableCell className="w-12">
                        <CheckboxComponent
                          checked={selectedApplications.includes(app.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedApplications([...selectedApplications, app.id]);
                            } else {
                              setSelectedApplications(selectedApplications.filter(id => id !== app.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-foreground group-hover:text-[#03093a] transition-colors duration-200 py-4 whitespace-nowrap">{app.candidateName}</TableCell>
                      <TableCell className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 py-4 whitespace-nowrap">{app.jobTitle}</TableCell>
                      <TableCell className="text-muted-foreground group-hover:text-foreground/90 transition-colors duration-200 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#ee3127]/60 group-hover:text-[#ee3127] transition-colors duration-200" />
                          <span>{appData.distance ? `${appData.distance} km` : "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Select
                          value={app.status}
                          onValueChange={(value) => handleStatusChange(app.id, value)}
                        >
                          <SelectTrigger className="w-36 h-10 rounded-xl border-border/30 bg-white hover:border-[#03093a]/50 focus:border-[#03093a] transition-all duration-200 group-hover:border-[#ee3127]/40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl shadow-lg border-border/30 bg-white/80 backdrop-blur-xl">
                            <SelectItem value="Under Review" className="hover:bg-[#03093a]/5">Under Review</SelectItem>
                            <SelectItem value="Shortlisted" className="hover:bg-[#03093a]/5">Shortlisted</SelectItem>
                            <SelectItem value="Interview Scheduled" className="hover:bg-[#03093a]/5">Interview Scheduled</SelectItem>
                            <SelectItem value="Rejected" className="hover:bg-[#ee3127]/10 text-[#ee3127] focus:text-[#ee3127]">Rejected</SelectItem>
                            <SelectItem value="Hired" className="hover:bg-green-50">Hired</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#03093a]/10 hover:text-[#03093a] transition-all duration-200 group-hover:bg-[#ee3127]/10 group-hover:text-[#ee3127]">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-xl">
                            <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleView(app.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleInterviewInvite(app.id)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Interview Invite
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleShortlistClick(app.id)}>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Shortlist
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl cursor-pointer text-[#ee3127] hover:text-[#ee3127] focus:text-[#ee3127] bg-transparent hover:bg-[#ee3127]/10 focus:bg-[#ee3127]/10"
                              onClick={() => handleRejectClick(app.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2 text-[#ee3127]" />
                              <span className="text-[#ee3127]">Reject</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="rounded-xl cursor-pointer text-[#ee3127] hover:text-[#ee3127] focus:text-[#ee3127] bg-transparent hover:bg-[#ee3127]/10 focus:bg-[#ee3127]/10"
                              onClick={() => handleDeleteClick(app.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2 text-[#ee3127]" />
                              <span className="text-[#ee3127]">Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Application Details
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              View complete application information
            </DialogDescription>
          </DialogHeader>
          {selectedAppForView && (
            <div className="space-y-6 py-4">
              {/* Candidate Information */}
              <div className="p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Candidate Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{selectedAppForView.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {selectedAppForView.candidateEmail || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {selectedAppForView.candidatePhone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div className="p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Job Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Job Title</p>
                    <p className="font-semibold">{selectedAppForView.jobTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job ID</p>
                    <p className="font-semibold">#{selectedAppForView.jobId || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Applied Date</p>
                    <p className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedAppForView.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={cn(
                      "rounded-full px-3 py-1 font-semibold border shadow-sm",
                      selectedAppForView.status === "Rejected"
                        ? "bg-gradient-to-r from-[#ee3127] to-[#ee3127]/90 text-white border-[#ee3127] shadow-[#ee3127]/20"
                        : selectedAppForView.status === "Hired"
                        ? "bg-gradient-to-r from-green-600 to-green-500 text-white border-green-600 shadow-green-600/20"
                        : "bg-gradient-to-r from-[#03093a] to-[#03093a]/90 text-white border-[#03093a] shadow-[#03093a]/20"
                    )}>
                      {selectedAppForView.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
                <h3 className="font-semibold text-lg mb-4">Cover Letter</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedAppForView.coverLetter || "No cover letter provided."}</p>
              </div>

              {/* Resume */}
              <div className="p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
                <h3 className="font-semibold text-lg mb-4">Resume</h3>
                <div className="flex items-center gap-4">
                  <FileText className="w-12 h-12 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">{selectedAppForView.resume || "No resume uploaded"}</p>
                  </div>
                  {selectedAppForView.resume && (
                    <>
                      <Button variant="outline" className="rounded-xl hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">View</Button>
                      <Button variant="outline" className="rounded-xl hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">Download</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-[#ee3127] text-white hover:bg-[#ee3127]/90 rounded-2xl">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this application? The candidate will be notified of this decision.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl" onClick={() => setSelectedApplication(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRejectConfirm} className="bg-destructive text-destructive-foreground rounded-2xl">
              Reject Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Shortlist Confirmation Dialog */}
      <AlertDialog open={shortlistDialogOpen} onOpenChange={setShortlistDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Shortlist Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to shortlist this application? The candidate will be notified and can proceed to the next stage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl" onClick={() => setSelectedApplication(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleShortlistConfirm} className="bg-green-600 text-white rounded-2xl hover:bg-green-700">
              Shortlist Application
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={statusChangeDialogOpen} onOpenChange={setStatusChangeDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Application Status?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the application status to <strong>{pendingStatusChange?.newStatus}</strong>? 
              {pendingStatusChange?.newStatus === "Rejected" && " The candidate will be notified of this decision."}
              {pendingStatusChange?.newStatus === "Shortlisted" && " The candidate will be notified and can proceed to the next stage."}
              {pendingStatusChange?.newStatus === "Hired" && " This will mark the candidate as hired for this position."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl" onClick={() => setPendingStatusChange(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleStatusChangeConfirm} 
              className={`rounded-2xl ${
                pendingStatusChange?.newStatus === "Rejected" 
                  ? "bg-destructive text-destructive-foreground"
                  : pendingStatusChange?.newStatus === "Shortlisted" || pendingStatusChange?.newStatus === "Hired"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              Confirm Status Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Interview Invite Dialog */}
      <Dialog open={interviewInviteDialogOpen} onOpenChange={setInterviewInviteDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Schedule Interview
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Send interview invitation to {selectedAppForInterview?.candidateName}
            </DialogDescription>
          </DialogHeader>
          {selectedAppForInterview && (
            <div className="space-y-6 py-4">
              <div className="p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Candidate</p>
                    <p className="font-semibold">{selectedAppForInterview.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job Title</p>
                    <p className="font-semibold">{selectedAppForInterview.jobTitle}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Interview Date *</Label>
                  <Input
                    type="date"
                    value={interviewFormData.date}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, date: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Interview Time *</Label>
                  <Input
                    type="time"
                    value={interviewFormData.time}
                    onChange={(e) => setInterviewFormData({ ...interviewFormData, time: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Mode *</Label>
                  <Select value={interviewFormData.mode} onValueChange={(value) => setInterviewFormData({ ...interviewFormData, mode: value, location: value === "Online" ? "" : interviewFormData.location })}>
                    <SelectTrigger className="h-12 rounded-2xl border-border/30">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {interviewFormData.mode === "Offline" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Location *</Label>
                    <Input
                      value={interviewFormData.location}
                      onChange={(e) => setInterviewFormData({ ...interviewFormData, location: e.target.value })}
                      placeholder="Enter interview location"
                      className="h-12 rounded-2xl border-border/30"
                      required
                    />
                  </div>
                )}
                {interviewFormData.mode === "Online" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Meeting Link</Label>
                    <Input
                      value={interviewFormData.location}
                      onChange={(e) => setInterviewFormData({ ...interviewFormData, location: e.target.value })}
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                      className="h-12 rounded-2xl border-border/30"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/30">
            <Button variant="outline" onClick={() => setInterviewInviteDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleInterviewInviteSubmit} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              <Send className="w-5 h-5 mr-2" />
              Send Invite
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationManagement;

