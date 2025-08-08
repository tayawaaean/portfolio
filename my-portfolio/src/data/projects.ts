// src/data/projects.ts
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
      "A GIS-based renewable energy mapping platform built with React for the web and React Native for mobile, mapping over 1,000 renewable energy systems across the Philippines.",
    images: loadProjectImages("arecgis"),
    tech: ["React", "React Native", "Node.js", "MongoDB", "Express"],
    liveLink: "https://arec.mmsu.edu.ph",
  },
  {
    title: "Solar Pump Monitoring Application (SPMA)",
    date: "2025",
    description:
      "A GIS-enabled MERN stack web application for real-time monitoring of solar-powered water pumps using MQTT WebSockets. It visualizes pump locations on an interactive map, tracking voltage, current, power output, and water flow via a custom-fabricated solar pump controller. The system compares operational savings against diesel and AC-powered pumps using the Gasoline Price API, integrates the PVWatts API for solar energy forecasting, and the Weather API for weather-based performance insights. Designed for agricultural use, it supports multi-site monitoring, remote diagnostics, and cost-benefit analysis — empowering farmers to optimize water management sustainably.",
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
      "GIS Mapping",
    ],
  },
  {
    title: "AREC SRVA (Solar PV Beneficiary Survey & Research App)",
    date: "2025",
    description:
      "A dual-platform system combining a React Native mobile app and a React web dashboard for surveying beneficiaries of DOE-donated solar systems from 2010–2014. The mobile app enables offline-first survey collection, storing responses locally before uploading them when connectivity is available. It captures user experiences, recommendations, and feedback for research purposes. The web dashboard provides real-time monitoring of collected data, supports Excel uploads, and includes interactive charts for easier analysis and visualization. Built with Firebase for storage and synchronization, the system streamlines data gathering and reporting for academic research.",
    images: loadProjectImages("srva"),
    tech: [
      "React Native",
      "React",
      "Firebase",
      "Offline Storage",
      "Data Visualization",
      "Excel Import",
    ],
  },
  {
    title: "Automated Lettuce Hydroponics System",
    date: "2024",
    description:
      "A React + Python Flask + MongoDB-based IoT system for fully automated lettuce hydroponics farming. It performs real-time data logging and monitoring of water quality (pH, TDS, temperature, water level), flow rate, light intensity, and ambient temperature. The system controls AC units and irrigation pumps, provides alarms for abnormal readings, and enables manual overrides via a web-based dashboard with live monitoring. Designed to reduce manual labor and improve crop consistency, it streamlines farm operations through continuous automation and remote access.",
    images: loadProjectImages("hydroponics"),
    tech: [
      "React",
      "Python Flask",
      "MongoDB",
      "MQTT",
      "WebSockets",
      "IoT Sensors",
      "Real-Time Dashboard",
    ],
  },
  {
    title: "Garlic Greenhouse Automation",
    date: "2024",
    description:
      "A smart greenhouse system for garlic farming, featuring real-time monitoring and automated control. Built with React for the interface and Python Flask for backend APIs, it integrates MongoDB for data storage. The system controls lights, IR LEDs, and temperature via HTTP requests, receives sensor data (temperature, humidity, lux) over MQTT, automates actuators based on conditions, and includes a live video feed for remote monitoring — reducing manual labor and improving yield consistency.",
    images: loadProjectImages("garlic"),
    tech: ["React", "Python Flask", "MongoDB", "MQTT", "HTTP Control", "Video Streaming"],
  },
  {
    title: "Internal Portal & Company Website – Tayawa Tolentino CPAs and Company",
    date: "2023",
    description:
      "Developed a full-featured internal portal using PHP, JavaScript, and MySQL with six modules for document tracking, reporting, and task management. Improved operational efficiency by 40% through automation of manual processes. Managed deployment on Hostinger, configuring DNS, FTP, and MySQL for secure, 100% uptime access during the internship. Designed and launched a responsive WordPress company website, increasing client inquiries and online visibility by 25% in two months. Worked closely with administrative staff to customize features aligned with accounting workflows.",
    images: loadProjectImages("ttcpa"),
    tech: ["PHP", "JavaScript", "MySQL", "WordPress", "Hostinger Deployment"],
    liveLink: "tayawacpa.net",
  },
];

