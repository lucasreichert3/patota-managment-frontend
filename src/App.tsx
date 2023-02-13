import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {PatotaProvider} from './contexts/PatotaContext';
import HomeScreen from './pages/home-screen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PatotaProvider>
        <HomeScreen />
      </PatotaProvider>
    </QueryClientProvider>
  );
}

export default App;
