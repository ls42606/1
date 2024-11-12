import React, { useState } from 'react';
import { Building2, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';

export function Sidebar() {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-gray-800 pt-5 pb-4">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-semibold text-white">
                  MortgageCRM
                </span>
              </div>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <MobileNavigation onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>
            <div className="border-t border-gray-700 p-4">
              <button
                onClick={handleLogout}
                className="group flex w-full items-center rounded-md px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="mr-4 h-6 w-6" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex w-64 flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold text-white">
                MortgageCRM
              </span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <Navigation />
              <div className="flex-shrink-0 border-t border-gray-700 p-4">
                <button
                  onClick={logout}
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}