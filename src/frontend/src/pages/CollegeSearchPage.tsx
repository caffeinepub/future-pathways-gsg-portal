import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  FlaskConical,
  GraduationCap,
  MapPin,
  Search,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BookCounselorCTA from "../components/BookCounselorCTA";
import { useGetAllColleges } from "../hooks/useQueries";

const sampleColleges = [
  {
    name: "Massachusetts Institute of Technology",
    country: "United States",
    areasOfInterest: ["Engineering", "Science", "Technology"],
    ranking: BigInt(1),
    hasResearchOpportunities: true,
    description: "World-leading STEM university known for innovation.",
  },
  {
    name: "University of Oxford",
    country: "United Kingdom",
    areasOfInterest: ["Humanities", "Sciences", "Law"],
    ranking: BigInt(2),
    hasResearchOpportunities: true,
    description: "One of the oldest and most prestigious universities.",
  },
  {
    name: "ETH Zurich",
    country: "Switzerland",
    areasOfInterest: ["Engineering", "Natural Sciences"],
    ranking: BigInt(7),
    hasResearchOpportunities: true,
    description: "Europe's leading science and engineering institution.",
  },
  {
    name: "University of Toronto",
    country: "Canada",
    areasOfInterest: ["Medicine", "Business", "Engineering"],
    ranking: BigInt(21),
    hasResearchOpportunities: true,
    description: "Canada's top research university.",
  },
  {
    name: "National University of Singapore",
    country: "Singapore",
    areasOfInterest: ["Business", "Computing", "Engineering"],
    ranking: BigInt(8),
    hasResearchOpportunities: true,
    description: "Asia's leading global university.",
  },
  {
    name: "University of Melbourne",
    country: "Australia",
    areasOfInterest: ["Medicine", "Arts", "Science"],
    ranking: BigInt(33),
    hasResearchOpportunities: false,
    description: "Australia's #1 ranked university.",
  },
];

export default function CollegeSearchPage() {
  const { data: backendData, isLoading } = useGetAllColleges();
  const [filterInterest, setFilterInterest] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterRanking, setFilterRanking] = useState("any");
  const [researchOnly, setResearchOnly] = useState(false);

  const colleges =
    backendData && backendData.length > 0 ? backendData : sampleColleges;
  const countries = [
    "all",
    ...Array.from(new Set(colleges.map((c) => c.country))),
  ];

  const filtered = colleges
    .filter((c) => {
      const matchInterest =
        !filterInterest ||
        c.areasOfInterest.some((a) =>
          a.toLowerCase().includes(filterInterest.toLowerCase()),
        );
      const matchCountry =
        filterCountry === "all" || c.country === filterCountry;
      const matchResearch = !researchOnly || c.hasResearchOpportunities;
      return matchInterest && matchCountry && matchResearch;
    })
    .sort((a, b) => {
      if (filterRanking === "asc") return Number(a.ranking) - Number(b.ranking);
      if (filterRanking === "desc")
        return Number(b.ranking) - Number(a.ranking);
      return 0;
    });

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
              <GraduationCap className="h-4 w-4" />
              College Search
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              Find Your University
            </h1>
            <p className="text-muted-foreground">
              Search and compare universities worldwide to find your perfect
              match.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label
                  htmlFor="college-interest"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Area of Interest
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="college-interest"
                    className="pl-8"
                    data-ocid="college.interest.input"
                    placeholder="e.g. Engineering, Medicine..."
                    value={filterInterest}
                    onChange={(e) => setFilterInterest(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[160px]">
                <label
                  htmlFor="college-country"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Country
                </label>
                <Select value={filterCountry} onValueChange={setFilterCountry}>
                  <SelectTrigger
                    id="college-country"
                    data-ocid="college.country.select"
                  >
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c === "all" ? "All Countries" : c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[160px]">
                <label
                  htmlFor="college-ranking"
                  className="block text-xs font-medium text-muted-foreground mb-1.5"
                >
                  Sort by Ranking
                </label>
                <Select value={filterRanking} onValueChange={setFilterRanking}>
                  <SelectTrigger id="college-ranking">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Default</SelectItem>
                    <SelectItem value="asc">Rank: Best First</SelectItem>
                    <SelectItem value="desc">Rank: Lowest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 pb-1">
                <Switch
                  id="research-toggle"
                  data-ocid="college.research.toggle"
                  checked={researchOnly}
                  onCheckedChange={setResearchOnly}
                />
                <Label
                  htmlFor="research-toggle"
                  className="text-sm cursor-pointer"
                >
                  <FlaskConical className="inline h-4 w-4 mr-1 text-muted-foreground" />
                  Research only
                </Label>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="college.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-44 w-full" />
              ))}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} universities found
              </p>
              {filtered.length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="college.empty_state"
                >
                  No universities match your filters.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((college, i) => (
                    <motion.div
                      key={college.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card
                        className="shadow-card border-border hover:-translate-y-1 transition-all duration-200 h-full"
                        data-ocid={`college.card.${i + 1}`}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="bg-primary/10 rounded-lg p-2">
                              <GraduationCap className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <TrendingUp className="h-3 w-3" />#
                              {Number(college.ranking)}
                            </div>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {college.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                            <MapPin className="h-3 w-3" />
                            {college.country}
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {college.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {college.areasOfInterest.slice(0, 3).map((a) => (
                              <Badge
                                key={a}
                                variant="secondary"
                                className="text-xs"
                              >
                                {a}
                              </Badge>
                            ))}
                          </div>
                          {college.hasResearchOpportunities && (
                            <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                              <FlaskConical className="h-3 w-3 mr-1" />
                              Research
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
