
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
      <main className="flex-1 container max-w-md mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="container max-w-md mx-auto flex justify-between px-6 py-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center ${
                  isActive ? 'text-bookqin-primary' : 'text-gray-500'
                }`}
              >
                <div className={`p-1 rounded-full ${isActive ? 'bg-bookqin-light' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;
