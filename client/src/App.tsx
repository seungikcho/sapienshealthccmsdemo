import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Toaster } from "sonner";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import RequireAuth from "./components/RequireAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import ReferralGenerator from "./pages/ReferralGenerator";
import MeetingNoteGenerator from "./pages/MeetingNoteGenerator";
import LabTestSearch from "./pages/LabTestSearch";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function PatientsRoute() {
  return (
    <RequireAuth>
      <Patients />
    </RequireAuth>
  );
}

function ReferralGeneratorRoute() {
  return (
    <RequireAuth>
      <ReferralGenerator />
    </RequireAuth>
  );
}

function MeetingNoteGeneratorRoute() {
  return (
    <RequireAuth>
      <MeetingNoteGenerator />
    </RequireAuth>
  );
}

function LabTestSearchRoute() {
  return (
    <RequireAuth>
      <LabTestSearch />
    </RequireAuth>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
      <Route path="/patients" component={PatientsRoute} />
      <Route path="/patients/referral" component={ReferralGeneratorRoute} />
      <Route
        path="/patients/meeting-note"
        component={MeetingNoteGeneratorRoute}
      />
      <Route path="/patients/lab-test" component={LabTestSearchRoute} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
