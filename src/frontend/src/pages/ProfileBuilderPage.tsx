import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  Loader2,
  Plus,
  Star,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { UserProfile } from "../backend.d";
import BookCounselorCTA from "../components/BookCounselorCTA";
import {
  useGetCallerUserProfile,
  useSaveUserProfile,
} from "../hooks/useQueries";

const categories = [
  {
    key: "academicAchievements" as keyof UserProfile,
    label: "Academic Achievements",
    icon: BookOpen,
    placeholder: "e.g. Honor Roll, 95% in Mathematics",
    ocid: "profile.achievement.input",
    color: "bg-blue-50 text-blue-700",
  },
  {
    key: "extracurricularActivities" as keyof UserProfile,
    label: "Extracurricular Activities",
    icon: Star,
    placeholder: "e.g. Debate Club Captain, School Orchestra",
    ocid: "profile.activity.input",
    color: "bg-green-50 text-green-700",
  },
  {
    key: "leadershipRoles" as keyof UserProfile,
    label: "Leadership Roles",
    icon: Users,
    placeholder: "e.g. Student Council President, Team Captain",
    ocid: "profile.leadership.input",
    color: "bg-purple-50 text-purple-700",
  },
  {
    key: "awards" as keyof UserProfile,
    label: "Awards & Honors",
    icon: Award,
    placeholder: "e.g. National Science Olympiad Gold Medal",
    ocid: "profile.awards.input",
    color: "bg-amber-50 text-amber-700",
  },
  {
    key: "internships" as keyof UserProfile,
    label: "Internships & Work Experience",
    icon: Briefcase,
    placeholder: "e.g. Software Intern at TechCorp, June 2024",
    ocid: "profile.internship.input",
    color: "bg-rose-50 text-rose-700",
  },
];

const pdpTimeline = [
  {
    grade: "Grade 9",
    focus: "Self-Discovery & Clubs",
    color: "bg-blue-500",
    items: [
      "Join 2-3 school clubs",
      "Explore academic interests",
      "Start journaling achievements",
      "Attend career awareness sessions",
    ],
  },
  {
    grade: "Grade 10",
    focus: "Competitions & Leadership",
    color: "bg-green-500",
    items: [
      "Enter regional competitions",
      "Take on a leadership role",
      "Begin standardized test prep (PSAT)",
      "Develop a passion project",
    ],
  },
  {
    grade: "Grade 11",
    focus: "Internships & Standardized Tests",
    color: "bg-amber-500",
    items: [
      "Complete SAT/ACT exams",
      "Secure a summer internship",
      "Research university requirements",
      "Attend college fairs & open days",
    ],
  },
  {
    grade: "Grade 12",
    focus: "Applications & Scholarships",
    color: "bg-primary",
    items: [
      "Submit Common App / UCAS",
      "Write compelling personal essays",
      "Apply for scholarships",
      "Request Letters of Recommendation",
    ],
  },
];

const defaultProfile: UserProfile = {
  academicAchievements: [],
  extracurricularActivities: [],
  awards: [],
  leadershipRoles: [],
  internships: [],
};

export default function ProfileBuilderPage() {
  const { data: savedProfile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveUserProfile();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (savedProfile) setProfile(savedProfile);
  }, [savedProfile]);

  const addItem = (key: keyof UserProfile, value: string) => {
    if (!value.trim()) return;
    setProfile((p) => ({
      ...p,
      [key]: [...(p[key] as string[]), value.trim()],
    }));
    setInputs((p) => ({ ...p, [key]: "" }));
  };

  const removeItem = (key: keyof UserProfile, idx: number) => {
    setProfile((p) => ({
      ...p,
      [key]: (p[key] as string[]).filter((_, i) => i !== idx),
    }));
  };

  const handleSave = () => {
    saveProfile.mutate(profile);
  };

  return (
    <main>
      <section className="py-12 bg-background">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-sm text-accent font-semibold uppercase tracking-widest mb-2">
              My Portfolio
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              Profile Builder
            </h1>
            <p className="text-muted-foreground">
              Document your achievements to build a compelling university
              application profile.
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="flex items-center justify-center py-16"
              data-ocid="profile.loading_state"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {categories.map(
                  ({ key, label, icon: Icon, placeholder, ocid, color }) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Card className="shadow-card border-border h-full">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <span className={`rounded-md p-1.5 ${color}`}>
                              <Icon className="h-4 w-4" />
                            </span>
                            {label}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              data-ocid={ocid}
                              value={inputs[key] ?? ""}
                              placeholder={placeholder}
                              onChange={(e) =>
                                setInputs((p) => ({
                                  ...p,
                                  [key]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addItem(key, inputs[key] ?? "");
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="icon"
                              className="bg-primary text-primary-foreground shrink-0"
                              onClick={() => addItem(key, inputs[key] ?? "")}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {(profile[key] as string[]).length === 0 ? (
                            <p className="text-xs text-muted-foreground italic">
                              No entries yet. Add your first one above.
                            </p>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {(profile[key] as string[]).map((item, idx) => (
                                <Badge
                                  key={item}
                                  variant="secondary"
                                  className="flex items-center gap-1 pr-1 py-1"
                                >
                                  <span className="max-w-[200px] truncate">
                                    {item}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => removeItem(key, idx)}
                                    className="ml-1 hover:text-destructive transition-colors"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ),
                )}
              </div>

              <div className="flex justify-end mb-12">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-10"
                  onClick={handleSave}
                  disabled={saveProfile.isPending}
                  data-ocid="profile.save.button"
                >
                  {saveProfile.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" /> Save Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4">
                <div className="text-sm text-accent font-semibold uppercase tracking-widest mb-2">
                  Personal Development Plan
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-primary mb-8">
                  Your PDP Roadmap
                </h2>
                <div className="relative">
                  <div
                    className="hidden md:block absolute left-0 right-0 h-0.5 bg-border z-0"
                    style={{ top: "2.5rem" }}
                  />
                  <div className="grid md:grid-cols-4 gap-6 relative z-10">
                    {pdpTimeline.map(({ grade, focus, color, items }, i) => (
                      <motion.div
                        key={grade}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="bg-card border border-border rounded-xl p-5 h-full">
                          <div
                            className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center text-sm font-bold mb-4 shadow-md`}
                          >
                            {i + 9}
                          </div>
                          <div className="font-semibold text-foreground text-sm mb-1">
                            {grade}
                          </div>
                          <div className="font-display text-base text-primary mb-3">
                            {focus}
                          </div>
                          <ul className="space-y-1.5">
                            {items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-1.5 text-xs text-muted-foreground"
                              >
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
