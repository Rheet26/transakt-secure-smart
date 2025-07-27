import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Smartphone, Zap, BarChart3, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="text-xl font-bold text-foreground">TransAkt</span>
          </div>
          <div className="space-x-4">
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Send & Track Money
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Instantly with TransAkt
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure. Fast. Intelligent. Built with AI-driven fraud protection.
          </p>
          
          {/* Dashboard Mockup */}
          <div className="relative mb-12">
            <div className="bg-gradient-secondary p-8 rounded-2xl shadow-card max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-6">
                  {[65, 40, 80, 45, 90, 55, 75].map((height, i) => (
                    <div key={i} className="flex flex-col justify-end">
                      <div 
                        className="bg-gradient-primary rounded-t-md min-h-[20px]"
                        style={{ height: `${height}px` }}
                      ></div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Transaction Volume: $15,420</span>
                  <span className="text-success">+5.2% this month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <Link to="/auth">
              <Button variant="gradient" size="xl">
                Get Started
              </Button>
            </Link>
            <Button variant="glass" size="xl">
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of financial transactions with our cutting-edge technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-card border-border hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Fraud Detection AI</h3>
            <p className="text-muted-foreground mb-4">
              Detects anomalies in real-time, ensuring the security of your transactions. 
              Suspicious activity alerts are sent immediately.
            </p>
            <div className="text-sm text-accent">Advanced ML algorithms</div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Biometric Login</h3>
            <p className="text-muted-foreground mb-4">
              Secure access with fingerprint or facial recognition. 
              No more forgotten passwords, just seamless authentication.
            </p>
            <div className="text-sm text-accent">WebAuthn supported</div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Instant Transactions</h3>
            <p className="text-muted-foreground mb-4">
              Experience zero delay with real-time transaction logs. 
              Money moves at the speed of thought.
            </p>
            <div className="text-sm text-accent">Real-time processing</div>
          </Card>
        </div>
      </section>

      {/* How TransAkt Works */}
      <section className="container mx-auto px-4 py-20 bg-secondary/20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How TransAkt Works
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Login or Register</h3>
              <p className="text-muted-foreground">Create your account with biometric authentication for maximum security</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Enter Transaction Details</h3>
              <p className="text-muted-foreground">Input recipient information and amount with our intuitive interface</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Get Confirmation + Live Tracking</h3>
              <p className="text-muted-foreground">Receive instant confirmation and track your transaction in real-time</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/auth">
            <Button variant="gradient" size="xl">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded"></div>
            <span className="text-lg font-bold text-foreground">TransAkt</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 TransAkt. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;