import { FaReact, FaNodeJs, FaDocker, FaPython, FaAws } from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiMysql,
  SiNginx,
  SiFirebase,
  SiCplusplus,
  SiJavascript,
  SiArduino,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiJest,
  SiGit,
  SiTrello,
  SiNotion,
  SiZoom,
  SiPostman,
  SiLinux,
  SiSupabase,
  SiPostgresql,
  SiSlack,
  SiTwilio,
  SiNextdotjs,
  SiLeaflet,
  SiOpenstreetmap,
  SiMapbox,
  SiGooglecloud,
  SiStripe,
  SiVercel,
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
}

export const skills = {
  frontend: [
    { name: "React.js", icon: FaReact, color: "#61dafb" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "React Native", icon: FaReact, color: "#61dafb" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
    { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38b2ac" },
    { name: "Redux Toolkit", icon: SiRedux, color: "#764abc" },
  ],
  backend: [
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#444444" },
    { name: "Python", icon: FaPython, color: "#3572A5" },
  ],
  databases: [
    { name: "MongoDB", icon: SiMongodb, color: "#4db33d" },
    { name: "MySQL", icon: SiMysql, color: "#00618a" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Supabase", icon: SiSupabase, color: "#3ecf8e" },
    { name: "Firebase Realtime DB", icon: SiFirebase, color: "#ffca28" },
  ],
  iot: [
    { name: "Arduino", icon: SiArduino, color: "#00979d" },
    { name: "C++", icon: SiCplusplus, color: "#00599c" },
    { name: "MQTT", icon: FaNodeJs, color: "#660066" }, // No dedicated icon, reused Node.js icon
  ],
  gis: [
    { name: "Leaflet.js", icon: SiLeaflet, color: "#199900" },
    { name: "OpenStreetMap", icon: SiOpenstreetmap, color: "#7EBC6F" },
    { name: "Mapbox", icon: SiMapbox, color: "#000000" },
  ],
  devops: [
    { name: "Docker", icon: FaDocker, color: "#2496ed" },
    { name: "NGINX", icon: SiNginx, color: "#009639" },
    { name: "Ubuntu Server", icon: SiLinux, color: "#dd4814" },
    { name: "AWS", icon: FaAws, color: "#FF9900" },
    { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
    { name: "Vercel", icon: SiVercel, color: "#000000" },
    { name: "Git CLI", icon: SiGit, color: "#f34f29" },
    { name: "Postman", icon: SiPostman, color: "#ff6c37" },
    { name: "GitHub", icon: SiGit, color: "#181717" },
  ],
  testing: [
    { name: "Jest", icon: SiJest, color: "#99425b" },
  ],
  productivity: [
    { name: "Trello", icon: SiTrello, color: "#0079bf" },
    { name: "Notion", icon: SiNotion, color: "#000000" },
    { name: "Zoom", icon: SiZoom, color: "#2d8cff" },
    { name: "Slack", icon: SiSlack, color: "#4a154b" },
  ],
  automation: [
    { name: "n8n", icon: SiGit, color: "#ff6b6b" }, // No dedicated icon, reused Git icon with custom color
    { name: "Twilio", icon: SiTwilio, color: "#f22f46" },
    { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  ],
};
