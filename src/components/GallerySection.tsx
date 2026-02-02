import { motion, type Variants, type Easing } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const easeOut: Easing = [0.4, 0, 0.2, 1];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
    alt: "אימון כלבים בחוץ",
    caption: "אימון בחוץ",
  },
  {
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    alt: "גולדן רטריבר מאושר אחרי אימון",
    caption: "תוצאות מאושרות",
  },
  {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
    alt: "שני כלבים משחקים יחד",
    caption: "סוציאליזציה",
  },
  {
    src: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=crop",
    alt: "גור לומד פקודות",
    caption: "כיתת גורים",
  },
  {
    src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop",
    alt: "כלב מבצע טריקים",
    caption: "כישורים מתקדמים",
  },
  {
    src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&h=400&fit=crop",
    alt: "דיוקן כלב אחרי טיפוח",
    caption: "לפני ואחרי",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export function GallerySection() {
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2 tracking-wide uppercase text-sm">
            העבודה שלנו
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            אימון בפעולה
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            צפו בשינויים וברגעים המאושרים ממפגשי האימון שלנו.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
            >
              <AspectRatio ratio={1}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground font-medium text-sm">
                    {image.caption}
                  </p>
                </div>
              </AspectRatio>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
