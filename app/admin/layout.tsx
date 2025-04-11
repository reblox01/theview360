'use client';

import { useState } from 'react';
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
  User,
  LogOut
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const DRAWER_WIDTH = 280;

const menuItems = [
  { text: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/admin' },
  { text: 'Reservations', icon: <CalendarDays className="h-5 w-5" />, path: '/admin/reservations' },
  { text: 'Menu Management', icon: <UtensilsCrossed className="h-5 w-5" />, path: '/admin/menu' },
  { text: 'Content Management', icon: <FileEdit className="h-5 w-5" />, path: '/admin/content' },
  { text: 'Staff', icon: <Users className="h-5 w-5" />, path: '/admin/staff' },
  { text: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings' },
];

type AdminLayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
};

const AdminLayout = ({ children, showHeader = true }: AdminLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[280px] border-r border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
            The View 360
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Administration</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            
            return (
              <Link 
                key={item.text} 
                href={item.path}
              >
                <div
                  className={`
                    flex items-center px-4 py-3 text-sm rounded-lg mb-1 group
                    transition-all duration-200 ease-in-out relative
                    ${isActive 
                      ? 'text-white font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-highlight"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="mr-3">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-600 flex items-center justify-center text-white text-sm font-medium">
              AD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@theview360.com</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
              The View 360
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administration</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
              
              return (
                <Link 
                  key={item.text} 
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className={`
                      flex items-center px-4 py-3 text-sm rounded-lg mb-1
                      transition-all duration-200 ease-in-out
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <span className="mr-3">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                    {isActive && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-600 flex items-center justify-center text-white text-sm font-medium">
                AD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@theview360.com</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm z-10">
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
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
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