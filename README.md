# Eid Mubarak Greeting Website

Website ucapan Eid Mubarak yang modern dan responsif dengan animasi GSAP, styling SASS, dan desain dark mode profesional.

## 🎯 Fitur Utama

- **Full Motion GSAP Animations**: Animasi hero section yang memukau dengan particle effects
- **Dark Mode Theme**: Tema gelap dengan aksen emas (#FFD700) yang elegan
- **Responsive Design**: Fully responsive untuk desktop, tablet, dan mobile (Android optimized)
- **Interactive Components**: 
  - Check-in button dengan visual feedback
  - Real-time visitor counter
  - Status message dengan warning icon
- **Professional Footer**: Footer Aceternity UI style dengan link dan informasi kontak
- **SASS/SCSS Styling**: Styling kompleks dengan variables, mixins, dan responsive utilities
- **Performance Optimized**: Fast loading dengan smooth animations dan optimized rendering

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (Dioptimalkan untuk Android)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Scheme

| Element | Color | Code |
|---------|-------|------|
| Background | Deep Black | #000000 |
| Primary Accent | Gold | #FFD700 |
| Primary Light | Light Gold | #FFED4E |
| Card Background | Very Dark Gray | #0a0a0a |
| Border | Dark Gray | #1a1a1a |
| Purple Glow | Purple with transparency | rgba(102, 51, 153, 0.5) |
| Teal Glow | Teal with transparency | rgba(0, 128, 128, 0.5) |

## 📚 Struktur Project

```
app/
├── layout.tsx              # Root layout dengan Poppins font
├── globals.css            # Global styles dengan design tokens
├── page.tsx               # Main page (halaman utama)
components/
├── eid-header.tsx         # Header dengan crescent moon icon
├── eid-hero.tsx           # Hero section dengan GSAP animations
├── eid-interactive.tsx    # Interactive section (check-in & counter)
└── eid-footer.tsx         # Professional footer
styles/
└── eid-styles.scss        # Advanced SCSS styling
public/
└── moon-eid-modern.svg    # Crescent moon SVG icon
```

## 🚀 Teknologi yang Digunakan

### Framework & Libraries
- **Next.js 16**: Modern React framework
- **React 19**: Latest React features
- **GSAP 3.12+**: Professional animation library
- **SASS 1.70+**: Advanced CSS preprocessing
- **Tailwind CSS 4**: Utility-first CSS framework

### Styling
- CSS Design Tokens untuk konsistensi tema
- SCSS dengan mixins dan variables
- Responsive utilities
- Dark mode enforced globally

### Animations
- GSAP Timeline untuk complex animations
- Particle effects
- Text glow effects
- Smooth transitions
- Responsive animations

## 🎬 Animasi yang Disertakan

### Header
- Fade-in animation pada load
- Rotating crescent moon (8s infinite)
- Text glow pulse effect

### Hero Section
- Scale-up entrance animation untuk main text
- Continuous gold glow effect
- Particle animation dengan staggered timing
- Floating particles animation

### Interactive Section
- Check-in button glow pulse
- Scale animation pada click
- Counter bounce animation
- Smooth transitions

### Footer
- Fade-in animation pada load
- Hover effects pada links

## 🛠️ Development

### Install Dependencies
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production
```bash
pnpm build
pnpm start
```

## 📖 Komponen Details

### EidHeader
- Menampilkan crescent moon icon dengan animasi rotasi
- "EID MUBARAK" text dengan glow effect
- Fully responsive di semua ukuran layar

### EidHero
- Main greeting text "SELAMAT HARI RAYA EID MUBARAK"
- Sub-heading "MOHON MAAF LAHIR & BATIN"
- Particle effects yang floating
- Gold gradient text effect
- Optimized untuk mobile viewing

### EidInteractive
- Check-in button dengan glow animation
- Visitor counter dengan real-time updates
- Warning status message untuk THR
- State management dengan useState
- GSAP animations untuk visual feedback

### EidFooter
- Professional footer layout
- Multiple link sections (Menu, Informasi, Hubungi Kami)
- Copyright information
- Responsive grid layout
- Hover effects pada links

## 🎯 SEO & Metadata

- Metadata lengkap untuk Eid Mubarak greeting
- Indonesian language configuration (lang="id")
- Viewport optimization untuk mobile
- Dark theme color configuration

## 📱 Mobile Optimization

- Touch-friendly tap targets (min 44px)
- Optimized font sizes untuk readability
- Responsive images dan SVG
- Smooth scrolling behavior
- Gesture-friendly animations

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text untuk images
- Color contrast sesuai WCAG standards
- Keyboard navigable interactive elements

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- Dark mode adalah default dan enforced globally
- Poppins font digunakan untuk typography modern
- GSAP animations are performance-optimized dengan GPU acceleration
- Visitor counter adalah demo (tidak persisten)
- Check-in functionality adalah frontend only untuk demo

## 🎊 Customization

### Mengubah Warna Utama
Edit di `/app/globals.css`:
```css
:root {
  --primary: #ffd700; /* Ubah ke warna lain */
  --accent: #ffd700;
}
```

### Mengubah Font
Edit di `/app/layout.tsx`:
```tsx
const _poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  // ... custom weights
});
```

### Mengubah Animation Speed
Edit di `/components/eid-hero.tsx` atau `/components/eid-interactive.tsx`:
```tsx
gsap.to(element, {
  duration: 1.2, // Ubah duration di sini
  // ... other properties
});
```

## 📄 License

All rights reserved © 2026 EID GREETINGS

## 👨‍💻 Author

Created with ❤️ for Eid Mubarak 2026

---

**Happy Eid Mubarak! 🌙✨**
"# UcapanLebaran" 
