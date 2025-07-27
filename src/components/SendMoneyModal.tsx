import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, DollarSign, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SendMoneyModalProps {
  trigger?: React.ReactNode;
}

const SendMoneyModal = ({ trigger }: SendMoneyModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipient || !formData.amount) {
      toast({
        title: "Error",
        description: "Please fill in recipient and amount fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Transaction Sent!",
      description: `$${formData.amount} sent to ${formData.recipient} successfully.`,
    });
    
    setIsLoading(false);
    setIsOpen(false);
    setFormData({ recipient: "", amount: "", description: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="gradient" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Send Money
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Send Money</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-foreground">Recipient</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="recipient"
                type="text"
                placeholder="Enter recipient email or username"
                className="pl-10"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">Amount</Label>
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
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description (Optional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="description"
                placeholder="What's this payment for?"
                className="pl-10 resize-none"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Send Money"}
            </Button>
          </div>
        </form>

        {/* Quick Amount Buttons */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick amounts:</p>
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 100, 500].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, amount: amount.toString() })}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoneyModal;