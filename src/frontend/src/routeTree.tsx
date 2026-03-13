import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import CollegeSearchPage from "./pages/CollegeSearchPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OpportunityHubPage from "./pages/OpportunityHubPage";
import ProfileBuilderPage from "./pages/ProfileBuilderPage";
import ProfileRoadmapPage from "./pages/ProfileRoadmapPage";
import RegisterPage from "./pages/RegisterPage";
import ResourceVaultPage from "./pages/ResourceVaultPage";
import ScholarshipFinderPage from "./pages/ScholarshipFinderPage";
import TeacherZonePage from "./pages/TeacherZonePage";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfileBuilderPage />
    </ProtectedRoute>
  ),
});
const profileRoadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile-roadmap",
  component: ProfileRoadmapPage,
});
const scholarshipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scholarships",
  component: ScholarshipFinderPage,
});
const collegesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/colleges",
  component: CollegeSearchPage,
});
const opportunitiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/opportunities",
  component: OpportunityHubPage,
});
const teacherZoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher-zone",
  component: TeacherZonePage,
});
const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourceVaultPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  profileRoute,
  profileRoadmapRoute,
  scholarshipsRoute,
  collegesRoute,
  opportunitiesRoute,
  teacherZoneRoute,
  resourcesRoute,
  loginRoute,
  registerRoute,
]);
