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
      "A national renewable energy GIS platform serving as the official inventory of Non-Commercial and Commercial Renewable Energy Systems — Solar, Wind, Hydropower, and Biomass — with over 400 MW of total capacity recorded. Built with Leaflet.js, OpenStreetMap, and geosphere for geodesic distance calculations and duplicate detection. Recognized by the Department of Energy (DOE) and used by State Universities and Colleges (SUCs) across the Philippines for energy system inventory management. Features React web and React Native mobile apps, Node.js + MongoDB backend, and compatibility with ArcGIS and QGIS workflows. Planned future update: solar installer user accounts for installation tracking and after-sales service performance.",
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
