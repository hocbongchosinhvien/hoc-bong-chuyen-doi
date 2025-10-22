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
import ForgotPassword from "./pages/ForgotPassword";
import ApplyWizard from "./pages/ApplyWizard";

// User
import UserDashboard from "./pages/dashboard/user/UserDashboard";
import MyApplications from "./pages/dashboard/user/MyApplications";
import UserProfile from "./pages/dashboard/user/UserProfile";

// Partner
import PartnerDashboard from "./pages/dashboard/partner/PartnerDashboard";
import SubmitOpportunity from "./pages/dashboard/partner/SubmitOpportunity";
import MySubmissions from "./pages/dashboard/partner/MySubmissions";
import PartnerProfile from "./pages/dashboard/partner/PartnerProfile";
import PartnerAnalytics from "./pages/dashboard/partner/PartnerAnalytics";

// Admin
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ManageOpportunities from "./pages/dashboard/admin/ManageOpportunities";
import ReviewQueue from "./pages/dashboard/admin/ReviewQueue";
import ManagePartners from "./pages/dashboard/admin/ManagePartners";
import ManageUsers from "./pages/dashboard/admin/ManageUsers";
import Notifications from "./pages/dashboard/admin/Notifications";
import Analytics from "./pages/dashboard/admin/Analytics";
import AdminProfile from "./pages/dashboard/admin/AdminProfile";

import NotFound from "./pages/NotFound";

// NEW: Auth helpers
import AuthGate from "@/components/auth/AuthGate";
import { RequireAuth } from "@/components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Dò session và tự redirect sau khi đăng nhập (Google/Email) */}
        <AuthGate />

        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/opportunities/:id" element={<OpportunityDetail />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/apply/:id" element={<ApplyWizard />} />

              {/* User Dashboard (Protected) */}
              <Route
                path="/dashboard/user"
                element={
                  <RequireAuth>
                    <UserDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/user/applications"
                element={
                  <RequireAuth>
                    <MyApplications />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/user/profile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />

              {/* Partner Dashboard (Protected) */}
              <Route
                path="/dashboard/partner"
                element={
                  <RequireAuth>
                    <PartnerDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/partner/submit"
                element={
                  <RequireAuth>
                    <SubmitOpportunity />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/partner/submissions"
                element={
                  <RequireAuth>
                    <MySubmissions />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/partner/profile"
                element={
                  <RequireAuth>
                    <PartnerProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/partner/analytics"
                element={
                  <RequireAuth>
                    <PartnerAnalytics />
                  </RequireAuth>
                }
              />

              {/* Admin Dashboard (Protected) */}
              <Route
                path="/dashboard/admin"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/opportunities"
                element={
                  <RequireAuth>
                    <ManageOpportunities />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/review"
                element={
                  <RequireAuth>
                    <ReviewQueue />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/partners"
                element={
                  <RequireAuth>
                    <ManagePartners />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/users"
                element={
                  <RequireAuth>
                    <ManageUsers />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/notifications"
                element={
                  <RequireAuth>
                    <Notifications />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/analytics"
                element={
                  <RequireAuth>
                    <Analytics />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard/admin/profile"
                element={
                  <RequireAuth>
                    <AdminProfile />
                  </RequireAuth>
                }
              />

              {/* Catch-all */}
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
