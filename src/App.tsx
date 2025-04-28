import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, sepolia } from 'wagmi/chains';
import { ThemeProvider } from './contexts/ThemeContext';

import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import CreateJobPage from './pages/CreateJobPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID';

const config = createConfig({
  chains: [mainnet, polygon, sepolia],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#4F46E5',
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="jobs/:id" element={<JobDetailPage />} />
                <Route path="jobs/create" element={<CreateJobPage />} />
                <Route path="profile/:address" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;