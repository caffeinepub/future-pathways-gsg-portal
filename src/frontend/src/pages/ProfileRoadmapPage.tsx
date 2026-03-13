import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, RefreshCw, TrendingUp, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import BookCounselorCTA from "../components/BookCounselorCTA";

const CURRENT_GRADE = 11; // prototype: grade 11 is current

const gradeData = [
  {
    grade: 9,
    label: "Grade 9",
    focus: "Self-Discovery & Exploration",
    color: "bg-blue-500",
    ring: "ring-blue-500",
    badgeColor: "bg-blue-100 text-blue-800",
    items: [
      "Join 2\u20133 school clubs or activities",
      "Attend at least one career awareness session",
      "Explore your academic interests and strengths",
      "Start a personal achievement journal",
      "Research different university paths (UK, US, Canada, Australia)",
      "Build basic study habits and time management skills",
    ],
    tip: "This is the year to explore broadly \u2014 don't over-specialize yet.",
  },
  {
    grade: 10,
    label: "Grade 10",
    focus: "Building Skills & Visibility",
    color: "bg-emerald-500",
    ring: "ring-emerald-500",
    badgeColor: "bg-emerald-100 text-emerald-800",
    items: [
      "Compete in at least one regional competition (science, debate, math, etc.)",
      "Take on a leadership role in a club or community",
      "Start PSAT/SAT preparation",
      "Launch a passion project or research idea",
      "Begin volunteering in a cause you care about",
      "Shadow a professional in a field of interest",
    ],
    tip: "Depth in a few areas beats breadth in many. Start focusing.",
  },
  {
    grade: 11,
    label: "Grade 11",
    focus: "Testing, Internships & Research",
    color: "bg-amber-500",
    ring: "ring-amber-500",
    badgeColor: "bg-amber-100 text-amber-800",
    items: [
      "Sit SAT / ACT exams (aim for first attempt)",
      "Secure a summer internship or research position",
      "Attend at least one university fair or open day",
      "Shortlist 10\u201315 universities with counselor guidance",
      "Begin drafting your personal statement / SOP",
      "Request an initial Letter of Recommendation",
      "Register for AP/IB courses relevant to your target major",
    ],
    tip: "This is the most critical year \u2014 stay organised and proactive.",
  },
  {
    grade: 12,
    label: "Grade 12",
    focus: "Applications, Scholarships & Decisions",
    color: "bg-primary",
    ring: "ring-primary",
    badgeColor: "bg-primary/10 text-primary",
    items: [
      "Finalise and submit Common App / UCAS / direct applications",
      "Write and polish personal essays and supplemental essays",
      "Apply to 5+ scholarships with counselor help",
      "Confirm Letters of Recommendation from teachers/counselors",
      "Track all application deadlines in a planner",
      "Compare acceptance offers and financial aid packages",
      "Celebrate and commit to your chosen university!",
    ],
    tip: "Start early \u2014 most deadlines fall in Oct\u2013Jan of Grade 12.",
  },
];

const ALL_ITEMS_COUNT = gradeData.reduce((sum, g) => sum + g.items.length, 0);

const STORAGE_KEY = "gsg_roadmap_checks";

type CheckState = Record<string, boolean>;

function loadChecks(): CheckState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CheckState;
  } catch (_) {
    // ignore
  }
  return {};
}

function saveChecks(checks: CheckState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
  } catch (_) {
    // ignore
  }
}

function getMotivationalLabel(pct: number): string {
  if (pct === 100) return "Profile complete! \uD83C\uDF93";
  if (pct >= 76) return "Almost there!";
  if (pct >= 51) return "Great progress!";
  if (pct >= 26) return "Building momentum!";
  return "Just getting started!";
}

