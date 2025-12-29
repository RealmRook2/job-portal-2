import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, User, Shield, Save, Mail, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Settings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "ACE FINS TECH",
    address: "T Nagar, Chennai, Tamil Nadu - 600017",
    phone: "+91 44 1234 5678",
    alternativePhone: "+91 44 1234 5679",
    email: "info@acefinstech.com",
    website: "www.acefinstech.com",
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@acefinstech.com",
    role: "Super Admin",
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
  });
  const [twoFactorSetup, setTwoFactorSetup] = useState({
    email: "",
    mobile: "",
    emailOtpSent: false,
    mobileOtpSent: false,
    emailOtp: "",
    mobileOtp: "",
    emailVerified: false,
    mobileVerified: false,
  });

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pb-4 border-b border-border/30"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
          System Settings
        </h1>
        <p className="text-base text-muted-foreground/80">Manage your system configuration and preferences</p>
      </motion.div>

      <Tabs defaultValue="company" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/30 p-1.5 rounded-2xl border border-border/30">
          <TabsTrigger value="company" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Company Info</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Profile</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
              <CardHeader className="pb-6 border-b border-border/30">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  Company Information
                </CardTitle>
                <CardDescription className="text-base pt-2">
                  Update your company details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Company Name</Label>
                  <Input
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Address</Label>
                  <Textarea
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                    rows={3}
                    className="rounded-2xl border-border/30"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Phone</Label>
                    <Input
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      className="h-12 rounded-2xl border-border/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Alternative Phone</Label>
                    <Input
                      value={companyInfo.alternativePhone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, alternativePhone: e.target.value })}
                      className="h-12 rounded-2xl border-border/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Email</Label>
                  <Input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Website</Label>
                  <Input
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                  />
                </div>
                <div className="pt-6 border-t border-border/30">
                  <Button onClick={() => handleSave("Company")} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
                    <Save className="w-5 h-5 mr-2" />
                    Save Company Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
              <CardHeader className="pb-6 border-b border-border/30">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Admin Profile
                </CardTitle>
                <CardDescription className="text-base pt-2">
                  Manage your admin account profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Email</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-12 rounded-2xl border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Role</Label>
                  <Input
                    value={profile.role}
                    readOnly
                    className="bg-secondary/50 h-12 rounded-2xl border-border/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Change Password</Label>
                  <Input type="password" placeholder="Enter new password" className="h-12 rounded-2xl border-border/30" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Confirm Password</Label>
                  <Input type="password" placeholder="Confirm new password" className="h-12 rounded-2xl border-border/30" />
                </div>
                <div className="pt-6 border-t border-border/30">
                  <Button onClick={() => handleSave("Profile")} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
                    <Save className="w-5 h-5 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-3xl">
              <CardHeader className="pb-6 border-b border-border/30">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  Security Settings
                </CardTitle>
                <CardDescription className="text-base pt-2">
                  Configure security and authentication options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4 p-4 rounded-2xl bg-secondary/30 border border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-semibold">Two-Factor Authentication (Email + Mobile)</Label>
                      <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security via Email OTP and Mobile OTP</p>
                    </div>
                    <Switch
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => {
                        setSecurity({ ...security, twoFactorAuth: checked });
                        if (!checked) {
                          setTwoFactorSetup({ 
                            email: "", 
                            mobile: "",
                            emailOtpSent: false, 
                            mobileOtpSent: false,
                            emailOtp: "",
                            mobileOtp: "",
                            emailVerified: false,
                            mobileVerified: false,
                          });
                        }
                      }}
                    />
                  </div>
                  
                  {security.twoFactorAuth && (
                    <div className="pt-4 border-t border-border/30 space-y-6">
                      {(!twoFactorSetup.emailVerified || !twoFactorSetup.mobileVerified) ? (
                        <>
                          {/* Email OTP Setup */}
                          <div className="space-y-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Mail className="w-4 h-4 text-blue-600" />
                              <Label className="text-sm font-semibold">Email OTP Setup</Label>
                            </div>
                            {!twoFactorSetup.emailVerified ? (
                              <>
                                <div className="space-y-2">
                                  <Label className="text-xs text-muted-foreground">Email Address</Label>
                                  <div className="flex gap-2">
                                    <Input
                                      type="email"
                                      placeholder="your.email@example.com"
                                      value={twoFactorSetup.email}
                                      onChange={(e) => {
                                        setTwoFactorSetup({ ...twoFactorSetup, email: e.target.value, emailOtpSent: false, emailOtp: "" });
                                      }}
                                      className="h-11 rounded-xl border-border/30"
                                      disabled={twoFactorSetup.emailOtpSent}
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        if (!twoFactorSetup.email) {
                                          toast.error("Please enter your email address");
                                          return;
                                        }
                                        toast.success(`OTP sent to ${twoFactorSetup.email}`);
                                        setTwoFactorSetup({ ...twoFactorSetup, emailOtpSent: true });
                                      }}
                                      disabled={twoFactorSetup.emailOtpSent}
                                      className="rounded-xl h-11 px-6"
                                    >
                                      {twoFactorSetup.emailOtpSent ? "Sent" : "Send OTP"}
                                    </Button>
                                  </div>
                                </div>
                                
                                {twoFactorSetup.emailOtpSent && (
                                  <>
                                    <div className="space-y-2">
                                      <Label className="text-xs text-muted-foreground">Enter Email OTP</Label>
                                      <Input
                                        type="text"
                                        placeholder="000000"
                                        value={twoFactorSetup.emailOtp}
                                        onChange={(e) => {
                                          const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                                          setTwoFactorSetup({ ...twoFactorSetup, emailOtp: value });
                                        }}
                                        className="h-11 text-center text-xl tracking-widest font-mono rounded-xl border-border/30"
                                        maxLength={6}
                                      />
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setTwoFactorSetup({ ...twoFactorSetup, email: "", emailOtpSent: false, emailOtp: "" });
                                        }}
                                        className="flex-1 rounded-xl h-9 text-xs"
                                      >
                                        Change Email
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          toast.success(`OTP resent to ${twoFactorSetup.email}`);
                                        }}
                                        className="flex-1 rounded-xl h-9 text-xs"
                                      >
                                        Resend OTP
                                      </Button>
                                      <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => {
                                          if (twoFactorSetup.emailOtp.length !== 6) {
                                            toast.error("Please enter a valid 6-digit OTP");
                                            return;
                                          }
                                          toast.success("Email OTP verified!");
                                          setTwoFactorSetup({ ...twoFactorSetup, emailVerified: true });
                                        }}
                                        className="flex-1 rounded-xl h-9 text-xs bg-gradient-to-r from-primary to-primary-light hover:opacity-90"
                                      >
                                        Verify
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                                      Email Verified
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {twoFactorSetup.email}
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setTwoFactorSetup({ ...twoFactorSetup, email: "", emailOtpSent: false, emailOtp: "", emailVerified: false });
                                    }}
                                    className="rounded-lg h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Mobile OTP Setup */}
                          <div className="space-y-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Smartphone className="w-4 h-4 text-purple-600" />
                              <Label className="text-sm font-semibold">Mobile OTP Setup</Label>
                            </div>
                            {!twoFactorSetup.mobileVerified ? (
                              <>
                                <div className="space-y-2">
                                  <Label className="text-xs text-muted-foreground">Mobile Number</Label>
                                  <div className="flex gap-2">
                                    <Input
                                      type="tel"
                                      placeholder="+91 98765 43210"
                                      value={twoFactorSetup.mobile}
                                      onChange={(e) => {
                                        setTwoFactorSetup({ ...twoFactorSetup, mobile: e.target.value, mobileOtpSent: false, mobileOtp: "" });
                                      }}
                                      className="h-11 rounded-xl border-border/30"
                                      disabled={twoFactorSetup.mobileOtpSent}
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        if (!twoFactorSetup.mobile) {
                                          toast.error("Please enter your mobile number");
                                          return;
                                        }
                                        toast.success(`OTP sent to ${twoFactorSetup.mobile}`);
                                        setTwoFactorSetup({ ...twoFactorSetup, mobileOtpSent: true });
                                      }}
                                      disabled={twoFactorSetup.mobileOtpSent}
                                      className="rounded-xl h-11 px-6"
                                    >
                                      {twoFactorSetup.mobileOtpSent ? "Sent" : "Send OTP"}
                                    </Button>
                                  </div>
                                </div>
                                
                                {twoFactorSetup.mobileOtpSent && (
                                  <>
                                    <div className="space-y-2">
                                      <Label className="text-xs text-muted-foreground">Enter Mobile OTP</Label>
                                      <Input
                                        type="text"
                                        placeholder="000000"
                                        value={twoFactorSetup.mobileOtp}
                                        onChange={(e) => {
                                          const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                                          setTwoFactorSetup({ ...twoFactorSetup, mobileOtp: value });
                                        }}
                                        className="h-11 text-center text-xl tracking-widest font-mono rounded-xl border-border/30"
                                        maxLength={6}
                                      />
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setTwoFactorSetup({ ...twoFactorSetup, mobile: "", mobileOtpSent: false, mobileOtp: "" });
                                        }}
                                        className="flex-1 rounded-xl h-9 text-xs"
                                      >
                                        Change Mobile
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          toast.success(`OTP resent to ${twoFactorSetup.mobile}`);
                                        }}
                                        className="flex-1 rounded-xl h-9 text-xs"
                                      >
                                        Resend OTP
                                      </Button>
                                      <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => {
                                          if (twoFactorSetup.mobileOtp.length !== 6) {
                                            toast.error("Please enter a valid 6-digit OTP");
                                            return;
                                          }
                                          toast.success("Mobile OTP verified!");
                                          setTwoFactorSetup({ ...twoFactorSetup, mobileVerified: true });
                                        }}
                                        className="flex-1 rounded-xl h-9 text-xs bg-gradient-to-r from-primary to-primary-light hover:opacity-90"
                                      >
                                        Verify
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                                      Mobile Verified
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      {twoFactorSetup.mobile}
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setTwoFactorSetup({ ...twoFactorSetup, mobile: "", mobileOtpSent: false, mobileOtp: "", mobileVerified: false });
                                    }}
                                    className="rounded-lg h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {twoFactorSetup.emailVerified && twoFactorSetup.mobileVerified && (
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                                    2FA Enabled Successfully
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    OTP will be sent to both Email and Mobile on login
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSecurity({ ...security, twoFactorAuth: false });
                                    setTwoFactorSetup({ 
                                      email: "", 
                                      mobile: "",
                                      emailOtpSent: false, 
                                      mobileOtpSent: false,
                                      emailOtp: "",
                                      mobileOtp: "",
                                      emailVerified: false,
                                      mobileVerified: false,
                                    });
                                    toast.success("2FA disabled");
                                  }}
                                  className="rounded-xl text-destructive hover:bg-destructive/10"
                                >
                                  Disable
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                                  2FA Enabled
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  OTP will be sent to both Email and Mobile on login
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSecurity({ ...security, twoFactorAuth: false });
                                  setTwoFactorSetup({ 
                                    email: "", 
                                    mobile: "",
                                    emailOtpSent: false, 
                                    mobileOtpSent: false,
                                    emailOtp: "",
                                    mobileOtp: "",
                                    emailVerified: false,
                                    mobileVerified: false,
                                  });
                                  toast.success("2FA disabled");
                                }}
                                className="rounded-xl text-destructive hover:bg-destructive/10"
                              >
                                Disable
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-green-500/20">
                              <div className="p-2 rounded-lg bg-white/50">
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="text-xs font-semibold mt-0.5">{twoFactorSetup.email}</p>
                              </div>
                              <div className="p-2 rounded-lg bg-white/50">
                                <p className="text-xs text-muted-foreground">Mobile</p>
                                <p className="text-xs font-semibold mt-0.5">{twoFactorSetup.mobile}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Session Timeout (minutes)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Password Expiry (days)</Label>
                  <Select
                    value={security.passwordExpiry}
                    onValueChange={(value) => setSecurity({ ...security, passwordExpiry: value })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl border-border/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-6 border-t border-border/30">
                  <Button onClick={() => handleSave("Security")} className="rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:opacity-90 shadow-lg shadow-primary/25 h-12 px-8">
                    <Save className="w-5 h-5 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

