import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import {
  User,
  Edit,
  Calendar,
  Star,
  Briefcase,
  Award,
  MapPin,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';
import { format } from 'date-fns';

const mockUser = {
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  name: 'Alex Johnson',
  title: 'Blockchain Developer & Full Stack Engineer',
  location: 'San Francisco, CA',
  joinedDate: '2023-06-15',
  bio: 'Specialized in developing decentralized applications with 5+ years of experience in blockchain technology. Proficient in Solidity, React, Node.js, and various other web technologies. Passionate about creating secure, efficient, and user-friendly solutions in the Web3 space.',
  hourlyRate: 75,
  successRate: 94,
  completedJobs: 28,
  ratings: 4.9,
  totalReviews: 24,
  skills: [
    'Solidity', 'Smart Contracts', 'React', 'Node.js', 'TypeScript', 
    'Web3.js', 'Ethereum', 'DeFi', 'MongoDB', 'AWS'
  ],
  workHistory: [
    {
      id: '1',
      title: 'NFT Marketplace Development',
      client: 'CryptoCollect Inc.',
      completedDate: '2023-12-10',
      duration: '3 months',
      rating: 5,
      budget: 8500,
      paymentType: 'fixed',
      review: 'Alex delivered an exceptional NFT marketplace with all the features we required and more. Their knowledge of smart contracts was impressive, and they were always prompt with communication. Would definitely hire again for future blockchain projects.'
    },
    {
      id: '2',
      title: 'DeFi Staking Platform',
      client: 'YieldFarm Finance',
      completedDate: '2023-09-22',
      duration: '2 months',
      rating: 5,
      budget: 6200,
      paymentType: 'fixed',
      review: 'Excellent work on our staking platform. Alex has deep knowledge of DeFi protocols and implemented everything securely and efficiently. Great communication throughout the project.'
    },
    {
      id: '3',
      title: 'Web3 Integration for E-commerce Site',
      client: 'Digital Goods Store',
      completedDate: '2023-07-15',
      duration: '6 weeks',
      rating: 4.5,
      budget: 4500,
      paymentType: 'fixed',
      review: 'Alex helped us integrate cryptocurrency payments into our existing e-commerce platform. The work was done professionally and on time. Would recommend for any Web3 integration needs.'
    },
    {
      id: '4',
      title: 'Smart Contract Audit & Optimization',
      client: 'Secure Protocol',
      completedDate: '2023-05-03',
      duration: '3 weeks',
      rating: 5,
      budget: 3800,
      paymentType: 'fixed',
      review: 'Alex performed a thorough audit of our smart contracts, identified several potential vulnerabilities, and suggested optimizations that reduced gas costs significantly. Very knowledgeable in security best practices.'
    }
  ],
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      year: '2018 - 2020'
    },
    {
      degree: 'Bachelor of Engineering in Software Engineering',
      institution: 'University of California, Berkeley',
      year: '2014 - 2018'
    }
  ],
  certifications: [
    {
      name: 'Certified Blockchain Developer',
      issuer: 'Blockchain Council',
      year: '2021'
    },
    {
      name: 'Ethereum Developer Certification',
      issuer: 'ConsenSys Academy',
      year: '2020'
    },
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2019'
    }
  ]
};

const ProfilePage = () => {
  const { address } = useParams<{ address: string }>();
  const { address: userAddress } = useAccount();
  const [historyExpanded, setHistoryExpanded] = useState(false);
  
  const isOwnProfile = address?.toLowerCase() === userAddress?.toLowerCase();
  const displayAddress = address || mockUser.address;
  const truncatedAddress = `${displayAddress.slice(0, 6)}...${displayAddress.slice(-4)}`;
  

  const userData = mockUser;
  
  const visibleWorkHistory = historyExpanded 
    ? userData.workHistory 
    : userData.workHistory.slice(0, 2);
  
  return (
    <div className="min-h-screen pb-12 animate-fade-in bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="space-y-6 lg:w-1/3">
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <div className="flex flex-col items-center mb-6 text-center">
                <div className="flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/50">
                  <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="mb-2 text-slate-600 dark:text-slate-400">{userData.title}</p>
                <div className="flex items-center mb-4 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center px-3 py-1 mb-4 text-sm rounded-lg bg-slate-100 dark:bg-slate-700">
                  <span className="font-mono">{truncatedAddress}</span>
                </div>
                
                {isOwnProfile ? (
                  <Link to="/profile/edit" className="flex items-center gap-2 btn btn-outline">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Link>
                ) : (
                  <button className="flex items-center gap-2 btn btn-primary">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </button>
                )}
              </div>
              
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between mb-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">${userData.hourlyRate}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Hourly Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success-600">{userData.successRate}%</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{userData.completedJobs}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Jobs Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1 font-bold">{userData.ratings}</span>
                  </div>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {userData.totalReviews} reviews
                  </span>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {format(new Date(userData.joinedDate), 'MMMM yyyy')}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="badge bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">Education</h2>
              <div className="space-y-4">
                {userData.education.map((edu, index) => (
                  <div key={index} className="py-1 pl-4 border-l-2 border-primary-500">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{edu.institution}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">Certifications</h2>
              <div className="space-y-3">
                {userData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-success-100 dark:bg-success-900/50">
                      <Award className="w-4 h-4 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6 lg:w-2/3">
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold">About Me</h2>
              <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                {userData.bio}
              </p>
            </div>
            
            <div className="p-6 bg-white shadow-sm dark:bg-slate-800 rounded-xl">
              <h2 className="mb-6 text-lg font-semibold">Work History & Reviews</h2>
              
              {userData.workHistory.length > 0 ? (
                <div className="space-y-6">
                  {visibleWorkHistory.map((work, index) => (
                    <div key={index} className={`pb-6 ${
                      index !== visibleWorkHistory.length - 1 ? 'border-b border-slate-200 dark:border-slate-700' : ''
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold">{work.title}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="ml-1 font-bold">{work.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap mb-3 text-sm gap-x-4 gap-y-2 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{work.client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(work.completedDate), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{work.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          <span>
                            {work.paymentType === 'fixed' 
                              ? `$${work.budget.toLocaleString()}` 
                              : `$${work.budget.toLocaleString()}/hr`
                            }
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 mt-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        <p className="italic text-slate-700 dark:text-slate-300">
                          "{work.review}"
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {userData.workHistory.length > 2 && (
                    <button 
                      className="w-full mt-2 btn btn-outline"
                      onClick={() => setHistoryExpanded(!historyExpanded)}
                    >
                      {historyExpanded ? (
                        <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
                      ) : (
                        <>Show More ({userData.workHistory.length - 2} more) <ChevronDown className="w-4 h-4 ml-1" /></>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                  <h3 className="mb-2 text-lg font-medium">No work history yet</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    This freelancer hasn't completed any jobs on our platform yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;