import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Briefcase } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full inline-flex items-center justify-center mb-6">
          <Search className="w-12 h-12 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/jobs" className="btn btn-outline flex items-center justify-center gap-2">
            <Briefcase className="w-4 h-4" /> Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;