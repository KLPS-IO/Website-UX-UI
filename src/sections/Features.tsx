import { Heart, Shield, Sparkles } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const features = [
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Technology designed around your unique health needs and life stage.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your health data belongs to you. Secure, private, and always protected.",
  },
  {
    icon: Sparkles,
    title: "Science-Backed",
    description: "Built on the latest research and clinical expertise in women's health.",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're reimagining healthcare technology with women at the center.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-primary/20 shadow-soft hover:shadow-glow transition-smooth animate-scale-in bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
