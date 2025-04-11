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
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboardStats } from '@/lib/db';

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
      icon: <CalendarRange className="h-4 w-4 text-blue-500" />,
      path: '/admin/reservations',
      color: 'bg-blue-50 dark:bg-blue-950',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-100 dark:border-blue-900',
    },
    {
      title: 'Upcoming Reservations',
      value: loading ? '...' : String(stats.upcomingReservations),
      change: '+8%',
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
      path: '/admin/reservations',
      color: 'bg-purple-50 dark:bg-purple-950',
      iconColor: 'text-purple-500',
      borderColor: 'border-purple-100 dark:border-purple-900',
    },
    {
      title: 'Menu Items',
      value: loading ? '...' : String(stats.activeMenuItems),
      change: '+3%',
      icon: <UtensilsCrossed className="h-4 w-4 text-amber-500" />,
      path: '/admin/menu',
      color: 'bg-amber-50 dark:bg-amber-950',
      iconColor: 'text-amber-500',
      borderColor: 'border-amber-100 dark:border-amber-900',
    },
    {
      title: 'Staff Members',
      value: loading ? '...' : String(stats.staffCount),
      change: '0%',
      icon: <Users className="h-4 w-4 text-indigo-500" />,
      path: '/admin/staff',
      color: 'bg-indigo-50 dark:bg-indigo-950',
      iconColor: 'text-indigo-500',
      borderColor: 'border-indigo-100 dark:border-indigo-900',
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
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {today}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/reports">
              <BarChart4 className="mr-2 h-4 w-4" />
              Reports
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/reservations/new">
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {statsItems.map((stat, i) => (
              <motion.div key={stat.title} variants={item}>
                <Card className={`overflow-hidden border ${stat.borderColor}`}>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-full ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div className="text-xs font-medium flex items-center text-emerald-600">
                        {stat.change}
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
                    <div className="mt-4">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs font-medium"
                        onClick={() => router.push(stat.path)}
                      >
                        View details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            <Card className="col-span-1 lg:col-span-5">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reservation Trends</CardTitle>
                    <CardDescription>Monthly reservation volume</CardDescription>
                  </div>
                  <div className="flex items-center text-sm text-emerald-600 font-medium">
                    +12.5% <ArrowUpRight className="ml-1 h-3 w-3" />
                  </div>
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
                        cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                        formatter={(value: number) => [`${value}`, 'Reservations']}
                      />
                      <Bar 
                        dataKey="total" 
                        fill="url(#colorGradient)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        {activity.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 lg:col-span-2">
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
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reservation Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 p-2 rounded-full bg-blue-50 dark:bg-blue-900">
                        <Calendar className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Reservations</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">This month</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">185</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 p-2 rounded-full bg-amber-50 dark:bg-amber-900">
                        <CheckCircle className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Completion Rate</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Reservations fulfilled</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">92%</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 p-2 rounded-full bg-emerald-50 dark:bg-emerald-900">
                        <Users className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Average Party Size</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Per reservation</p>
                      </div>
                    </div>
                    <div className="text-xl font-bold">3.7</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Access detailed analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between">
                  <div>
                    <p className="font-medium">Reservation Summary</p>
                    <p className="text-xs text-gray-500 mt-1">Overview of all reservations</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between">
                  <div>
                    <p className="font-medium">Table Utilization</p>
                    <p className="text-xs text-gray-500 mt-1">Analysis of table booking frequency</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between">
                  <div>
                    <p className="font-medium">Staff Performance</p>
                    <p className="text-xs text-gray-500 mt-1">Efficiency metrics for team members</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="h-auto flex items-start text-left p-4 justify-between">
                  <div>
                    <p className="font-medium">Peak Hours Analysis</p>
                    <p className="text-xs text-gray-500 mt-1">Busiest times for reservations</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 