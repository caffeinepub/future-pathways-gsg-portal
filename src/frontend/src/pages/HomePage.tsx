import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronRight,
  FolderOpen,
  Globe,
  GraduationCap,
  Lightbulb,
  Map as MapIcon,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import BookCounselorCTA from "../components/BookCounselorCTA";

const quickActions = [
  {
    title: "Profile Builder",
    description:
      "Document your achievements, activities, and experiences for university applications.",
    icon: BookOpen,
    to: "/profile",
    color: "bg-blue-50 text-blue-700",
    ocid: "home.profile_builder.button",
  },
  {
    title: "Profile Roadmap",
    description:
      "Explore your Grade 9\u201312 pathway milestones and track your progress step by step.",
    icon: MapIcon,
    to: "/profile-roadmap",
    color: "bg-teal-50 text-teal-700",
    ocid: "home.profile_roadmap.button",
  },
  {
    title: "Scholarship Finder",
    description:
      "Discover scholarships worldwide filtered by country, field, and deadline.",
    icon: Award,
    to: "/scholarships",
    color: "bg-amber-50 text-amber-700",
    ocid: "home.scholarship_finder.button",
  },
  {
    title: "Opportunity Hub",
    description:
      "Explore competitions, internships, and global programs to build your portfolio.",
    icon: Lightbulb,
    to: "/opportunities",
    color: "bg-green-50 text-green-700",
    ocid: "home.opportunity_hub.button",
  },
  {
    title: "Resource Vault",
    description:
      "Download SOP guides, essay templates, test prep resources, and more.",
    icon: FolderOpen,
    to: "/resources",
    color: "bg-purple-50 text-purple-700",
    ocid: "home.resource_vault.button",
  },
];

const stats = [
  { label: "Students Guided", value: "1,200+", icon: GraduationCap },
  { label: "University Partners", value: "350+", icon: Globe },
  { label: "Scholarships Listed", value: "500+", icon: Award },
  { label: "Success Stories", value: "98%", icon: Star },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[480px] flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <div className="page-container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-4">
              <Globe className="h-4 w-4" />
              Global Schools Group
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white leading-tight mb-6">
              Future Pathways &{" "}
              <span className="italic text-accent">Career Counseling</span>
              <br /> Portal
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Guiding students toward global university pathways \u2014
              empowering every learner to discover their potential and achieve
              their dreams.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8"
                >
                  Get Started <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/scholarships">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8"
                >
                  Explore Scholarships
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-foreground">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="bg-foreground text-white px-8 py-6 text-center"
              >
                <Icon className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="font-display text-2xl text-white">{value}</div>
                <div className="text-white/50 text-xs mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-background">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="text-sm text-accent font-semibold uppercase tracking-widest mb-2">
              Quick Access
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
              Your Student Suite
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need for a successful university application
              journey \u2014 all in one place.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map(
              ({ title, description, icon: Icon, to, color, ocid }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={to} data-ocid={ocid}>
                    <div className="group bg-card border border-border rounded-xl p-7 hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full cursor-pointer">
                      <div
                        className={`inline-flex items-center justify-center rounded-lg p-3 mb-4 ${color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-xl text-primary mb-2 group-hover:text-primary/80 transition-colors">
                        {title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
                        Explore <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-16 bg-secondary">
        <div className="page-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Access opportunities from 50+ countries across top universities.",
              },
              {
                icon: Users,
                title: "Expert Counselors",
                desc: "Work with GSG's experienced advisors who know what top universities seek.",
              },
              {
                icon: Star,
                title: "Proven Results",
                desc: "Join 1,200+ students who've secured placements at their dream universities.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-6"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg text-primary mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookCounselorCTA />
    </main>
  );
}
