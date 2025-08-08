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
      "Engineered and deployed 5 IoT + MERN systems for agricultural automation and renewable energy monitoring across the Philippines.",
      "Built and maintained RESTful APIs and data pipelines using Node.js, Express.js, and MongoDB, processing real-time sensor data via MQTT.",
      "Leveraged ChatGPT and Claude AI for code reviews, debugging logic, writing documentation, and refining system prompts—accelerating development and improving software reliability.",
      "Dockerized full-stack applications and deployed on Ubuntu servers with NGINX, ensuring 99.9% uptime and 24/7 remote monitoring.",
      "Programmed embedded systems in C++ and designed custom PCBs to support automated irrigation, climate control, and multi-sensor integration.",
    ],
  },
  {
    title: "Full Stack Development Intern",
    company: "Tayawa Tolentino CPAs and Company",
    date: "Jun 2023 – Aug 2023",
    description: [
      "Developed a full-featured internal portal.",
      "Automated tracking processes and designed the company’s website.",
      "Managed deployment and server configurations for 100% uptime."
    ],
  },
];
