export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Projects",
    href: "#project",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

export const myProjects = [
  {
    id: 1,
    title: "Cardify",
    desc: "This platform experiences us the future of banking with our gamified card system. Earn points, unlock achievements, and level up your financial life.",
    subdesc:
      "Cardify is a gamified banking platform that transforms everyday financial activities into engaging challenges. Built with HTML, CSS, Javascript. Cardify offers users a unique way to manage their finances while earning rewards and unlocking achievements.",
    href: "https://github.com/pranav-kalvium/CARDIFY/blob/main/README.md",
    // texture: "/textures/project/project1.mp4",
    banner: "/assets/Banners/Cardifyy.png",
    logo: "/assets/project-logo1.png",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 1,
        name: "HTML",
        path: "/assets/html.png",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "JavaScript",
        path: "/assets/javascript.jpg",
      },
      {
        id: 4,
      name: "EmailJS",
        path: "/assets/EmailJS.webp",
      },
    ],
    // new fields
    overview:
      "Cardify gamifies banking by turning transactions into challenges, rewarding users with points and achievements for managing finances effectively and engaging with the platform.",
    techstack: [
      "HTML%",
      "TailwindCSS",
      "Javascript",
      "EmailJS",
    ],
    links: {
      source:
        "https://github.com/pranav-kalvium/CARDIFY/",
      live: "https://cardifyy.netlify.app/",
      demo: "", // optional
    },
    projectOutline: [
      {
        title: "Problem Statement",
        content:
          "Many users find traditional banking interfaces dull and disengaging, leading to poor financial habits and lack of motivation to manage their money effectively.",
      },
      {
        title: "Solution",
        content:
          "A gamified banking platform that turns financial management into an engaging experience through challenges, rewards, and achievements.",
      },
      {
        title: "Core Features",
        content: [
          "Transaction-based challenges",
          "Reward points and achievement system",
          "Interactive dashboard with progress tracking",
          "Social sharing of achievements",
        ],
      },
      {
        title: "Challenges & Learnings",
        content: [
          "Creating engaging yet simple challenges that resonate with users",
          "Designing a reward system that motivates without overwhelming",
          "Balancing gamification with practical financial management tools",
        ],
      },
      {
        title: "Outcome",
        content:
          "A unique banking experience that encourages users to take control of their finances through fun and interactive methods, leading to improved financial habits.",
      },
    ],
    gallery: [
      "/assets/Cardify01.png",
      "/assets/Cardify04.png",
      "/assets/Cardify02.png",
      "/assets/Cardify05.png",
      "/assets/Cardify03.png",
    ],
    reflection:
      "Building Cardify taught me the power of gamification in driving user engagement. I learned to design features that are both fun and functional, striking a balance between entertainment and practical financial management. This project enhanced my skills in frontend development and user experience design.",
    stats: {
      duration: "1 weeks",
      team: "Solo Project",
      role: "Front End Developer",
      date: "Dec 2024",
    },
  },
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  {
    id: 2,
    title: "OpenDoor- All events in one place",
    desc: "OpenDoor is an innovative event discovery and planning application that leverages the power of AI to provide personalized event recommendations. Whether you're looking for concerts, workshops, or local meetups, OpenDoor helps you find events that match your interests and preferences.",
    subdesc:
      "This project utilizes React for the frontend, TailwindCSS for styling, and integrates AI to deliver tailored event suggestions. OpenDoor aims to enhance user engagement by making event discovery effortless and enjoyable.",
    href: "https://github.com/pranav-kalvium/OpenDoor",
    // texture: "/textures/project/project2.mp4",
    banner: "/assets/357145.jpg",
    logo: "/assets/project-logo4.png",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "vite",
        path: "/assets/vite.svg",
      },
      {
        id: 4,
        name: "MongoDB",
        path: "/assets/mongoDb.png",
      },
    ],
    // new fields
    overview:
      "OpenDoor revolutionizes event discovery by using AI to curate personalized recommendations based on user interests, location, and social trends, making it easy to find and plan attendance at local events.",
    techstack: [
      "React (Vite)",
      "TailwindCSS",
      "Gemini API (Embeddings + LLM)",
      "Node.js",
      "Express",
      "MongoDB",
      "Leaflet.js",
    ],
    links: {
      source:
        "https://github.com/pranav-kalvium/OpenDoor",
      live: "",
      demo: "",
    },
    projectOutline: [
      {
        title: "Problem Statement",
        content:
          "Finding relevant local events can be time-consuming and overwhelming due to the vast number of options and lack of personalized recommendations.",
      },
      {
        title: "Solution",
        content:
          "An AI-powered event discovery app that curates personalized event suggestions based on user preferences, location, and social trends.",
      },
      {
        title: "Core Features",
        content: [
          "Personalized event recommendations using AI",
          "Events filters and preference profiles",
          "Interactive map view for event locations",
          "Fast, responsive UI with Tailwind",
        ],
      },
      {
        title: "Challenges & Learnings",
        content: [
          "Integrating AI models for accurate event recommendations",
          "Designing an intuitive UI for event discovery",
          "Optimizing performance for real-time data fetching",
        ],
      },
      {
        title: "Outcome",
        content:
          "A user-friendly event discovery platform that simplifies finding and planning attendance at local events through personalized AI-driven recommendations.",
      },
    ],
    gallery: [
      "/assets/opendoor (1).png",
      "/assets/opendoor (5).png",
      "/assets/opendoor (6).png",
      "/assets/opendoor (4).png",
      "/assets/opendoor (2).png",
      "/assets/opendoor (3).png",
    ],
    reflection:
      "OpenDoor was a valuable experience in integrating AI technologies into a user-centric application. I learned how to leverage AI for personalization, enhancing the user experience significantly. This project improved my skills in full-stack development, particularly in working with AI APIs and creating responsive, engaging interfaces.",
    stats: {
      duration: "6 weeks",
      team: "Solo Project",
      role: "Full Stack Developer",
      date: "May 2025",
    },
  },
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  {
    id: 3,
    title: "Email2WhatsApp - AI based Email summary on WhatsApp",
    desc: "An innovative solution that bridges email communication with WhatsApp by providing AI-generated summaries of emails directly to your WhatsApp. This tool enhances productivity by allowing users to quickly grasp the content of their emails without switching platforms.",
    subdesc:
      "Build with Python for backend processing, integrating Email APIs to fetch emails, OpenAI's GPT-4 for generating concise summaries, and Twilio's WhatsApp API to deliver these summaries directly to users' WhatsApp accounts.",
    href: "https://github.com/pranav-kalvium/Email2Whatsapp",
    // texture: "/textures/project/project3.mp4",
    banner: "/assets/357145.jpg",
    logo: "/assets/Logo.webp",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/python.png",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "StreamLit",
        path: "/assets/streamlit.png",
      },
      
    ],
    // new fields
    overview:
      "Email2WhatsApp is a productivity tool that uses AI to summarize email content and deliver these summaries directly to users' WhatsApp accounts, enabling quick access to important information without switching platforms.",
    techstack: [
      "Python",
      "TailwindCSS",
      "ChatGPT-4 (OpenAI)API",
      "Streamlit",
      "Twilio WhatsApp API",
      "Email APIs (IMAP/SMTP)",
    ],
    links: {
      source: "hhttps://github.com/pranav-kalvium/Email2Whatsapp",
      live: "",
      demo: "",
    },
    projectOutline: [
      {
        title: "Problem Statement",
        content:
          "Managing email overload can be time-consuming, and users often miss important information due to the volume of emails they receive daily.",
      },
      {
        title: "Solution",
        content:
          "Creating a tool that fetches emails, generates concise AI summaries, and sends them to users' WhatsApp for quick and easy access.",
      },
      {
        title: "Core Features",
        content: [
          "Give AI-generated summaries of emails",
          "Seamless integration with WhatsApp for delivery",
          "User-friendly interface for setup and management",
          "Customizable summary preferences",
        ],
      },
      {
        title: "Challenges & Learnings",
        content: [
          "Integrating multiple APIs (Email, OpenAI, Twilio) smoothly",
          "Ensuring accurate and relevant AI-generated summaries",
          "Handling authentication and security for email access",
        ],
      },
      {
        title: "Outcome",
        content:
          "A functional tool that enhances email management by providing quick access to important information through AI-generated summaries delivered via WhatsApp.",
      },
    ],
    gallery: [
     
    ],
    reflection:
      "Email2WhatsApp was an exciting project that deepened my understanding of API integrations and AI applications. I learned how to effectively combine different services to create a seamless user experience. This project enhanced my skills in backend development and working with AI models to solve real-world problems.",
    stats: {
      duration: "2 weeks",
      team: "Solo Project",
      role: "Python AI Developer",
      date: "Jan 2025",
    },
  },

];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
        ? [5, -5, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
        ? [5, 4, 0]
        : isTablet
          ? [5, 4, 0]
          : [12, 3, 0],
    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
        ? [-10, 10, 0]
        : isTablet
          ? [-12, 10, 0]
          : [-24, 10, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
        ? [-9, -10, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: "Framer",
    pos: "Lead Web Developer",
    duration: "2022 - Present",
    title:
      "Framer serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.",
    icon: "/assets/framer.svg",
    animation: "victory",
  },
  {
    id: 2,
    name: "Figma",
    pos: "Web Developer",
    duration: "2020 - 2022",
    title:
      "Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.",
    icon: "/assets/figma.svg",
    animation: "clapping",
  },
  {
    id: 3,
    name: "Notion",
    pos: "Junior Web Developer",
    duration: "2019 - 2020",
    title:
      "Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.",
    icon: "/assets/notion.svg",
    animation: "salute",
  },
];
