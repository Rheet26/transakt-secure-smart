import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Mail, User, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { signInWithOtp, signUp, mockBiometricAuth, isLoading, hasValidSession, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && hasValidSession) {
      navigate("/dashboard");
    }
  }, [user, hasValidSession, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.email) {
      setError("Please enter your email");
      return;
    }

    if (isLogin) {
      // Send OTP for login
      const { error } = await signInWithOtp(formData.email);
      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Check your email for the magic link to sign in!");
        setIsOtpMode(true);
        setShowBiometric(true);
      }
    } else {
      // Sign up with email and password
      if (!formData.password || !formData.name) {
        setError("Please fill in all fields");
        return;
      }

      const { error } = await signUp(formData.email, formData.password, formData.name);
      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Check your email to confirm your account before signing in.");
        setIsLogin(true);
        setFormData({ name: "", email: formData.email, password: "" });
      }
    }
  };

  const handleBiometricAuth = async () => {
    setError("");
    if (!hasValidSession) {
      setError("Please sign in with email first to enable biometric authentication");
      return;
    }
    
    const success = await mockBiometricAuth();
    if (success) {
      toast({
        title: "Biometric authentication successful!",
        description: "Welcome back, you've been logged in.",
      });
      navigate("/dashboard");
    } else {
      setError("Biometric authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl"></div>
            <span className="text-2xl font-bold text-foreground">TransAkt</span>
          </Link>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        <Card className="bg-card border-border shadow-card">
          <CardHeader className="space-y-1 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Create an account to get started"
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Success Message */}
            {successMessage && (
              <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500 text-sm">{successMessage}</span>
              </div>
            )}

            {/* Biometric Authentication - Only show after valid session */}
            {showBiometric && hasValidSession && (
              <Button
                type="button"
                variant="glass"
                className="w-full"
                onClick={handleBiometricAuth}
                disabled={isLoading}
              >
                <Fingerprint className="w-4 h-4 mr-2" />
                {isLoading ? "Scanning..." : "Continue with Biometric Authentication"}
              </Button>
            )}

            {showBiometric && hasValidSession && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with biometric</span>
                </div>
              </div>
            )}

            {/* Form */}
            {!isOtpMode && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>
                )}

              {error && (
                <div className="flex items-center space-x-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : (isLogin ? "Send Magic Link" : "Create Account")}
                </Button>
              </form>
            )}

            {/* Links */}
            {!isOtpMode && (
              <div className="space-y-2 text-center text-sm">
                <div className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Button
                    variant="link"
                    className="text-primary p-0 h-auto"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                      setSuccessMessage("");
                      setFormData({ name: "", email: "", password: "" });
                    }}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Demo Info */}
        <Card className="mt-4 bg-secondary/20 border-border">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground text-center mb-2">
              Demo Mode:
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Use any email to test the authentication flow
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;