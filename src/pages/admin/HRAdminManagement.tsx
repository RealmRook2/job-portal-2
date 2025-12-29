import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, UserCog, Power, PowerOff, Clock, History, AlertCircle, Search, ChevronDown, ArrowUpDown, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HRAdminManagement = () => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [selectedHRAdmin, setSelectedHRAdmin] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHRAdmins, setSelectedHRAdmins] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    location: "all",
  });

  const [hrAdmins, setHRAdmins] = useState([
    {
      id: 1,
      name: "Aravind Kumar",
      email: "aravind.kumar@acefinstech.com",
      role: "HR Admin",
      location: "OMR, Chennai",
      phone: "+91 98765 43210",
      alternativePhone: "+91 99887 76655",
      status: "Active",
      assignedJobs: 12,
      lastLogin: "2024-06-15 14:32:15",
      timeSpent: "2h 15m",
      isOnline: true,
      isDeactivated: false,
      deactivatedDate: null,
    },
    {
      id: 2,
      name: "Priya Menon",
      email: "priya.menon@acefinstech.com",
      role: "HR Admin",
      location: "Velachery, Chennai",
      phone: "+91 98765 43211",
      alternativePhone: "+91 99887 76656",
      status: "Active",
      assignedJobs: 8,
      lastLogin: "2024-06-15 13:45:22",
      timeSpent: "1h 30m",
      isOnline: false,
      isDeactivated: false,
      deactivatedDate: null,
    },
    {
      id: 3,
      name: "Rajesh Iyer",
      email: "rajesh.iyer@acefinstech.com",
      role: "HR Admin",
      location: "Anna Nagar, Chennai",
      phone: "+91 98765 43212",
      alternativePhone: "+91 99887 76657",
      status: "Deactivated",
      assignedJobs: 5,
      lastLogin: "2024-06-14 10:20:00",
      timeSpent: "0m",
      isOnline: false,
      isDeactivated: true,
      deactivatedDate: "2024-06-14 10:20:00",
    },
    {
      id: 4,
      name: "Super Admin 1",
      email: "superadmin1@acefinstech.com",
      role: "Super Admin",
      location: "Chennai, Tamil Nadu",
      phone: "+91 98765 43213",
      alternativePhone: "+91 99887 76658",
      status: "Active",
      assignedJobs: 0,
      lastLogin: "2024-06-15 15:00:00",
      timeSpent: "3h 45m",
      isOnline: true,
      isDeactivated: false,
      deactivatedDate: null,
    },
    {
      id: 5,
      name: "Super Admin 2",
      email: "superadmin2@acefinstech.com",
      role: "Super Admin",
      location: "Chennai, Tamil Nadu",
      phone: "+91 98765 43214",
      alternativePhone: "+91 99887 76659",
      status: "Active",
      assignedJobs: 0,
      lastLogin: "2024-06-15 12:30:00",
      timeSpent: "0m",
      isOnline: false,
      isDeactivated: false,
      deactivatedDate: null,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    alternativePhone: "",
    location: "Chennai, Tamil Nadu",
    role: "HR Admin",
    password: "",
    status: "Active",
  });

  const handleCreate = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      alternativePhone: "",
      location: "Chennai, Tamil Nadu",
      role: "HR Admin",
      password: "",
      status: "Active",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (hrAdmin: typeof hrAdmins[0]) => {
    setIsEditMode(true);
    setFormData({
      name: hrAdmin.name,
      email: hrAdmin.email,
      phone: hrAdmin.phone,
      alternativePhone: (hrAdmin as any).alternativePhone || "",
      location: hrAdmin.location,
      role: hrAdmin.role,
      password: "",
      status: hrAdmin.status,
    });
    setSelectedHRAdmin(hrAdmin.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check Super Admin limit (max 2)
    if (!isEditMode && formData.role === "Super Admin") {
      const superAdminCount = hrAdmins.filter(hr => hr.role === "Super Admin").length;
      if (superAdminCount >= 2) {
        toast.error("Maximum 2 Super Admin accounts allowed");
        return;
      }
    }

    if (isEditMode && selectedHRAdmin) {
      setHRAdmins(hrAdmins.map(hr => 
        hr.id === selectedHRAdmin ? { 
          ...hr, 
          ...formData, 
          assignedJobs: hr.assignedJobs,
          lastLogin: hr.lastLogin || new Date().toISOString(),
          timeSpent: hr.timeSpent || "0m",
          isOnline: hr.isOnline || false,
          isDeactivated: hr.status === "Deactivated" ? (hr as any).isDeactivated || false : false,
          deactivatedDate: hr.status === "Deactivated" ? (hr as any).deactivatedDate || null : null,
        } : hr
      ));
      toast.success("HR Admin updated successfully");
    } else {
      const newHRAdmin = {
        id: hrAdmins.length + 1,
        ...formData,
        assignedJobs: 0,
        lastLogin: null,
        timeSpent: "0m",
        isOnline: false,
        isDeactivated: formData.status === "Deactivated",
        deactivatedDate: formData.status === "Deactivated" ? new Date().toISOString() : null,
      };
      setHRAdmins([...hrAdmins, newHRAdmin]);
      toast.success("HR Admin created successfully");
    }

    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      alternativePhone: "",
      location: "Chennai, Tamil Nadu",
      role: "HR Admin",
      password: "",
      status: "Active",
    });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedHRAdmin(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedHRAdmin) {
      setHRAdmins(hrAdmins.filter(hr => hr.id !== selectedHRAdmin));
      toast.success("HR Admin deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedHRAdmin(null);
    }
  };

  const handleDeactivateRequest = (id: number) => {
    setSelectedHRAdmin(id);
    setDeactivateDialogOpen(true);
  };

  const handleDeactivateConfirm = () => {
    if (selectedHRAdmin) {
      const hrAdmin = hrAdmins.find(hr => hr.id === selectedHRAdmin);
      if (hrAdmin) {
        setHRAdmins(hrAdmins.map(hr => 
          hr.id === selectedHRAdmin ? { 
            ...hr, 
            status: "Deactivated",
            isDeactivated: true,
            deactivatedDate: new Date().toISOString(),
            isOnline: false,
          } : hr
        ));
        toast.success(`${hrAdmin.name} has been deactivated. They will not be able to login. This action cannot be undone.`);
      }
      setDeactivateDialogOpen(false);
      setSelectedHRAdmin(null);
    }
  };

  // Filter options
  const roleOptions = ["HR Admin", "Super Admin"];
  const statusOptions = ["Active", "Deactivated"];
  const locationOptions = Array.from(new Set(hrAdmins.map(hr => hr.location)));

  // Filter and search HR Admins
  const filteredHRAdmins = hrAdmins.filter((hr) => {
    if (filters.role !== "all" && hr.role !== filters.role) return false;
    if (filters.status !== "all" && hr.status !== filters.status) return false;
    if (filters.location !== "all" && hr.location !== filters.location) return false;
    if (searchQuery && !hr.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !hr.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleFilter = (type: "role" | "status" | "location", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
  };

  return (
    <div className="space-y-8 w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between pb-4 border-b border-border/30 flex-wrap gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
            HR Admin Management
          </h1>
          <p className="text-base text-muted-foreground/80">Manage HR administrators and their roles</p>
        </div>
        <Button onClick={handleCreate} className="rounded-2xl bg-gradient-to-r from-[#03093a] to-[#03093a]/90 hover:opacity-90 shadow-lg shadow-[#03093a]/25 h-12 px-6 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add HR Admin
        </Button>
      </motion.div>

      {/* Reference-style Filter Bar */}
      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 flex-wrap w-full">
            {/* Filter Dropdowns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 px-4 rounded-xl border-border/50 hover:bg-[#03093a]/10 hover:border-[#03093a]/30 hover:text-[#03093a] transition-colors">
                  Role
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => toggleFilter("role", "all")} className={cn(filters.role === "all" && "bg-[#03093a]/10 text-[#03093a]")}>
                  All
                </DropdownMenuItem>
                {roleOptions.map((role) => (
                  <DropdownMenuItem 
                    key={role}
                    onClick={() => toggleFilter("role", role)}
                    className={cn(filters.role === role && "bg-[#03093a]/10 text-[#03093a]")}
                  >
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
            <div className="flex-1 min-w-[200px] max-w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search HR admins..."
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
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto" style={{ maxWidth: '100%' }}>
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-[#03093a]/5 border-b border-[#03093a]/10">
                  <TableHead className="font-semibold text-foreground/80 w-12">
                    <CheckboxComponent
                      checked={selectedHRAdmins.length === filteredHRAdmins.length && filteredHRAdmins.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedHRAdmins(filteredHRAdmins.map(hr => hr.id));
                        } else {
                          setSelectedHRAdmins([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/80">Name</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Email</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Phone</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Alt. Phone</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Location</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Role</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Assigned Jobs</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Last Login</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Time Spent</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHRAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
                      No HR admins found matching the filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHRAdmins.map((hrAdmin, index) => (
                  <TableRow
                    key={hrAdmin.id}
                    className={cn(
                      "border-b border-border/20 transition-all duration-300 group cursor-pointer relative",
                      "hover:shadow-lg hover:shadow-[#03093a]/10 hover:scale-[1.01] hover:z-10",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                      selectedHRAdmins.includes(hrAdmin.id) 
                        ? "bg-gradient-to-r from-[#03093a]/15 via-[#03093a]/10 to-[#03093a]/15 border-l-4 border-l-[#03093a] shadow-md" 
                        : "hover:bg-gradient-to-r hover:from-[#03093a]/12 hover:via-white hover:to-[#ee3127]/8 hover:border-l-4 hover:border-l-[#ee3127]"
                    )}
                  >
                    <TableCell className="w-12">
                      <CheckboxComponent
                        checked={selectedHRAdmins.includes(hrAdmin.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedHRAdmins([...selectedHRAdmins, hrAdmin.id]);
                          } else {
                            setSelectedHRAdmins(selectedHRAdmins.filter(id => id !== hrAdmin.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">{hrAdmin.name}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{hrAdmin.email}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{hrAdmin.phone}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{(hrAdmin as any).alternativePhone || "N/A"}</TableCell>
                    <TableCell className="text-muted-foreground max-w-xs">{hrAdmin.location}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#03093a]/10 text-[#03093a] border border-[#03093a]/20">
                        {hrAdmin.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{hrAdmin.assignedJobs}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Badge className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium h-5 flex items-center justify-center",
                          hrAdmin.status === "Active"
                            ? "bg-[#03093a] text-white"
                            : "bg-[#ee3127] text-white"
                        )}>
                          {hrAdmin.status}
                        </Badge>
                        {(hrAdmin as any).isDeactivated && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground" title="Cannot login - Deactivated">
                            <AlertCircle className="w-3 h-3 text-orange-600" />
                            <span className="text-orange-600">No Login</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {hrAdmin.role === "Super Admin" && hrAdmin.lastLogin ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(hrAdmin.lastLogin).toLocaleString()}
                          </span>
                          {hrAdmin.isOnline && (
                            <Badge className="w-fit bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Online
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          {hrAdmin.lastLogin ? new Date(hrAdmin.lastLogin).toLocaleString() : "Never"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {hrAdmin.role === "Super Admin" ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{hrAdmin.timeSpent || "0m"}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
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
                            onClick={() => handleEdit(hrAdmin)} 
                            className="rounded-xl cursor-pointer"
                            disabled={(hrAdmin as any).isDeactivated}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {!(hrAdmin as any).isDeactivated && hrAdmin.status === "Active" && (
                            <DropdownMenuItem 
                              onClick={() => handleDeactivateRequest(hrAdmin.id)} 
                              className="rounded-xl cursor-pointer text-orange-600 hover:text-orange-600 focus:text-orange-600 bg-transparent hover:bg-orange-600/10"
                            >
                              <PowerOff className="w-4 h-4 mr-2 text-orange-600" />
                              <span className="text-orange-600">Deactivate</span>
                            </DropdownMenuItem>
                          )}
                          {(hrAdmin as any).isDeactivated && (
                            <DropdownMenuItem 
                              className="rounded-xl cursor-pointer"
                              disabled
                            >
                              <History className="w-4 h-4 mr-2" />
                              History
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(hrAdmin.id)} 
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
                <UserCog className="w-5 h-5 text-white" />
              </div>
              {isEditMode ? "Edit HR Admin" : "Add New HR Admin"}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {isEditMode ? "Update HR admin information" : "Create a new HR admin account"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Full Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aravind Kumar"
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
                  placeholder="aravind.kumar@acefinstech.com"
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
                <Label className="text-sm font-semibold">Alternative Phone</Label>
                <Input
                  value={formData.alternativePhone}
                  onChange={(e) => setFormData({ ...formData, alternativePhone: e.target.value })}
                  placeholder="+91 98765 43211"
                  className="h-12 rounded-2xl border-border/30"
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
                <Label className="text-sm font-semibold">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR Admin">HR Admin</SelectItem>
                    <SelectItem value="Super Admin" disabled={!isEditMode && hrAdmins.filter(hr => hr.role === "Super Admin").length >= 2}>
                      Super Admin {!isEditMode && hrAdmins.filter(hr => hr.role === "Super Admin").length >= 2 && "(Max 2)"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {!isEditMode && formData.role === "Super Admin" && hrAdmins.filter(hr => hr.role === "Super Admin").length >= 2 && (
                  <p className="text-xs text-orange-600 mt-1">Maximum 2 Super Admin accounts allowed</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Deactivated">Deactivated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {!isEditMode && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Password *</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  className="h-12 rounded-2xl border-border/30"
                  required={!isEditMode}
                />
              </div>
            )}
          </div>
          <DialogFooter className="pt-6 border-t border-border/30">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              {isEditMode ? "Update" : "Create"} HR Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the HR admin record.
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

      {/* Deactivate Confirmation Dialog */}
      <AlertDialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate HR Admin?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedHRAdmin && (() => {
                const hrAdmin = hrAdmins.find(hr => hr.id === selectedHRAdmin);
                return hrAdmin ? (
                  <div className="space-y-3">
                    <p>Are you sure you want to deactivate <strong>{hrAdmin.name}</strong>?</p>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 space-y-2">
                      <p className="text-sm font-semibold text-orange-800">⚠️ Important:</p>
                      <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
                        <li>They will not be able to login to the system</li>
                        <li>This action is <strong>permanent and cannot be undone</strong></li>
                        <li>Their work history will be preserved for review</li>
                        <li>Only deactivate if the employee has resigned or been terminated</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This action should only be performed when an HR admin has left the organization.
                    </p>
                  </div>
                ) : null;
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivateConfirm} className="bg-orange-600 text-white rounded-2xl hover:bg-orange-700">
              Deactivate Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HRAdminManagement;

