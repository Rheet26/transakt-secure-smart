import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowLeft, User, Mail, DollarSign, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SendMoney = () => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    amount: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const amount = parseFloat(formData.amount);
      
      if (!amount || amount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid amount",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!profile || amount > profile.balance) {
        toast({
          title: "Insufficient funds",
          description: "You don't have enough balance for this transaction",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user?.id,
          recipient_name: formData.recipientName,
          recipient_email: formData.recipientEmail,
          amount: amount,
          transaction_type: 'send',
          status: 'completed',
          description: formData.description,
        });

      if (transactionError) {
        throw transactionError;
      }

      // Update user balance
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ balance: profile.balance - amount })
        .eq('id', user?.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Money sent successfully!",
        description: `$${amount.toFixed(2)} sent to ${formData.recipientName}`,
      });

      // Reset form
      setFormData({
        recipientName: "",
        recipientEmail: "",
        amount: "",
        description: "",
      });

    } catch (error: any) {
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to send money",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Send Money</h1>
          <p className="text-muted-foreground">Transfer money to friends and family</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Send Money Form */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Send className="w-5 h-5 mr-2" />
              Transfer Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="recipientName"
                    type="text"
                    placeholder="Enter recipient's name"
                    className="pl-10"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="Enter recipient's email"
                    className="pl-10"
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-10"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="description"
                    placeholder="What's this for?"
                    className="pl-10 min-h-[80px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Send Money"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Balance & Quick Info */}
        <div className="space-y-6">
          {/* Current Balance */}
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                ${(profile?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-primary-foreground/80">
                Ready to transfer
              </div>
            </CardContent>
          </Card>

          {/* Quick Send Options */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Send</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[10, 25, 50, 100, 250, 500].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="h-12"
                    onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Recipients */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", email: "sarah@example.com" },
                  { name: "Mike Chen", email: "mike@example.com" },
                  { name: "Emma Davis", email: "emma@example.com" },
                ].map((recipient) => (
                  <div
                    key={recipient.email}
                    className="flex items-center justify-between p-2 hover:bg-secondary/20 rounded-lg cursor-pointer"
                    onClick={() => setFormData({
                      ...formData,
                      recipientName: recipient.name,
                      recipientEmail: recipient.email,
                    })}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
                      <div>
                        <div className="font-medium text-sm">{recipient.name}</div>
                        <div className="text-xs text-muted-foreground">{recipient.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;