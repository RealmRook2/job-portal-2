import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar, Clock, MapPin, User, Briefcase, Filter, X, UserCog, MoreVertical, Edit, CheckCircle2, Search, ChevronDown, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const InterviewManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInterviews, setSelectedInterviews] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: "Rajesh Kumar",
      jobTitle: "Senior Software Engineer",
      date: "2025-01-25",
      time: "10:00 AM",
      mode: "In-office",
      location: "TCS Campus, Anna Nagar, Chennai",
      interviewer: "Aravind Kumar",
      hrAdminId: 1,
      status: "Scheduled",
      onboardingStatus: "Pending",
    },
    {
      id: 2,
      candidateName: "Priya Sharma",
      jobTitle: "Product Manager",
      date: "2025-01-26",
      time: "2:00 PM",
      mode: "Online",
      location: "Video Call",
      interviewer: "Priya Menon",
      hrAdminId: 2,
      status: "Scheduled",
      onboardingStatus: "In Progress",
    },
    {
      id: 3,
      candidateName: "Meera Nair",
      jobTitle: "UI/UX Designer",
      date: "2025-01-27",
      time: "11:00 AM",
      mode: "In-office",
      location: "ACE FINS TECH, T Nagar, Chennai",
      interviewer: "Aravind Kumar",
      hrAdminId: 1,
      status: "Completed",
      onboardingStatus: "Completed",
    },
    {
      id: 4,
      candidateName: "Suresh Iyer",
      jobTitle: "Senior Software Engineer",
      date: "2025-01-28",
      time: "3:00 PM",
      mode: "In-office",
      location: "ACE FINS TECH, T Nagar, Chennai",
      interviewer: "Rajesh Iyer",
      hrAdminId: 3,
      status: "Scheduled",
      onboardingStatus: "Pending",
    },
  ]);

  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedInterviewForReschedule, setSelectedInterviewForReschedule] = useState<typeof interviews[0] | null>(null);
  const [rescheduleFormData, setRescheduleFormData] = useState({
    date: "",
    time: "",
  });

  // Filter states
  const [filters, setFilters] = useState({
    hrAdmin: "all",
    status: "all",
    onboardingStatus: "all",
    dateFrom: "",
    dateTo: "",
  });

  // Available filter options
  const statusOptions = ["Scheduled", "Completed", "Cancelled", "Rescheduled"];

  const [formData, setFormData] = useState({
    candidate: "",
    job: "",
    date: "",
    time: "",
    mode: "In-office",
    location: "ACE FINS TECH, T Nagar, Chennai, Tamil Nadu",
    interviewer: "",
    notes: "",
    reminders: {
      "24hours": false,
      "2hours": false,
      "10minutes": false,
    },
  });

  const candidates = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh.kumar@example.com" },
    { id: 2, name: "Priya Sharma", email: "priya.sharma@example.com" },
    { id: 3, name: "Meera Nair", email: "meera.nair@example.com" },
  ];

  const jobs = [
    { id: 1, title: "Senior Software Engineer", location: "Anna Nagar, Chennai" },
    { id: 2, title: "Product Manager", location: "OMR, Chennai" },
    { id: 3, title: "UI/UX Designer", location: "Velachery, Chennai" },
  ];

  const hrAdmins = [
    { id: 1, name: "Aravind Kumar", location: "OMR, Chennai", email: "aravind.kumar@acefinstech.com" },
    { id: 2, name: "Priya Menon", location: "Velachery, Chennai", email: "priya.menon@acefinstech.com" },
    { id: 3, name: "Rajesh Iyer", location: "Anna Nagar, Chennai", email: "rajesh.iyer@acefinstech.com" },
  ];

  // Filter interviews based on selected filters
  const filteredInterviews = interviews.filter((interview) => {
    if (filters.hrAdmin && filters.hrAdmin !== "all" && interview.hrAdminId !== parseInt(filters.hrAdmin)) return false;
    if (filters.status && filters.status !== "all" && interview.status !== filters.status) return false;
    if (filters.onboardingStatus && filters.onboardingStatus !== "all" && interview.onboardingStatus !== filters.onboardingStatus) return false;
    if (filters.dateFrom && interview.date < filters.dateFrom) return false;
    if (filters.dateTo && interview.date > filters.dateTo) return false;
    if (searchQuery && !interview.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleFilter = (type: "hrAdmin" | "status", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      hrAdmin: "all",
      status: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  const hasActiveFilters = filters.hrAdmin !== "all" || filters.status !== "all" || filters.dateFrom || filters.dateTo;

  const handleReschedule = (id: number) => {
    const interview = interviews.find(i => i.id === id);
    if (interview) {
      setSelectedInterviewForReschedule(interview);
      setRescheduleFormData({
        date: interview.date,
        time: interview.time,
      });
      setRescheduleDialogOpen(true);
    }
  };

  const handleRescheduleSubmit = () => {
    if (!rescheduleFormData.date || !rescheduleFormData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedInterviewForReschedule) {
      setInterviews(interviews.map(i => 
        i.id === selectedInterviewForReschedule.id 
          ? { ...i, date: rescheduleFormData.date, time: rescheduleFormData.time, status: "Rescheduled" }
          : i
      ));
      toast.success(`Interview rescheduled successfully! Notification sent to ${selectedInterviewForReschedule.candidateName}`);
      setRescheduleDialogOpen(false);
      setSelectedInterviewForReschedule(null);
    }
  };

  const handleViewInterview = (id: number) => {
    // View interview details - can be implemented later
    toast.info("View interview details");
  };

  const handleSchedule = () => {
    if (!formData.candidate || !formData.job || !formData.date || !formData.time || !formData.interviewer) {
      toast.error("Please fill in all required fields");
      return;
    }

    const candidate = candidates.find(c => c.id === parseInt(formData.candidate));
    const job = jobs.find(j => j.id === parseInt(formData.job));

    const selectedHRAdmin = hrAdmins.find(hr => formData.interviewer.includes(hr.name));
    const newInterview = {
      id: interviews.length + 1,
      candidateName: candidate?.name || "",
      jobTitle: job?.title || "",
      date: formData.date,
      time: formData.time,
      mode: formData.mode,
      location: formData.location,
      interviewer: formData.interviewer,
      hrAdminId: selectedHRAdmin?.id || 1,
      status: "Scheduled",
      onboardingStatus: "Pending",
    };

    setInterviews([...interviews, newInterview]);
    toast.success("Interview scheduled successfully!");
    setIsDialogOpen(false);
    setFormData({
      candidate: "",
      job: "",
      date: "",
      time: "",
      mode: "In-office",
      location: "ACE FINS TECH, T Nagar, Chennai, Tamil Nadu",
      interviewer: "",
      notes: "",
      reminders: {
        "24hours": false,
        "2hours": false,
        "10minutes": false,
      },
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between pb-4 border-b border-border/30"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
            Onboarding Candidates
          </h1>
          <p className="text-base text-muted-foreground/80">Manage candidate onboarding and interviews</p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-6"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule Interview
        </Button>
      </motion.div>

      {/* WhatsApp-style Filter Chips */}
      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
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
            {/* HR Admin Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">HR Admin:</span>
              {hrAdmins.map((hr) => (
                <Badge
                  key={hr.id}
                  onClick={() => toggleFilter("hrAdmin", hr.id.toString())}
                  className={cn(
                    "cursor-pointer px-3 py-1 text-xs rounded-full font-medium transition-all hover:scale-105 whitespace-nowrap flex-shrink-0",
                    filters.hrAdmin === hr.id.toString()
                      ? "bg-[#03093a] text-white border-[#03093a]"
                      : "bg-white text-foreground border-border hover:bg-[#03093a]/10 hover:border-[#03093a]/30"
                  )}
                >
                  {hr.name}
                </Badge>
              ))}
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Status:</span>
              {statusOptions.map((status) => (
                <Badge
                  key={status}
                  onClick={() => toggleFilter("status", status)}
                  className={cn(
                    "cursor-pointer px-3 py-1 text-xs rounded-full font-medium transition-all hover:scale-105 whitespace-nowrap flex-shrink-0",
                    filters.status === status
                      ? "bg-[#03093a] text-white border-[#03093a]"
                      : "bg-white text-foreground border-border hover:bg-[#03093a]/10 hover:border-[#03093a]/30"
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

            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 rounded-xl border-border/50 focus:border-[#03093a]/50 focus:ring-[#03093a]/20 text-xs"
                />
              </div>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <span className="text-xs text-muted-foreground">
                Showing {filteredInterviews.length} of {interviews.length} interviews
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-[#03093a]/5 border-b border-[#03093a]/10">
                  <TableHead className="font-semibold text-foreground/80">Candidate</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Job</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Date & Time</TableHead>
                  <TableHead className="font-semibold text-foreground/80">HR Admin</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Location</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Interview Status</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Onboarding Status</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No candidates found matching the filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInterviews.map((interview, index) => {
                    const interviewData = interview as any;
                    return (
                    <TableRow
                      key={interview.id}
                      className={cn(
                        "border-b border-border/20 transition-all duration-300 group cursor-pointer relative",
                        "hover:shadow-lg hover:shadow-[#03093a]/10 hover:scale-[1.01] hover:z-10",
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                        selectedInterviews.includes(interview.id) 
                          ? "bg-gradient-to-r from-[#03093a]/15 via-[#03093a]/10 to-[#03093a]/15 border-l-4 border-l-[#03093a] shadow-md" 
                          : "hover:bg-gradient-to-r hover:from-[#03093a]/12 hover:via-white hover:to-[#ee3127]/8 hover:border-l-4 hover:border-l-[#ee3127]"
                      )}
                    >
                      <TableCell className="w-12">
                        <Checkbox
                          checked={selectedInterviews.includes(interview.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedInterviews([...selectedInterviews, interview.id]);
                            } else {
                              setSelectedInterviews(selectedInterviews.filter(id => id !== interview.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-semibold whitespace-nowrap">{interview.candidateName}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{interview.jobTitle}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        {new Date(interview.date).toLocaleDateString()} at {interview.time}
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <UserCog className="w-4 h-4 text-primary" />
                          {interview.interviewer}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs">{interview.location}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Select
                          value={interview.status}
                          onValueChange={(value) => {
                            setInterviews(interviews.map(i => 
                              i.id === interview.id ? { ...i, status: value } : i
                            ));
                            toast.success(`Interview status updated to ${value}`);
                          }}
                        >
                          <SelectTrigger className="w-36 h-10 rounded-xl border-border/30 bg-white hover:border-[#03093a]/30 focus:border-[#03093a]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl shadow-lg border-border/30 bg-white/80 backdrop-blur-xl">
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                            <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={interviewData.onboardingStatus || "Pending"}
                          onValueChange={(value) => {
                            setInterviews(interviews.map(i => 
                              i.id === interview.id ? { ...i, onboardingStatus: value } : i
                            ));
                            toast.success(`Onboarding status updated to ${value}`);
                          }}
                        >
                          <SelectTrigger className="w-36 h-10 rounded-xl border-border/30 bg-white hover:border-[#03093a]/30 focus:border-[#03093a]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl shadow-lg border-border/30 bg-white/80 backdrop-blur-xl">
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#03093a]/10 hover:text-[#03093a] transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-xl">
                            <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleReschedule(interview.id)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleViewInterview(interview.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              View Details
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

      {/* Schedule Interview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Schedule New Interview
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Schedule an interview with a candidate for a job position
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Candidate *
                </Label>
                <Select value={formData.candidate} onValueChange={(value) => setFormData({ ...formData, candidate: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id.toString()}>
                        {candidate.name} - {candidate.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Job Position *
                </Label>
                <Select value={formData.job} onValueChange={(value) => setFormData({ ...formData, job: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select job" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id.toString()}>
                        {job.title} - {job.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date *
                </Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time *
                </Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Interview Mode *</Label>
                <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In-office">In-office (Chennai HQ)</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  Assign HR Admin *
                </Label>
                <Select value={formData.interviewer} onValueChange={(value) => setFormData({ ...formData, interviewer: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select HR Admin" />
                  </SelectTrigger>
                  <SelectContent>
                    {hrAdmins.map((hr) => (
                      <SelectItem key={hr.id} value={`${hr.name} - HR Admin, ${hr.location}`}>
                        {hr.name} - HR Admin, {hr.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select the HR Admin who will conduct this interview</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="ACE FINS TECH, T Nagar, Chennai, Tamil Nadu"
                className="h-12 rounded-2xl border-border/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes or instructions..."
                rows={4}
                className="rounded-2xl border-border/30"
              />
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
              <Label className="text-sm font-semibold">Auto-Reminders</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="24hours"
                    checked={formData.reminders["24hours"]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        reminders: { ...formData.reminders, "24hours": checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="24hours" className="text-sm font-normal cursor-pointer">
                    Send reminder 24 hours before interview
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="2hours"
                    checked={formData.reminders["2hours"]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        reminders: { ...formData.reminders, "2hours": checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="2hours" className="text-sm font-normal cursor-pointer">
                    Send reminder 2 hours before interview
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="10minutes"
                    checked={formData.reminders["10minutes"]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        reminders: { ...formData.reminders, "10minutes": checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="10minutes" className="text-sm font-normal cursor-pointer">
                    Send reminder 10 minutes before interview
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-border/30">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleSchedule} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Interview Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Reschedule Interview
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Update interview date and time for {selectedInterviewForReschedule?.candidateName}
            </DialogDescription>
          </DialogHeader>
          {selectedInterviewForReschedule && (
            <div className="space-y-6 py-4">
              <div className="p-4 rounded-2xl bg-[#03093a]/5 border border-[#03093a]/10">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Candidate</p>
                    <p className="font-semibold">{selectedInterviewForReschedule.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job Title</p>
                    <p className="font-semibold">{selectedInterviewForReschedule.jobTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Date & Time</p>
                    <p className="font-semibold">
                      {new Date(selectedInterviewForReschedule.date).toLocaleDateString()} at {selectedInterviewForReschedule.time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">New Interview Date *</Label>
                  <Input
                    type="date"
                    value={rescheduleFormData.date}
                    onChange={(e) => setRescheduleFormData({ ...rescheduleFormData, date: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">New Interview Time *</Label>
                  <Input
                    type="time"
                    value={rescheduleFormData.time}
                    onChange={(e) => setRescheduleFormData({ ...rescheduleFormData, time: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/30">
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleRescheduleSubmit} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              <Calendar className="w-5 h-5 mr-2" />
              Reschedule Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewManagement;

