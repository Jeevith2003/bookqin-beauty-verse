
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/wallet" element={<Dashboard />} />
              </Route>
              
              {/* Customer routes */}
              <Route element={<ProtectedRoute allowedTypes={['customer']} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointments" element={<Dashboard />} />
                <Route path="/appointments/:id" element={<Dashboard />} />
                <Route path="/chat" element={<Dashboard />} />
              </Route>
              
              {/* Salon routes */}
              <Route element={<ProtectedRoute allowedTypes={['salon']} />}>
                <Route path="/salon/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Dashboard />} />
                <Route path="/messages" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
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
