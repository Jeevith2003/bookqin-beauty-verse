
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import WalletPage from "./pages/WalletPage";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Wrapper component to access auth context and pass userType to components
const DashboardWithAuth = () => {
  const { userType } = useAuth();
  return <Dashboard userType={userType || 'customer'} />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Protected routes for both user types */}
              <Route element={<ProtectedRoute allowedTypes={['customer', 'salon']} />}>
                <Route path="/profile" element={<DashboardWithAuth />} />
                <Route path="/wallet" element={<WalletPage />} />
              </Route>
              
              {/* Customer routes */}
              <Route element={<ProtectedRoute allowedTypes={['customer']} />}>
                <Route path="/dashboard" element={<DashboardWithAuth />} />
                <Route path="/appointments" element={<DashboardWithAuth />} />
                <Route path="/appointments/:id" element={<DashboardWithAuth />} />
                <Route path="/chat" element={<DashboardWithAuth />} />
              </Route>
              
              {/* Salon routes */}
              <Route element={<ProtectedRoute allowedTypes={['salon']} />}>
                <Route path="/salon/dashboard" element={<DashboardWithAuth />} />
                <Route path="/calendar" element={<DashboardWithAuth />} />
                <Route path="/messages" element={<DashboardWithAuth />} />
                <Route path="/settings" element={<DashboardWithAuth />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
