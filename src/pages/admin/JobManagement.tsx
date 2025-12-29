import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, X, Filter, MoreVertical, Trash2, Search, ChevronDown, Upload, ArrowUpDown, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";
import { SortableTableHeader } from "@/components/admin/SortableTableHeader";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const JobManagement = () => {
  const [filters, setFilters] = useState({
    status: "all",
    location: "all",
    hrAssigned: "all",
  });
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      location: "Anna Nagar, Chennai",
      status: "Open",
      created: "2025-01-15",
      applications: 45,
      hrAssigned: "John Doe",
    },
    {
      id: 2,
      title: "Product Manager",
      location: "OMR, Chennai",
      status: "Open",
      created: "2025-01-12",
      applications: 32,
      hrAssigned: "Jane Smith",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Velachery, Chennai",
      status: "Closed",
      created: "2025-01-10",
      applications: 28,
      hrAssigned: "John Doe",
    },
  ]);

  // Available filter options
  const statusOptions = ["Open", "Closed"];
  const locationOptions = ["Anna Nagar, Chennai", "OMR, Chennai", "Velachery, Chennai"];
  const hrOptions = ["John Doe", "Jane Smith"];

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

  // Filter and sort jobs
  let processedJobs = [...jobs];
  
  // Apply column filters
  if (Object.keys(columnFilters).length > 0) {
    processedJobs = processedJobs.filter((job) => {
      if (columnFilters.status && job.status !== columnFilters.status) return false;
      if (columnFilters.location && job.location !== columnFilters.location) return false;
      if (columnFilters.hrAssigned && job.hrAssigned !== columnFilters.hrAssigned) return false;
      if (columnFilters.title && !job.title.toLowerCase().includes(columnFilters.title.toLowerCase())) return false;
      return true;
    });
  }

  // Apply existing filters
  let filteredJobs = processedJobs.filter((job) => {
    if (filters.status && filters.status !== "all" && job.status !== filters.status) return false;
    if (filters.location && filters.location !== "all" && job.location !== filters.location) return false;
    if (filters.hrAssigned && filters.hrAssigned !== "all" && job.hrAssigned !== filters.hrAssigned) return false;
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !job.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Apply sorting
  const sortedJobs = sortConfig ? [...filteredJobs].sort((a, b) => {
    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];
    
    if (sortConfig.key === "id" || sortConfig.key === "applications") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (sortConfig.key === "created") {
      return sortConfig.direction === "asc" 
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }
    
    const comparison = String(aValue || "").localeCompare(String(bValue || ""));
    return sortConfig.direction === "asc" ? comparison : -comparison;
  }) : filteredJobs;

  const toggleFilter = (type: "status" | "location" | "hrAssigned", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({ status: "all", location: "all", hrAssigned: "all" });
  };

  const hasActiveFilters = filters.status !== "all" || filters.location !== "all" || filters.hrAssigned !== "all";

  const handleDeleteClick = (id: number) => {
    setSelectedJob(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedJob) {
      setJobs(jobs.filter(job => job.id !== selectedJob));
      toast.success("Job deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedJob(null);
    }
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
            Job Management
          </h1>
          <p className="text-base text-muted-foreground/80">Manage all job postings and opportunities</p>
        </div>
        <Link to="/admin/jobs/create">
          <Button className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-6">
            <Plus className="w-5 h-5 mr-2" />
            Create Job
          </Button>
        </Link>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 px-4 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                  HR Assigned
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => toggleFilter("hrAssigned", "all")} className={cn(filters.hrAssigned === "all" && "bg-[#03093a]/10 text-[#03093a]")}>
                  All
                </DropdownMenuItem>
                {hrOptions.map((hr) => (
                  <DropdownMenuItem 
                    key={hr}
                    onClick={() => toggleFilter("hrAssigned", hr)}
                    className={cn(filters.hrAssigned === hr && "bg-[#03093a]/10 text-[#03093a]")}
                  >
                    {hr}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 rounded-xl border-border/50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-9 px-4 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                <Upload className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-2xl shadow-[#03093a]/10 bg-gradient-to-br from-white via-white to-[#03093a]/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#03093a]/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#03093a]/10 via-[#03093a]/8 to-[#03093a]/10 border-b-2 border-[#03093a]/20 shadow-sm">
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider w-12">
                    <Checkbox
                      checked={selectedJobs.length === sortedJobs.length && sortedJobs.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedJobs(sortedJobs.map(j => j.id));
                        } else {
                          setSelectedJobs([]);
                        }
                      }}
                    />
                  </TableHead>
                  <SortableTableHeader
                    label="Job ID"
                    sortKey="id"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Title"
                    sortKey="title"
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
                    label="Status"
                    sortKey="status"
                    currentSort={sortConfig}
                    onSort={handleSort}
                    filterable
                    filterOptions={statusOptions}
                    currentFilter={columnFilters.status}
                    onFilter={(value) => handleColumnFilter("status", value)}
                  />
                  <SortableTableHeader
                    label="HR Assigned"
                    sortKey="hrAssigned"
                    currentSort={sortConfig}
                    onSort={handleSort}
                    filterable
                    filterOptions={hrOptions}
                    currentFilter={columnFilters.hrAssigned}
                    onFilter={(value) => handleColumnFilter("hrAssigned", value)}
                  />
                  <SortableTableHeader
                    label="Applications"
                    sortKey="applications"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <SortableTableHeader
                    label="Created On"
                    sortKey="created"
                    currentSort={sortConfig}
                    onSort={handleSort}
                  />
                  <TableHead className="font-bold text-[#03093a] text-sm uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No jobs found matching the filters
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedJobs.map((job, index) => (
                  <motion.tr
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "border-b border-border/20 transition-all duration-300 group cursor-pointer relative",
                      "hover:shadow-lg hover:shadow-[#03093a]/10 hover:scale-[1.01] hover:z-10",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                      selectedJobs.includes(job.id) 
                        ? "bg-gradient-to-r from-[#03093a]/15 via-[#03093a]/10 to-[#03093a]/15 border-l-4 border-l-[#03093a] shadow-md" 
                        : "hover:bg-gradient-to-r hover:from-[#03093a]/12 hover:via-white hover:to-[#ee3127]/8 hover:border-l-4 hover:border-l-[#ee3127]"
                    )}
                  >
                    <TableCell className="w-12">
                      <Checkbox
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedJobs([...selectedJobs, job.id]);
                          } else {
                            setSelectedJobs(selectedJobs.filter(id => id !== job.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-semibold text-[#03093a] group-hover:font-bold transition-colors whitespace-nowrap">#{job.id}</TableCell>
                    <TableCell className="font-medium group-hover:text-foreground/90 transition-colors whitespace-nowrap">{job.title}</TableCell>
                    <TableCell className="text-muted-foreground group-hover:text-foreground/80 transition-colors max-w-xs">{job.location}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold h-6 flex items-center justify-center gap-1.5 shadow-sm transition-all group-hover:scale-110",
                        job.status === "Open" 
                          ? "bg-gradient-to-r from-[#03093a] to-[#03093a]/90 text-white border border-[#03093a] shadow-[#03093a]/20" 
                          : "bg-gradient-to-r from-[#ee3127] to-[#ee3127]/90 text-white border border-[#ee3127] shadow-[#ee3127]/20"
                      )}>
                        {job.status === "Open" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{job.hrAssigned || "Unassigned"}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{job.applications}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{new Date(job.created).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary/50">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-xl">
                          <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => {}}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <Link to={`/admin/jobs/${job.id}/edit`}>
                            <DropdownMenuItem className="rounded-xl cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem 
                            className="rounded-xl cursor-pointer text-[#ee3127] hover:text-[#ee3127] focus:text-[#ee3127] bg-transparent hover:bg-[#ee3127]/10 focus:bg-[#ee3127]/10"
                            onClick={() => handleDeleteClick(job.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2 text-[#ee3127]" />
                            <span className="text-[#ee3127]">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting and all associated data.
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

export default JobManagement;

