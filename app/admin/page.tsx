'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarRange,
  UtensilsCrossed,
  Users,
  TrendingUp,
  BarChart4,
  ArrowUpRight,
  Plus,
  Clock,
  Calendar,
  Info,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboardStats } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for charts
const reservationsData = [
  { name: 'Mon', total: 12 },
  { name: 'Tue', total: 15 },
  { name: 'Wed', total: 22 },
  { name: 'Thu', total: 28 },
  { name: 'Fri', total: 35 },
  { name: 'Sat', total: 40 },
  { name: 'Sun', total: 30 },
];

// Mock data for monthly reservations
const monthlyReservations = [
  { name: 'Jan', total: 120 },
  { name: 'Feb', total: 132 },
  { name: 'Mar', total: 145 },
  { name: 'Apr', total: 155 },
  { name: 'May', total: 190 },
  { name: 'Jun', total: 210 },
  { name: 'Jul', total: 250 },
  { name: 'Aug', total: 265 },
  { name: 'Sep', total: 220 },
  { name: 'Oct', total: 185 },
  { name: 'Nov', total: 195 },
  { name: 'Dec', total: 250 },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    todayReservations: 0,
    activeMenuItems: 0,
    staffCount: 0,
    upcomingReservations: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await getDashboardStats();
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardStats();
  }, []);
  
  // Today's date for display
  const today = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }).format(new Date());
  
  // Stats data
  const statsItems = [
    {
      title: "Today's Reservations",
      value: loading ? '...' : String(stats.todayReservations),
      change: '+12%',
      icon: <CalendarRange className="h-5 w-5 text-blue-600" />,
      path: '/admin/reservations',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Upcoming Reservations',
      value: loading ? '...' : String(stats.upcomingReservations),
      change: '+8%',
      icon: <Calendar className="h-5 w-5 text-violet-600" />,
      path: '/admin/reservations',
      color: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Menu Items',
      value: loading ? '...' : String(stats.activeMenuItems),
      change: '+3%',
      icon: <UtensilsCrossed className="h-5 w-5 text-amber-600" />,
      path: '/admin/menu',
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Staff Members',
      value: loading ? '...' : String(stats.staffCount),
      change: '0%',
      icon: <Users className="h-5 w-5 text-emerald-600" />,
      path: '/admin/staff',
      color: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
  ];
  
  // Activity feed items
  const activities = [
    { 
      id: 1, 
      text: 'New reservation for Table 5', 
      time: 'Today at 7:00 PM',
      icon: <Calendar className="h-4 w-4" />,
    },
    { 
      id: 2, 
      text: 'Menu item "Grilled Salmon" updated', 
      time: '2 hours ago',
      icon: <UtensilsCrossed className="h-4 w-4" />,
    },
    { 
      id: 3, 
      text: 'New staff member John Doe added', 
      time: 'Yesterday',
      icon: <Users className="h-4 w-4" />,
    },
    { 
      id: 4, 
      text: 'Table 3 reservation cancelled', 
      time: 'Yesterday',
      icon: <Clock className="h-4 w-4" />,
    },
    { 
      id: 5, 
      text: 'New special request added to reservation', 
      time: '2 days ago',
      icon: <Info className="h-4 w-4" />,
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="h-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            {today}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 gap-1 px-3">
            <BarChart4 className="h-4 w-4" />
            <span>Reports</span>
          </Button>
          <Button size="sm" className="h-9 gap-1 px-4">
            <Plus className="h-4 w-4" />
            <span>New Reservation</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/40 p-1">
          <TabsTrigger value="overview" className="rounded-md px-5">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-md px-5">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-md px-5">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {statsItems.map((stat) => (
              <motion.div key={stat.title} variants={item}>
                <Card className="overflow-hidden border-border/40 hover:border-border/80 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <Badge variant="outline" className={`text-xs font-medium ${stat.iconColor}`}>
                        {stat.change}
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-3xl font-bold">
                      {loading ? <Skeleton className="h-8 w-16" /> : stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="ghost" 
                      className={`p-0 h-auto text-xs font-medium hover:${stat.iconColor} text-muted-foreground`}
                      onClick={() => router.push(stat.path)}
                    >
                      View details
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <Card className="col-span-1 lg:col-span-5 border-border/40 hover:border-border/80 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reservation Trends</CardTitle>
                    <CardDescription>Monthly reservation volume</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +12.5% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyReservations}>
                      <XAxis 
                        dataKey="name" 
                        tickLine={false} 
                        axisLine={false}
                        fontSize={12}
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                        formatter={(value: number) => [`${value}`, 'Reservations']}
                      />
                      <Bar 
                        dataKey="total" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 border-border/40 hover:border-border/80 transition-colors">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                        {activity.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 border-border/40 hover:border-border/80 transition-colors">
              <CardHeader>
                <CardTitle>Daily Reservation Trends</CardTitle>
                <CardDescription>Number of reservations by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reservationsData}>
                      <XAxis 
                        dataKey="name" 
                        tickLine={false} 
                        axisLine={false}
                        fontSize={12}
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ r: 4, fill: 'hsl(var(--card))', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/40 hover:border-border/80 transition-colors">
              <CardHeader>
                <CardTitle>Reservation Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-blue-100 dark:bg-blue-900/40">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Reservations</p>
                        <p className="text-xs text-muted-foreground">This month</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">185</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-amber-100 dark:bg-amber-900/40">
                        <CheckCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Completion Rate</p>
                        <p className="text-xs text-muted-foreground">Reservations fulfilled</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">92%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                        <Users className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Average Party Size</p>
                        <p className="text-xs text-muted-foreground">Per reservation</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">3.7</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card className="border-border/40 hover:border-border/80 transition-colors">
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Access detailed analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between border-border/40 hover:border-border/80 bg-transparent hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Reservation Summary</p>
                    <p className="text-xs text-muted-foreground mt-1">Overview of all reservations</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between border-border/40 hover:border-border/80 bg-transparent hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Table Utilization</p>
                    <p className="text-xs text-muted-foreground mt-1">Analysis of table booking frequency</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between border-border/40 hover:border-border/80 bg-transparent hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Staff Performance</p>
                    <p className="text-xs text-muted-foreground mt-1">Efficiency metrics for team members</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between border-border/40 hover:border-border/80 bg-transparent hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">Peak Hours Analysis</p>
                    <p className="text-xs text-muted-foreground mt-1">Busiest times for reservations</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 