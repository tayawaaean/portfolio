# MY PORTFOLIO WEBSITE

A personal portfolio website built with React, Vite, TypeScript, and Material UI to showcase my projects, skills, and contact information.

## TABLE OF CONTENTS

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

## ABOUT

This portfolio showcases my skills, projects, and background as a developer. It is designed with responsiveness and accessibility in mind, featuring smooth animations, interactive project galleries, and social media integration.

## FEATURES

- Responsive layout for all screen sizes
- Animated components with Framer Motion
- Projects section with detailed descriptions, tech stack, and images
- Contact form integrated with EmailJS (optional)
- Social media links and footer with credits
- Easy to customize and extend

## TECHNOLOGIES USED

- React 19
- Vite
- TypeScript
- Material UI (MUI)
- Framer Motion
- EmailJS (for contact form)
- React Icons
- Swiper (for project sliders if used)

## GETTING STARTED

### Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables (optional for EmailJS contact form):

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Running Locally

Run the development server and open http://localhost:5173 in your browser:

```bash
npm run dev
```

## BUILDING FOR PRODUCTION

Run the following command to create an optimized production build in the `dist` folder:

```bash
npm run build
```

## DEPLOYMENT

Deploy the `dist` folder to any static hosting service such as GitHub Pages, Netlify, Vercel, or Firebase Hosting.

For GitHub Pages, use the gh-pages package:

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Add these scripts to package.json
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Then run:
npm run deploy
```

## LICENSE

This project is licensed under the MIT License.

## CONTACT

Reach me at:
- GitHub: https://github.com/tayawaaean
- LinkedIn: https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/
- Email: tayawaaean@gmail.com

Thank you for checking out my portfolio!
