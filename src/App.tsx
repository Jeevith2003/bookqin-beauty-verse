
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  // This will be our default userType for protected routes
  // In a real app, this would come from auth context or similar
  const defaultUserType = "customer";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard userType={defaultUserType} />} />
            <Route path="/appointments" element={<Dashboard userType={defaultUserType} />} />
            <Route path="/chat" element={<Dashboard userType={defaultUserType} />} />
            <Route path="/profile" element={<Dashboard userType={defaultUserType} />} />
            <Route path="/calendar" element={<Dashboard userType="salon" />} />
            <Route path="/messages" element={<Dashboard userType="salon" />} />
            <Route path="/settings" element={<Dashboard userType="salon" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
