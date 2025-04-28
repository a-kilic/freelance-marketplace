import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { ChevronRight, CreditCard, AlertCircle } from 'lucide-react';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    skills: '',
    paymentType: 'fixed',
    budget: '',
    duration: '',
    experienceLevel: 'Intermediate',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim() || formData.description.length < 100) 
      newErrors.description = 'Description must be at least 100 characters';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    
    return newErrors;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    

    alert('Job created successfully!');
    navigate('/jobs');
  };
  
  if (!isConnected) {
    return (
      <div className="min-h-screen py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl p-8 mx-auto text-center bg-white shadow-sm dark:bg-slate-800 rounded-xl">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-primary-500" />
            <h1 className="mb-4 text-2xl font-bold">Connect Your Wallet</h1>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              You need to connect your wallet to post a job on our platform.
            </p>
            <button
              onClick={() => open()}
              className="px-8 btn btn-primary"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-12 animate-fade-in bg-slate-50 dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <a href="/" className="transition-colors hover:text-primary-600">Home</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-slate-700 dark:text-slate-300">Post a Job</span>
          </div>
        </div>
      </div>
      
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-3xl font-bold">Post a New Job</h1>
          
          <div className="p-6 mb-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
            <h2 className="mb-4 text-xl font-semibold">Job Details</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block mb-1 text-sm font-medium">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={`input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="e.g., 'Full Stack Web Developer for E-commerce Platform'"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-error-600">{errors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block mb-1 text-sm font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className={`input ${errors.category ? 'border-error-500 focus:ring-error-500' : ''}`}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Smart Contract Development">Smart Contract Development</option>
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Writing & Translation">Writing & Translation</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Data Science & Analytics">Data Science & Analytics</option>
                    <option value="Customer Service">Customer Service</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-error-600">{errors.category}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="block mb-1 text-sm font-medium">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    className={`input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="Provide a detailed description of the job, requirements, and expectations..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  <p className={`mt-1 text-xs ${errors.description ? 'text-error-600' : 'text-slate-500 dark:text-slate-400'}`}>
                    Minimum 100 characters. Be specific about deliverables and requirements.
                  </p>
                  {errors.description && (
                    <p className="mt-1 text-sm text-error-600">{errors.description}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="skills" className="block mb-1 text-sm font-medium">
                    Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    className={`input ${errors.skills ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="e.g., 'React, Node.js, MongoDB, Solidity'"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                  {errors.skills && (
                    <p className="mt-1 text-sm text-error-600">{errors.skills}</p>
                  )}
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Payment Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentType"
                        value="fixed"
                        checked={formData.paymentType === 'fixed'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Fixed Price
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentType"
                        value="hourly"
                        checked={formData.paymentType === 'hourly'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Hourly Rate
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="budget" className="block mb-1 text-sm font-medium">
                    Budget {formData.paymentType === 'fixed' ? '(Total)' : '(Per Hour)'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-slate-500">$</span>
                    </div>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      min="1"
                      className={`input pl-8 ${errors.budget ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder={formData.paymentType === 'fixed' ? 'Enter total budget' : 'Enter hourly rate'}
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.budget && (
                    <p className="mt-1 text-sm text-error-600">{errors.budget}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="duration" className="block mb-1 text-sm font-medium">
                    Expected Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    className={`input ${errors.duration ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="e.g., '2 weeks', '1 month', '3-6 months'"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-error-600">{errors.duration}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="experienceLevel" className="block mb-1 text-sm font-medium">
                    Experience Level
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    className="input"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  >
                    <option value="Entry">Entry Level</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 mt-8 border rounded-lg bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary-800 dark:text-primary-300">Escrow Payment Required</h3>
                    <p className="mt-1 text-sm text-primary-700 dark:text-primary-400">
                      When a freelancer is selected, you'll need to fund the escrow smart contract 
                      with the agreed amount. This guarantees payment to the freelancer upon
                      successful completion.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-8 btn btn-primary"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;