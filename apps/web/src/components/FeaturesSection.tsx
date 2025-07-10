import { Upload, Wand2, Share2, Zap, Target, Clock } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Ingest Anything",
    description: "Paste a YouTube link, upload a PDF, or simply type a raw idea. ContentPilot extracts the key insights for you.",
    color: "text-blue-600"
  },
  {
    icon: Wand2,
    title: "Personalize Your Voice",
    description: "Our AI learns your unique writing style from your past content, ensuring every post is 100% authentic to your brand.",
    color: "text-purple-600"
  },
  {
    icon: Share2,
    title: "Publish Everywhere",
    description: "Generate platform-optimized posts for Twitter, LinkedIn, and more. Edit, schedule, and build your audience on autopilot.",
    color: "text-green-600"
  }
];

const benefits = [
  {
    icon: Zap,
    title: "10x Faster Content Creation",
    description: "What used to take hours now takes minutes"
  },
  {
    icon: Target,
    title: "100% Authentic Voice",
    description: "AI that actually sounds like you"
  },
  {
    icon: Clock,
    title: "Never Run Out of Ideas",
    description: "Turn every piece of content you consume into posts"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* How It Works */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Create Content in 
            <span className="text-gradient"> 3 Effortless Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop spending hours crafting posts. Let ContentPilot do the heavy lifting while you focus on what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="card-feature hover-lift text-center group">
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Why Content Creators Choose ContentPilot
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:shadow-card transition-all duration-300">
              <benefit.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;