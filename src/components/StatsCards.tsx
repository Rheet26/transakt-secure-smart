import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "$12,450.75",
      change: "+2.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "This Month",
      value: "$3,247.90",
      change: "+12.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Transactions",
      value: "47",
      change: "+7",
      trend: "up",
      icon: Activity,
      color: "text-primary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className={stat.color}>{stat.change}</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;