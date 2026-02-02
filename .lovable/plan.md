

# AlphaDog — Professional Dog Trainer Portfolio

A high-end, premium portfolio website for AlphaDog dog training services, built with Vite + React, Tailwind CSS (oklch color system), Framer Motion animations, and shadcn/ui components. The site will feature a warm, earthy brand palette with elegant typography and smooth animations.

---

## 🎨 Visual Identity & Theme Setup
- Implement the custom oklch color palette with warm browns, creams, and accent tones
- Configure fonts: **Poppins** (sans-serif for body text) and **Libre Baskerville** (serif for headlines)
- Set up custom shadow variables for premium floating card effects
- Add dark/light mode toggle with smooth theme transitions

---

## 📄 Page Sections

### 1. Hero Section
- **High-impact intro** with Framer Motion text reveals (staggered letter/word animations)
- **Tagline**: "Transforming your dog's behavior with expert care"
- Professional placeholder image with the trainer or dog
- Primary CTA button: "Book a Consultation"

### 2. Services Grid
- **Three service cards** with hover-lift animations:
  - **Obedience Training** — Build foundation commands and discipline
  - **Puppy Socialization** — Early behavior shaping for puppies
  - **Behavioral Correction** — Address anxiety, aggression, and bad habits
- Each card features an icon, description, and "Learn More" link

### 3. Gallery / Activity Feed
- Instagram-inspired grid layout with **aspect-square** images
- Clean overlay effects on hover showing captions
- Placeholder images showcasing training sessions and happy dogs

### 4. Testimonials Slider
- Carousel of client success stories
- Uses secondary accent colors for visual contrast
- Includes client name, dog name, and star ratings

### 5. Booking CTA Section
- Clean shadcn/ui form with fields:
  - Name, Email, Phone
  - Service selection dropdown
  - Preferred date picker
  - Message textarea
- Form submissions saved to **Lovable Cloud database**
- Success toast notification on submission

### 6. Footer
- Contact information and social links
- Quick navigation links
- Brand reinforcement

---

## ⚙️ Technical Features

### Backend (Lovable Cloud)
- **Database table** for storing consultation requests
- Form validation using Zod schema
- Proper input sanitization and security

### Animations (Framer Motion)
- Scroll-triggered fade-in animations for all sections
- Staggered children animations for service cards and gallery
- Smooth page transitions

### Mobile Optimization
- Mobile-first responsive design
- Touch-friendly interactions
- Optimized for app-like experience on phones

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper color contrast ratios

---

## 🚀 Deliverables
1. Fully responsive portfolio with all sections
2. Dark/light mode toggle
3. Working consultation booking form with database storage
4. Smooth Framer Motion animations throughout
5. Professional placeholder content ready for customization

