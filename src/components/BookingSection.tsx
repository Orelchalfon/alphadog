import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  name: z.string().min(2, "השם חייב להכיל לפחות 2 תווים").max(100),
  email: z.string().email("נא להזין כתובת אימייל תקינה"),
  phone: z.string().min(10, "נא להזין מספר טלפון תקין").max(20),
  service: z.string().min(1, "נא לבחור שירות"),
  date: z.date({ required_error: "נא לבחור תאריך מועדף" }),
  message: z.string().max(1000).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = bookingSchema.parse({
        ...formData,
        date,
      });

      const { error } = await supabase.from("consultation_requests").insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        preferred_date: validatedData.date.toISOString(),
        message: validatedData.message || null,
      });

      if (error) throw error;

      toast({
        title: "בקשת הייעוץ נשלחה!",
        description: "נחזור אליכם תוך 24 שעות לאישור הפגישה.",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setDate(undefined);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "שגיאת אימות",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "שגיאה",
          description: "משהו השתבש. נא לנסות שוב.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            התחל עכשיו
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            הזמן פגישת ייעוץ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            צעד ראשון לכלב מתנהג יותר טוב. מלאו את הטופס למטה ונחזור אליכם.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                פרטי התקשרות
              </h3>
              <p className="text-muted-foreground mb-8">
                יש שאלות? צרו קשר ישירות או השתמשו בטופס לתאם פגישת ייעוץ חינם.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">טלפון</p>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">אימייל</p>
                  <p className="text-muted-foreground">hello@alphadog.training</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">מיקום</p>
                  <p className="text-muted-foreground">משרתים את אזור המטרופולין</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative mt-8">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop"
                alt="כלבים מאושרים רצים בשדה"
                className="rounded-2xl shadow-lg object-cover w-full h-64"
              />
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card border-border shadow-xl">
              <CardHeader>
                <CardTitle className="font-serif">בקש פגישת ייעוץ</CardTitle>
                <CardDescription>
                  מלאו את הטופס ונחזור אליכם תוך 24 שעות.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">שם מלא</Label>
                      <Input
                        id="name"
                        placeholder="ישראל ישראלי"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="israel@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">מספר טלפון</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>שירות</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="בחר שירות" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="obedience">אילוף צייתנות</SelectItem>
                          <SelectItem value="puppy">סוציאליזציה לגורים</SelectItem>
                          <SelectItem value="behavioral">תיקון התנהגותי</SelectItem>
                          <SelectItem value="other">אחר / לא בטוח</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>תאריך מועדף</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-start font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="me-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: he }) : "בחר תאריך"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          locale={he}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">הודעה (אופציונלי)</Label>
                    <Textarea
                      id="message"
                      placeholder="ספרו לנו על הכלב שלכם ומה אתם מקווים להשיג..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "שולח..." : "בקש פגישת ייעוץ"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
