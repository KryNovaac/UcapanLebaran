# 🚀 Setup Guide - Eid Mubarak Greeting Website

Panduan lengkap untuk setup dan menjalankan website Eid Mubarak di lingkungan lokal atau production.

## ✅ Prerequisites

Pastikan Anda sudah memiliki:
- **Node.js**: v18.0 atau lebih baru
- **pnpm**: v8.0 atau lebih baru (atau npm/yarn alternatif)
- **Git**: untuk version control
- **Code Editor**: VS Code / WebStorm / atau editor favorit Anda

## 📦 Installation

### 1. Clone atau Extract Project
```bash
# Jika menggunakan Git
git clone <repository-url>
cd v0-project

# Atau extract ZIP file
cd v0-project
```

### 2. Install Dependencies
```bash
# Menggunakan pnpm (recommended)
pnpm install

# Atau menggunakan npm
npm install

# Atau menggunakan yarn
yarn install
```

Dependencies yang akan diinstall:
- `gsap@^3.12.2` - Animation library
- `sass@^1.70.0` - SCSS preprocessor
- `next@16.2.0` - React framework
- `tailwindcss@^4.2.0` - Styling utility
- Dan dependencies lainnya (lihat package.json)

### 3. Verify Installation
```bash
# Check pnpm version
pnpm --version

# Check Node version
node --version

# Check project structure
ls -la
```

## 🏃 Running Development Server

### Start Dev Server
```bash
pnpm dev
```

Output akan menampilkan:
```
> next dev
  ▲ Next.js 16.2.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.3s
```

### Akses Website
- Buka browser: **http://localhost:3000**
- Hot reload otomatis saat ada perubahan file

### Development Tips
```bash
# Dev dengan verbose logging
pnpm dev -- --debug

# Dev dengan custom port
pnpm dev -- -p 3001

# Dev dengan turbopack (faster)
pnpm dev -- --turbo
```

## 🏗️ Building untuk Production

### Build Optimasi
```bash
pnpm build
```

Build process akan:
1. Compile TypeScript
2. Optimize React components
3. Minimize CSS dan JavaScript
4. Generate static files

### Run Production Build
```bash
pnpm start
```

Website akan tersedia di: **http://localhost:3000**

## 🔍 Project Structure Verification

Pastikan struktur folder sudah correct:

```
v0-project/
├── app/
│   ├── layout.tsx ✅
│   ├── globals.css ✅
│   └── page.tsx ✅
├── components/
│   ├── eid-header.tsx ✅
│   ├── eid-hero.tsx ✅
│   ├── eid-interactive.tsx ✅
│   └── eid-footer.tsx ✅
├── styles/
│   └── eid-styles.scss ✅
├── public/
│   ├── moon-eid-modern.svg ✅
│   └── other assets...
├── package.json ✅
├── tsconfig.json ✅
├── next.config.mjs ✅
└── tailwind.config.ts ✅
```

## 🎨 Customization Quick Start

### Mengubah Warna Utama (Gold → Warna Lain)

**File: `/app/globals.css`**
```css
:root {
  --primary: #ffd700;  /* Ubah ke warna favorit */
  --accent: #ffd700;
}

.dark {
  --primary: #ffd700;  /* Ubah di sini juga */
  --accent: #ffd700;
}
```

### Mengubah Font

**File: `/app/layout.tsx`**
```tsx
import { Poppins } from 'next/font/google'

// Ubah ke font lain dari Google Fonts
const _poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
```

### Mengubah Greeting Text

**File: `/components/eid-hero.tsx`**
```tsx
<h2 className="text-7xl font-black">
  YOUR CUSTOM TEXT HERE  {/* Edit di sini */}
</h2>
```

### Mengubah Animation Speed

**File: `/components/eid-hero.tsx`**
```tsx
gsap.to(element, {
  duration: 1.2,  // Ubah nilai ini (semakin besar = lebih lambat)
  // ...
});
```

## 🔧 Environment Setup

### Development Environment
- Next.js akan auto-detect mode (development)
- Hot Module Replacement (HMR) enabled
- Source maps untuk debugging

### Production Environment
```bash
# Build untuk production
NODE_ENV=production pnpm build

# Run production server
NODE_ENV=production pnpm start
```

## 📱 Testing Responsive Design

### Browser DevTools
1. Buka Chrome DevTools (F12)
2. Click responsive design mode (Ctrl+Shift+M)
3. Test di berbagai ukuran:
   - iPhone 12: 390px × 844px
   - iPad: 768px × 1024px
   - Desktop: 1920px × 1080px

### Mobile Testing Tools
```bash
# Jalankan di IP lokal untuk testing di device lain
pnpm dev

# Akses dari device lain di network yang sama
http://<YOUR-IP-ADDRESS>:3000
```

## 🐛 Troubleshooting

### Issue: Port 3000 sudah digunakan
```bash
# Jalankan di port lain
pnpm dev -- -p 3001

# Atau kill process yang menjalankan port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

### Issue: Module GSAP tidak ditemukan
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Styles tidak muncul
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
pnpm dev
```

### Issue: Hot reload tidak berfungsi
```bash
# Restart dev server
# Ctrl+C untuk stop
# pnpm dev untuk restart
```

## 📊 Performance Monitoring

### Build Performance
```bash
pnpm build --profile
```

Hasilnya akan menunjukkan waktu build untuk setiap component.

### Runtime Performance
Gunakan Chrome DevTools:
1. Open DevTools → Performance tab
2. Click record
3. Interact dengan website
4. Click stop untuk analisis

## 🚀 Deployment

### Deploy ke Vercel (Recommended)
```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel

# Deploy ke production
vercel --prod
```

### Deploy ke Platform Lain

**Netlify:**
```bash
pnpm build
# Upload folder ke Netlify
```

**Self-hosted (VPS/Server):**
```bash
# Build
pnpm build

# Copy ke server
scp -r .next package.json public/ user@server:/app/

# Di server
cd /app
pnpm install --prod
pnpm start
```

## 📝 Version Control (Git)

### Initialize Git (jika belum)
```bash
git init
git add .
git commit -m "Initial commit: Eid Mubarak website"
```

### Common Git Workflows
```bash
# Check status
git status

# Create new branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Description of changes"

# Push ke remote
git push origin feature/new-feature
```

## 📚 Useful Commands

| Command | Deskripsi |
|---------|-----------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build untuk production |
| `pnpm start` | Run production server |
| `pnpm lint` | Check code quality |
| `pnpm type-check` | Check TypeScript errors |

## 🎯 Next Steps

1. ✅ **Setup Selesai**: Website running di localhost:3000
2. 🎨 **Customize**: Ubah warna, font, text sesuai kebutuhan
3. 🧪 **Test**: Test di berbagai device dan browser
4. 🚀 **Deploy**: Deploy ke Vercel atau platform lain
5. 📊 **Monitor**: Monitor performance dan user behavior

## 💬 Getting Help

### Dokumentasi
- [Next.js Docs](https://nextjs.org/docs)
- [GSAP Docs](https://gsap.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

### Resources
- `README.md` - Project overview
- `IMPLEMENTATION.md` - Technical details
- `SETUP.md` - This file
- `components/*.tsx` - Component documentation

## ✨ Happy Coding!

Website Eid Mubarak Anda siap untuk dikembangkan lebih lanjut. Jika ada pertanyaan atau isu, jangan ragu untuk membaca dokumentasi atau mencari bantuan di komunitas.

**Selamat mengembangkan! 🌙✨**
