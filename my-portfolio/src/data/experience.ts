export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    title: "Science Research Analyst",
    company: "Mariano Marcos State University - AREC",
    date: "Oct 2024 – Present",
    description: [
      "Lead developer of the ARECGIS Platform — a national GIS-based inventory of Non-Commercial and Commercial Renewable Energy Systems (Solar, Wind, Hydropower, Biomass) with over 400 MW recorded capacity.",
      "Integrated Leaflet.js, OpenStreetMap, and geosphere for advanced geospatial visualization, distance calculations, and duplicate validation.",
      "Recognized by the Department of Energy (DOE) and adopted by multiple State Universities and Colleges (SUCs) across the Philippines for renewable energy system inventory and monitoring.",
      "Designed and deployed RESTful APIs and real-time data pipelines using Node.js, Express.js, and MongoDB for large-scale renewable energy datasets.",
      "Engineered IoT + MERN solutions for agricultural automation and renewable energy monitoring, including solar pump monitoring, hydroponics, and greenhouse control.",
      "Optimized deployment using Docker and NGINX on Ubuntu servers, ensuring 99.9% uptime for 24/7 nationwide access.",
      "Planned future ARECGIS updates to include solar installer user accounts for installation tracking and after-sales service monitoring."
    ],
  },
  {
    title: "Full Stack Development Intern",
    company: "Tayawa Tolentino CPAs and Company",
    date: "Jun 2023 – Aug 2023",
    description: [
      "Developed a multi-module internal portal with PHP, JavaScript, and MySQL for document tracking, reporting, and task management — improving operational efficiency by 40%.",
      "Designed and deployed a responsive company website via WordPress, increasing client inquiries by 25% in two months.",
      "Managed deployment and DNS configuration for secure, uninterrupted client access."
    ],
  },
];
