
import React from 'react';
import { Home, Calendar, User, Settings, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserType } from '@/lib/types';

interface LayoutProps {
  children: React.ReactNode;
  userType: UserType;
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  const location = useLocation();

  const navItems = userType === 'customer' 
    ? [
        { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/dashboard' },
        { icon: <Calendar className="w-5 h-5" />, label: 'Appointments', path: '/appointments' },
        { icon: <MessageCircle className="w-5 h-5" />, label: 'Chat', path: '/chat' },
        { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' },
      ]
    : [
        { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', path: '/calendar' },
        { icon: <MessageCircle className="w-5 h-5" />, label: 'Messages', path: '/messages' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
      ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 container max-w-md mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full shadow-lg rounded-t-3xl">
        <div className="container max-w-md mx-auto flex justify-between px-8 py-4">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center transition-all ${
                  isActive 
                    ? 'text-bookqin-primary scale-110' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`p-1.5 rounded-full ${
                  isActive 
                    ? 'bg-bookqin-light' 
                    : 'hover:bg-gray-100'
                }`}>
                  {item.icon}
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  isActive ? 'opacity-100' : 'opacity-80'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;
