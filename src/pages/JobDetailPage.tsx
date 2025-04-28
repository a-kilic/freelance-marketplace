import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Send,
  Heart,
  Share,
  Flag,
  Wallet,
  User,
  ShieldCheck
} from 'lucide-react';
import { format } from 'date-fns';
import { mockJobs } from '../utils/mockData';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const [proposal, setProposal] = useState('');
  const [bid, setBid] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('7');
  const [showProposalForm, setShowProposalForm] = useState(false);

  const job = mockJobs.find(job => job.id === id);

  if (!job) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <h1 className="mb-4 text-3xl font-bold">Job Not Found</h1>
        <p className="mb-6 text-lg">The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="btn btn-primary">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert('Your proposal has been submitted successfully!');
    
    setProposal('');
    setBid('');
    setDeliveryTime('7');
    setShowProposalForm(false);
  };

  const handleConnect = () => {
    open();
  };

  return (
    <div className="min-h-screen pb-12 animate-fade-in bg-slate-50 dark:bg-slate-900">
      <div className="bg-white border-b dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Link to="/" className="transition-colors hover:text-primary-600">Home</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link to="/jobs" className="transition-colors hover:text-primary-600">Jobs</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="max-w-xs truncate text-slate-700 dark:text-slate-300">{job.title}</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-2/3">
            <div className="p-6 mb-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold md:text-3xl">{job.title}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700" title="Save Job">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700" title="Share Job">
                    <Share className="w-5 h-5" />
                  </button>
                  <button className="p-2 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-700" title="Report Job">
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge badge-primary">
                  {job.paymentType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                </span>
                <span className="badge badge-accent">
                  {job.category}
                </span>
                <span className="badge badge-secondary">
                  {job.experienceLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-success-600" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Budget</p>
                    <p className="font-semibold">
                      {job.paymentType === 'fixed' 
                        ? `$${job.budget}` 
                        : `$${job.budget}/hr`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Posted</p>
                    <p className="font-semibold">{format(new Date(job.postedDate), 'MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary-600" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Expected Duration</p>
                    <p className="font-semibold">{job.duration}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold">Job Description</h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p>{job.description}</p>
                  <p>We are looking for a professional with the following qualifications:</p>
                  <ul className="pl-5 space-y-1 list-disc">
                    <li>Proficiency in {job.skills.join(', ')}</li>
                    <li>Strong portfolio of similar projects</li>
                    <li>Excellent communication skills</li>
                    <li>Ability to meet deadlines</li>
                  </ul>
                  <p>The project involves creating a fully functional application with the following features:</p>
                  <ul className="pl-5 space-y-1 list-disc">
                    <li>User authentication and profile management</li>
                    <li>Interactive dashboard with data visualization</li>
                    <li>Real-time notifications and messaging</li>
                    <li>Integration with third-party APIs</li>
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="badge bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold">Client Information</h2>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/50">
                    <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium">{job.client}</p>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <ShieldCheck className="w-4 h-4 mr-1 text-success-500" />
                      <span>Verified Client</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showProposalForm ? (
              <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl animate-slide-up">
                <h2 className="mb-4 text-xl font-semibold">Submit Your Proposal</h2>
                <form onSubmit={handleSubmitProposal}>
                  <div className="mb-4">
                    <label htmlFor="bid" className="block mb-1 text-sm font-medium">
                      Your Bid ({job.paymentType === 'fixed' ? 'Total' : 'Hourly Rate'})
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-slate-500">$</span>
                      </div>
                      <input
                        type="number"
                        id="bid"
                        className="pl-8 input"
                        placeholder={job.paymentType === 'fixed' ? 'Enter your total bid' : 'Enter your hourly rate'}
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {job.paymentType === 'fixed' && (
                    <div className="mb-4">
                      <label htmlFor="deliveryTime" className="block mb-1 text-sm font-medium">
                        Delivery Time (days)
                      </label>
                      <input
                        type="number"
                        id="deliveryTime"
                        className="input"
                        min="1"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="proposal" className="block mb-1 text-sm font-medium">
                      Cover Letter
                    </label>
                    <textarea
                      id="proposal"
                      rows={6}
                      className="input"
                      placeholder="Introduce yourself and explain why you're perfect for this job..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      required
                    ></textarea>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Minimum 100 characters. Professional and personalized proposals get more responses.
                    </p>
                  </div>

                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setShowProposalForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit Proposal
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center bg-white shadow-sm dark:bg-slate-800 rounded-xl">
                {isConnected ? (
                  <>
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-primary-500" />
                    <h2 className="mb-2 text-xl font-semibold">Ready to apply for this job?</h2>
                    <p className="mb-6 text-slate-600 dark:text-slate-400">
                      Submit a proposal with your bid and delivery details.
                    </p>
                    <button
                      className="px-8 btn btn-primary"
                      onClick={() => setShowProposalForm(true)}
                    >
                      Submit a Proposal
                    </button>
                  </>
                ) : (
                  <>
                    <Wallet className="w-12 h-12 mx-auto mb-4 text-primary-500" />
                    <h2 className="mb-2 text-xl font-semibold">Connect your wallet to apply</h2>
                    <p className="mb-6 text-slate-600 dark:text-slate-400">
                      You need to connect your wallet to submit a proposal for this job.
                    </p>
                    <button
                      className="px-8 btn btn-primary"
                      onClick={handleConnect}
                    >
                      Connect Wallet
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:w-1/3">
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">About This Job</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Proposals</p>
                  <p className="font-medium">14 submitted</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Job Success</p>
                  <div className="flex items-center">
                    <div className="w-full h-2 mr-2 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div className="h-2 rounded-full bg-success-500" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                  <p className="font-medium">Remote, Worldwide</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Contract Type</p>
                  <p className="font-medium">{job.paymentType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">Smart Contract Escrow</h2>
              
              <div className="space-y-4 text-sm">
                <p className="text-slate-600 dark:text-slate-400">
                  This job is secured by our blockchain-based escrow system for safe payments.
                </p>
                
                <div className="flex items-start gap-2">
                  <div className="p-1 mt-1 rounded-full bg-success-100 dark:bg-success-900/50">
                    <ShieldCheck className="w-4 h-4 text-success-600 dark:text-success-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Secure Payments:</span> Funds are held in escrow until work is approved
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="p-1 mt-1 rounded-full bg-success-100 dark:bg-success-900/50">
                    <ShieldCheck className="w-4 h-4 text-success-600 dark:text-success-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Transparent Terms:</span> All contract terms visible on blockchain
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="p-1 mt-1 rounded-full bg-success-100 dark:bg-success-900/50">
                    <ShieldCheck className="w-4 h-4 text-success-600 dark:text-success-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Instant Payouts:</span> Get paid immediately upon work approval
                  </p>
                </div>
                
                <Link to="/smart-contracts" className="inline-block font-medium transition-colors text-primary-600 hover:text-primary-800">
                  Learn more about our smart contracts
                </Link>
              </div>
            </div>

            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">Similar Jobs</h2>
              
              <div className="space-y-4">
                {mockJobs
                  .filter(j => j.id !== job.id && j.category === job.category)
                  .slice(0, 3)
                  .map((similarJob) => (
                    <Link 
                      key={similarJob.id}
                      to={`/jobs/${similarJob.id}`}
                      className="block p-3 -mx-3 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <h3 className="mb-1 font-medium line-clamp-1">{similarJob.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          {similarJob.paymentType === 'fixed' 
                            ? `$${similarJob.budget}` 
                            : `$${similarJob.budget}/hr`
                          }
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {format(new Date(similarJob.postedDate), 'MMM d')}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
              
              <Link 
                to="/jobs" 
                className="inline-block mt-4 font-medium transition-colors text-primary-600 hover:text-primary-800"
              >
                View all jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;