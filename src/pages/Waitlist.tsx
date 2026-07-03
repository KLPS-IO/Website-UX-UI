import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";

import Logo from "@/components/Logo";
import SoftOrbitBackground from "@/components/SoftOrbitBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE } from "@/config/api";
import { toast } from "sonner";

const PINK = "#D946A8";

const Waitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please add your name and email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          source: "waitlist",
        }),
      });

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      setSubmitted(true);
      toast.success("You're on the waitlist.");
    } catch {
      toast.error("We couldn't save your details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    const waitlistUrl = `${window.location.origin}/waitlist`;

    const shareData = {
      title: "KLPS | The Future of Health Monitoring",
      text: "Your body's been trying to tell you something for years. Bloating. Hormones. Energy. Weight. Cycle.\n\nWe built the underwear that finally listens.\n\nShare with someone who needs to hear this 👉 klps.co.uk/waitlist",
      url: waitlistUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(
        `${shareData.text}\n\n${waitlistUrl}`,
      );
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Unable to share right now.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white p-6 text-foreground">
      <SoftOrbitBackground />

      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div
            className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <h1 className="text-5xl leading-[1.05] tracking-tight text-gray-900 md:text-6xl lg:text-6xl">
              The Future of Health Monitoring
              <br />
              <em className="font-normal italic" style={{ color: PINK }}>
                Is Not Devices.
              </em>
              ,
              <br />
              It is Fabrics.
            </h1>

            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Your body's been talking. Now you can hear it.
            </p>
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Wear it!
            </p>
            <p className="font-normal italic" style={{ color: PINK }}>
              By KLPS &hearts;
            </p>
          </div>

          <div className="w-full max-w-md justify-self-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="rounded-xl border border-pink-100/80 bg-white/90 p-8 shadow-elegant backdrop-blur">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="waitlist-name" className="sr-only">
                      Your name
                    </Label>
                    <Input
                      id="waitlist-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 rounded-full border-gray-200 bg-white px-5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="waitlist-email" className="sr-only">
                      Email
                    </Label>
                    <Input
                      id="waitlist-email"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-full border-gray-200 bg-white px-5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="waitlist-phone" className="sr-only">
                      Phone
                    </Label>
                    <Input
                      id="waitlist-phone"
                      type="tel"
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 rounded-full border-gray-200 bg-white px-5"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-full text-base text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: PINK }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Join the waitlist"}
                  </Button>
                </form>
              ) : (
                <div className="rounded-lg border border-gray-100 bg-white px-6 py-8 text-center">
                  <p className="text-xl font-medium text-gray-900">
                    You're on the list.
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    We'll be in touch soon.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="mx-auto mt-6 flex items-center gap-2 text-sm text-gray-500 transition-opacity hover:opacity-70"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Share with a friend
              </button>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-sm"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
