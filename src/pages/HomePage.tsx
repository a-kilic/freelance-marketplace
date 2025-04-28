import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { Search, Shield, Zap, DollarSign, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();

  return (
    <div className="animate-fade-in">
      <section className="relative text-white bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 px-4 py-24 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              The First Decentralized Marketplace for Freelancers
            </h1>
            <p className="mb-8 text-xl md:text-2xl text-white/90">
              Connect, work, and get paid securely with blockchain technology. No intermediaries, no excessive fees.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {!isConnected ? (
                <button 
                  onClick={() => open()}
                  className="px-6 py-3 text-lg bg-white btn text-primary-700 hover:bg-slate-100 focus:ring-white"
                >
                  Connect Wallet
                </button>
              ) : (
                <Link 
                  to="/jobs" 
                  className="px-6 py-3 text-lg bg-white btn text-primary-700 hover:bg-slate-100 focus:ring-white"
                >
                  Find Jobs
                </Link>
              )}
              <Link 
                to="/how-it-works" 
                className="px-6 py-3 text-lg bg-transparent border-2 border-white btn hover:bg-white/10 focus:ring-white"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose DecentWork?</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Our blockchain-powered platform offers unparalleled benefits for both clients and freelancers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform duration-300">
              <div className="p-4 mb-6 rounded-full bg-primary-100 dark:bg-primary-900/50">
                <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Secure Payments</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Smart contract escrow ensures your funds are protected until work is completed to satisfaction.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform duration-300">
              <div className="p-4 mb-6 rounded-full bg-secondary-100 dark:bg-secondary-900/50">
                <DollarSign className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Lower Fees</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Without intermediaries, we charge just 1% compared to the 20%+ on traditional platforms.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform duration-300">
              <div className="p-4 mb-6 rounded-full bg-accent-100 dark:bg-accent-900/50">
                <Zap className="w-8 h-8 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Instant Payments</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get paid instantly when your work is approved, no more waiting for payment processing.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center hover:translate-y-[-4px] transition-transform duration-300">
              <div className="p-4 mb-6 rounded-full bg-success-100 dark:bg-success-900/50">
                <Search className="w-8 h-8 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Transparent History</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Every transaction and review is recorded on the blockchain for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How DecentWork Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              A simple, transparent process powered by blockchain technology
            </p>
          </div>

          <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
            <div className="relative">
              <div className="h-full card">
                <div className="absolute flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-full -top-4 -left-4 bg-primary-600">
                  1
                </div>
                <h3 className="mt-4 mb-4 text-xl font-semibold">Post a Job or Find Work</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Clients post job requirements with budget. Freelancers browse and submit proposals.
                </p>
              </div>
              <div className="absolute hidden transform translate-x-full md:block top-1/2 -right-4">
                <ChevronRight className="w-8 h-8 text-primary-500" />
              </div>
            </div>

            <div className="relative">
              <div className="h-full card">
                <div className="absolute flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-full -top-4 -left-4 bg-primary-600">
                  2
                </div>
                <h3 className="mt-4 mb-4 text-xl font-semibold">Fund Escrow Contract</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  When a proposal is accepted, client funds the escrow smart contract to secure the payment.
                </p>
              </div>
              <div className="absolute hidden transform translate-x-full md:block top-1/2 -right-4">
                <ChevronRight className="w-8 h-8 text-primary-500" />
              </div>
            </div>

            <div className="relative">
              <div className="h-full card">
                <div className="absolute flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-full -top-4 -left-4 bg-primary-600">
                  3
                </div>
                <h3 className="mt-4 mb-4 text-xl font-semibold">Complete Work & Get Paid</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Freelancer completes the work, client approves, and payment is automatically released.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/how-it-works" className="px-6 btn btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Popular Job Categories</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              Find opportunities in these high-demand categories
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: 'Web Development', count: 243 },
              { name: 'Design & Creative', count: 187 },
              { name: 'Writing & Translation', count: 142 },
              { name: 'Smart Contract Development', count: 118 },
              { name: 'Marketing', count: 96 },
              { name: 'Mobile Development', count: 84 },
              { name: 'Customer Service', count: 71 },
              { name: 'Data Science & Analytics', count: 68 },
            ].map((category, index) => (
              <Link to="/jobs" key={index} className="transition-colors card hover:border-primary-500 group">
                <h3 className="mb-2 font-medium transition-colors group-hover:text-primary-600">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {category.count} jobs available
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/jobs" className="btn btn-outline">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden text-white bg-primary-600">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform How You Work?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-white/90">
              Join thousands of freelancers and clients already using DecentWork to connect, collaborate, and create value.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {!isConnected ? (
                <button 
                  onClick={() => open()}
                  className="px-6 py-3 text-lg bg-white btn text-primary-700 hover:bg-slate-100 focus:ring-white"
                >
                  Connect Wallet
                </button>
              ) : (
                <Link 
                  to="/jobs/create" 
                  className="px-6 py-3 text-lg bg-white btn text-primary-700 hover:bg-slate-100 focus:ring-white"
                >
                  Post a Job
                </Link>
              )}
              <Link 
                to="/jobs" 
                className="px-6 py-3 text-lg bg-transparent border-2 border-white btn hover:bg-white/10 focus:ring-white"
              >
                Find Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;