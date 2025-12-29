import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Mock OTP sending
    toast.success(`OTP sent to ${email}`);
    setOtpSent(true);
  };

  const handleOTPLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!otpSent) {
      handleSendOTP();
      return;
    }
    
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    
    // Mock OTP verification
    if (otp.length === 6) {
      toast.success("Login successful!");
      navigate("/candidate/dashboard");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic
    if (email && password) {
      toast.success("Login successful!");
      navigate("/candidate/dashboard");
    } else {
      toast.error("Please enter your credentials");
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
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription className="text-base mt-2">
                Sign in to your candidate account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={loginMethod} onValueChange={(value) => {
              setLoginMethod(value as "password" | "otp");
              setOtpSent(false);
              setOtp("");
            }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl bg-secondary/50">
                <TabsTrigger value="password" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="otp" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  Email OTP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="password" className="space-y-5 mt-0">
                <form onSubmit={handlePasswordLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                  >
                    Sign In with Password
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="otp" className="space-y-5 mt-0">
                <form onSubmit={handleOTPLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email-otp">Email</Label>
                    <Input
                      id="email-otp"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setOtpSent(false);
                        setOtp("");
                      }}
                      className="h-11"
                      required
                      disabled={otpSent}
                    />
                  </div>

                  {otpSent ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
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
                        <p className="text-xs text-muted-foreground">
                          OTP sent to {email}. Check your email.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setOtpSent(false);
                            setOtp("");
                          }}
                          className="flex-1 h-11 rounded-xl"
                        >
                          Change Email
                        </Button>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={handleSendOTP}
                          className="flex-1 h-11 rounded-xl"
                        >
                          Resend OTP
                        </Button>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                      >
                        Verify & Sign In
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="button"
                      onClick={handleSendOTP}
                      className="w-full h-11 bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                    >
                      Send OTP to Email
                    </Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Register here
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  <Link to="/admin/login" className="text-primary font-medium hover:underline">
                    Admin Login →
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
