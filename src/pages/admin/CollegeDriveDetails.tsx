import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, GraduationCap, Users, Calendar, Briefcase, Search, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  role: string;
  status: "Selected" | "Rejected" | "Pending";
  appliedDate: string;
}

interface Drive {
  id: number;
  date: string;
  jobTitle: string;
  company: string;
  candidatesCount: number;
  students: Student[];
}

const CollegeDriveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Mock college data
  const college = {
    id: Number(id),
    name: "Anna University",
    location: "Guindy, Chennai",
    email: "placement@annauniv.edu",
    phone: "+91 44 2235 7080",
  };

  // Mock drive data
  const drives: Drive[] = [
    {
      id: 1,
      date: "2024-12-15",
      jobTitle: "Software Engineer",
      company: "TCS Chennai",
      candidatesCount: 45,
      students: [
        {
          id: 1,
          name: "Rajesh Kumar",
          email: "rajesh.kumar@annauniv.edu",
          phone: "+91 98765 43210",
          course: "B.Tech Computer Science",
          year: "Final Year",
          role: "Software Engineer",
          status: "Selected",
          appliedDate: "2024-12-10",
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya.sharma@annauniv.edu",
          phone: "+91 98765 43211",
          course: "B.Tech Computer Science",
          year: "Final Year",
          role: "Software Engineer",
          status: "Selected",
          appliedDate: "2024-12-10",
        },
        {
          id: 3,
          name: "Meera Nair",
          email: "meera.nair@annauniv.edu",
          phone: "+91 98765 43212",
          course: "B.Tech Information Technology",
          year: "Final Year",
          role: "Software Engineer",
          status: "Rejected",
          appliedDate: "2024-12-11",
        },
        {
          id: 4,
          name: "Arjun Menon",
          email: "arjun.menon@annauniv.edu",
          phone: "+91 98765 43213",
          course: "B.Tech Computer Science",
          year: "Final Year",
          role: "Software Engineer",
          status: "Pending",
          appliedDate: "2024-12-12",
        },
      ],
    },
    {
      id: 2,
      date: "2024-11-20",
      jobTitle: "Product Manager",
      company: "Infosys Chennai",
      candidatesCount: 32,
      students: [
        {
          id: 5,
          name: "Suresh Iyer",
          email: "suresh.iyer@annauniv.edu",
          phone: "+91 98765 43214",
          course: "MBA",
          year: "Final Year",
          role: "Product Manager",
          status: "Selected",
          appliedDate: "2024-11-15",
        },
        {
          id: 6,
          name: "Kavya Reddy",
          email: "kavya.reddy@annauniv.edu",
          phone: "+91 98765 43215",
          course: "MBA",
          year: "Final Year",
          role: "Product Manager",
          status: "Rejected",
          appliedDate: "2024-11-16",
        },
      ],
    },
    {
      id: 3,
      date: "2024-10-10",
      jobTitle: "Data Analyst",
      company: "Wipro Chennai",
      candidatesCount: 28,
      students: [
        {
          id: 7,
          name: "Vikram Singh",
          email: "vikram.singh@annauniv.edu",
          phone: "+91 98765 43216",
          course: "B.Tech Computer Science",
          year: "Final Year",
          role: "Data Analyst",
          status: "Selected",
          appliedDate: "2024-10-05",
        },
      ],
    },
  ];

  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(drives[0] || null);

  // Filter drives by date range
  const filteredDrives = drives.filter((drive) => {
    if (dateFrom && drive.date < dateFrom) return false;
    if (dateTo && drive.date > dateTo) return false;
    return true;
  });

  // Update selected drive if it's filtered out
  useEffect(() => {
    if (selectedDrive && !filteredDrives.find(d => d.id === selectedDrive.id)) {
      setSelectedDrive(filteredDrives[0] || null);
    }
  }, [dateFrom, dateTo, filteredDrives, selectedDrive]);

  const filteredStudents = selectedDrive
    ? selectedDrive.students.filter((student) => {
        if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase()) && !student.email.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        if (statusFilter !== "all" && student.status !== statusFilter) return false;
        if (roleFilter !== "all" && student.role !== roleFilter) return false;
        return true;
      })
    : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selected":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "Rejected":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      case "Pending":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
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
            onClick={() => navigate("/admin/colleges")} 
            className="rounded-2xl bg-gray-100 hover:bg-gray-200 text-foreground hover:text-foreground transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
              {college.name} - Drive Details
            </h1>
            <p className="text-lg text-muted-foreground/80">{college.location}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Drive List */}
        <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl lg:col-span-1">
          <CardHeader className="pb-4 border-b border-border/30">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-5 h-5" />
              Past Drives
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {/* Date Filter */}
            <div className="space-y-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Date
              </Label>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-muted-foreground">From Date</Label>
                  <Input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="h-9 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">To Date</Label>
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="h-9 rounded-lg text-sm"
                  />
                </div>
                {(dateFrom || dateTo) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateFrom("");
                      setDateTo("");
                      if (selectedDrive && (!filteredDrives.find(d => d.id === selectedDrive.id))) {
                        setSelectedDrive(filteredDrives[0] || null);
                      }
                    }}
                    className="w-full h-8 rounded-lg text-xs"
                  >
                    Clear Filter
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {filteredDrives.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No drives found in the selected date range
                </div>
              ) : (
                filteredDrives.map((drive) => (
                  <motion.div
                    key={drive.id}
                    onClick={() => setSelectedDrive(drive)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedDrive?.id === drive.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border/30 hover:border-primary/50 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{drive.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{drive.company}</p>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {drive.candidatesCount}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(drive.date).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl lg:col-span-2">
          <CardHeader className="pb-4 border-b border-border/30">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="w-5 h-5" />
                Students List
                {selectedDrive && (
                  <Badge variant="secondary" className="ml-2 rounded-full">
                    {selectedDrive.candidatesCount} candidates
                  </Badge>
                )}
              </CardTitle>
              {selectedDrive && (
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {selectedDrive ? (
              <>
                {/* Drive Info */}
                <div className="mb-6 p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedDrive.jobTitle}</h3>
                      <p className="text-sm text-muted-foreground">{selectedDrive.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Drive Date</p>
                      <p className="font-semibold">{new Date(selectedDrive.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-border/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-11 rounded-xl border-border/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Selected">Selected</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Role</Label>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="h-11 rounded-xl border-border/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                        <SelectItem value="Product Manager">Product Manager</SelectItem>
                        <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Students Table */}
                <div className="w-full overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-secondary/30 border-b border-border/30">
                        <TableHead className="font-semibold text-foreground/80">Name</TableHead>
                        <TableHead className="font-semibold text-foreground/80">Email</TableHead>
                        <TableHead className="font-semibold text-foreground/80">Course</TableHead>
                        <TableHead className="font-semibold text-foreground/80">Year</TableHead>
                        <TableHead className="font-semibold text-foreground/80">Role</TableHead>
                        <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                        <TableHead className="font-semibold text-foreground/80">Applied Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No students found matching the filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStudents.map((student) => (
                          <TableRow
                            key={student.id}
                            className="border-b border-border/20 hover:bg-secondary/20 transition-colors"
                          >
                            <TableCell className="font-semibold">{student.name}</TableCell>
                            <TableCell className="text-muted-foreground">{student.email}</TableCell>
                            <TableCell className="text-muted-foreground">{student.course}</TableCell>
                            <TableCell className="text-muted-foreground">{student.year}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="rounded-full">
                                {student.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={`rounded-full border px-2 py-0.5 text-xs font-medium h-5 flex items-center justify-center ${getStatusColor(student.status)}`}>
                                {student.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(student.appliedDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-muted-foreground">Selected</p>
                    <p className="text-2xl font-bold text-green-700">
                      {filteredStudents.filter((s) => s.status === "Selected").length}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-2xl font-bold text-red-700">
                      {filteredStudents.filter((s) => s.status === "Rejected").length}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {filteredStudents.filter((s) => s.status === "Pending").length}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a drive to view student details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegeDriveDetails;

