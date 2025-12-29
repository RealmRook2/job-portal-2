import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Save, User, GraduationCap, Briefcase, FileText, Mic, File } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    location: "Chennai, Tamil Nadu",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123, Main Street, T Nagar, Chennai, Tamil Nadu - 600017",
  });

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Bachelor of Technology",
      field: "Computer Science",
      institution: "Anna University, Chennai",
      year: "2012",
      location: "Guindy, Chennai",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      id: 1,
      company: "TCS Chennai",
      position: "Software Engineer",
      startDate: "2015-06",
      endDate: "2020-03",
      location: "Anna Nagar, Chennai",
      description: "Developed and maintained web applications using React and Node.js",
    },
  ]);

  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "Python", "AWS"]);

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  const handleAddEducation = () => {
    setEducation([...education, {
      id: education.length + 1,
      degree: "",
      field: "",
      institution: "",
      year: "",
      location: "Chennai, Tamil Nadu",
    }]);
  };

  const handleAddExperience = () => {
    setExperience([...experience, {
      id: experience.length + 1,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "Chennai, Tamil Nadu",
      description: "",
    }]);
  };

  const profileCompletion = 75;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">My Profile</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Progress value={profileCompletion} className="h-2" />
              </div>
              <span className="text-sm text-muted-foreground">{profileCompletion}% Complete</span>
            </div>
          </motion.div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="apple-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={profileData.location}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="apple-card border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </CardTitle>
                    <Button onClick={handleAddEducation} variant="outline" size="sm">
                      Add Education
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-2xl space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].degree = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].field = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].institution = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].year = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Location</Label>
                          <Input
                            value={edu.location}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="apple-card border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Work Experience
                    </CardTitle>
                    <Button onClick={handleAddExperience} variant="outline" size="sm">
                      Add Experience
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded-2xl space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...experience];
                              newExp[index].company = e.target.value;
                              setExperience(newExp);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => {
                              const newExp = [...experience];
                              newExp[index].position = e.target.value;
                              setExperience(newExp);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExp = [...experience];
                              newExp[index].startDate = e.target.value;
                              setExperience(newExp);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => {
                              const newExp = [...experience];
                              newExp[index].endDate = e.target.value;
                              setExperience(newExp);
                            }}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Location</Label>
                          <Input
                            value={exp.location}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = [...experience];
                              newExp[index].description = e.target.value;
                              setExperience(newExp);
                            }}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card className="apple-card border-0">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        {skill}
                        <button
                          onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const input = e.currentTarget;
                          if (input.value.trim() && !skills.includes(input.value.trim())) {
                            setSkills([...skills, input.value.trim()]);
                            input.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="apple-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Resume</Label>
                    <div className="flex items-center gap-4 p-4 border rounded-2xl">
                      <File className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">resume_rajesh_kumar.pdf</p>
                        <p className="text-sm text-muted-foreground">Uploaded on Jan 15, 2025</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Replace
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Other Documents</Label>
                    <div className="flex items-center gap-4 p-4 border rounded-2xl">
                      <File className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">No documents uploaded</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice Note (Optional)</Label>
                    <div className="flex items-center gap-4 p-4 border rounded-2xl">
                      <Mic className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Record a brief introduction</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Mic className="w-4 h-4 mr-2" />
                        Record
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} size="lg" className="rounded-2xl">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

