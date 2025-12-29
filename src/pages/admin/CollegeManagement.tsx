import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, GraduationCap, Filter, X, Eye, Search, ChevronDown, ArrowUpDown, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PastDrive {
  id: number;
  date: string;
  candidatesCount: number;
  jobTitle?: string;
}

interface College {
  id: number;
  name: string;
  location: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  alternativePhone: string;
  website: string;
  type: string;
  established: string;
  studentsSelected?: number;
  studentsAttended?: number;
  notes?: string;
  eventDateTime?: string;
  eventOrganization?: string;
  pastDrives?: PastDrive[];
}

const CollegeManagement = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<College[]>([
    {
      id: 1,
      name: "Anna University",
      location: "Guindy, Chennai",
      address: "Sardar Patel Road, Guindy, Chennai, Tamil Nadu - 600025",
      contactPerson: "Dr. Rajesh Iyer",
      email: "placement@annauniv.edu",
      phone: "+91 44 2235 7080",
      alternativePhone: "+91 44 2235 7081",
      website: "www.annauniv.edu",
      type: "University",
      established: "1978",
      pastDrives: [
        { id: 1, date: "2024-12-15", candidatesCount: 45, jobTitle: "Software Engineer" },
        { id: 2, date: "2024-11-20", candidatesCount: 32, jobTitle: "Product Manager" },
        { id: 3, date: "2024-10-10", candidatesCount: 28, jobTitle: "Data Analyst" },
      ],
    },
    {
      id: 2,
      name: "SRM Institute of Science and Technology",
      location: "Kattankulathur, Chennai",
      address: "SRM Nagar, Kattankulathur, Chennai, Tamil Nadu - 603203",
      contactPerson: "Dr. Priya Menon",
      email: "placement@srmist.edu.in",
      phone: "+91 44 2745 5510",
      alternativePhone: "+91 44 2745 5511",
      website: "www.srmist.edu.in",
      type: "Private University",
      established: "1985",
      pastDrives: [
        { id: 1, date: "2024-12-10", candidatesCount: 38, jobTitle: "Full Stack Developer" },
        { id: 2, date: "2024-11-05", candidatesCount: 25, jobTitle: "DevOps Engineer" },
      ],
    },
    {
      id: 3,
      name: "VIT University",
      location: "Vandalur, Chennai",
      address: "VIT Campus, Vandalur, Chennai, Tamil Nadu - 600048",
      contactPerson: "Dr. Suresh Kumar",
      email: "placement@vit.ac.in",
      phone: "+91 44 2243 1234",
      alternativePhone: "+91 44 2243 1235",
      website: "www.vit.ac.in",
      type: "Private University",
      established: "1984",
    },
    {
      id: 4,
      name: "Loyola College",
      location: "Nungambakkam, Chennai",
      address: "Sterling Road, Nungambakkam, Chennai, Tamil Nadu - 600034",
      contactPerson: "Dr. Meera Nair",
      email: "placement@loyolacollege.edu",
      phone: "+91 44 2817 5500",
      alternativePhone: "+91 44 2817 5501",
      website: "www.loyolacollege.edu",
      type: "College",
      established: "1925",
    },
    {
      id: 5,
      name: "Madras Christian College",
      location: "Tambaram, Chennai",
      address: "East Tambaram, Chennai, Tamil Nadu - 600059",
      contactPerson: "Dr. Aravind Menon",
      email: "placement@mcc.edu.in",
      phone: "+91 44 2239 0400",
      alternativePhone: "+91 44 2239 0401",
      website: "www.mcc.edu.in",
      type: "College",
      established: "1837",
    },
    {
      id: 6,
      name: "College of Engineering, Guindy",
      location: "Guindy, Chennai",
      address: "Anna University Campus, Guindy, Chennai, Tamil Nadu - 600025",
      contactPerson: "Dr. Priya Sharma",
      email: "placement@ceg.annauniv.edu",
      phone: "+91 44 2235 7082",
      alternativePhone: "+91 44 2235 7083",
      website: "www.ceg.annauniv.edu",
      type: "Engineering College",
      established: "1794",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    type: "all",
    location: "all",
    dateFrom: "",
    dateTo: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<number[]>([]);

  // Available filter options
  const typeOptions = ["University", "Private University", "College", "Engineering College", "Arts College"];
  const locationOptions = Array.from(new Set(colleges.map(c => c.location)));

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    contactPerson: "",
    email: "",
    phone: "",
    alternativePhone: "",
    website: "",
    type: "",
    established: "",
    studentsSelected: "",
    studentsAttended: "",
    notes: "",
    eventDateTime: "",
    eventOrganization: "",
  });

  const handleCreate = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      location: "",
      address: "",
      contactPerson: "",
      email: "",
      phone: "",
      alternativePhone: "",
      website: "",
      type: "",
      established: "",
      studentsSelected: "",
      studentsAttended: "",
      notes: "",
      eventDateTime: "",
      eventOrganization: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (college: College) => {
    setIsEditMode(true);
    setSelectedCollege(college.id);
    setFormData({
      name: college.name,
      location: college.location,
      address: college.address,
      contactPerson: college.contactPerson,
      email: college.email,
      phone: college.phone,
      alternativePhone: college.alternativePhone,
      website: college.website,
      type: college.type,
      established: college.established,
      studentsSelected: college.studentsSelected?.toString() || "",
      studentsAttended: college.studentsAttended?.toString() || "",
      notes: college.notes || "",
      eventDateTime: college.eventDateTime || "",
      eventOrganization: college.eventOrganization || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.location || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate event/drive information fields
    if (!formData.studentsSelected || !formData.studentsAttended || !formData.eventDateTime || !formData.eventOrganization || !formData.notes) {
      toast.error("Please fill in all event/drive information fields");
      return;
    }

    const submitData = {
      ...formData,
      studentsSelected: formData.studentsSelected ? parseInt(formData.studentsSelected) : undefined,
      studentsAttended: formData.studentsAttended ? parseInt(formData.studentsAttended) : undefined,
    };

    if (isEditMode && selectedCollege) {
      setColleges(colleges.map(c => 
        c.id === selectedCollege ? { ...c, ...submitData } : c
      ));
      toast.success("College updated successfully");
    } else {
      const newCollege = {
        id: colleges.length + 1,
        ...submitData,
      };
      setColleges([...colleges, newCollege]);
      toast.success("College added successfully");
    }

    setIsDialogOpen(false);
    setFormData({
      name: "",
      location: "",
      address: "",
      contactPerson: "",
      email: "",
      phone: "",
      alternativePhone: "",
      website: "",
      type: "",
      established: "",
      studentsSelected: "",
      studentsAttended: "",
      notes: "",
      eventDateTime: "",
      eventOrganization: "",
    });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedCollege(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCollege) {
      setColleges(colleges.filter(c => c.id !== selectedCollege));
      toast.success("College deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedCollege(null);
    }
  };

  // Filter colleges
  const filteredColleges = colleges.filter((college) => {
    if (filters.type && filters.type !== "all" && college.type !== filters.type) return false;
    if (filters.location && filters.location !== "all" && college.location !== filters.location) return false;
    
    // Filter by drive date
    if (filters.dateFrom || filters.dateTo) {
      if (!college.pastDrives || college.pastDrives.length === 0) return false;
      
      const hasDriveInRange = college.pastDrives.some((drive) => {
        if (filters.dateFrom && drive.date < filters.dateFrom) return false;
        if (filters.dateTo && drive.date > filters.dateTo) return false;
        return true;
      });
      
      if (!hasDriveInRange) return false;
    }
    
    if (searchQuery && !college.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !college.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !college.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const toggleFilter = (type: "type" | "location", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({ type: "all", location: "all", dateFrom: "", dateTo: "" });
  };

  const hasActiveFilters = filters.type !== "all" || filters.location !== "all" || filters.dateFrom || filters.dateTo;

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
            College Management
          </h1>
          <p className="text-base text-muted-foreground/80">Manage colleges and universities in Chennai</p>
        </div>
        <Button onClick={handleCreate} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Add College
        </Button>
      </motion.div>

      {/* Filters */}
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
            {/* Type Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Type:</span>
              {typeOptions.map((type) => (
                <Badge
                  key={type}
                  onClick={() => toggleFilter("type", type)}
                  className={cn(
                    "cursor-pointer px-3 py-1 text-xs rounded-full font-medium transition-all hover:scale-105 whitespace-nowrap flex-shrink-0",
                    filters.type === type
                      ? "bg-[#03093a] text-white border-[#03093a]"
                      : "bg-white text-foreground border-border hover:bg-[#03093a]/10 hover:border-[#03093a]/30"
                  )}
                >
                  {type}
                </Badge>
              ))}
            </div>

            {/* Location Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Location:</span>
              {locationOptions.map((location) => (
                <Badge
                  key={location}
                  onClick={() => toggleFilter("location", location)}
                  className={cn(
                    "cursor-pointer px-3 py-1 text-xs rounded-full font-medium transition-all hover:scale-105 whitespace-nowrap flex-shrink-0",
                    filters.location === location
                      ? "bg-[#03093a] text-white border-[#03093a]"
                      : "bg-white text-foreground border-border hover:bg-[#03093a]/10 hover:border-[#03093a]/30"
                  )}
                >
                  {location}
                </Badge>
              ))}
            </div>

            {/* Date Filters */}
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Drive Date From:</span>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="h-8 px-2 text-xs rounded-xl border-border/30 w-auto"
              />
            </div>
            <div className="flex items-center gap-1.5 flex-nowrap flex-shrink-0">
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Drive Date To:</span>
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
                  placeholder="Search colleges..."
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
                Showing {filteredColleges.length} of {colleges.length} colleges
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#03093a]/5 border-b border-[#03093a]/10">
                  <TableHead className="font-semibold text-foreground/80 w-12">
                    <CheckboxComponent
                      checked={selectedColleges.length === filteredColleges.length && filteredColleges.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedColleges(filteredColleges.map(college => college.id));
                        } else {
                          setSelectedColleges([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/80">College Name</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Location</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Type</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Contact Person</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Email</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Phone</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Alt. Phone</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Past Drives</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {filteredColleges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                    No colleges found matching the filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredColleges.map((college, index) => (
                <TableRow
                  key={college.id}
                  className={cn(
                    "border-b border-border/20 transition-all duration-300 group cursor-pointer relative",
                    "hover:shadow-lg hover:shadow-[#03093a]/10 hover:scale-[1.01] hover:z-10",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                    selectedColleges.includes(college.id) 
                      ? "bg-gradient-to-r from-[#03093a]/15 via-[#03093a]/10 to-[#03093a]/15 border-l-4 border-l-[#03093a] shadow-md" 
                      : "hover:bg-gradient-to-r hover:from-[#03093a]/12 hover:via-white hover:to-[#ee3127]/8 hover:border-l-4 hover:border-l-[#ee3127]"
                  )}
                >
                  <TableCell className="w-12">
                    <CheckboxComponent
                      checked={selectedColleges.includes(college.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedColleges([...selectedColleges, college.id]);
                        } else {
                          setSelectedColleges(selectedColleges.filter(id => id !== college.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-semibold whitespace-nowrap">{college.name}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs">{college.location}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{college.type}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{college.contactPerson}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{college.email}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{college.phone}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{college.alternativePhone || "N/A"}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {college.pastDrives && college.pastDrives.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="w-fit rounded-full">
                          {college.pastDrives.length} drive{college.pastDrives.length > 1 ? 's' : ''}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Latest: {new Date(college.pastDrives[0].date).toLocaleDateString()} ({college.pastDrives[0].candidatesCount} candidates)
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No drives</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#03093a]/10 hover:text-[#03093a] transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-xl">
                        <DropdownMenuItem 
                          onClick={() => navigate(`/admin/colleges/${college.id}/drives`)} 
                          className="rounded-xl cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Drives
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEdit(college)} 
                          className="rounded-xl cursor-pointer"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(college.id)} 
                          className="rounded-xl cursor-pointer text-[#ee3127] hover:text-[#ee3127] focus:text-[#ee3127] bg-transparent hover:bg-[#ee3127]/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2 text-[#ee3127]" />
                          <span className="text-[#ee3127]">Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-border/30">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              {isEditMode ? "Edit College" : "Add New College"}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {isEditMode ? "Update college information" : "Add a new college to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>College Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Anna University"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Location *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Guindy, Chennai"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Full Address *</Label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Complete address with pincode"
                rows={3}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Dr. Rajesh Iyer"
                />
              </div>
              <div className="space-y-2">
                <Label>College Type</Label>
                <Input
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="University / Private University / College"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="placement@college.edu"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 44 1234 5678"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Alternative Phone</Label>
              <Input
                value={formData.alternativePhone}
                onChange={(e) => setFormData({ ...formData, alternativePhone: e.target.value })}
                placeholder="+91 44 1234 5679"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="www.college.edu"
                />
              </div>
              <div className="space-y-2">
                <Label>Established Year</Label>
                <Input
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                  placeholder="1978"
                />
              </div>
            </div>
            
            {/* Event/Drive Information Section */}
            <div className="pt-4 border-t border-border/30">
              <Label className="text-base font-semibold mb-4 block">Event/Drive Information</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>No. of Students Selected *</Label>
                  <Input
                    type="number"
                    value={formData.studentsSelected}
                    onChange={(e) => setFormData({ ...formData, studentsSelected: e.target.value })}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>No. of Students Attended *</Label>
                  <Input
                    type="number"
                    value={formData.studentsAttended}
                    onChange={(e) => setFormData({ ...formData, studentsAttended: e.target.value })}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Date & Time *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.eventDateTime}
                    onChange={(e) => setFormData({ ...formData, eventDateTime: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event Organization *</Label>
                  <Input
                    value={formData.eventOrganization}
                    onChange={(e) => setFormData({ ...formData, eventOrganization: e.target.value })}
                    placeholder="Organization name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label>Notes *</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add notes about the event/drive..."
                  rows={4}
                  required
                />
              </div>
            </div>
            
            {/* Past Drives Section - Only show in edit mode */}
            {isEditMode && (
              <div className="pt-4 border-t border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">Past Placement Drives</Label>
                </div>
                {selectedCollege && colleges.find(c => c.id === selectedCollege)?.pastDrives && colleges.find(c => c.id === selectedCollege)!.pastDrives!.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {colleges.find(c => c.id === selectedCollege)!.pastDrives!.map((drive) => (
                      <div key={drive.id} className="p-3 rounded-xl bg-[#03093a]/5 border border-[#03093a]/10 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="rounded-full">
                              {new Date(drive.date).toLocaleDateString()}
                            </Badge>
                            {drive.jobTitle && (
                              <span className="text-sm text-muted-foreground">{drive.jobTitle}</span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {drive.candidatesCount} candidate{drive.candidatesCount > 1 ? 's' : ''} participated
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">No past drives recorded</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="pt-6 border-t border-border/30">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              {isEditMode ? "Update" : "Add"} College
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete College?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the college record and all associated data.
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
    </div>
  );
};

export default CollegeManagement;

