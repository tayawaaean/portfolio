import { loadProjectImages } from "../utils/loadProjectImages";

export interface Project {
  title: string;
  date: string;
  description: string;
  images: string[];
  tech: string[];
  liveLink?: string;
}

export const projects: Project[] = [
  {
    title: "ARECGIS Platform",
    date: "2025",
    description:
      "A GIS-based renewable energy inventory system used by State Universities and Colleges (SUCs) across the Philippines and recognized by the Department of Energy (DOE) for non‑commercial renewable energy data. The platform has recorded 7.82 GW of capacity nationwide. Built with the MERN stack (MongoDB, Express, React, Node.js) and Leaflet.js with the OpenStreetMap API to map assets, identify powerlines, and render heatmaps for capacity density and coverage. Designed for scale and research workflows, with React web and React Native mobile clients, a Node.js + MongoDB backend, and interoperability with ArcGIS/QGIS.",
    images: loadProjectImages("arecgis"),
    tech: [
      "Leaflet.js",
      "OpenStreetMap",
      "geosphere",
      "React",
      "React Native",
      "Node.js",
      "MongoDB",
      "Express",
      "GIS Mapping"
    ],
    liveLink: "https://arec.mmsu.edu.ph",
  },
  {
    title: "Professional Virtual Assistant Portfolio Template",
    date: "2024",
    description:
      "A modern, responsive portfolio website template built with React, TypeScript, and Material-UI, specifically designed for professional virtual assistants and business service providers. Features a clean, professional aesthetic with Material-UI components, fully responsive design optimized for all devices, high performance with Vite, smooth animations powered by Framer Motion, EmailJS-powered contact form with professional email templates, full TypeScript support, SEO optimization, accessibility features with ARIA labels, and a professional pastel pink and purple theme perfect for service providers.",
    images: loadProjectImages("portfolio_va"),
    tech: [
      "React 19",
      "TypeScript",
      "Material-UI",
      "Framer Motion",
      "Vite",
      "EmailJS",
      "React Router DOM",
      "Emotion",
      "ESLint",
      "Professional Template"
    ],
    liveLink: "https://kimberlymaereodique.vercel.app",
  },
  {
    title: "Supplement Store - Inventory Management System",
    date: "2024",
    description:
      "A production-ready inventory management system for supplement stores with real-time features, secure authentication, and a modern admin dashboard. Built with Next.js 15, TypeScript, and Supabase. Features comprehensive inventory management with real-time stock tracking, e-commerce functionality with shopping cart and checkout, user management with admin approval system, real-time chat support, analytics dashboard with sales metrics and insights, and secure JWT-based authentication with role-based access control. Includes responsive design, advanced search & filtering, Stripe payment integration, Row Level Security, and is optimized for performance with a Lighthouse score of 95+ across all metrics.",
    images: loadProjectImages("supplement-ecommerce-store"),
    tech: [
      "Next.js 15",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Stripe",
      "JWT Authentication",
      "React Hook Form",
      "Zod",
      "Heroicons",
      "Row Level Security",
      "Real-time Updates",
      "E-commerce"
    ],
    liveLink: "https://supplement-store-demo.vercel.app",
  },
  {
    title: "SolarFarm Dashboard - Solar Energy Monitoring System",
    date: "2024",
    description:
      "A modern, production-ready Next.js 14 dashboard template for solar energy monitoring systems. Built with TypeScript, TailwindCSS, and Framer Motion for a beautiful, responsive user experience. Features real-time energy monitoring, interactive charts using Recharts, device management, weather integration, battery status tracking, comprehensive analytics & reports, and a notifications system. Includes dark/light theme support, solar-inspired color palette, and is fully optimized for desktop, tablet, and mobile devices. Designed to be easily customizable and production-ready with a Lighthouse score of 95+ across all metrics.",
    images: loadProjectImages("solar-dashboard"),
    tech: [
      "Next.js 14",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Recharts",
      "Lucide React",
      "Radix UI",
      "App Router",
      "Solar Energy"
    ],
    liveLink: "https://solar-energy-dashboard-rust.vercel.app/dashboard",
  },
  {
    title: "Solar Pump Monitoring Application (SPMA)",
    date: "2025",
    description:
      "A GIS-enabled MERN stack web app for real-time monitoring of solar-powered water pumps using MQTT WebSockets. Maps pump locations on an interactive Leaflet map, tracking voltage, current, power output, and water flow. Integrates PVWatts API for solar energy forecasts, Gasoline Price API for cost savings comparisons, and Weather API for weather-based performance insights. Designed for agriculture, supports multi-site monitoring, remote diagnostics, and cost-benefit analysis.",
    images: loadProjectImages("solarpump"),
    tech: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "MQTT WebSockets",
      "PVWatts API",
      "Gasoline Price API",
      "Weather API",
      "GIS Mapping"
    ],
  },
  {
    title: "AREC SRVA (Solar PV Beneficiary Survey & Research App)",
    date: "2025",
    description:
      "A dual-platform system combining a React Native mobile app and a React web dashboard for surveying beneficiaries of DOE-donated solar systems from 2010–2014. Mobile app enables offline-first survey collection; web dashboard offers real-time monitoring, Excel uploads, and interactive charting. Built with Firebase for storage/sync, streamlining academic research data gathering and visualization.",
    images: loadProjectImages("srva"),
    tech: [
      "React Native",
      "React",
      "Firebase",
      "Offline Storage",
      "Data Visualization",
      "Excel Import"
    ],
  },
  {
    title: "Automated Lettuce Hydroponics System",
    date: "2024",
    description:
      "A React + Python Flask + MongoDB IoT system for automated lettuce hydroponics farming. Monitors pH, TDS, temperature, water level, flow rate, light intensity, and ambient conditions in real-time. Controls irrigation pumps and AC units, with alarm notifications and manual overrides via web dashboard.",
    images: loadProjectImages("hydroponics"),
    tech: [
      "React",
      "Python Flask",
      "MongoDB",
      "MQTT",
      "WebSockets",
      "IoT Sensors",
      "Real-Time Dashboard"
    ],
  },
  {
    title: "Garlic Greenhouse Automation",
    date: "2024",
    description:
      "A smart greenhouse for garlic farming integrating React UI, Python Flask backend, and MongoDB. Controls lights, IR LEDs, and temperature via HTTP requests; collects sensor data (temperature, humidity, lux) over MQTT; automates actuators based on environmental conditions. Includes live video monitoring for remote management.",
    images: loadProjectImages("garlic"),
    tech: [
      "React",
      "Python Flask",
      "MongoDB",
      "MQTT",
      "HTTP Control",
      "Video Streaming"
    ],
  },
  {
    title: "Internal Portal & Company Website – Tayawa Tolentino CPAs and Company",
    date: "2023",
    description:
      "Developed an internal portal with PHP, JavaScript, and MySQL for document tracking, reporting, and task management. Improved efficiency by 40% through process automation. Also designed and deployed a responsive WordPress company website, boosting client inquiries by 25% in two months.",
    images: loadProjectImages("ttcpa"),
    tech: ["PHP", "JavaScript", "MySQL", "WordPress", "Hostinger Deployment"],
    liveLink: "tayawacpa.net",
  },
];
