import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSubmitBooking } from "../hooks/useQueries";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingModal({
  open,
  onOpenChange,
}: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    preferredDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitBooking = useSubmitBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBooking.mutateAsync(form);
    setSubmitted(true);
    setForm({ name: "", email: "", preferredDate: "", message: "" });
  };

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px]" data-ocid="booking.dialog">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-primary" />
            <DialogTitle className="font-display text-xl text-primary">
              Book a Counselor
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Schedule a one-on-one session with an expert counselor from Global
            Schools Group.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 flex flex-col items-center text-center gap-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h3 className="font-display text-lg text-primary">
              Booking Submitted!
            </h3>
            <p className="text-sm text-muted-foreground">
              We've received your request and will confirm your session via
              email shortly.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-2 bg-primary text-primary-foreground"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="booking-name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="booking-name"
                  data-ocid="booking.name.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="booking-email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="booking-email"
                  type="email"
                  data-ocid="booking.email.input"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="booking-date" className="text-sm font-medium">
                Preferred Date
              </Label>
              <Input
                id="booking-date"
                type="date"
                data-ocid="booking.date.input"
                value={form.preferredDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, preferredDate: e.target.value }))
                }
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="booking-message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="booking-message"
                data-ocid="booking.message.textarea"
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Tell us what you'd like to discuss — college applications, career paths, scholarships..."
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleClose(false)}
                data-ocid="booking.cancel.button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={submitBooking.isPending}
                data-ocid="booking.submit.button"
              >
                {submitBooking.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Book Session"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
