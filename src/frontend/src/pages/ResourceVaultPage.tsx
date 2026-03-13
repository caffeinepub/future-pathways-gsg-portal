import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Download,
  FileText,
  FolderOpen,
  LayoutTemplate,
} from "lucide-react";
import { motion } from "motion/react";
import { Variant_example_guide_template } from "../backend.d";
import BookCounselorCTA from "../components/BookCounselorCTA";
import { useGetAllResources } from "../hooks/useQueries";

const sampleResources = [
  {
    title: "SOP Writing Guide",
    description:
      "Step-by-step guide to crafting a compelling Statement of Purpose. Covers structure, tone, and common mistakes to avoid.",
    resourceType: Variant_example_guide_template.guide,
    fileUrl: "#",
  },
  {
    title: "SAT Preparation Guide",
    description:
      "Comprehensive SAT prep guide covering Reading, Writing, Math sections with practice strategies and sample questions.",
    resourceType: Variant_example_guide_template.guide,
    fileUrl: "#",
  },
  {
    title: "College Essay Examples",
    description:
      "20 successful college essay examples from students accepted to top universities. Annotated with expert commentary.",
    resourceType: Variant_example_guide_template.example,
    fileUrl: "#",
  },
  {
    title: "Student Brag Sheet Template",
    description:
      "Structured template to document all your achievements for counselors writing Letters of Recommendation.",
    resourceType: Variant_example_guide_template.template,
    fileUrl: "#",
  },
  {
    title: "University Application Checklist",
    description:
      "Complete checklist covering every step of the university application process from shortlisting to submitting.",
    resourceType: Variant_example_guide_template.template,
    fileUrl: "#",
  },
  {
    title: "Scholarship Application Guide",
    description:
      "Learn how to write winning scholarship applications with proven strategies from successful recipients.",
    resourceType: Variant_example_guide_template.guide,
    fileUrl: "#",
  },
];

const typeConfig: Record<
  string,
  { label: string; color: string; icon: typeof FileText }
> = {
  guide: { label: "Guide", color: "bg-blue-100 text-blue-700", icon: BookOpen },
  example: {
    label: "Example",
    color: "bg-green-100 text-green-700",
    icon: FileText,
  },
  template: {
    label: "Template",
    color: "bg-purple-100 text-purple-700",
    icon: LayoutTemplate,
  },
};

export default function ResourceVaultPage() {
  const { data: backendData, isLoading } = useGetAllResources();
  const resources =
    backendData && backendData.length > 0 ? backendData : sampleResources;

  return (
    <main>
      <section className="py-12 bg-background">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              <FolderOpen className="h-4 w-4" />
              Resource Vault
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              Resource Library
            </h1>
            <p className="text-muted-foreground">
              Download guides, templates, and examples to support your
              application journey.
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="resource.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-44 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resources.map((resource, i) => {
                const config =
                  typeConfig[resource.resourceType] ?? typeConfig.guide;
                const TypeIcon = config.icon;
                return (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Card
                      className="shadow-card border-border hover:-translate-y-1 transition-all duration-200 h-full flex flex-col"
                      data-ocid={`resource.card.${i + 1}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div
                            className={`rounded-lg p-2 ${config.color.replace("text-", "bg-").replace("-700", "-100")} mb-2`}
                          >
                            <TypeIcon
                              className={`h-5 w-5 ${config.color.split(" ")[1]}`}
                            />
                          </div>
                          <Badge className={`${config.color} border-0 text-xs`}>
                            {config.label}
                          </Badge>
                        </div>
                        <CardTitle className="text-base text-foreground">
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <p className="text-sm text-muted-foreground mb-5">
                          {resource.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          asChild
                          data-ocid={`resource.download.button.${i + 1}`}
                        >
                          <a
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
