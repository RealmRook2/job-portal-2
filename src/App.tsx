import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/candidate/Dashboard";
import CandidateLayout from "./components/candidate/CandidateLayout";
import CandidateProfile from "./pages/candidate/Profile";
import JobListings from "./pages/candidate/JobListings";
import JobDetails from "./pages/candidate/JobDetails";
import ApplyJob from "./pages/candidate/ApplyJob";
import ApplicationTracking from "./pages/candidate/ApplicationTracking";
import Interviews from "./pages/candidate/Interviews";
import Chat from "./pages/candidate/Chat";
import Notifications from "./pages/candidate/Notifications";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardNew from "./pages/admin/AdminDashboardNew";
import JobManagement from "./pages/admin/JobManagement";
import CreateJob from "./pages/admin/CreateJob";
import CandidateManagement from "./pages/admin/CandidateManagement";
import CandidateDetail from "./pages/admin/CandidateDetail";
import ResumeStorage from "./pages/admin/ResumeStorage";
import ApplicationManagement from "./pages/admin/ApplicationManagement";
import InterviewManagement from "./pages/admin/InterviewManagement";
import CollegeManagement from "./pages/admin/CollegeManagement";
import CollegeDriveDetails from "./pages/admin/CollegeDriveDetails";
import HRAdminManagement from "./pages/admin/HRAdminManagement";
import Settings from "./pages/admin/Settings";
import EmployeeDataManagement from "./pages/admin/EmployeeDataManagement";
import AdminNotifications from "./pages/admin/AdminNotifications";
import HRLayout from "./components/admin/HRLayout";
import HRDashboard from "./pages/admin/HRDashboard";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/apply" element={<ApplyJob />} />

          {/* Candidate Routes */}
          <Route element={<CandidateLayout />}>
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/applications" element={<ApplicationTracking />} />
            <Route path="/candidate/interviews" element={<Interviews />} />
            <Route path="/candidate/chat" element={<Chat />} />
            <Route path="/candidate/notifications" element={<Notifications />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardNew />} />
            <Route path="/admin/jobs" element={<JobManagement />} />
            <Route path="/admin/jobs/create" element={<CreateJob />} />
            <Route path="/admin/jobs/:id/edit" element={<CreateJob />} />
            <Route path="/admin/candidates" element={<CandidateManagement />} />
            <Route path="/admin/candidates/:id" element={<CandidateDetail />} />
            <Route path="/admin/resume-storage" element={<ResumeStorage />} />
            <Route path="/admin/candidates/:id/edit" element={<CandidateDetail />} />
            <Route path="/admin/applications" element={<ApplicationManagement />} />
            <Route path="/admin/interviews" element={<InterviewManagement />} />
            <Route path="/admin/colleges" element={<CollegeManagement />} />
            <Route path="/admin/colleges/:id/drives" element={<CollegeDriveDetails />} />
            <Route path="/admin/employee-data" element={<EmployeeDataManagement />} />
            <Route path="/admin/chats" element={<Chat />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/hr-admins" element={<HRAdminManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>

          {/* HR Admin Routes */}
          <Route element={<HRLayout />}>
            <Route path="/hr/dashboard" element={<HRDashboard />} />
            <Route path="/hr/jobs" element={<JobManagement />} />
            <Route path="/hr/candidates" element={<CandidateManagement />} />
            <Route path="/hr/interviews" element={<InterviewManagement />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
