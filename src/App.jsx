import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Inbox, Calendar, CalendarDays } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use the sidebar layout
import Index from "./pages/Index.jsx";
import InboxPage from "./pages/Inbox.jsx";
import TodayPage from "./pages/Today.jsx";
import UpcomingPage from "./pages/Upcoming.jsx";
import ProjectPage from "./pages/Project.jsx";
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Inbox",
    to: "/inbox",
    icon: <Inbox className="h-4 w-4" />,
  },
  {
    title: "Today",
    to: "/today",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Upcoming",
    to: "/upcoming",
    icon: <CalendarDays className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="inbox" element={<InboxPage />} />
              <Route path="today" element={<TodayPage />} />
              <Route path="upcoming" element={<UpcomingPage />} />
              <Route path="project/:projectName" element={<ProjectPage />} />
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;