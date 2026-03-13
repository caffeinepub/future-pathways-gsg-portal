import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckSquare, FileText, Shield, Users } from "lucide-react";
import { motion } from "motion/react";
import BookCounselorCTA from "../components/BookCounselorCTA";

const lorGuidanceTemplate = `Dear Admissions Committee,

It is with great pleasure that I recommend [Student Name] for admission to [University Name]. As [Student Name]'s [Subject] teacher for [X] years at [School Name], I have had the privilege of observing their intellectual curiosity, dedication, and outstanding character.

[Student Name] consistently demonstrated exceptional [specific skill/quality] in my class. For instance, [specific example of achievement or quality].

Beyond academics, [Student Name] showed remarkable [leadership/creativity/empathy] when [specific extracurricular example].

I am confident that [Student Name] will make a significant contribution to your university community. I recommend them without reservation.

Sincerely,
[Teacher Name]
[Title, School Name]`;

const lorGuidancePoints = [
  "Be specific: Use concrete examples and achievements, not vague praise.",
  "Quantify impact: 'Top 5% of 120 students' is stronger than 'excellent student'.",
  "Address character: Describe the student's integrity, resilience, and growth mindset.",
  "Tailor per university: Research the program and show how the student fits.",
  "Keep it 400-600 words: Admissions officers read hundreds - be compelling and concise.",
  "Proofread thoroughly: Grammar errors reflect poorly on both student and teacher.",
];

const trainingModules = [
  {
    title: "Foundations of College Counseling",
    icon: Shield,
    level: "Beginner",
    duration: "3 hours",
    description:
      "Understand the landscape of international university admissions, the role of counselors, and how to support students through the decision-making process.",
    topics: [
      "Global university systems (US, UK, EU, Canada, Australia)",
      "Understanding application timelines and requirements",
      "Ethical responsibilities in college counseling",
      "Supporting diverse student needs",
    ],
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Writing Effective Recommendation Letters",
    icon: FileText,
    level: "Intermediate",
    duration: "2 hours",
    description:
      "Master the art of writing compelling, differentiated letters that strengthen student applications and build relationships with admissions offices.",
    topics: [
      "Anatomy of a strong LOR",
      "Avoiding common mistakes",
      "Adapting tone for different universities",
      "Student interview techniques for better LORs",
    ],
    color: "bg-green-50 text-green-700",
  },
  {
    title: "Mentoring Student Portfolios",
    icon: Users,
    level: "Advanced",
    duration: "4 hours",
    description:
      "Guide students in curating a compelling portfolio of academic, extracurricular, and personal achievements that tell a coherent narrative.",
    topics: [
      "Portfolio structure and narrative arc",
      "Identifying and showcasing student strengths",
      "Essay coaching techniques",
      "Interview preparation and mock sessions",
    ],
    color: "bg-purple-50 text-purple-700",
  },
];

export default function TeacherZonePage() {
  return (
    <main>
      <section className="py-12 bg-background">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              <Shield className="h-4 w-4" />
              Secure Section
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              Teacher & Counselor Zone
            </h1>
            <p className="text-muted-foreground">
              Resources, templates, and professional development for GSG
              educators.
            </p>
          </motion.div>

          {/* LOR Section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-5">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl text-primary">
                LOR Guidance & Templates
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Sample LOR Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed font-body bg-muted/40 rounded-lg p-4">
                    {lorGuidanceTemplate}
                  </pre>
                </CardContent>
              </Card>
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-primary" />
                    LOR Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {lorGuidancePoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                          {lorGuidancePoints.indexOf(point) + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Training Modules */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl text-primary">
                Teacher Training Modules
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {trainingModules.map(
                (
                  {
                    title,
                    icon: Icon,
                    level,
                    duration,
                    description,
                    topics,
                    color,
                  },
                  i,
                ) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="shadow-card border-border hover:-translate-y-1 transition-all duration-200 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`rounded-lg p-2 ${color}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Badge variant="secondary" className="text-xs">
                              {level}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {duration}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-base text-foreground">
                          {title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {description}
                        </p>
                        <ul className="space-y-1.5">
                          {topics.map((topic) => (
                            <li
                              key={topic}
                              className="flex items-start gap-1.5 text-xs text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
