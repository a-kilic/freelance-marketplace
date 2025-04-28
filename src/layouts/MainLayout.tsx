import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Wallet, LogOut, User, Briefcase as BriefcaseBusiness, Search, ChevronDown } from 'lucide-react';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <BriefcaseBusiness className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold">DecentWork</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/jobs" className="font-medium hover:text-primary-600 transition-colors">
                  Find Jobs
                </Link>
                <Link to="/freelancers" className="font-medium hover:text-primary-600 transition-colors">
                  Find Freelancers
                </Link>
                <div className="relative group">
                  <button className="flex items-center font-medium hover:text-primary-600 transition-colors">
                    Resources <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200 dark:border-slate-700">
                    <Link to="/how-it-works" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                      How It Works
                    </Link>
                    <Link to="/smart-contracts" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                      Smart Contracts
                    </Link>
                    <Link to="/faq" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                      FAQ
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              
              {isConnected ? (
                <div className="relative group">
                  <button className="btn btn-outline flex items-center gap-2 text-sm">
                    <Wallet className="w-4 h-4" />
                    {address && truncateAddress(address)}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200 dark:border-slate-700">
                    <Link to={`/profile/${address}`} className="flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                      <User className="mr-2 w-4 h-4" /> Profile
                    </Link>
                    <Link to="/jobs/create" className="flex items-center px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                      <BriefcaseBusiness className="mr-2 w-4 h-4" /> Post a Job
                    </Link>
                    <button 
                      onClick={() => disconnect()} 
                      className="flex items-center w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-error-600"
                    >
                      <LogOut className="mr-2 w-4 h-4" /> Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => open()} 
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              )}
              
              <button 
                className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} animate-fade-in`}>
          <div className="px-4 py-3 space-y-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <Link 
              to="/jobs" 
              className="block font-medium py-2 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              Find Jobs
            </Link>
            <Link 
              to="/freelancers" 
              className="block font-medium py-2 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              Find Freelancers
            </Link>
            <Link 
              to="/how-it-works" 
              className="block font-medium py-2 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link 
              to="/smart-contracts" 
              className="block font-medium py-2 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              Smart Contracts
            </Link>
            <Link 
              to="/faq" 
              className="block font-medium py-2 hover:text-primary-600 transition-colors"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <BriefcaseBusiness className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold">DecentWork</span>
              </Link>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                A decentralized freelance marketplace powered by blockchain technology.
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">For Clients</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/jobs/create" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/freelancers" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Find Freelancers
                  </Link>
                </li>
                <li>
                  <Link to="/escrow" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Escrow Payments
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">For Freelancers</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/jobs" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link to="/payment" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Get Paid
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/how-it-works" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/smart-contracts" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Smart Contracts
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} DecentWork. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;