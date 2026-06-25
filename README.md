# Akarakiri Nifemi — Professional Portfolio

A premium, state-of-the-art interactive digital portfolio for **Akarakiri Nifemi**, showcasing professional Virtual Assistant & Social Media Management services.

Built using React, TypeScript, Vite, and Framer Motion, the site is designed to engage clients with smooth 3D physics, glassmorphic styling, and ultra-fluid animations, while maintaining 100% responsiveness on all mobile viewports.

---

## ✨ Features

- **🌌 3D Volumetric Globe**: Replaced basic flat point particle fields with a mathematically generated 3D volumetric rotating point sphere rendering at 60fps on a HTML5 Canvas.
- **✨ 3D Parallax Tilt Cards**: Integrated cursor-tracking 3D coordinate rotations ($rotateX$ / $rotateY$) with custom glossy shine reflections and deep layered parallax windowing (profile image frame).
- **🧲 Elastic Magnetic CTAs**: Created a magnetic attraction interaction that pulls action triggers (navigation items, social links, submit CTA) toward the user's cursor.
- **📱 Fully Responsive Design**: Tested and styled to look perfect across all screens—from large 4K displays down to compact mobile phones (e.g., iPhone SE) with responsive typographic clamp bounds.
- **🔒 Mobile Menu Navigation**: Polished mobile navigation bar with smooth spring entrance transitions and automatic viewport scroll-locking when the side tray is open.
- **⚡ Peak Performance**: Engineered on top of modern bundlers yielding compilation packages of under 380KB total size.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev) (TypeScript support)
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Modular design tokens, CSS variables, typography mappings)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Spring physics, entrance transitions, layout bounds)
- **Bundler**: [Vite 8](https://vite.dev) (HMR development, optimized builds)
- **Icons**: [Lucide React](https://lucide.dev) (Vector rendering support)
- **Fonts**: [Space Grotesk & Inter](https://fonts.google.com) (Premium typography scales)

---

## 📂 Directory Layout

```text
├── public/                 # Static asset folder
│   └── nifemi.jpg          # Profile photo
├── src/
│   ├── components/         # Page sections
│   │   ├── common/         # Interactive wrappers
│   │   │   ├── Magnetic.tsx # Elastic button wrapper
│   │   │   └── TiltCard.tsx # 3D rotating glare container
│   │   ├── About.tsx       # Profile description section
│   │   ├── Contact.tsx     # Message inbox formulation & contact links
│   │   ├── Footer.tsx      # Copy & social anchors
│   │   ├── Hero.tsx        # Typewriting role animation & welcome page
│   │   ├── Navbar.tsx      # Hamburger & sticky scrolling header
│   │   ├── ParticleCanvas.tsx # Volumetric background rendering
│   │   ├── Services.tsx    # List of offered remote services
│   │   └── Skills.tsx      # Skills list & Tools grid
│   ├── App.css             # Supplementary styling
│   ├── App.tsx             # Root page layout
│   ├── index.css           # Global typography & card theme setups
│   └── main.tsx            # DOM initialization entry
├── package.json            # Configuration file
└── tsconfig.json           # Compiler rules
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18 or higher) installed.

### Setup and Running

1. Clone or navigate to the directory:
   ```bash
   cd "Nifemi Porfolio"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:5173](http://localhost:5173) in your browser.*

4. Build for production:
   ```bash
   npm run build
   ```
   *Compiles clean static assets inside the `dist` directory.*

---

## 📬 Contact Info

- **Name**: Akarakiri Nifemi
- **Email**: [akarakirinifemi@gmail.com](mailto:akarakirinifemi@gmail.com)
- **Phone / WhatsApp**: [08166340477](tel:+2348166340477)
- **Services**: Virtual Assistant, Social Media Management, Content Strategy, Brand Building
