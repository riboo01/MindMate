import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  BarChart2, 
  Calendar, 
  User,
  LifeBuoy,
  Home
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/chat', label: 'Chat', icon: <MessageCircle size={20} /> },
    { path: '/mood-tracker', label: 'Mood Tracker', icon: <Calendar size={20} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/emergency', label: 'Emergency', icon: <LifeBuoy size={20} /> }
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg group transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 mt-4">
        <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-3">Need immediate help?</p>
            <Link to="/emergency" className="btn btn-primary text-xs py-1 px-3">
              Get Emergency Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;