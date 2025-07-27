import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, Lock, Mail, User, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { login, signup, mockBiometricAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError("Please fill in all fields");
      return;
    }

    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
      if (!success) {
        setError("Invalid email or password");
      }
    } else {
      success = await signup(formData.name, formData.email, formData.password);
      if (!success) {
        setError("User already exists with this email");
      }
    }

    if (success) {
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You've been logged in successfully." : "Your account has been created and you're now logged in.",
      });
      navigate("/dashboard");
    }
  };

  const handleBiometricAuth = async () => {
    setError("");
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
            {/* Biometric Authentication */}
            <Button
              type="button"
              variant="glass"
              className="w-full"
              onClick={handleBiometricAuth}
              disabled={isLoading}
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              {isLoading ? "Scanning..." : "Use Biometric Authentication"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

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
                {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {/* Links */}
            <div className="space-y-2 text-center text-sm">
              {isLogin && (
                <Button variant="link" className="text-muted-foreground">
                  Forgot password?
                </Button>
              )}
              
              <div className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Button
                  variant="link"
                  className="text-primary p-0 h-auto"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-secondary/20 border-border">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground text-center mb-2">
              Demo credentials:
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Email: sarah@example.com | Password: password
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;