import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const job = {
    title: "Senior Software Engineer",
    company: "TCS Chennai",
    location: "Anna Nagar, Chennai",
  };

  const resume = {
    name: "resume_rajesh_kumar.pdf",
    uploaded: "Jan 15, 2025",
  };

  const handleSubmit = () => {
    if (!coverLetter.trim()) {
      toast.error("Please write a cover letter");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    toast.success("Application submitted successfully!");
    setShowConfirmation(false);
    navigate("/candidate/applications");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to={`/jobs/${id}`} className="text-primary hover:underline mb-4 inline-block">
              ← Back to Job Details
            </Link>
            <h1 className="text-4xl font-bold mb-2">Apply for {job.title}</h1>
            <p className="text-xl text-muted-foreground">{job.company} • {job.location}</p>
          </motion.div>

          <Card className="apple-card border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border rounded-2xl">
                <FileText className="w-12 h-12 text-primary" />
                <div className="flex-1">
                  <p className="font-semibold">{resume.name}</p>
                  <p className="text-sm text-muted-foreground">Uploaded on {resume.uploaded}</p>
                </div>
                <Button variant="outline" size="sm">
                  Change Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card border-0">
            <CardHeader>
              <CardTitle>Cover Letter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverLetter">
                  Why are you interested in this position? (Optional but recommended)
                </Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a brief cover letter explaining why you're a good fit for this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {coverLetter.length} characters
                </p>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleSubmit} size="lg" className="w-full">
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Confirm Application
            </DialogTitle>
            <DialogDescription className="pt-4">
              Are you sure you want to submit your application for <strong>{job.title}</strong> at <strong>{job.company}</strong>?
              <br /><br />
              Once submitted, you cannot edit your application.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm & Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyJob;

