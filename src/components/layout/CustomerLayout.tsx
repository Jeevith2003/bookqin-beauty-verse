
import React from 'react';
import { Home, Search, Calendar, MessageCircle, User, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/customer/dashboard' },
    { icon: <Search className="w-5 h-5" />, label: 'Search', path: '/customer/search' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', path: '/customer/appointments' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Chat', path: '/customer/chat' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/customer/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bookqin-light">
      {/* Main Content */}
      <main className="flex-1 container max-w-md mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full shadow-lg rounded-t-3xl">
        <div className="container max-w-md mx-auto flex justify-between px-4 py-4">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex flex-col items-center transition-all ${
                  isActive 
                    ? 'text-bookqin-secondary scale-110' 
                    : 'text-bookqin-primary/60 hover:text-bookqin-primary/80'
                }`}
              >
                <div className={`p-1.5 rounded-full ${
                  isActive 
                    ? 'bg-bookqin-light' 
                    : 'hover:bg-bookqin-light/50'
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

export default CustomerLayout;
