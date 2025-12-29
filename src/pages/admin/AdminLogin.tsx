import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone, Lock } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
  const [ceoMobile] = useState("+91 98765 00000"); // CEO mobile number

  // Mock: Check if it's first-time login
  const checkFirstTimeLogin = (email: string) => {
    // In real app, this would check against backend
    const firstTimeUsers = ["newadmin@acefinstech.com", "hr.admin@acefinstech.com"];
    return firstTimeUsers.includes(email.toLowerCase());
  };

  const handleSendOTPToCEO = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }

    // Mock: Send OTP to CEO mobile
    const secureCode = Math.floor(100000 + Math.random() * 900000).toString();
    toast.success(`Secure code sent to CEO mobile (${ceoMobile})`);
    toast.info(`Secure Code: ${secureCode} (This would be sent via SMS in production)`);
    setOtpSent(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter your credentials");
      return;
    }

    // Check if first-time login
    const isFirstTime = checkFirstTimeLogin(email);
    
    if (isFirstTime && !otpSent) {
      setIsFirstTimeLogin(true);
      await handleSendOTPToCEO();
      return;
    }

    if (isFirstTime && !otp) {
      toast.error("Please enter the secure code sent to CEO mobile");
      return;
    }

    // Mock OTP verification
    if (isFirstTime && otp.length === 6) {
      toast.success("Secure code verified! Logging in...");
      // In real app, verify OTP with backend
      setTimeout(() => {
        toast.success("Admin login successful!");
        navigate("/admin/dashboard");
      }, 1000);
    } else if (!isFirstTime) {
      toast.success("Admin login successful!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid secure code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md animate-slide-up">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center mb-4">
              <Logo variant="default" showText={false} />
            </div>
            <div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base mt-2">
                Sign in to access the admin dashboard
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@acefinstech.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsFirstTimeLogin(false);
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              {isFirstTimeLogin && otpSent && (
                <div className="space-y-2 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-orange-600" />
                    <Label className="text-sm font-semibold text-orange-900">
                      First-Time Login Authentication
                    </Label>
                  </div>
                  <p className="text-xs text-orange-700 mb-3">
                    A secure code has been sent to CEO mobile ({ceoMobile}). Please enter the code below to complete authentication.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm">Secure Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setOtp(value);
                      }}
                      className="h-11 text-center text-2xl tracking-widest font-mono"
                      maxLength={6}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendOTPToCEO}
                    className="w-full h-9 text-xs"
                  >
                    Resend Code to CEO Mobile
                  </Button>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
              >
                {isFirstTimeLogin && !otpSent ? (
                  <>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Send Secure Code to CEO
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In as Admin
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <Link to="/login" className="text-primary font-medium hover:underline">
                  ← Back to candidate login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
