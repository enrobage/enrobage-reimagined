import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Mail, Phone, Send, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";
import contactHero from "@/assets/contact-hero.webp";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// ponytail: key is public-by-design (Web3Forms client-side key); move to Vercel env if it ever needs rotating
const WEB3FORMS_KEY = "1dcea557-d4c9-4893-9538-10f7fe458c8b";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [botcheck, setBotcheck] = useState("");

  const productOptions = [
    "Bagecoat™ FILM",
    "Bagecoat™ Seal",
    "Bagecoat™ PureView",
    "Bagecoat™ Enteric",
    "Bagecoat™ NUTRA",
    "Bagecoat™ SUSTAINER",
    "Bagecoat™ MoistShield",
    "Bagecoat™ TastyTab",
    "Bagecoat™ Pearl",
    "Bagecoat™ Ecofrost",
    "Bagecoat™ Blend",
    "Bagecoat™ Instabind",
    "Others",
  ];

  const mapsEmbed =
    "https://maps.google.com/maps?q=Enrobage+India+Pvt+Ltd,+Kala+Amb,+Himachal+Pradesh+173030&output=embed";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: formState.subject || `Inquiry from ${formState.name}`,
          name: formState.name,
          email: formState.email,
          "coating system": formState.interest,
          message: formState.message,
          botcheck,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSubmitted(true);
    } catch {
      toast.error(
        "Couldn't send your message. Please try again or email info@enrobage.in directly."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-enter">
        {/* HERO — Colorcon-style curved blue */}
        <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 mesh-bg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo" />
          <div className="container-x relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-5 animate-slide-up">
                <span className="h-px w-10 bg-primary/40" />
                <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">Get in Touch</span>
                <span className="h-px w-10 bg-primary/40" />
              </div>
              <h1 className="heading-hero mb-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <span className="gradient-text-logo">Contact Us</span>
              </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Our formulation specialists partner with your team across every CMC milestone.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "0.5pt", backgroundColor: "#9ca3af" }} />
      </section>
        <div className="rainbow-strip" aria-hidden="true" />

        {/* MAIN CONTENT */}
        <section>
          <div className="container-x py-16 md:py-20 lg:py-24">
            <div className="rounded-3xl card-elevated overflow-hidden grid lg:grid-cols-5">
              {/* LEFT — INFO PANEL (brand ombre) */}
              <aside className="lg:col-span-2 cta-band gradient-hover gradient-hover-strong text-white p-8 md:p-10 flex flex-col">
                <AnimatedHeading direction="left">
                  <h2 className="heading-sub mb-4">Get in touch</h2>
                </AnimatedHeading>
                <p className="text-white/85 leading-relaxed mb-8">
                  From bespoke film coating systems and excipient compatibility
                  studies to scale-up trials and regulatory dossiers — our
                  formulation scientists partner with your team across every CMC
                  milestone.
                </p>

                <div className="space-y-2 mt-auto">
                  <a
                    href="tel:+917834033063"
                    aria-label="Call Enrobage India"
                    className="flex items-start gap-4 rounded-xl p-3 -mx-3 min-h-[44px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Phone size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">Call Us</span>
                      <span className="block text-sm text-white/80 leading-relaxed">
                        +91 78340 33063<br />+91 93125 01750
                      </span>
                    </span>
                  </a>

                  <a
                    href="mailto:info@enrobage.in"
                    aria-label="Email Enrobage India"
                    className="flex items-start gap-4 rounded-xl p-3 -mx-3 min-h-[44px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Mail size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">Email Us</span>
                      <span className="block text-sm text-white/80 break-all">
                        info@enrobage.in
                      </span>
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/enrobage-india-pvt-ltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Enrobage India on LinkedIn (opens in a new tab)"
                    className="flex items-start gap-4 rounded-xl p-3 -mx-3 min-h-[44px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Linkedin size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">LinkedIn</span>
                      <span className="block text-sm text-white/80">
                        Enrobage India Pvt. Ltd.
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-4 p-3 -mx-3">
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <MapPin size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">Visit Us</span>
                      <span className="block text-sm text-white/80 leading-relaxed">
                        Enrobage India Pvt. Ltd.<br />Kala Amb, Himachal Pradesh 173030
                      </span>
                    </span>
                  </div>
                </div>
              </aside>

              {/* RIGHT — FORM */}
              <div className="lg:col-span-3 bg-background p-8 md:p-10">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full mb-6 flex items-center justify-center bg-primary/10">
                      <Send size={32} className="text-primary" />
                    </div>
                    <h3 className="heading-sub text-foreground mb-3">
                      Inquiry received ✦
                    </h3>
                    <p className="text-muted-foreground">
                      A formulation specialist will revert within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="botcheck"
                      value={botcheck}
                      onChange={(e) => setBotcheck(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                          Your Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Email Address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          value={formState.subject}
                          onChange={(e) =>
                            setFormState({ ...formState, subject: e.target.value })
                          }
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-interest" className="block text-sm font-medium text-foreground mb-2">
                          Coating system of interest
                        </label>
                        <select
                          id="contact-interest"
                          value={formState.interest}
                          onChange={(e) =>
                            setFormState({ ...formState, interest: e.target.value })
                          }
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                          required
                        >
                          <option value="" disabled>
                            Select a Bagecoat™ system…
                          </option>
                          {productOptions.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        rows={6}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="Dosage form, API class, batch size, target release profile, regulatory market…"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-ombre group disabled:opacity-60 disabled:pointer-events-none"
                      disabled={sending}
                    >
                      {sending ? "Sending…" : "Send Message"}
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH MAP */}
        <section className="w-full">
          <iframe
            title="Enrobage India location"
            src={mapsEmbed}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
            className="block"
          />
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Contact;
