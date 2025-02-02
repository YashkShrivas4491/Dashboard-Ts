import { Activity, Users, DollarSign, TrendingUp, LogOut } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { AreaChart } from "@/components/AreaChart";
import { BarChart } from "@/components/BarChart";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const revenueData = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 2000 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 3000 },
  { name: "May", value: 2500 },
  { name: "Jun", value: 4000 },
];

const userActivityData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 150 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 140 },
  { name: "Fri", value: 200 },
  { name: "Sat", value: 160 },
  { name: "Sun", value: 130 },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Your analytics overview.</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Revenue"
            value="$45,231"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            label="Active Users"
            value="2,345"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatCard
            label="Conversion Rate"
            value="3.2%"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 1.1, isPositive: false }}
          />
          <StatCard
            label="Active Sessions"
            value="1,234"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 8.4, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AreaChart data={revenueData} title="Revenue Over Time" />
          <BarChart data={userActivityData} title="User Activity" />
        </div>
      </div>
    </div>
  );
};

export default Index;