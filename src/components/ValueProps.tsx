import { Shield, Sparkles, Heart, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Nano Materials",
    description: "Worlds First Nano-Material Based Health Insight Material.",
  },
  {
    icon: Sparkles,
    title: "Science-Backed",
    description: "Evidence-based solutions developed with leading nano-material experts.",
  },
  {
    icon: Heart,
    title: "Personalised Care",
    description: "Tailored experiences adapted to your unique health journey.",
  },
  {
    icon: Zap,
    title: "Cutting Edge",
    description: "Leveraging the latest technology to empower better health outcomes.",
  },
];

const ValueProps = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Non-Invasive Insights!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovation meets empathy in a platform designed to transform women's healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-soft hover:shadow-elegant transition-smooth animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex p-3 rounded-xl gradient-hero">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
