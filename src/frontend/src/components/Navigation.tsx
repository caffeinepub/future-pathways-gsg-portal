import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import BookingModal from "./BookingModal";

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home.link" },
  { to: "/dashboard", label: "Dashboard", ocid: "nav.dashboard.link" },
  { to: "/profile", label: "Profile Builder", ocid: "nav.profile.link" },
  {
    to: "/profile-roadmap",
    label: "Profile Roadmap",
    ocid: "nav.profile_roadmap.link",
  },
  { to: "/scholarships", label: "Scholarships", ocid: "nav.scholarships.link" },
  { to: "/colleges", label: "Colleges", ocid: "nav.colleges.link" },
  {
    to: "/opportunities",
    label: "Opportunities",
    ocid: "nav.opportunities.link",
  },
  { to: "/teacher-zone", label: "Teacher Zone", ocid: "nav.teacher_zone.link" },
  { to: "/resources", label: "Resources", ocid: "nav.resources.link" },
] as const;

export default function Navigation() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-nav">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/assets/generated/gsg-logo.dim_120x120.png"
              alt="GSG Logo"
              className="h-9 w-9 rounded-md object-cover"
            />
            <div className="hidden sm:block">
              <div className="font-display text-primary text-lg leading-tight">
                Future Pathways
              </div>
              <div className="text-xs text-muted-foreground font-body">
                Global Schools Group
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`nav-link ${
                  isActive(link.to) ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {identity ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clear()}
                className="hidden sm:flex text-muted-foreground hover:text-primary"
              >
                Log Out
              </Button>
            ) : (
              <Link to="/login" data-ocid="nav.login.link">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex text-muted-foreground hover:text-primary"
                >
                  Member Login
                </Button>
              </Link>
            )}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex"
              data-ocid="nav.book_counselor.button"
              onClick={() => setBookingOpen(true)}
            >
              Book a Counselor
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-display text-primary font-semibold">
                      Future Pathways
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      data-ocid={link.ocid}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(link.to)
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    {identity ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          clear();
                          setMobileOpen(false);
                        }}
                      >
                        Log Out
                      </Button>
                    ) : (
                      <Link to="/login" onClick={() => setMobileOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full"
                          data-ocid="nav.login.link"
                        >
                          Member Login
                        </Button>
                      </Link>
                    )}
                    <Button
                      className="w-full bg-primary text-primary-foreground"
                      data-ocid="nav.book_counselor.button"
                      onClick={() => {
                        setBookingOpen(true);
                        setMobileOpen(false);
                      }}
                    >
                      Book a Counselor
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </header>
  );
}
