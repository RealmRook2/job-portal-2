import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox as CheckboxComponent } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Users, Search, ChevronDown, ArrowUpDown, MoreVertical } from "lucide-react";
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

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  branch: string;
  status: "Working" | "Abscond" | "Terminated" | "Separated";
  // Additional fields will be added later
}

const EmployeeDataManagement = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    status: "all",
    branch: "all",
  });

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@acefinstech.com",
      phone: "+91 98765 43210",
      branch: "Chennai",
      status: "Working",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@acefinstech.com",
      phone: "+91 98765 43211",
      branch: "Bangalore",
      status: "Working",
    },
    {
      id: 3,
      name: "Aravind Menon",
      email: "aravind.menon@acefinstech.com",
      phone: "+91 98765 43212",
      branch: "Salem",
      status: "Abscond",
    },
    {
      id: 4,
      name: "Meera Nair",
      email: "meera.nair@acefinstech.com",
      phone: "+91 98765 43213",
      branch: "Andhra Pradesh",
      status: "Terminated",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    status: "Working" as Employee["status"],
  });

  const branches = ["Salem", "Andhra Pradesh", "Chennai", "Bangalore"];
  const statusOptions: Employee["status"][] = ["Working", "Abscond", "Terminated", "Separated"];

  const handleCreate = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch: "",
      status: "Working",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setIsEditMode(true);
    setSelectedEmployee(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      branch: employee.branch,
      status: employee.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.branch || !formData.status) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isEditMode && selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee ? { ...emp, ...formData } : emp
      ));
      toast.success("Employee updated successfully");
    } else {
      const newEmployee: Employee = {
        id: employees.length + 1,
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
      toast.success("Employee added successfully");
    }

    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch: "",
      status: "Working",
    });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedEmployee(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee));
      toast.success("Employee deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const getStatusBadgeColor = (status: Employee["status"]) => {
    switch (status) {
      case "Working":
        return "bg-[#03093a] text-white";
      case "Abscond":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Terminated":
        return "bg-[#ee3127] text-white";
      case "Separated":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-[#ee3127] text-white";
    }
  };

  // Filter and search employees
  const filteredEmployees = employees.filter((emp) => {
    if (filters.status !== "all" && emp.status !== filters.status) return false;
    if (filters.branch !== "all" && emp.branch !== filters.branch) return false;
    if (searchQuery && !emp.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !emp.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleFilter = (type: "status" | "branch", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "all" : value,
    }));
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
            Employee Data Management
          </h1>
          <p className="text-base text-muted-foreground/80">Manage employee records and workforce data</p>
        </div>
        <Button onClick={handleCreate} className="rounded-2xl bg-gradient-to-r from-[#03093a] to-[#03093a]/90 hover:opacity-90 shadow-lg shadow-[#03093a]/25 h-12 px-6 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add Employee
        </Button>
      </motion.div>

      {/* Reference-style Filter Bar */}
      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
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
                  Branch
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-xl">
                <DropdownMenuItem onClick={() => toggleFilter("branch", "all")} className={cn(filters.branch === "all" && "bg-[#03093a]/10 text-[#03093a]")}>
                  All
                </DropdownMenuItem>
                {branches.map((branch) => (
                  <DropdownMenuItem 
                    key={branch}
                    onClick={() => toggleFilter("branch", branch)}
                    className={cn(filters.branch === branch && "bg-[#03093a]/10 text-[#03093a]")}
                  >
                    {branch}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
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
          <div className="w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-[#03093a]/5 border-b border-[#03093a]/10">
                  <TableHead className="font-semibold text-foreground/80 w-12">
                    <CheckboxComponent
                      checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedEmployees(filteredEmployees.map(emp => emp.id));
                        } else {
                          setSelectedEmployees([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-foreground/80">Name</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Email</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Phone</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Branch</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No employees found matching the filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className={cn(
                        "border-b border-border/20 transition-all duration-300 group cursor-pointer relative",
                        "hover:shadow-lg hover:shadow-[#03093a]/10 hover:scale-[1.01] hover:z-10",
                        "bg-white",
                        selectedEmployees.includes(employee.id) 
                          ? "bg-gradient-to-r from-[#03093a]/15 via-[#03093a]/10 to-[#03093a]/15 border-l-4 border-l-[#03093a] shadow-md" 
                          : "hover:bg-gradient-to-r hover:from-[#03093a]/12 hover:via-white hover:to-[#ee3127]/8 hover:border-l-4 hover:border-l-[#ee3127]"
                      )}
                    >
                      <TableCell className="w-12">
                        <CheckboxComponent
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedEmployees([...selectedEmployees, employee.id]);
                            } else {
                              setSelectedEmployees(selectedEmployees.filter(id => id !== employee.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-semibold whitespace-nowrap">{employee.name}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{employee.email}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{employee.phone}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{employee.branch}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium h-5 flex items-center justify-center",
                          getStatusBadgeColor(employee.status)
                        )}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#03093a]/10 hover:text-[#03093a] transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-2xl border-0 shadow-xl">
                            <DropdownMenuItem 
                              onClick={() => handleEdit(employee)} 
                              className="rounded-xl cursor-pointer"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(employee.id)} 
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
                <Users className="w-5 h-5 text-white" />
              </div>
              {isEditMode ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {isEditMode ? "Update employee information" : "Add a new employee to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Full Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  placeholder="rajesh.kumar@acefinstech.com"
                  className="h-12 rounded-2xl border-border/30"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
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
                <Label className="text-sm font-semibold">Branch *</Label>
                <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                  <SelectTrigger className="h-12 rounded-2xl border-border/30">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as Employee["status"] })}>
                <SelectTrigger className="h-12 rounded-2xl border-border/30">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t border-border/30">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-12 px-6">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
              {isEditMode ? "Update" : "Add"} Employee
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
              This action cannot be undone. This will permanently delete the employee record.
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

export default EmployeeDataManagement;

