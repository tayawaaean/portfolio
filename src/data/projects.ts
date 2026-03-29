import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "djp-athlete-platform",
    title: "DJP Athlete Platform",
    category: "Fitness & Athletic Performance Platform",
    description:
      "Full rebuild of an existing Laravel/iOS fitness platform into a modern Next.js Progressive Web App. The platform serves both private coaching clients and public program buyers through a unified system with AI-powered exercise matching, Stripe checkout, and an admin dashboard.",
    challenge:
      "The existing platform was built on legacy Laravel and iOS technologies, requiring expensive App Store maintenance and limiting cross-platform reach. The client needed a unified system serving both private coaching clients and public program buyers.",
    solution:
      "Built a modern Next.js 16 Progressive Web App that eliminated App Store overhead while delivering a native-like experience. Integrated AI-powered exercise assignment, Stripe payment processing, and a comprehensive admin dashboard with GoHighLevel CRM integration.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Tailwind CSS",
      "Claude API",
      "YouTube API",
      "GoHighLevel",
    ],
    keyFeatures: [
      "Cross-platform PWA replacing native iOS app",
      "AI-powered exercise assignment based on client data",
      "Evergreen program storefront with Stripe payments",
      "Athlete performance monitoring with interactive analytics",
      "Admin panel for program management and video library",
      "GoHighLevel CRM integration for marketing automation",
    ],
    image: "/images/projects/djpathlete.png",
    liveUrl: "https://darrenjpaul.com",
    isNda: false,
  },
  {
    slug: "athlete-performance-monitoring",
    title: "Athlete Performance & Injury Monitoring",
    category: "Sports Analytics Dashboard",
    description:
      "A companion analytics platform for tracking athlete performance metrics, injury history, and training load across multiple sports. Features Power BI-style interactive dashboards with drill-down filtering and real-time data exploration.",
    challenge:
      "Athletes and coaches needed a way to track performance metrics, injury history, and training load across multiple sports with interactive, drill-down analytics comparable to Power BI.",
    solution:
      "Developed a dual-database architecture using Airtable for data entry and Supabase for analytics queries. Built dynamic, configurable dashboards supporting new sports and metrics without code changes.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "NextAuth.js",
      "Airtable",
      "Supabase PostgreSQL",
      "Recharts",
      "Zustand",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "Dynamic system supporting new sports without code changes",
      "Interactive dashboards with click events and cross-filtering",
      "Dual-database architecture for data entry and analytics",
      "Session-based testing with historical trend analysis",
    ],
    image: "/images/projects/athletemonitoring.png",
    isNda: false,
  },
  {
    slug: "job-referral-platform",
    title: "Job Referral & Career Platform",
    category: "HR Tech / Job Marketplace",
    description:
      "A job referral platform connecting job seekers with employees at top companies for insider referrals. Features AI-powered resume tools, a referral marketplace, mock interview practice, and an automated job application system.",
    challenge:
      "Job seekers lacked a reliable way to connect with company insiders for referrals. Existing platforms didn't offer AI-powered resume optimization or automated multi-job applications.",
    solution:
      "Built a referral marketplace connecting job seekers with insiders at 1,000+ companies, with AI-powered resume review, ATS-optimized builder, mock interview practice with AI feedback, and automated multi-job applications.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Stripe",
      "AI/LLM Integration",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "Referral marketplace with 1,000+ companies",
      "AI-powered resume review and ATS-optimized builder",
      "One-click referral request with automated matching",
      "Mock interview practice with AI feedback",
      "AI Apply for automated multi-job applications",
      "Tiered subscription billing",
    ],
    image: "/images/projects/job-referral.png",
    isNda: true,
  },
  {
    slug: "typing-assessment-platform",
    title: "Enterprise Typing Assessment Platform",
    category: "HR Tech / Recruitment SaaS",
    description:
      "An enterprise-grade typing assessment platform for recruiters and HR teams. Features real-time WPM and accuracy tracking, custom industry-specific test templates, bulk candidate testing, and detailed keystroke-level analytics.",
    challenge:
      "Enterprise HR teams needed a reliable, anti-cheat typing assessment tool with industry-specific templates and detailed analytics for bulk candidate evaluation.",
    solution:
      "Built a real-time character-by-character typing assessment with visual keyboard heatmaps, custom test builder, bulk testing with email invitations, and keystroke-level analytics with SOC 2 / GDPR compliance.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "Real-time character-by-character accuracy tracking",
      "Visual keyboard heatmap for error patterns",
      "Custom test builder with industry-specific templates",
      "Bulk testing with email invitations and CSV export",
      "Anti-cheating measures and compliance (SOC 2, GDPR)",
      "Tiered SaaS pricing with enterprise plans",
    ],
    image: "/images/projects/typing-assessment.png",
    isNda: true,
  },
  {
    slug: "ai-transcription-platform",
    title: "AI Transcription & Editing Platform",
    category: "SaaS / Productivity",
    description:
      "A transcription platform with speaker recognition, multi-language support, and an integrated editing experience. Differentiated by keeping the entire workflow in-platform.",
    challenge:
      "Existing transcription tools required users to export and edit elsewhere, fragmenting the workflow. Multi-language support and speaker recognition were premium features with poor accuracy.",
    solution:
      "Built an integrated in-platform editor as a competitive advantage over export-only competitors, with AI-powered transcription, speaker diarization, multi-language support, and flexible export options.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Stripe",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "AI-powered transcription with speaker diarization",
      "Integrated in-platform editor (competitive advantage)",
      "Multi-language support",
      "Export: PDF, DOCX, SRT, plain text",
      "Subscription billing via Stripe",
    ],
    image: "/images/projects/ai-transcription.png",
    isNda: true,
  },
  {
    slug: "ai-email-marketing",
    title: "AI Email Marketing Automation",
    category: "Marketing Automation / SaaS",
    description:
      "An autonomous email marketing system that manages campaigns across multiple portfolio companies. Generates content with AI, schedules sends, and optimizes based on performance feedback loops.",
    challenge:
      "Managing email marketing across multiple portfolio companies with distinct audiences required a system that could autonomously generate brand-specific content and optimize based on performance data.",
    solution:
      "Built an AI-powered autonomous email system with company-specific tone targeting, human review dashboard, campaign performance tracking, and automated feedback loops for continuous optimization.",
    techStack: [
      "Next.js",
      "Supabase",
      "Claude API",
      "MailerLite API",
      "Vercel Cron",
    ],
    keyFeatures: [
      "Serves multiple companies with distinct brand voices",
      "AI-generated content with audience targeting",
      "Human review dashboard with approve/reject/edit",
      "Performance tracking with automated feedback loop",
      "Holiday and seasonal awareness",
    ],
    image: "/images/projects/ai-email.png",
    isNda: true,
  },
  {
    slug: "entertainment-booking-marketplace",
    title: "Entertainment Booking Marketplace",
    category: "Entertainment & Events Industry",
    description:
      "A two-sided marketplace connecting performers with event organizers. Features booking flow with negotiation, automated contracts, Stripe Connect payment splitting, and travel management.",
    challenge:
      "The entertainment industry lacked a unified platform for the complete booking lifecycle — from discovery and negotiation through contract generation, payment splitting, and travel coordination.",
    solution:
      "Built a two-sided marketplace with full booking lifecycle management, Stripe Connect for automated payment splitting, smart redistribution for declined requests, and integrated travel booking with approval workflows.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Stripe Connect",
      "Tailwind CSS",
    ],
    keyFeatures: [
      "Full booking lifecycle: discovery through post-event",
      "Stripe Connect with automated payment splitting",
      "Smart redistribution for declined requests",
      "Travel booking with itinerary and approval workflows",
      "Auto-generated contracts and rider management",
      "Multi-role system: performers, organizers, managers, admins",
    ],
    image: "/images/projects/entertainment-booking.png",
    isNda: true,
  },
  {
    slug: "arec-gis-platform",
    title: "AREC GIS Platform",
    category: "Renewable Energy / Government",
    description:
      "A nationally recognized platform adopted by the Philippine Department of Energy (DOE) for tracking and managing renewable energy systems across the country. Currently serving 1,000+ installations nationwide.",
    challenge:
      "The Philippines lacked a centralized system for tracking renewable energy installations across the country. Field data collection was fragmented and manual.",
    solution:
      "Developed a full-stack geospatial platform with interactive Leaflet maps, AI-powered solar calculator, multi-category energy system tracking, and a React Native mobile app for field data collection with offline sync.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Leaflet",
      "PVWatts API",
      "React Native",
    ],
    keyFeatures: [
      "Adopted by Philippine DOE as official tracking platform",
      "Multi-category: Solar, Wind, Hydro, Geothermal, Biomass",
      "AI-powered solar calculator with ROI analysis",
      "Interactive maps with heatmaps and geocoding",
      "Mobile app with offline sync for field collection",
      "1,000+ installations tracked in production",
    ],
    image: "/images/projects/arecgis.png",
    liveUrl: "https://arecgis.mmsu.edu.ph",
    isNda: false,
  },
  {
    slug: "solar-calculator",
    title: "Solar Calculator & Installer Platform",
    category: "Renewable Energy / Solar Industry",
    description:
      "A solar calculator and installer platform for the Canadian market with PV system sizing, cost estimation with Canadian incentives, and 25-year savings projections.",
    challenge:
      "Canadian solar customers needed a localized tool for accurate PV system sizing with provincial incentives, net metering simulation, and realistic 25-year savings projections.",
    solution:
      "Built a comprehensive solar calculator with Canadian grid rates, provincial incentives, installation cost estimation, 25-year degradation modeling, and an appliance-level consumption calculator for accurate system sizing.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PVWatts API",
      "MapBox",
    ],
    keyFeatures: [
      "Canadian grid rates and net metering simulation",
      "Installation cost estimation ($2.50-$3.50/W CAD)",
      "25-year savings with panel degradation modeling",
      "Appliance-level daily consumption calculator",
      "SEO and schema markup optimization",
    ],
    image: "/images/projects/solar-calculator.png",
    isNda: true,
  },
  {
    slug: "market-picking-assistant",
    title: "Market Picking Assistant",
    category: "SaaS / Data Analytics",
    description:
      "A data-driven market analysis tool that helps home service companies identify high-potential service areas using Census data, Google Places competition analysis, and Google Trends demand signals.",
    challenge:
      "Home service businesses had no systematic way to identify high-potential service areas, relying on intuition rather than data-driven analysis of demographics and competition.",
    solution:
      "Built a multi-source data aggregation platform combining Census demographics, Google Places competition analysis, and Google Trends demand signals with heatmap visualizations for market opportunity scoring.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Census API",
      "Google Places API",
      "Google Trends",
    ],
    keyFeatures: [
      "Multi-source data aggregation for market analysis",
      "Heatmap visualizations for opportunity scoring",
      "Customizable filtering by service type and density",
    ],
    image: "/images/projects/market-picking.png",
    isNda: true,
  },
  {
    slug: "salon-management",
    title: "Salon & Stylist Management Platform",
    category: "Beauty & Salon Industry",
    description:
      "A comprehensive CRM for salon chains, independent stylists, and educators. Tracks appointments, retail sales, commission structures, and marketing campaign ROI.",
    challenge:
      "Salon chains needed a unified CRM supporting multiple roles (owners, commission stylists, booth renters, educators) with per-stylist analytics and marketing ROI tracking.",
    solution:
      "Built a multi-role CRM with appointment and retail sales tracking, per-stylist analytics, marketing ROI calculator, and a custom landing page builder for campaign-specific promotions.",
    techStack: ["Next.js", "React", "Supabase", "Stripe", "Tailwind CSS"],
    keyFeatures: [
      "Multi-role access: owners, stylists, renters, educators",
      "Appointment and retail sales tracking",
      "ROI calculator for marketing campaigns",
      "Custom landing page builder for promotions",
    ],
    image: "/images/projects/salon-management.png",
    isNda: true,
  },
  {
    slug: "mayhem-creations",
    title: "Mayhem Creations",
    category: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with a custom-built backend API. Includes product catalog management, multi-gateway payment processing, real-time inventory tracking, and Elasticsearch-powered search.",
    challenge:
      "The client needed a custom e-commerce platform with dual payment gateways, real-time inventory updates, and enterprise-grade search — not achievable with off-the-shelf solutions.",
    solution:
      "Built a custom RESTful API with Express and TypeScript, integrating Stripe and PayPal, Socket.io for real-time features, Elasticsearch for product search, and a robust image processing pipeline.",
    techStack: [
      "TypeScript",
      "Express",
      "Sequelize",
      "MySQL",
      "Stripe",
      "PayPal",
      "AWS S3",
      "Cloudinary",
      "Elasticsearch",
      "Socket.io",
    ],
    keyFeatures: [
      "Custom RESTful API backend",
      "Dual payment gateway: Stripe and PayPal",
      "Real-time features via Socket.io",
      "Elasticsearch-powered product search",
      "Image processing with Sharp, S3, Cloudinary",
      "Security: rate limiting, XSS sanitization, Sentry",
    ],
    image: "/images/projects/mayhemcreation.png",
    liveUrl: "https://mayhemcreations.com",
    isNda: false,
  },
  {
    slug: "efficyon",
    title: "Efficyon",
    category: "AI-Powered SaaS Cost Optimization",
    description:
      "A SaaS platform that helps businesses identify unused software licenses, overlapping tools, and workflow inefficiencies across their tech stack with AI-driven analysis and actionable recommendations.",
    challenge:
      "Businesses were overspending on overlapping SaaS subscriptions and unused licenses with no visibility into their actual tool utilization across the organization.",
    solution:
      "Built an AI-powered analysis engine with an interactive ROI calculator, integration support for 50+ business tools, and a dashboard with prioritized cost-saving recommendations and implementation tracking.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "AI/LLM Integration",
    ],
    keyFeatures: [
      "Interactive ROI calculator with real-time projections",
      "AI-powered analysis for unused licenses and overlap",
      "50+ business tool integrations",
      "Dashboard with prioritized recommendations",
      "Tiered SaaS pricing (Startup, Growth, Enterprise)",
      "90-day ROI guarantee positioning",
    ],
    image: "/images/projects/efficyon.png",
    liveUrl: "https://efficyon.com",
    isNda: false,
  },
  {
    slug: "video-review",
    title: "Video Review Application",
    category: "Internal Review Tool",
    description:
      "A collaborative video review platform for managing and approving video content with timestamped feedback, approval workflows, and team collaboration features.",
    challenge:
      "Teams needed a streamlined way to review, annotate, and approve video content with timestamped feedback rather than scattered email threads and document comments.",
    solution:
      "Built a collaborative platform with timestamped commenting, multi-stage approval workflows with role-based permissions, and optimized video processing and playback.",
    techStack: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    keyFeatures: [
      "Timestamped commenting and annotation",
      "Multi-stage approval workflow",
      "Role-based permissions",
      "Video processing and playback optimization",
    ],
    image: "/images/projects/video.png",
    isNda: false,
  },
];
