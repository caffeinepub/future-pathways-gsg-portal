import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-foreground text-primary-foreground py-10">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-6 w-6 text-accent" />
            <div>
              <div className="font-display text-white text-base">
                Future Pathways
              </div>
              <div className="text-primary-foreground/50 text-xs">
                Global Schools Group
              </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-primary-foreground/60 justify-center">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              to="/scholarships"
              className="hover:text-white transition-colors"
            >
              Scholarships
            </Link>
            <Link to="/colleges" className="hover:text-white transition-colors">
              Colleges
            </Link>
            <Link
              to="/opportunities"
              className="hover:text-white transition-colors"
            >
              Opportunities
            </Link>
            <Link
              to="/resources"
              className="hover:text-white transition-colors"
            >
              Resources
            </Link>
            <Link
              to="/teacher-zone"
              className="hover:text-white transition-colors"
            >
              Teacher Zone
            </Link>
          </nav>
          <div className="text-center text-xs text-primary-foreground/40">
            &copy; {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-foreground/70 transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
