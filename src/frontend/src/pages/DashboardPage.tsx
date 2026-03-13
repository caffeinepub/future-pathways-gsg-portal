import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronRight,
  FileText,
  FolderOpen,
  GraduationCap,
  Lightbulb,
  Search,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import BookCounselorCTA from "../components/BookCounselorCTA";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllOpportunities,
  useGetAllResources,
  useGetCallerUserProfile,
} from "../hooks/useQueries";

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";
  const shortId = `${principal.slice(0, 10)}...`;

  const { data: profile } = useGetCallerUserProfile();
  const { data: opportunities } = useGetAllOpportunities();
  const { data: resources } = useGetAllResources();

  const totalProfileItems = profile
    ? [
        ...(profile.academicAchievements ?? []),
        ...(profile.extracurricularActivities ?? []),
        ...(profile.awards ?? []),
        ...(profile.leadershipRoles ?? []),
        ...(profile.internships ?? []),
      ].length
    : 0;

  const profileCompletion = Math.min(
    100,
    Math.round((totalProfileItems / 10) * 100),
  );

  const quickLinks = [
    {
      title: "Profile Builder",
      desc: "Update your academic portfolio",
      icon: BookOpen,
      to: "/profile",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Scholarship Finder",
      desc: "Browse global scholarships",
      icon: Award,
      to: "/scholarships",
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "College Search",
      desc: "Find your ideal university",
      icon: Search,
      to: "/colleges",
      color: "text-primary bg-primary/10",
    },
    {
      title: "Opportunity Hub",
      desc: "Competitions & internships",
      icon: Lightbulb,
      to: "/opportunities",
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Resource Vault",
      desc: "Download guides & templates",
      icon: FolderOpen,
      to: "/resources",
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Teacher Zone",
      desc: "LOR guidance & training",
      icon: FileText,
      to: "/teacher-zone",
      color: "text-rose-600 bg-rose-50",
    },
  ] as const;

  return (
    <main>
      <section className="py-12 bg-background">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              <GraduationCap className="h-4 w-4" />
              Student Dashboard
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary">
              Welcome back, {shortId}
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your progress and access all your career tools.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                label: "Profile Completion",
                value: `${profileCompletion}%`,
                icon: TrendingUp,
                sub: `${totalProfileItems} items added`,
                showProgress: true,
              },
              {
                label: "Opportunities Available",
                value: (opportunities?.length ?? 0).toString(),
                icon: Lightbulb,
                sub: "Global & GSG programs",
              },
              {
                label: "Resources Available",
                value: (resources?.length ?? 0).toString(),
                icon: FolderOpen,
                sub: "Guides, templates & examples",
              },
            ].map(({ label, value, icon: Icon, sub, showProgress }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Card className="shadow-card border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-display text-3xl text-primary mb-1">
                      {value}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{sub}</p>
                    {showProgress && (
                      <Progress value={profileCompletion} className="h-1.5" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-primary mb-5">
            Quick Access
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map(({ title, desc, icon: Icon, to, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.3 }}
              >
                <Link to={to}>
                  <div className="group flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
                    <div className={`rounded-lg p-2.5 shrink-0 ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm">
                        {title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {desc}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
