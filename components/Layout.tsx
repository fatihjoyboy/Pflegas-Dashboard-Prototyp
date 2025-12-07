import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, Users, Building2, Briefcase, Zap, Settings, Bell, User } from 'lucide-react';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Übersicht', path: '/', icon: LayoutDashboard },
  { label: 'Kandidaten', path: '/candidates', icon: Users },
  { label: 'Arbeitgeber', path: '/employers', icon: Building2 },
  { label: 'Stellen', path: '/jobs', icon: Briefcase },
  { label: 'Matches', path: '/matches', icon: Zap },
  { label: 'Einstellungen', path: '/settings', icon: Settings },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-surface overflow-hidden text-dark">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          {/* Branding Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
              P
            </div>
            <span className="text-xl font-bold text-dark tracking-tight">Pflegas</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-primary-light text-primary-dark' 
                    : 'text-gray-500 hover:bg-surface hover:text-dark'}
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 -ml-2 mr-2 text-gray-500 hover:bg-surface rounded-md lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-dark hidden sm:block">
              {navItems.find(i => i.path === location.pathname)?.label || 'Pflegas Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-primary-light border border-primary/20 flex items-center justify-center text-primary-dark font-semibold text-sm">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-surface p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;