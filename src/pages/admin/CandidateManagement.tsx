import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Plus, Eye, Edit, Trash2, Upload, UserPlus, FileSpreadsheet, X, Filter, MoreVertical, Download, FileDown, Search, ChevronDown, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import { SortableTableHeader } from "@/components/admin/SortableTableHeader";
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
import { useState, useRef } from "react";
import * as XLSX from "xlsx";

const CandidateManagement = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const [isExcelDialogOpen, setIsExcelDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // HR Admins list
  const hrAdmins = [
    { id: 1, name: "Aravind Kumar", email: "aravind.kumar@acefinstech.com", location: "OMR, Chennai" },
    { id: 2, name: "Priya Menon", email: "priya.menon@acefinstech.com", location: "Velachery, Chennai" },
    { id: 3, name: "Rajesh Iyer", email: "rajesh.iyer@acefinstech.com", location: "Anna Nagar, Chennai" },
  ];

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      jobApplied: "Senior Software Engineer",
      location: "T Nagar, Chennai",
      experience: "5 years",
      status: "Active",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@example.com",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      hrName: "Aravind Kumar",
      hrEmail: "aravind.kumar@acefinstech.com",
      branchName: "T Nagar Branch",
      walkInSource: "Website",
      candidateStatus: "Active",
      statusDate: new Date().toISOString(),
      jobTitle: "Senior Software Engineer",
    },
    {
      id: 2,
      name: "Priya Sharma",
      jobApplied: "Product Manager",
      location: "OMR, Chennai",
      experience: "7 years",
      status: "Active",
      phone: "+91 98765 43211",
      email: "priya.sharma@example.com",
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      hrName: "Priya Menon",
      hrEmail: "priya.menon@acefinstech.com",
      branchName: "OMR Branch",
      walkInSource: "Referral",
      candidateStatus: "Active",
      statusDate: new Date().toISOString(),
      jobTitle: "Product Manager",
    },
    {
      id: 3,
      name: "Meera Nair",
      jobApplied: "UI/UX Designer",
      location: "Velachery, Chennai",
      experience: "3 years",
      status: "Active",
      phone: "+91 98765 43212",
      email: "meera.nair@example.com",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      hrName: "Rajesh Iyer",
      hrEmail: "rajesh.iyer@acefinstech.com",
      branchName: "Velachery Branch",
      walkInSource: "Walk-In",
      candidateStatus: "Active",
      statusDate: new Date().toISOString(),
      jobTitle: "UI/UX Designer",
    },
  ]);

  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "Chennai, Tamil Nadu",
    dateOfBirth: "",
    gender: "",
    highestEducation: "",
    degreeCategory: "",
    skills: [] as string[],
    address: "",
    experience: "",
    resume: null as File | null,
    hrAdminId: "",
    branchName: "",
    walkInSource: "",
    candidateStatus: "Active",
    statusDate: "",
    jobTitle: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    location: "all",
  });
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  // Available filter options
  const statusOptions = ["Active", "Inactive"];
  const locationOptions = ["T Nagar, Chennai", "OMR, Chennai", "Velachery, Chennai"];

  // Handle sorting
  const handleSort = (key: string, direction: "asc" | "desc") => {
    if (key === "") {
      setSortConfig(null);
    } else {
      setSortConfig({ key, direction });
    }
  };

  // Handle column filtering
  const handleColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value || undefined,
    }));
  };

  // Filter candidates
  let processedCandidates = [...candidates];
  
  // Apply column filters
  if (Object.keys(columnFilters).length > 0) {
    processedCandidates = processedCandidates.filter((candidate) => {
      if (columnFilters.status && candidate.status !== columnFilters.status) return false;
      if (columnFilters.location && candidate.location !== columnFilters.location) return false;
      if (columnFilters.name && !candidate.name.toLowerCase().includes(columnFilters.name.toLowerCase())) return false;
      return true;
    });
  }

  const filteredCandidates = processedCandidates.filter((candidate) => {
    if (filters.status && filters.status !== "all" && candidate.status !== filters.status) return false;
    if (filters.location && filters.location !== "all" && candidate.location !== filters.location) return false;
    if (searchQuery && !candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !candidate.jobApplied.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !candidate.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Apply sorting
  const sortedCandidates = sortConfig ? [...filteredCandidates].sort((a, b) => {
    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];
    
    if (sortConfig.key === "experience") {
      const aExp = parseInt(aValue?.match(/\d+/)?.[0] || "0");
      const bExp = parseInt(bValue?.match(/\d+/)?.[0] || "0");
      return sortConfig.direction === "asc" ? aExp - bExp : bExp - aExp;
    }
    
    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc" 
        ? new Date(aValue || 0).getTime() - new Date(bValue || 0).getTime()
        : new Date(bValue || 0).getTime() - new Date(aValue || 0).getTime();
    }
    
    const comparison = String(aValue || "").localeCompare(String(bValue || ""));
    return sortConfig.direction === "asc" ? comparison : -comparison;
  }) : filteredCandidates;

  const toggleFilter = (type: "status" | "location", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({ status: "all", location: "all" });
  };

  const hasActiveFilters = filters.status !== "all" || filters.location !== "all";

  const handleView = (id: number) => {
    navigate(`/admin/candidates/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/candidates/${id}/edit`);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCandidate(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCandidate) {
      setCandidates(candidates.filter(c => c.id !== selectedCandidate));
      toast.success("Candidate deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedCandidate(null);
    }
  };

  // Format relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleWalkInAdd = () => {
    setIsManualDialogOpen(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "Chennai, Tamil Nadu",
      dateOfBirth: "",
      gender: "",
      highestEducation: "",
      degreeCategory: "",
      skills: [],
      address: "",
      experience: "",
      resume: null,
      hrAdminId: "",
      branchName: "",
      walkInSource: "",
      candidateStatus: "Active",
      statusDate: "",
      jobTitle: "",
    });
    setSkillInput("");
  };

  const handleExcelUpload = () => {
    setIsExcelDialogOpen(true);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleWalkInSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.gender || !formData.highestEducation) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    const newCandidate = {
      id: candidates.length + 1,
      name: formData.fullName,
      jobApplied: formData.jobTitle || "Not Applied",
      location: formData.location,
      experience: formData.experience || "0 years",
      status: "Active",
      phone: formData.phone,
      email: formData.email,
      createdAt: new Date().toISOString(),
      hrName: hrAdmins.find(hr => hr.id.toString() === formData.hrAdminId)?.name || "",
      hrEmail: hrAdmins.find(hr => hr.id.toString() === formData.hrAdminId)?.email || "",
      branchName: formData.branchName,
      walkInSource: formData.walkInSource,
      candidateStatus: formData.candidateStatus,
      statusDate: formData.statusDate || new Date().toISOString(),
      jobTitle: formData.jobTitle,
    };

    setCandidates([...candidates, newCandidate]);
    const updateTime = formatRelativeTime(newCandidate.createdAt);
    toast.success(`Candidate added successfully! (Added ${updateTime})`);
    setIsManualDialogOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "Chennai, Tamil Nadu",
      dateOfBirth: "",
      gender: "",
      highestEducation: "",
      degreeCategory: "",
      skills: [],
      address: "",
      experience: "",
      resume: null,
      hrAdminId: "",
      branchName: "",
      walkInSource: "",
      candidateStatus: "Active",
      statusDate: "",
      jobTitle: "",
    });
    setSkillInput("");
  };

  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        if (jsonData.length === 0) {
          toast.error("Excel file is empty");
          return;
        }

        // Process each row
        const newCandidates: typeof candidates = [];
        jsonData.forEach((row: any, index: number) => {
          const candidate = {
            id: candidates.length + index + 1,
            name: row["Full Name"] || row["Name"] || row["fullName"] || row["name"] || `Candidate ${index + 1}`,
            jobApplied: row["Job Applied"] || row["Job"] || row["jobApplied"] || row["Job Title"] || "Not Applied",
            location: row["Location"] || row["location"] || "Chennai, Tamil Nadu",
            experience: row["Experience"] || row["experience"] || row["Years of Experience"] || "0 years",
            status: "Active",
            phone: row["Phone"] || row["phone"] || "",
            email: row["Email"] || row["email"] || "",
            createdAt: new Date().toISOString(),
            hrName: row["HR Name"] || row["hrName"] || (() => {
              const hrId = row["HR Admin ID"] || row["hrAdminId"];
              if (hrId) {
                const hr = hrAdmins.find(h => h.id.toString() === hrId.toString());
                return hr?.name || "";
              }
              return "";
            })(),
            hrEmail: row["HR Email"] || row["hrEmail"] || (() => {
              const hrId = row["HR Admin ID"] || row["hrAdminId"];
              if (hrId) {
                const hr = hrAdmins.find(h => h.id.toString() === hrId.toString());
                return hr?.email || "";
              }
              return "";
            })(),
            branchName: row["Branch Name"] || row["branchName"] || "",
            walkInSource: row["Walk-in Source"] || row["walkInSource"] || "",
            candidateStatus: row["Status"] || row["status"] || "Active",
            statusDate: row["Status Date"] || row["statusDate"] || new Date().toISOString(),
            jobTitle: row["Job Title"] || row["Job Applied"] || "",
          };
          newCandidates.push(candidate);
        });

        setCandidates([...candidates, ...newCandidates]);
        toast.success(`${newCandidates.length} candidate(s) imported successfully!`);
        setIsExcelDialogOpen(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        toast.error("Error reading Excel file. Please ensure it's a valid Excel file.");
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExportToGoogleSheets = () => {
    // Export to CSV format (Google Sheets compatible)
    const exportData = filteredCandidates.map(candidate => {
      const c = candidate as any;
      return {
        "Name": candidate.name,
        "Email": c.email || "",
        "Phone": c.phone || "",
        "Location": candidate.location,
        "Job Applied": candidate.jobApplied,
        "Experience": candidate.experience,
        "Status": candidate.status,
        "HR Name": c.hrName || "",
        "HR Email": c.hrEmail || "",
        "Branch Name": c.branchName || "",
        "Walk-in Source": c.walkInSource || "",
        "Candidate Status": c.candidateStatus || "",
        "Status Date": c.statusDate ? new Date(c.statusDate).toLocaleDateString() : "",
        "Job Title": c.jobTitle || "",
        "Added": c.createdAt ? formatRelativeTime(c.createdAt) : "",
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    XLSX.writeFile(wb, `candidates_export_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Candidates exported successfully!");
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        "Full Name": "Rajesh Kumar",
        "Email": "rajesh.kumar@example.com",
        "Phone": "+91 98765 43210",
        "Location": "T Nagar, Chennai",
        "Date of Birth": "1990-05-15",
        "Gender": "Male",
        "Highest Education": "Bachelor's Degree",
        "Degree Category": "B.Tech",
        "Skills": "React, TypeScript, Node.js",
        "Address": "123, Main Street, T Nagar, Chennai",
        "Experience": "5 years",
        "Job Applied": "Senior Software Engineer",
        "HR Name": "Aravind Kumar",
        "HR Email": "aravind.kumar@acefinstech.com",
        "Branch Name": "T Nagar Branch",
        "Walk-in Source": "Website",
        "Status": "Active",
        "Status Date": new Date().toISOString().split('T')[0],
        "Job Title": "Senior Software Engineer",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    XLSX.writeFile(wb, "candidate_template.xlsx");
    toast.success("Template downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between pb-4 border-b border-border/30"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
            Candidate Management
          </h1>
          <p className="text-base text-muted-foreground/80">Manage all candidates from Chennai</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => navigate("/admin/resume-storage")}
            variant="outline"
            className="rounded-2xl h-12 px-6 border-primary/20 hover:bg-primary/5"
          >
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Resume Storage
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="rounded-2xl h-12 px-6 border-primary/20 hover:bg-primary/5"
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-0 shadow-xl w-56">
              <DropdownMenuItem onClick={handleExportToGoogleSheets} className="rounded-xl cursor-pointer">
                <FileDown className="w-4 h-4 mr-2" />
                Export to Google Sheets
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-6">
                <Plus className="w-5 h-5 mr-2" />
                Add Candidate
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-0 shadow-xl w-56">
              <DropdownMenuItem onClick={handleWalkInAdd} className="rounded-xl cursor-pointer">
                <UserPlus className="w-4 h-4 mr-2" />
                Walk-In
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExcelUpload} className="rounded-xl cursor-pointer">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Upload via Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Reference-style Filter Bar */}
      <Card className="border-0 shadow-2xl shadow-[#03093a]/10 bg-gradient-to-br from-white via-white to-[#03093a]/5 backdrop-blur-xl rounded-3xl border border-[#03093a]/10">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Dropdowns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 px-4 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                  Status
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => toggleFilter("status", "all")} className={cn(filters.status === "all" && "bg-[#03093a]/10 text-[#03093a]")}>
                  All
                </DropdownMenuItem>
                {statusOptions.map((status) => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={() => toggleFilter("status", status)}
                    className={cn(filters.status === status && "bg-[#03093a]/10 text-[#03093a]")}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 px-4 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                  Location
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-xl">
                <DropdownMenuItem onClick={() => toggleFilter("location", "all")} className={cn(filters.location === "all" && "bg-[#03093a]/10 text-[#03093a]")}>
                  All
                </DropdownMenuItem>
                {locationOptions.map((location) => (
                  <DropdownMenuItem 
                    key={location}
                    onClick={() => toggleFilter("location", location)}
                    className={cn(filters.location === location && "bg-[#03093a]/10 text-[#03093a]")}
                  >
                    {location}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 rounded-xl border-border/50 focus:border-[#03093a]/50 focus:ring-[#03093a]/20"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9 px-4 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                    <Upload className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border-0 shadow-xl w-56">
                  <DropdownMenuItem onClick={handleExportToGoogleSheets} className="rounded-xl cursor-pointer">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export to Google Sheets
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-2xl shadow-[#03093a]/10 bg-gradient-to-br from-white via-white to-[#03093a]/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#03093a]/10">
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#03093a]/10 via-[#03093a]/8 to-[#03093a]/10 border-b-2 border-[#03093a]/20 shadow-sm">
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider w-12">
                    <CheckboxComponent
                      checked={selectedCandidates.length === sortedCandidates.length && sortedCandidates.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCandidates(sortedCandidates.map(c => c.id));
                        } else {
                          setSelectedCandidates([]);
                        }
                      }}
                    />
                  </TableHead>
                  <SortableTableHeader
                    label="Name"
                    sortKey="name"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Job Applied"
                    sortKey="jobApplied"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Location"
                    sortKey="location"
                    currentSort={sortConfig}
                    onSort={handleSort}
                    filterable
                    filterOptions={locationOptions}
                    currentFilter={columnFilters.location}
                    onFilter={(value) => handleColumnFilter("location", value)}
                  />
                  <SortableTableHeader
                    label="Phone"
                    sortKey="phone"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Added"
                    sortKey="createdAt"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Experience"
                    sortKey="experience"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Status"
                    sortKey="status"
                    currentSort={sortConfig}
                    onSort={handleSort}
                    filterable
                    filterOptions={statusOptions}
                    currentFilter={columnFilters.status}
                    onFilter={(value) => handleColumnFilter("status", value)}
                  />
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCandidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No candidates found matching the filters
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedCandidates.map((candidate, index) => {
                    const candidateData = candidate as any;
                    return (
                        <TableRow
                          key={candidate.id}
                          className={cn(
                            "border-b border-border/20 transition-all duration-300 group cursor-pointer relative",
                            "hover:shadow-lg hover:shadow-[#03093a]/10 hover:scale-[1.01] hover:z-10",
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                            selectedCandidates.includes(candidate.id) 
                              ? "bg-gradient-to-r from-[#03093a]/15 via-[#03093a]/10 to-[#03093a]/15 border-l-4 border-l-[#03093a] shadow-md" 
                              : "hover:bg-gradient-to-r hover:from-[#03093a]/12 hover:via-white hover:to-[#ee3127]/8 hover:border-l-4 hover:border-l-[#ee3127]"
                          )}
                        >
                          <TableCell>
                            <CheckboxComponent
                              checked={selectedCandidates.includes(candidate.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCandidates([...selectedCandidates, candidate.id]);
                                } else {
                                  setSelectedCandidates(selectedCandidates.filter(id => id !== candidate.id));
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                          <TableCell className="font-semibold text-foreground group-hover:text-[#03093a] transition-colors group-hover:font-bold whitespace-nowrap">{candidate.name}</TableCell>
                          <TableCell className="text-muted-foreground group-hover:text-foreground/90 transition-colors font-medium whitespace-nowrap">{candidate.jobApplied}</TableCell>
                          <TableCell className="text-muted-foreground group-hover:text-foreground/80 transition-colors max-w-xs">{candidate.location}</TableCell>
                          <TableCell className="text-muted-foreground group-hover:text-foreground/80 transition-colors whitespace-nowrap">{candidateData.phone || "N/A"}</TableCell>
                          <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                            {candidateData.createdAt ? formatRelativeTime(candidateData.createdAt) : "N/A"}
                          </TableCell>
                          <TableCell className="font-medium whitespace-nowrap">{candidate.experience}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge className={cn(
                              "rounded-full px-3 py-1 text-xs font-semibold h-6 flex items-center justify-center shadow-sm transition-all group-hover:scale-110",
                              candidate.status === "Active" 
                                ? "bg-gradient-to-r from-[#03093a] to-[#03093a]/90 text-white border border-[#03093a] shadow-[#03093a]/20" 
                                : "bg-gradient-to-r from-[#ee3127] to-[#ee3127]/90 text-white border border-[#ee3127] shadow-[#ee3127]/20"
                            )}>
                              {candidate.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#03093a]/10 hover:text-[#03093a] transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-xl">
                                <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleView(candidate.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => handleEdit(candidate.id)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="rounded-xl cursor-pointer text-[#ee3127] hover:text-[#ee3127] focus:text-[#ee3127] bg-transparent hover:bg-[#ee3127]/10 focus:bg-[#ee3127]/10"
                            onClick={() => handleDeleteClick(candidate.id)}
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

      {/* Manual Add Dialog */}
      <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              Add Walk-In Candidate
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Enter candidate information to add them to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Full Name *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajesh.kumar@example.com"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Phone *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Location *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Chennai, Tamil Nadu"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Date of Birth *</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Highest Education *</Label>
                <Select value={formData.highestEducation} onValueChange={(value) => setFormData({ ...formData, highestEducation: value, degreeCategory: "" })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="high-school">High School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.highestEducation === "bachelor" && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Degree Category *</Label>
                  <Select value={formData.degreeCategory} onValueChange={(value) => setFormData({ ...formData, degreeCategory: value })}>
                    <SelectTrigger className="h-12 rounded-2xl border-border/30">
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="BSc">BSc</SelectItem>
                      <SelectItem value="BBA">BBA</SelectItem>
                      <SelectItem value="B.Tech">B.Tech</SelectItem>
                      <SelectItem value="BE">BE</SelectItem>
                      <SelectItem value="B.Com">B.Com</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {formData.highestEducation === "master" && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Degree Category *</Label>
                  <Select value={formData.degreeCategory} onValueChange={(value) => setFormData({ ...formData, degreeCategory: value })}>
                    <SelectTrigger className="h-12 rounded-2xl border-border/30">
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MCA">MCA</SelectItem>
                      <SelectItem value="MSc">MSc</SelectItem>
                      <SelectItem value="MBA">MBA</SelectItem>
                      <SelectItem value="M.Tech">M.Tech</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                      <SelectItem value="M.Com">M.Com</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Experience</Label>
                <Input
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="5 years"
                  className="h-12 rounded-2xl border-border/30"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Address</Label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Complete address"
                rows={3}
                className="rounded-2xl border-border/30"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Skills *</Label>
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Enter skill and press Enter"
                  className="h-12 rounded-2xl border-border/30"
                />
                <Button type="button" onClick={handleAddSkill} className="rounded-2xl h-12 px-6">
                  Add
                </Button>
              </div>
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 rounded-full flex items-center gap-2">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Resume (PDF/DOC/DOCX)</Label>
              <div className="flex items-center gap-4">
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
                      setFormData({ ...formData, resume: file });
                      toast.success("Resume uploaded successfully");
                    }
                  }}
                  className="h-12 rounded-2xl border-border/30 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {formData.resume && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Upload className="w-4 h-4" />
                    <span>{formData.resume.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setFormData({ ...formData, resume: null })}
                      className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
            </div>

            {/* New Fields */}
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border/30">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">HR Admin *</Label>
                <Select value={formData.hrAdminId} onValueChange={(value) => setFormData({ ...formData, hrAdminId: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select HR Admin" />
                  </SelectTrigger>
                  <SelectContent>
                    {hrAdmins.map((hr) => (
                      <SelectItem key={hr.id} value={hr.id.toString()}>
                        {hr.name} - {hr.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.hrAdminId && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {hrAdmins.find(hr => hr.id.toString() === formData.hrAdminId)?.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Branch Name</Label>
                <Input
                  value={formData.branchName}
                  onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                  placeholder="T Nagar Branch"
                  className="h-12 rounded-2xl border-border/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Walk-in Source</Label>
                <Input
                  value={formData.walkInSource}
                  onChange={(e) => setFormData({ ...formData, walkInSource: e.target.value })}
                  placeholder="Website, Referral, Walk-In, etc."
                  className="h-12 rounded-2xl border-border/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status</Label>
                <Select value={formData.candidateStatus} onValueChange={(value) => setFormData({ ...formData, candidateStatus: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status Date</Label>
                <Input
                  type="date"
                  value={formData.statusDate}
                  onChange={(e) => setFormData({ ...formData, statusDate: e.target.value })}
                  className="h-12 rounded-2xl border-border/30"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-semibold">Job Title / Position</Label>
                <Input
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="Senior Software Engineer"
                  className="h-12 rounded-2xl border-border/30"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t border-border/30">
            <Button variant="outline" onClick={() => setIsManualDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleWalkInSubmit} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              <UserPlus className="w-5 h-5 mr-2" />
              Add Candidate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Excel Upload Dialog */}
      <Dialog open={isExcelDialogOpen} onOpenChange={setIsExcelDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-white" />
              </div>
              Upload Candidates via Excel
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Upload an Excel file to import multiple candidates at once
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="p-6 border-2 border-dashed border-border/30 rounded-2xl text-center">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-sm font-semibold mb-2">Upload Excel File</p>
              <p className="text-xs text-muted-foreground mb-4">
                Supported formats: .xlsx, .xls
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelFileChange}
                className="hidden"
                id="excel-upload"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl h-12 px-6"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
            <div className="p-4 bg-secondary/30 rounded-2xl">
              <p className="text-sm font-semibold mb-2">Excel Template Format:</p>
              <p className="text-xs text-muted-foreground mb-3">
                Your Excel file should include columns: Full Name, Email, Phone, Location, Date of Birth, Gender, Highest Education, Degree Category, Skills, Address, Experience, Job Applied, HR Name, HR Email, Branch Name, Walk-in Source, Status, Status Date, Job Title
              </p>
              <Button
                variant="outline"
                onClick={downloadTemplate}
                className="rounded-2xl h-10 px-4 text-sm"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t border-border/30">
            <Button variant="outline" onClick={() => setIsExcelDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Candidate?</AlertDialogTitle>
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

export default CandidateManagement;

