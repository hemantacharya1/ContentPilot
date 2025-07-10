import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-primary"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Brand?
          </h2>

          {/* Sub-text */}
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Stop letting good ideas fade away. Start turning them into opportunities.
            <br />
            <strong>Join 2,500+ creators</strong> who are already building their authority with ContentPilot.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group">
              Start Creating Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-white/70 text-sm">
            ✅ No credit card required &nbsp;&nbsp; ✅ 14-day free trial &nbsp;&nbsp; ✅ Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;