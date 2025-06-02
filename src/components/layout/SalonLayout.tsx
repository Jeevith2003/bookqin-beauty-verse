
import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Settings, 
  Users, 
  Clock, 
  DollarSign, 
  Bell, 
  Star,
  BookOpen,
  HelpCircle,
  User,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SalonLayoutProps {
  children: React.ReactNode;
}

const SalonLayout: React.FC<SalonLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/salon/dashboard' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', path: '/salon/bookings' },
    { icon: <Settings className="w-5 h-5" />, label: 'Services', path: '/salon/services' },
    { icon: <Clock className="w-5 h-5" />, label: 'Time Slots', path: '/salon/timeslots' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Earnings', path: '/salon/earnings' },
    { icon: <Bell className="w-5 h-5" />, label: 'Notifications', path: '/salon/notifications' },
    { icon: <Star className="w-5 h-5" />, label: 'Feedback', path: '/salon/feedback' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Academy', path: '/salon/academy' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Help', path: '/salon/help' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/salon/profile' },
  ];

  return (
    <div className="min-h-screen flex bg-bookqin-light">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-bookqin-primary">Bookqin Salon</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-bookqin-primary">Bookqin Salon</h2>
          <p className="text-sm text-gray-500 mt-1">Management Dashboard</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-bookqin-light text-bookqin-primary font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-bookqin-primary'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <main className="pt-16 lg:pt-6 px-4 lg:px-6 pb-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalonLayout;
