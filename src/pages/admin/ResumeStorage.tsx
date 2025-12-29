import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Upload, Download, Trash2, Eye, Folder, FileText, Search, Grid, List, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ResumeFile {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedDate: string;
  candidateName?: string;
  candidateId?: number;
  version?: number;
}

const ResumeStorage = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<ResumeFile[]>([
    {
      id: 1,
      name: "resume_rajesh_kumar_v2.pdf",
      size: 245678,
      type: "application/pdf",
      uploadedDate: "2025-01-20",
      candidateName: "Rajesh Kumar",
      candidateId: 1,
      version: 2,
    },
    {
      id: 2,
      name: "resume_priya_sharma.pdf",
      size: 238901,
      type: "application/pdf",
      uploadedDate: "2025-01-18",
      candidateName: "Priya Sharma",
      candidateId: 2,
    },
    {
      id: 3,
      name: "Rajesh_Kumar_CV.docx",
      size: 189234,
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      uploadedDate: "2025-01-15",
      candidateName: "Rajesh Kumar",
      candidateId: 1,
      version: 1,
    },
    {
      id: 4,
      name: "Meera_Nair_Resume.pdf",
      size: 312456,
      type: "application/pdf",
      uploadedDate: "2025-01-12",
      candidateName: "Meera Nair",
      candidateId: 3,
    },
  ]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.candidateName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
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
      candidateName: selectedCandidate || undefined,
      version: resumes.filter(r => r.name.toLowerCase().includes(selectedFile.name.toLowerCase().replace(/\.[^/.]+$/, ""))).length + 1,
    };
    setResumes([newResume, ...resumes]);
    toast.success("Resume uploaded successfully");
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setSelectedCandidate("");
  };

  const handleDelete = (id: number) => {
    setResumes(resumes.filter((r) => r.id !== id));
    toast.success("Resume deleted successfully");
  };

  return (
    <div className="space-y-8">
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
              Resume Storage Drive
            </h1>
            <p className="text-lg text-muted-foreground/80">Manage and organize all candidate resumes</p>
          </div>
        </div>
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
      </motion.div>

      <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
        <CardHeader className="pb-6 border-b border-border/30">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <Folder className="w-5 h-5 text-white" />
              </div>
              Resume Files
            </CardTitle>
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="rounded-xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-11 px-6"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search resumes by name or candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl border-border/30"
            />
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
              {filteredResumes.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No resumes found matching your search" : "No resumes uploaded yet"}
                  </p>
                </div>
              ) : (
                filteredResumes.map((resume) => (
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
                    {resume.candidateName && (
                      <p className="text-xs text-muted-foreground mb-1">{resume.candidateName}</p>
                    )}
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
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredResumes.length === 0 ? (
                <div className="text-center py-12">
                  <Folder className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No resumes found matching your search" : "No resumes uploaded yet"}
                  </p>
                </div>
              ) : (
                filteredResumes.map((resume) => (
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
                        {resume.candidateName && <span>{resume.candidateName}</span>}
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
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Upload Resume</DialogTitle>
            <DialogDescription>Upload a new resume file to the storage drive</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select File (PDF, DOC, DOCX)</Label>
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
            <div className="space-y-2">
              <Label>Candidate Name (Optional)</Label>
              <Input
                type="text"
                placeholder="Enter candidate name"
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                className="h-11 rounded-xl border-border/30"
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
                setSelectedCandidate("");
              }}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90"
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeStorage;

