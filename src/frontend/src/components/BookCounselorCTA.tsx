import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookCounselorCTA() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-primary py-16">
      <div className="page-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 text-accent mb-2 justify-center md:justify-start">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Expert Guidance
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
              Ready to chart your future?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl">
              Book a session with one of our expert counselors today and take
              the first step toward your global university journey.
            </p>
          </div>
          <div className="shrink-0">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-base shadow-lg"
              data-ocid="cta.open_modal_button"
              onClick={() => setOpen(true)}
            >
              Book a Counselor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <BookingModal open={open} onOpenChange={setOpen} />
    </section>
  );
}
