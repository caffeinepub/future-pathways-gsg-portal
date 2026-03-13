import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calendar, Globe, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { Variant_internal_external } from "../backend.d";
import BookCounselorCTA from "../components/BookCounselorCTA";
import { useGetAllOpportunities } from "../hooks/useQueries";

const sampleOpportunities = [
  {
    title: "GSG Innovation Challenge",
    category: Variant_internal_external.internal,
    organization: "Global Schools Group",
    description:
      "Annual innovation challenge for GSG students to pitch solutions to real-world problems.",
    deadline: "2025-03-15",
  },
  {
    title: "Global Sustainability Hackathon",
    category: Variant_internal_external.internal,
    organization: "GSG Science Dept",
    description:
      "2-day hackathon focused on environmental solutions and sustainable development.",
    deadline: "2025-04-20",
  },
  {
    title: "GSG Entrepreneurship Competition",
    category: Variant_internal_external.internal,
    organization: "GSG Business Club",
    description:
      "Present your startup idea to a panel of industry mentors and investors.",
    deadline: "2025-05-10",
  },
  {
    title: "NASA Student Internship Program",
    category: Variant_internal_external.external,
    organization: "NASA",
    description:
      "10-week paid internship at NASA facilities. Open to STEM students 18+.",
    deadline: "2025-03-01",
  },
  {
    title: "UN Youth Fellowship",
    category: Variant_internal_external.external,
    organization: "United Nations",
    description:
      "Competitive fellowship for young leaders committed to sustainable development.",
    deadline: "2025-06-30",
  },
  {
    title: "MIT Summer Research Program",
    category: Variant_internal_external.external,
    organization: "MIT",
    description:
      "8-week intensive research experience for exceptional high school students.",
    deadline: "2025-02-15",
  },
];

interface OppCardProps {
  title: string;
  organization: string;
  description: string;
  deadline: string;
  isInternal: boolean;
  index: number;
}

function OpportunityCard({
  title,
  organization,
  description,
  deadline,
  isInternal,
  index,
}: OppCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
    >
      <Card className="shadow-card border-border hover:-translate-y-0.5 transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div
              className={`rounded-lg p-2 ${isInternal ? "bg-primary/10" : "bg-green-50"}`}
            >
              {isInternal ? (
                <Building className="h-4 w-4 text-primary" />
              ) : (
                <Globe className="h-4 w-4 text-green-600" />
              )}
            </div>
            <Badge
              className={`text-xs border-0 ${isInternal ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
            >
              {isInternal ? "GSG" : "Global"}
            </Badge>
          </div>
          <CardTitle className="text-base text-foreground mt-2">
            {title}
          </CardTitle>
          <p className="text-xs text-muted-foreground font-medium">
            {organization}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Deadline:{" "}
              <span className="font-medium text-foreground">{deadline}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function OpportunityHubPage() {
  const { data: backendData, isLoading } = useGetAllOpportunities();
  const opportunities =
    backendData && backendData.length > 0 ? backendData : sampleOpportunities;

  const internal = opportunities.filter(
    (o) => o.category === Variant_internal_external.internal,
  );
  const external = opportunities.filter(
    (o) => o.category === Variant_internal_external.external,
  );

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
              <Lightbulb className="h-4 w-4" />
              Opportunity Hub
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              Opportunities
            </h1>
            <p className="text-muted-foreground">
              Discover competitions, internships, and global programs to build
              your profile.
            </p>
          </motion.div>

          {isLoading ? (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="opportunity.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : (
            <Tabs defaultValue="internal">
              <TabsList className="mb-6 bg-secondary">
                <TabsTrigger
                  value="internal"
                  data-ocid="opportunity.internal.tab"
                  className="font-medium"
                >
                  <Building className="h-4 w-4 mr-1.5" />
                  GSG Opportunities ({internal.length})
                </TabsTrigger>
                <TabsTrigger
                  value="external"
                  data-ocid="opportunity.external.tab"
                  className="font-medium"
                >
                  <Globe className="h-4 w-4 mr-1.5" />
                  Global Opportunities ({external.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="internal">
                {internal.length === 0 ? (
                  <div
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="opportunity.empty_state"
                  >
                    No internal opportunities listed yet.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {internal.map((opp, i) => (
                      <OpportunityCard
                        key={opp.title}
                        {...opp}
                        isInternal={true}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="external">
                {external.length === 0 ? (
                  <div
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="opportunity.empty_state"
                  >
                    No external opportunities listed yet.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {external.map((opp, i) => (
                      <OpportunityCard
                        key={opp.title}
                        {...opp}
                        isInternal={false}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
