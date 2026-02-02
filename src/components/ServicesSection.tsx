import { motion, type Variants, type Easing } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Heart, Shield } from "lucide-react";

const easeOut: Easing = [0.4, 0, 0.2, 1];

const services = [
  {
    icon: GraduationCap,
    title: "Obedience Training",
    description: "Build a strong foundation with essential commands like sit, stay, heel, and recall. Perfect for dogs of all ages.",
    features: ["Basic & Advanced Commands", "Leash Manners", "Focus & Attention Training"],
  },
  {
    icon: Heart,
    title: "Puppy Socialization",
    description: "Early behavioral shaping for puppies to develop confidence and positive associations with the world around them.",
    features: ["Positive Exposure", "Bite Inhibition", "Crate & Potty Training"],
  },
  {
    icon: Shield,
    title: "Behavioral Correction",
    description: "Address anxiety, aggression, and unwanted habits with proven, compassionate techniques tailored to your dog.",
    features: ["Anxiety Management", "Reactivity Training", "Fear Desensitization"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Training Programs for Every Dog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have a new puppy or an adult dog with behavioral challenges, we have the expertise to help.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
