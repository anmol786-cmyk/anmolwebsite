'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Calendar, Utensils, Award, Sparkles, Heart } from "lucide-react";

const cateringFeatures = [
  {
    icon: Users,
    title: "450+ Events",
    description: "Successfully catered weddings, mehndi, and large celebrations"
  },
  {
    icon: Sparkles,
    title: "Flexible Menu",
    description: "Mix and match menu from 40+ dishes"
  },
  {
    icon: Utensils,
    title: "Live Cooking",
    description: "Watch our chefs prepare dishes fresh on-site"
  },
  {
    icon: Award,
    title: "Full-Service Catering",
    description: "Setup, service, and cleanup - we handle everything"
  }
];

export function CateringSection() {
  return (
    <section className="w-full py-24 bg-card relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        {/* Two Column Layout: Title/Description Left, Cards Right */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm">
                Catering Services
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Premium Catering <br />
                <span className="text-primary">Services in Stockholm</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Authentic Indo-Pakistani cuisine for weddings, corporate events, and special celebrations. We provide <span className="font-semibold text-foreground">custom menus, live cooking, and full-service event management</span>.
              </p>
            </div>
          </motion.div>

          {/* Right Column - 4 Cards in 2x2 Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {cateringFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 border border-border/60 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lower Section - Events List & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-background rounded-3xl p-8 md:p-12 border border-border/50"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-foreground">
                Events We Cater
              </h3>
              <ul className="space-y-4">
                {[
                  "Weddings & Mehndi Ceremonies",
                  "Corporate Events & Business Lunches",
                  "Birthday Parties & Celebrations",
                  "Social Gatherings",
                  "Religious Ceremonies"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-heading font-bold text-foreground">
                    Why Choose Anmol?
                  </h4>
                </div>
                <p className="text-muted-foreground">
                  With over 10 years of experience, we bring authentic flavors and professional service to make your event unforgettable.
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground/80">
                  <span className="flex items-center gap-1"><span className="text-primary">✓</span> 100% Halal</span>
                  <span className="flex items-center gap-1"><span className="text-primary">✓</span> Live Stations</span>
                  <span className="flex items-center gap-1"><span className="text-primary">✓</span> Full Service</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/special-order">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base font-semibold transition-transform hover:scale-105">
                    View Catering Menu
                  </Button>
                </Link>
                <a href="tel:+4688866679">
                  <Button variant="outline" size="lg" className="border-2 border-border/60 hover:bg-background hover:text-primary hover:border-primary/50 text-foreground rounded-full px-8 h-12 text-base font-semibold transition-all hover:scale-105">
                    Call for Quote
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
