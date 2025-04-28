import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, DollarSign, Briefcase, X, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { mockJobs } from '../utils/mockData';

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    paymentRange: '',
    experienceLevel: '',
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.category === '' || job.category === filters.category;
    
    const matchesPaymentRange = filters.paymentRange === '' || 
      (filters.paymentRange === 'under-500' && job.budget < 500) ||
      (filters.paymentRange === '500-1000' && job.budget >= 500 && job.budget <= 1000) ||
      (filters.paymentRange === '1000-5000' && job.budget > 1000 && job.budget <= 5000) ||
      (filters.paymentRange === 'over-5000' && job.budget > 5000);
    
    const matchesExperienceLevel = filters.experienceLevel === '' || job.experienceLevel === filters.experienceLevel;
    
    return matchesSearch && matchesCategory && matchesPaymentRange && matchesExperienceLevel;
  });

  const categories = [...new Set(mockJobs.map(job => job.category))];
  const experienceLevels = [...new Set(mockJobs.map(job => job.experienceLevel))];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value 
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      paymentRange: '',
      experienceLevel: '',
    });
    setSearchTerm('');
  };

  const hasActiveFilters = filters.category !== '' || filters.paymentRange !== '' || filters.experienceLevel !== '' || searchTerm !== '';

  return (
    <div className="min-h-screen animate-fade-in bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find Jobs</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Browse {mockJobs.length} jobs across various categories
          </p>
        </div>

        <div className="p-4 mb-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
          <div className="relative">
            <Search className="absolute w-5 h-5 left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search for jobs by title, keyword, or client..."
              className="pl-10 input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="mb-4 lg:hidden">
            <button 
              className="flex items-center justify-center w-full gap-2 btn btn-outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="w-4 h-4" />
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            {filtersOpen && (
              <div className="p-4 mt-4 bg-white shadow-sm dark:bg-slate-800 rounded-xl animate-slide-down">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  {hasActiveFilters && (
                    <button 
                      className="text-sm transition-colors text-primary-600 hover:text-primary-800"
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.category === category
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        } transition-colors`}
                        onClick={() => handleFilterChange('category', category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium">Budget Range</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'under-500', label: 'Under $500' },
                      { id: '500-1000', label: '$500 - $1,000' },
                      { id: '1000-5000', label: '$1,000 - $5,000' },
                      { id: 'over-5000', label: 'Over $5,000' },
                    ].map((range) => (
                      <button
                        key={range.id}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.paymentRange === range.id
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        } transition-colors`}
                        onClick={() => handleFilterChange('paymentRange', range.id)}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Experience Level</h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceLevels.map((level) => (
                      <button
                        key={level}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.experienceLevel === level
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        } transition-colors`}
                        onClick={() => handleFilterChange('experienceLevel', level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="sticky hidden w-1/4 p-6 bg-white shadow-sm lg:block dark:bg-slate-800 rounded-xl h-fit top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <button 
                  className="text-sm transition-colors text-primary-600 hover:text-primary-800"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium">Category</h4>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-2 rounded-lg text-sm text-left ${
                      filters.category === category
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                    } transition-colors`}
                    onClick={() => handleFilterChange('category', category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 text-sm font-medium">Budget Range</h4>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'under-500', label: 'Under $500' },
                  { id: '500-1000', label: '$500 - $1,000' },
                  { id: '1000-5000', label: '$1,000 - $5,000' },
                  { id: 'over-5000', label: 'Over $5,000' },
                ].map((range) => (
                  <button
                    key={range.id}
                    className={`px-3 py-2 rounded-lg text-sm text-left ${
                      filters.paymentRange === range.id
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                    } transition-colors`}
                    onClick={() => handleFilterChange('paymentRange', range.id)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium">Experience Level</h4>
              <div className="flex flex-col gap-2">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    className={`px-3 py-2 rounded-lg text-sm text-left ${
                      filters.experienceLevel === level
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                    } transition-colors`}
                    onClick={() => handleFilterChange('experienceLevel', level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 p-4 mb-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
                <span className="mr-2 text-sm font-medium">Active Filters:</span>
                
                {searchTerm && (
                  <div className="flex items-center gap-1 px-3 py-1 badge bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <span>"{searchTerm}"</span>
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => setSearchTerm('')}
                    />
                  </div>
                )}
                
                {filters.category && (
                  <div className="flex items-center gap-1 px-3 py-1 badge bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <span>{filters.category}</span>
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleFilterChange('category', filters.category)}
                    />
                  </div>
                )}
                
                {filters.paymentRange && (
                  <div className="flex items-center gap-1 px-3 py-1 badge bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <span>
                      {filters.paymentRange === 'under-500' && 'Under $500'}
                      {filters.paymentRange === '500-1000' && '$500 - $1,000'}
                      {filters.paymentRange === '1000-5000' && '$1,000 - $5,000'}
                      {filters.paymentRange === 'over-5000' && 'Over $5,000'}
                    </span>
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleFilterChange('paymentRange', filters.paymentRange)}
                    />
                  </div>
                )}
                
                {filters.experienceLevel && (
                  <div className="flex items-center gap-1 px-3 py-1 badge bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <span>{filters.experienceLevel}</span>
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleFilterChange('experienceLevel', filters.experienceLevel)}
                    />
                  </div>
                )}
                
                <button 
                  className="ml-auto text-sm transition-colors text-primary-600 hover:text-primary-800"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
            )}

            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Link 
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="block"
                  >
                    <div className="transition-all card hover:shadow-md group">
                      <div className="flex flex-col justify-between md:flex-row">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold transition-colors group-hover:text-primary-600">
                              {job.title}
                            </h3>
                            <span className={`ml-2 badge ${
                              job.paymentType === 'fixed' 
                                ? 'badge-primary' 
                                : 'badge-secondary'
                            }`}>
                              {job.paymentType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                            </span>
                          </div>
                          <p className="mb-4 text-slate-500 dark:text-slate-400 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="badge badge-accent">
                              {job.category}
                            </span>
                            <span className="badge badge-secondary">
                              {job.experienceLevel}
                            </span>
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="badge badge-outline">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="badge badge-outline">
                                +{job.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end">
                          <div className="flex items-center gap-1 text-success-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold">
                              {job.paymentType === 'fixed' 
                                ? `$${job.budget}` 
                                : `$${job.budget}/hr`
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-slate-500 dark:text-slate-400">
                            <Briefcase className="w-4 h-4" />
                            <span>Posted by {job.client}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            <span>Posted {format(new Date(job.postedDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end mt-4 font-medium transition-transform text-primary-600 group-hover:translate-x-1">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-white shadow-sm dark:bg-slate-800 rounded-xl">
                <div className="mb-4 text-slate-400">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No jobs found</h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  No jobs match your current search criteria or filters.
                </p>
                <button 
                  onClick={clearFilters}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;