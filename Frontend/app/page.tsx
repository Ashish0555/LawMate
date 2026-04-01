"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { CTASection } from "@/components/CTASection";

import {
  Shield,
  Clock,
  Users,
  ArrowRight,
  MessageSquare,
  Calendar,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🔥 FAKE PAYMENT + BACKEND FLOW
  const handleAsk = async () => {
    try {
      setLoading(true);

      // Fake payment delay
      setTimeout(async () => {
        const res = await fetch("http://localhost:5001/api/questions/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: "123e4567-e89b-12d3-a456-426614174000",
            question: "Quick legal help",
          }),
        });

        const data = await res.json();
        const questionId = data[0].id;

        router.push(`/chat/${questionId}`);
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Expert Legal Advice{" "}
            <span className="text-primary">At Your Fingertips</span>
          </h1>

          <p className="text-muted-foreground text-lg">
            Get instant legal answers from verified experts in minutes
          </p>

          {/* 🔥 MAIN CTA */}
          <Button
            size="lg"
            onClick={handleAsk}
            disabled={loading}
            className="px-8"
          >
            <Zap className="w-5 h-5 mr-2" />
            {loading ? "Processing Payment..." : "Ask a Lawyer for ₹49"}
            {!loading && (
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            )}
          </Button>

          {/* Trust */}
          <div className="flex justify-center gap-6 text-sm text-muted-foreground mt-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Verified Lawyers
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Fast Response
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Trusted Platform
            </div>
          </div>
        </div>
      </section>

      {/* ₹49 Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Quick Legal Help at Just ₹49
        </h2>

        <p className="text-muted-foreground mb-6">
          Ask your question instantly and get expert guidance
        </p>

        <Button size="lg" onClick={handleAsk} disabled={loading}>
          {loading ? "Processing..." : "Ask Now for ₹49"}
        </Button>
      </section>

      {/* Features */}
      <section className="py-16 grid md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
        {[
          {
            icon: MessageSquare,
            title: "Instant Chat",
            desc: "Real-time legal consultation",
          },
          {
            icon: Calendar,
            title: "Flexible Booking",
            desc: "Schedule easily",
          },
          {
            icon: Shield,
            title: "Secure",
            desc: "Confidential conversations",
          },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="p-6 border rounded-lg text-center">
              <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          );
        })}
      </section>

      <CTASection />

      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        © 2024 LegalConsult
      </footer>
    </div>
  );
}