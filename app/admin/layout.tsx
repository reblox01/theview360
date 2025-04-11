'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  FileEdit, 
  Users, 
  Settings,
  ChevronRight,
  Menu as MenuIcon,
  Bell,
  User as UserIcon,
  LogOut,
  MoreHorizontal
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  { text: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/admin', badge: null },
  { text: 'Reservations', icon: <CalendarDays className="h-5 w-5" />, path: '/admin/reservations', badge: '12' },
  { text: 'Menu Management', icon: <UtensilsCrossed className="h-5 w-5" />, path: '/admin/menu', badge: null },
  { text: 'Content Management', icon: <FileEdit className="h-5 w-5" />, path: '/admin/content', badge: null },
  { text: 'Staff', icon: <Users className="h-5 w-5" />, path: '/admin/staff', badge: null },
  { text: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings', badge: null },
];

type AdminLayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
};

const AdminLayout = ({ children, showHeader = true }: AdminLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileOpen(false);
  }, [pathname]);

  const renderNavigationItems = () => (
    <>
      {menuItems.map((item) => {
        const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
        
        return (
          <Button
            key={item.text}
            variant={isActive ? "default" : "ghost"}
            className={`w-full justify-start h-10 mb-1 rounded-md relative group ${isActive ? '' : 'hover:bg-muted/60'}`}
            asChild
          >
            <Link href={item.path}>
              <div className="flex items-center w-full">
                <div className={`${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'} transition-colors mr-3`}>
                  {item.icon}
                </div>
                <span className={`${isActive ? 'font-medium' : ''}`}>{item.text}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto mr-1 bg-primary/10 hover:bg-primary/20 text-primary text-xs">
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </div>
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator" 
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full my-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </Button>
        );
      })}
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[280px] border-r border-border/40 shadow-sm bg-card overflow-hidden">
        <div className="p-6 border-b border-border/40 flex items-center">
          <div className="bg-primary/10 rounded-md p-2 mr-3">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              The View 360
            </h1>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          {renderNavigationItems()}
        </ScrollArea>
        
        <div className="p-4 border-t border-border/40 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/admin-avatar.png" alt="Admin User" />
                <AvatarFallback className="bg-primary/20 text-primary">AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@theview360.com</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      
      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border/40 flex items-center">
              <div className="bg-primary/10 rounded-md p-2 mr-3">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  The View 360
                </h1>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              {renderNavigationItems()}
            </ScrollArea>
            
            <div className="p-4 border-t border-border/40 mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/admin-avatar.png" alt="Admin User" />
                    <AvatarFallback className="bg-primary/20 text-primary">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@theview360.com</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <header className="h-16 border-b border-border/40 bg-card shadow-sm z-10">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
        )}
        
        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 