export default function ProfileRoadmapPage() {
  const [checks, setChecks] = useState<CheckState>(loadChecks);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    saveChecks(checks);
  }, [checks]);

  const totalChecked = Object.values(checks).filter(Boolean).length;
  const overallPct =
    ALL_ITEMS_COUNT > 0
      ? Math.round((totalChecked / ALL_ITEMS_COUNT) * 100)
      : 0;

  const toggle = (key: string) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setChecks({});
    setResetOpen(false);
  };

  const gradeChecked = (gi: number) =>
    gradeData[gi].items.filter((_, ii) => checks[`${gi}-${ii}`]).length;

  let ocidCounter = 0;

  return (
    <main data-ocid="roadmap.page">
      <section className="py-12 bg-background">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10"
          >
            <div>
              <div className="text-sm text-accent font-semibold uppercase tracking-widest mb-2">
                Your Journey
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
                Profile Building Pathway
              </h1>
              <p className="text-muted-foreground max-w-xl">
                Your step-by-step roadmap from Grade 9 to university acceptance.
                Track your progress as you complete each milestone.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/5 self-start"
              data-ocid="roadmap.reset_button"
              onClick={() => setResetOpen(true)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            data-ocid="roadmap.overall_progress"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-2xl p-6 mb-10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">
                  Overall Progress
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {totalChecked} / {ALL_ITEMS_COUNT} milestones
                </span>
                <span className="font-display text-2xl text-primary">
                  {overallPct}%
                </span>
              </div>
            </div>
            <Progress value={overallPct} className="h-3 mb-3" />
            <div className="flex items-center gap-2 text-sm">
              {overallPct === 100 ? (
                <Trophy className="h-4 w-4 text-accent" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-accent inline-block" />
              )}
              <span className="text-muted-foreground">
                {getMotivationalLabel(overallPct)}
              </span>
            </div>
          </motion.div>

          {/* Grade Cards */}
          <div className="space-y-6">
            {gradeData.map((grade, gi) => {
              const checked = gradeChecked(gi);
              const total = grade.items.length;
              const pct = Math.round((checked / total) * 100);
              const isCurrent = grade.grade === CURRENT_GRADE;

              return (
                <motion.div
                  key={grade.grade}
                  data-ocid={`roadmap.grade_card.${gi + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: gi * 0.08 }}
                >
                  <Card
                    className={`border-border shadow-sm transition-all duration-300 ${
                      isCurrent
                        ? `ring-2 ${grade.ring} ring-offset-2`
                        : "hover:shadow-md"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full ${grade.color} text-white flex items-center justify-center text-lg font-bold shadow-sm`}
                          >
                            {grade.grade}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${grade.badgeColor}`}
                              >
                                {grade.label}
                              </span>
                              {isCurrent && (
                                <span className="text-xs bg-accent/20 text-accent-foreground font-semibold px-2 py-0.5 rounded-full">
                                  Current Year
                                </span>
                              )}
                            </div>
                            <h2 className="font-display text-xl text-primary mt-1">
                              {grade.focus}
                            </h2>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:text-right">
                          <div className="text-sm text-muted-foreground">
                            {checked}/{total}
                          </div>
                          <div className="font-semibold text-foreground">
                            {pct}%
                          </div>
                        </div>
                      </div>
                      <Progress value={pct} className="h-2 mt-3" />
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3 mb-4">
                        {grade.items.map((item, ii) => {
                          const key = `${gi}-${ii}`;
                          const ocidIdx = ++ocidCounter;
                          return (
                            <motion.label
                              key={key}
                              htmlFor={`check-${key}`}
                              className="flex items-start gap-3 cursor-pointer group"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Checkbox
                                id={`check-${key}`}
                                data-ocid={`roadmap.checkbox.${ocidIdx}`}
                                checked={!!checks[key]}
                                onCheckedChange={() => toggle(key)}
                                className="mt-0.5 shrink-0"
                              />
                              <span
                                className={`text-sm leading-relaxed transition-colors ${
                                  checks[key]
                                    ? "line-through text-muted-foreground"
                                    : "text-foreground group-hover:text-primary"
                                }`}
                              >
                                {item}
                              </span>
                            </motion.label>
                          );
                        })}
                      </div>

                      <div className="flex items-start gap-2.5 bg-secondary rounded-lg px-4 py-3 mt-4">
                        <Lightbulb className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground italic">
                          <span className="font-semibold text-foreground not-italic">
                            Tip:{" "}
                          </span>
                          {grade.tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {resetOpen && (
          <Dialog open={resetOpen} onOpenChange={setResetOpen}>
            <DialogContent data-ocid="roadmap.dialog">
              <DialogHeader>
                <DialogTitle>Reset all checkboxes?</DialogTitle>
                <DialogDescription>
                  This will clear all your progress across all grades. This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  data-ocid="roadmap.cancel_button"
                  onClick={() => setResetOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  data-ocid="roadmap.confirm_button"
                  onClick={handleReset}
                >
                  Yes, Reset All
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <BookCounselorCTA />
    </main>
  );
}
