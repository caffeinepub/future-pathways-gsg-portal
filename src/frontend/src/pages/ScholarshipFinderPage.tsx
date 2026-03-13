import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Award, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Variant_merit_subject_need } from "../backend.d";
import BookCounselorCTA from "../components/BookCounselorCTA";
import { useGetAllScholarships } from "../hooks/useQueries";

const sampleScholarships = [
  {
    name: "Rhodes Scholarship",
    country: "United Kingdom",
    fieldOfStudy: "Any",
    scholarshipType: Variant_merit_subject_need.merit,
    deadline: "2025-10-01",
    description: "Prestigious graduate scholarship at Oxford University.",
  },
  {
    name: "Fulbright Program",
    country: "United States",
    fieldOfStudy: "Any",
    scholarshipType: Variant_merit_subject_need.merit,
    deadline: "2025-09-15",
    description: "US government scholarship for international students.",
  },
  {
    name: "Chevening Scholarship",
    country: "United Kingdom",
    fieldOfStudy: "Any",
    scholarshipType: Variant_merit_subject_need.merit,
    deadline: "2025-11-02",
    description: "UK government scholarship for future leaders.",
  },
  {
    name: "DAAD Scholarship",
    country: "Germany",
    fieldOfStudy: "STEM",
    scholarshipType: Variant_merit_subject_need.subject,
    deadline: "2025-10-31",
    description: "German Academic Exchange Service scholarship.",
  },
  {
    name: "Gates Cambridge Scholarship",
    country: "United Kingdom",
    fieldOfStudy: "Any",
    scholarshipType: Variant_merit_subject_need.merit,
    deadline: "2025-10-12",
    description: "Full scholarship for graduate study at Cambridge.",
  },
  {
    name: "Aga Khan Foundation",
    country: "Global",
    fieldOfStudy: "Development",
    scholarshipType: Variant_merit_subject_need.need,
    deadline: "2025-08-31",
    description: "Supporting students from developing countries.",
  },
];

export default function ScholarshipFinderPage() {
  const { data: backendData, isLoading } = useGetAllScholarships();
  const [filterCountry, setFilterCountry] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterType, setFilterType] = useState("all");

  const scholarships =
    backendData && backendData.length > 0 ? backendData : sampleScholarships;

  const filtered = scholarships.filter((s) => {
    const matchCountry =
      !filterCountry ||
      s.country.toLowerCase().includes(filterCountry.toLowerCase());
    const matchField =
      !filterField ||
      s.fieldOfStudy.toLowerCase().includes(filterField.toLowerCase());
    const matchType = filterType === "all" || s.scholarshipType === filterType;
    return matchCountry && matchField && matchType;
  });

  const typeColors: Record<string, string> = {
    merit: "bg-blue-100 text-blue-700",
    subject: "bg-green-100 text-green-700",
    need: "bg-amber-100 text-amber-700",
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
            <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
              <Award className="h-4 w-4" />
              Scholarship Finder
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary mb-2">
              Find Your Scholarship
            </h1>
            <p className="text-muted-foreground">
              Explore hundreds of scholarships from around the world.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-5 mb-6 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <label
                htmlFor="filter-country"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Country
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="filter-country"
                  className="pl-8"
                  data-ocid="scholarship.country.select"
                  placeholder="Filter by country..."
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label
                htmlFor="filter-field"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Field of Study
              </label>
              <Input
                id="filter-field"
                data-ocid="scholarship.field.input"
                placeholder="Filter by field..."
                value={filterField}
                onChange={(e) => setFilterField(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[180px]">
              <label
                htmlFor="filter-type"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Scholarship Type
              </label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger
                  id="filter-type"
                  data-ocid="scholarship.type.select"
                >
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="merit">Merit-Based</SelectItem>
                  <SelectItem value="subject">Subject-Specific</SelectItem>
                  <SelectItem value="need">Need-Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3" data-ocid="scholarship.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <Table data-ocid="scholarship.table">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold text-foreground">
                      Scholarship Name
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Country
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Field
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Type
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Deadline
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                        data-ocid="scholarship.empty_state"
                      >
                        No scholarships match your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((s, idx) => (
                      <TableRow
                        key={s.name}
                        data-ocid={`scholarship.row.${idx + 1}`}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="font-medium text-foreground">
                            {s.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {s.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.country}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.fieldOfStudy}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${typeColors[s.scholarshipType] ?? ""} border-0 text-xs`}
                          >
                            {s.scholarshipType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {s.deadline}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            {filtered.length} scholarships found
          </p>
        </div>
      </section>
      <BookCounselorCTA />
    </main>
  );
}
