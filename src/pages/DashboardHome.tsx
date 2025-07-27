import { useAuth } from "@/contexts/AuthContext";
import StatsCards from "@/components/StatsCards";
import TransactionChart from "@/components/TransactionChart";
import TransactionTable from "@/components/TransactionTable";
import SendMoneyModal from "@/components/SendMoneyModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Download, CreditCard, TrendingUp, Shield, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
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

      {/* Core Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/dashboard/send">
          <Button variant="gradient" className="w-full h-20 text-lg">
            <Send className="w-6 h-6 mr-3" />
            Transfer Money
          </Button>
        </Link>
        <Link to="/dashboard/history">
          <Button variant="outline" className="w-full h-20 text-lg">
            <Download className="w-6 h-6 mr-3" />
            Request Money
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Fraud Detection Monitor */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-500" />
            Fraud Detection Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">12</div>
              <div className="text-sm text-muted-foreground">Fraudulent Transactions</div>
              <div className="text-xs text-green-500">+5% this month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">3</div>
              <div className="text-sm text-muted-foreground">Suspicious Activities</div>
              <div className="text-xs text-red-500">+15% this week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">98.2%</div>
              <div className="text-sm text-muted-foreground">Detection Rate</div>
              <div className="text-xs text-green-500">+0.5% improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts and QR Code */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionChart />
        
        {/* QR Code Payments */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">QR Code Payments</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <div className="text-sm text-gray-500">QR Code</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Scan to receive payments instantly
            </p>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transaction Volume */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Transaction Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-bold">$124,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Month</span>
                <span className="font-bold">$98,200</span>
              </div>
              <div className="text-sm text-green-500">+26.8% increase</div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Anomalies */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Transaction Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Detected</span>
                <span className="font-bold text-red-500">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resolved</span>
                <span className="font-bold text-green-500">5</span>
              </div>
              <div className="text-sm text-orange-500">3 pending review</div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Types */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Payment Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Bank Transfer</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Card Payment</span>
                <span className="font-bold">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Digital Wallet</span>
                <span className="font-bold">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Profile */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Risk Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Low Risk</span>
                  <span className="text-sm">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Medium Risk</span>
                  <span className="text-sm">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">High Risk</span>
                  <span className="text-sm">3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Log Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Audit Log Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Login Attempts</span>
                <span className="font-bold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Failed Logins</span>
                <span className="font-bold text-red-500">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Data Access</span>
                <span className="font-bold">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Config Changes</span>
                <span className="font-bold">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <TransactionTable />
    </div>
  );
};

export default DashboardHome;