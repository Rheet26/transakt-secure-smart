import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatsCards from "@/components/StatsCards";
import TransactionChart from "@/components/TransactionChart";
import TransactionTable from "@/components/TransactionTable";
import SendMoneyModal from "@/components/SendMoneyModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-card border-b border-border p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {profile?.display_name || profile?.full_name || user?.email?.split('@')[0] || 'User'}
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your money today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <SendMoneyModal 
                trigger={
                  <Button variant="gradient">
                    <Send className="w-4 h-4 mr-2" />
                    Send Money
                  </Button>
                }
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Balance Overview */}
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${(profile?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-primary-foreground/80">
                Available balance
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts and Transactions */}
          <div className="grid lg:grid-cols-2 gap-6">
            <TransactionChart />
            
            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SendMoneyModal 
                  trigger={
                    <Button variant="outline" className="w-full justify-start">
                      <Send className="w-4 h-4 mr-2" />
                      Send Money
                    </Button>
                  }
                />
                <Button variant="outline" className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Request Money
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="w-4 h-4 mr-2" />
                  Pay Bills
                </Button>
                
                {/* QR Code Section */}
                <div className="mt-6 p-4 bg-secondary/20 rounded-lg text-center">
                  <div className="w-32 h-32 bg-white mx-auto mb-3 rounded-lg flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">QR Code</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan to receive payments
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <TransactionTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;