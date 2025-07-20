import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-primary py-24 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Ready to Transform Your Content?
          </h2>
          <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
            Join thousands of creators who are already using ContentPilot to grow their audience and influence.
          </p>
          <Button
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold text-lg shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group"
            asChild
          >
            <Link to="/signup">
              Start Creating Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;