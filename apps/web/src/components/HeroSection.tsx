import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Transform Your Content with AI
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Repurpose your content across platforms while maintaining your authentic voice. From videos to threads, blogs to social posts - all with your unique style.
          </p>
          <div className="space-x-4">
            <Button className="btn-hero-primary group" asChild>
              <Link to="/signup">
                Start Creating for Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;