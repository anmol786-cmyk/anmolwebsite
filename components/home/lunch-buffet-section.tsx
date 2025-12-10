'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Clock, Users, Utensils, ArrowRight } from "lucide-react";

export function LunchBuffetSection() {
  return (
    <section className="w-full py-24 bg-white relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm">
                Weekday Special
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Weekday Lunch <br />
                <span className="text-primary">Buffet Extravaganza</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Stockholm's best value workday lunch buffet! Enjoy our all-you-can-eat spread featuring
                <span className="font-semibold text-foreground mx-1">15 authentic Indo-Pakistani dishes</span>
                freshly prepared every morning.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Unlimited Pizza Buffet included",
                "Signature Lamb Karahi & Chicken Tikka",
                "Fresh Naan, Raita & Chutneys",
                "Vegetarian Options Available",
                "Coffee, Tea & Cold Drinks included"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-foreground/80 font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base font-semibold transition-transform hover:scale-105" asChild>
                <Link href="/lunch-buffet-in-stockholm">
                  View Full Menu
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src="https://anmolsweets.se/wp-content/uploads/2025/09/lunch-buffet-web.jpg"
                alt="Weekday Lunch Buffet featuring authentic Indo-Pakistani dishes at Anmol Sweets & Restaurant Stockholm"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Price per person</p>
                    <p className="text-3xl font-bold text-primary">139 SEK</p>
                  </div>
                  <div className="px-4 py-2 bg-primary/10 rounded-lg text-center">
                    <p className="text-xs font-bold text-primary uppercase">Mon - Fri</p>
                    <p className="text-sm font-bold text-primary">11:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
