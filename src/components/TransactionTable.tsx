import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  date: string;
  type: 'sent' | 'received';
  amount: number;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-26',
    type: 'sent',
    amount: -150.00,
    recipient: 'John Smith',
    status: 'completed',
    description: 'Dinner payment'
  },
  {
    id: '2',
    date: '2024-01-25',
    type: 'received',
    amount: 2500.00,
    recipient: 'Acme Corp',
    status: 'completed',
    description: 'Salary payment'
  },
  {
    id: '3',
    date: '2024-01-24',
    type: 'sent',
    amount: -75.00,
    recipient: 'Maria Garcia',
    status: 'pending',
    description: 'Utilities split'
  },
  {
    id: '4',
    date: '2024-01-23',
    type: 'received',
    amount: 200.00,
    recipient: 'Alex Johnson',
    status: 'completed',
    description: 'Freelance payment'
  },
  {
    id: '5',
    date: '2024-01-22',
    type: 'sent',
    amount: -30.00,
    recipient: 'Coffee Shop',
    status: 'failed',
    description: 'Morning coffee'
  },
];

const TransactionTable = () => {
  const [filter, setFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  const filteredTransactions = mockTransactions.filter(transaction => {
    const typeMatch = filter === 'all' || transaction.type === filter;
    const statusMatch = statusFilter === 'all' || transaction.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground">Recent Transactions</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setFilter(filter === 'all' ? 'sent' : filter === 'sent' ? 'received' : 'all')}>
            <Filter className="w-4 h-4 mr-2" />
            {filter === 'all' ? 'All' : filter === 'sent' ? 'Sent' : 'Received'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'sent' 
                    ? 'bg-destructive/20 text-destructive' 
                    : 'bg-success/20 text-success'
                }`}>
                  {transaction.type === 'sent' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground">{transaction.recipient}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)} • {transaction.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${
                  transaction.amount > 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </div>
                <Badge variant={getStatusColor(transaction.status)} className="mt-1">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;