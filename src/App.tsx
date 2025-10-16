import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import MyList from "./pages/MyList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ApplyWizard from "./pages/ApplyWizard";
import UserDashboard from "./pages/dashboard/user/UserDashboard";
import MyApplications from "./pages/dashboard/user/MyApplications";
import UserProfile from "./pages/dashboard/user/UserProfile";
import PartnerDashboard from "./pages/dashboard/partner/PartnerDashboard";
import SubmitOpportunity from "./pages/dashboard/partner/SubmitOpportunity";
import MySubmissions from "./pages/dashboard/partner/MySubmissions";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ManageOpportunities from "./pages/dashboard/admin/ManageOpportunities";
import ReviewQueue from "./pages/dashboard/admin/ReviewQueue";
import ManagePartners from "./pages/dashboard/admin/ManagePartners";
import Notifications from "./pages/dashboard/admin/Notifications";
import Analytics from "./pages/dashboard/admin/Analytics";
import AdminProfile from "./pages/dashboard/admin/AdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/opportunities/:id" element={<OpportunityDetail />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/apply/:id" element={<ApplyWizard />} />
              
              {/* User Dashboard */}
              <Route path="/dashboard/user" element={<UserDashboard />} />
              <Route path="/dashboard/user/applications" element={<MyApplications />} />
              <Route path="/dashboard/user/profile" element={<UserProfile />} />
              
              {/* Partner Dashboard */}
              <Route path="/dashboard/partner" element={<PartnerDashboard />} />
              <Route path="/dashboard/partner/submit" element={<SubmitOpportunity />} />
              <Route path="/dashboard/partner/submissions" element={<MySubmissions />} />
              
              {/* Admin Dashboard */}
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/dashboard/admin/opportunities" element={<ManageOpportunities />} />
              <Route path="/dashboard/admin/review" element={<ReviewQueue />} />
              <Route path="/dashboard/admin/partners" element={<ManagePartners />} />
              <Route path="/dashboard/admin/notifications" element={<Notifications />} />
              <Route path="/dashboard/admin/analytics" element={<Analytics />} />
              <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
