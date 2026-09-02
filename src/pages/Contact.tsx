import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Mail, Phone, Send, Linkedin } from "lucide-react";
import { useState } from "react";
import contactHero from "@/assets/contact-hero.jpg";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.interest) {
      alert("Please pick what you're interested in.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      const subject =
        formState.subject || `Inquiry from ${formState.name}`;
      const body = `Looking for: ${formState.interest}\n\n${formState.message}`;
      window.location.href = `mailto:info@enrobage.in?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="page-enter">
        {/* HERO — Colorcon-style curved blue */}
        <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-20 mesh-bg overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-line-logo" />
          <div className="w-full px-6 md:px-[4.2%] relative z-10">
            <div className="max-w-5xl mx-auto text-center">
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
          <div className="section-card">
            <div className="grid lg:grid-cols-12 gap-14">
              {/* LEFT — FORM */}
              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="p-12 rounded-3xl card-elevated text-center bg-background">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-primary/10 animate-scale-in">
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
                  <form
                    onSubmit={handleSubmit}
                    className="bg-background rounded-3xl p-8 md:p-10 card-elevated space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full bg-muted/50 border border-border/60 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className="w-full bg-muted/50 border border-border/60 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Email Address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formState.subject}
                          onChange={(e) =>
                            setFormState({ ...formState, subject: e.target.value })
                          }
                          className="w-full bg-muted/50 border border-border/60 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Coating system of interest
                        </label>
                        <select
                          value={formState.interest}
                          onChange={(e) =>
                            setFormState({ ...formState, interest: e.target.value })
                          }
                          className="w-full bg-muted/50 border border-border/60 rounded-xl px-4 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
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
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Message
                      </label>
                      <textarea
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        rows={6}
                        className="w-full bg-muted/50 border border-border/60 rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="Dosage form, API class, batch size, target release profile, regulatory market…"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 bg-logo-navy hover:bg-primary text-white font-semibold tracking-wider uppercase text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                    >
                      Send Message
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>
                )}
              </div>

              {/* RIGHT — INFO */}
              <aside className="lg:col-span-5 space-y-6">
                <div>
                  <span className="eyebrow">Talk to us</span>
                  <AnimatedHeading direction="left"><h2 className="section-heading heading-section mb-5 tracking-tight">
                    Get in touch
                  </h2></AnimatedHeading>
                  <p className="text-muted-foreground leading-relaxed">
                    From bespoke film coating systems and excipient compatibility
                    studies to scale-up trials and regulatory dossiers — our
                    formulation scientists partner with your team across every CMC
                    milestone.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+917834033063"
                    className="group p-5 rounded-2xl bg-background card-elevated hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 text-white transition-colors" style={{ background: "hsl(var(--logo-navy))" }}>
                      <Phone size={18} />
                    </div>
                    <div className="font-display font-bold text-foreground">Call Us</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      +91 78340 33063<br />+91 93125 01750
                    </div>
                  </a>

                  <a
                    href="mailto:info@enrobage.in"
                    className="group p-5 rounded-2xl bg-background card-elevated hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 text-white transition-colors" style={{ background: "hsl(var(--logo-navy))" }}>
                      <Mail size={18} />
                    </div>
                    <div className="font-display font-bold text-foreground">Email Us</div>
                    <div className="text-xs text-muted-foreground mt-1 break-all">
                      info@enrobage.in
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/enrobage-india-pvt-ltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-5 rounded-2xl bg-background card-elevated hover:-translate-y-1 transition-all duration-500 col-span-2"
                  >
                    <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3 text-white transition-colors" style={{ background: "hsl(var(--logo-navy))" }}>
                      <Linkedin size={18} />
                    </div>
                    <div className="font-display font-bold text-foreground">LinkedIn</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Enrobage India Pvt. Ltd.
                    </div>
                  </a>
                </div>
              </aside>
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
