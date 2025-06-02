
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import SearchAndFilter from "./pages/customer/SearchAndFilter";
import SalonProfile from "./pages/customer/SalonProfile";
import AIStyleRecommendation from "./pages/customer/AIStyleRecommendation";
import BookingFlow from "./pages/customer/BookingFlow";
import BookingHistory from "./pages/customer/BookingHistory";
import OffersAndRewards from "./pages/customer/OffersAndRewards";
import WalletPage from "./pages/WalletPage";
import AIChat from "./pages/customer/AIChat";
import NotificationsPage from "./pages/customer/NotificationsPage";
import FeedbackAndRatings from "./pages/customer/FeedbackAndRatings";
import CustomerProfile from "./pages/customer/CustomerProfile";

// Salon Pages
import SalonDashboard from "./pages/salon/SalonDashboard";
import SalonProfileSetup from "./pages/salon/SalonProfileSetup";
import ServiceManagement from "./pages/salon/ServiceManagement";
import TimeSlotManagement from "./pages/salon/TimeSlotManagement";
import IncomingBookings from "./pages/salon/IncomingBookings";
import SalonBookingHistory from "./pages/salon/SalonBookingHistory";
import EarningsReports from "./pages/salon/EarningsReports";
import SalonNotifications from "./pages/salon/SalonNotifications";
import PartnerAcademy from "./pages/salon/PartnerAcademy";
import SalonFeedback from "./pages/salon/SalonFeedback";
import HelpAndSupport from "./pages/salon/HelpAndSupport";
import SalonProfile from "./pages/salon/SalonProfile";

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

// Redirect component based on user type
const DashboardRedirect = () => {
  const { userType } = useAuth();
  
  if (userType === 'customer') {
    return <Navigate to="/customer/dashboard" replace />;
  } else if (userType === 'salon') {
    return <Navigate to="/salon/dashboard" replace />;
  }
  
  return <Navigate to="/" replace />;
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
              
              {/* Redirect /dashboard to appropriate user dashboard */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
              
              {/* Customer routes */}
              <Route element={<ProtectedRoute allowedTypes={['customer']} />}>
                <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                <Route path="/customer/search" element={<SearchAndFilter />} />
                <Route path="/customer/salon/:id" element={<SalonProfile />} />
                <Route path="/customer/ai-style" element={<AIStyleRecommendation />} />
                <Route path="/customer/booking" element={<BookingFlow />} />
                <Route path="/customer/booking/:id" element={<BookingFlow />} />
                <Route path="/customer/appointments" element={<BookingHistory />} />
                <Route path="/customer/offers" element={<OffersAndRewards />} />
                <Route path="/customer/wallet" element={<WalletPage />} />
                <Route path="/customer/chat" element={<AIChat />} />
                <Route path="/customer/notifications" element={<NotificationsPage />} />
                <Route path="/customer/feedback" element={<FeedbackAndRatings />} />
                <Route path="/customer/profile" element={<CustomerProfile />} />
              </Route>
              
              {/* Salon routes */}
              <Route element={<ProtectedRoute allowedTypes={['salon']} />}>
                <Route path="/salon/dashboard" element={<SalonDashboard />} />
                <Route path="/salon/profile-setup" element={<SalonProfileSetup />} />
                <Route path="/salon/services" element={<ServiceManagement />} />
                <Route path="/salon/timeslots" element={<TimeSlotManagement />} />
                <Route path="/salon/bookings" element={<IncomingBookings />} />
                <Route path="/salon/history" element={<SalonBookingHistory />} />
                <Route path="/salon/earnings" element={<EarningsReports />} />
                <Route path="/salon/notifications" element={<SalonNotifications />} />
                <Route path="/salon/academy" element={<PartnerAcademy />} />
                <Route path="/salon/feedback" element={<SalonFeedback />} />
                <Route path="/salon/help" element={<HelpAndSupport />} />
                <Route path="/salon/profile" element={<SalonProfile />} />
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
