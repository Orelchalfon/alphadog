import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "שרה מיטשל",
    dogName: "מקס",
    rating: 5,
    text: "AlphaDog שינה לחלוטין את מקס מכלב חרד וריאקטיבי לרגוע ובטוח. הסבלנות והמומחיות שהופגנו בכל מפגש היו מדהימות.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "מיכאל צ'ן",
    dogName: "לונה",
    rating: 5,
    text: "הגור שלנו לונה היה אתגר לפני האימון. עכשיו היא מצייתת לפקודות, הולכת יפה ברצועה והפכה לכלב משפחה מושלם. ממליצים בחום!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "אמה תומפסון",
    dogName: "קופר",
    rating: 5,
    text: "אחרי שניסינו מאלפים רבים, סוף סוף מצאנו את AlphaDog. תוכנית תיקון ההתנהגות עזרה לקופר להתגבר על התוקפנות מבוססת הפחד שלו. שינוי חיים!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    name: "דוד רודריגז",
    dogName: "בלה",
    rating: 5,
    text: "תוכנית הסוציאליזציה לגורים הייתה בדיוק מה שבלה הייתה צריכה. עכשיו היא בטוחה ליד כלבים ואנשים אחרים. תודה, AlphaDog!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            המלצות
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            מה הלקוחות שלנו אומרים
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            שמעו מהמשפחות שעזרנו לבנות קשרים חזקים יותר עם החברים הפרוותיים שלהם.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-card border-border shadow-xl">
              <CardContent className="p-8 md:p-12">
                <Quote className="h-12 w-12 text-primary/20 mb-6" />
                
                <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      כלב: {testimonials[currentIndex].dogName}
                    </p>
                  </div>
                  <div className="ms-auto flex gap-0.5">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              aria-label="המלצה קודמת"
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`עבור להמלצה ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              aria-label="המלצה הבאה"
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
