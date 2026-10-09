"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates } from "./CertificatesSection";
import { detectLanguage } from "@/lib/agentBrain";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
};

function renderMessageText(text: string) {
  const linkRegex = /(https?:\/\/[^\s)]+|mailto:[^\s)]+)/g;
  const parts = text.split(linkRegex);
  return parts.map((part, i) => {
    const isHttp = /^https?:\/\//.test(part);
    const isMailto = /^mailto:/.test(part);
    if (isHttp || isMailto) {
      const display = isMailto
        ? part.replace(/^mailto:/, "")
        : part.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 underline decoration-violet-400/30 hover:decoration-violet-400 hover:text-violet-300 transition-colors"
        >
          {display}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const greetings = [
  "Hey there! I'm Fatimah's AI assistant. I can tell you all about her skills, projects, and what she's great at. What would you like to know?",
  "Hi! Welcome to Fatimah's portfolio. I'm here to help — ask me anything about her work, experience, or skills!",
  "Hello! Curious about Fatimah? I'm her virtual assistant and I'd love to share what makes her awesome. Fire away!",
];

/* Each certificate renders as one numbered line. When the issuer already
 * appears inside the title — "Alibaba Cloud Certificate" issued by
 * "Alibaba Cloud" — repeating it produced the flat
 * "Alibaba Cloud Certificate — Alibaba Cloud" line, so it is dropped.
 * A `description` becomes an indented note underneath; that is where the
 * Alibaba competition numbers come from. The indent is U+00A0 rather than a
 * plain space, because chat bubbles use white-space: pre-line, which collapses
 * ordinary leading spaces. Everything is derived from the certificates array,
 * so adding a new one keeps this list correct.
 */
const certificateList = certificates
  .map((c, i) => {
    const issuer = c.title.toLowerCase().includes(c.issuer.toLowerCase())
      ? ""
      : ` — ${c.issuer}`;
    const note = c.description ? `\n\u00A0\u00A0\u00A0${c.description}` : "";
    return `${i + 1}. ${c.title}${issuer}${note}`;
  })
  .join("\n");

/* Closing line that sends the visitor to the cards. Derived from the data too,
 * so it never advertises a certificate that has since been removed. It states
 * where the credential came from instead of insisting the document is genuine
 * — arguing authenticity nobody questioned only plants the doubt.
 */
const certificateHook = certificates.some((c) =>
  c.title.toLowerCase().includes("alibaba cloud"),
)
  ? "Start with the Alibaba Cloud card — that credential came from a competition."
  : "Click any card and the whole document opens on screen.";

/* Same line in Roman Urdu for the same reason — data-derived, no authenticity
 * protest, just a pointer to the cards.
 */
const urduCertificateHook = certificates.some((c) =>
  c.title.toLowerCase().includes("alibaba cloud"),
)
  ? "Sab se pehle Alibaba Cloud wala card kholo — yeh credential ek competition se aaya tha."
  : "Kisi bhi card par click karo aur poori document screen par khul jayegi.";

const knowledge: {
  keywords: string[];
  responses: string[];
  urduResponses: string[];
}[] = [
  // ALIBABA CLOUD / REGIONAL ROUND — dedicated entry pehle hai, kyunke
  // getResponse() pehle match kiya hua entry hi return karta hai. Agar ise
  // certificates wale entry ke baad rakhein to "alibaba" kabhi match hi nahi hoga.
  {
    keywords: ["alibaba", "alibaba cloud", "nastp", "regional round", "16,000", "16000", "420", "karachi round"],
    responses: [
      `That's one of the highlights of her credentials. Fatimah was selected from a pool of 16,000 students, and her team was one of just 420 to advance to the regional round of the Alibaba Cloud competition.\n\nOn 3 October 2026 the team attended the Karachi Regional Round at NASTP Karachi on Main Shahrah-e-Faisal, where they presented their project in person.\n\nThe certificate itself is in the Professional Certificates section — click the card to view the full document.`,
      `She's proud of this one. Out of 16,000 students, Fatimah was selected, and her team went on to be one of only 420 teams to reach the regional round.\n\nHer team then presented their project at NASTP Karachi, Main Shahrah-e-Faisal, on 3 October 2026 for the Karachi Regional Round of the Alibaba Cloud competition.\n\nScroll to the Professional Certificates section to see the certificate in full.`,
      `Yes — she holds an Alibaba Cloud Certificate, earned through a competitive selection process rather than a paid course.\n\nShe was selected from 16,000 students, her team was one of 420 to advance to the regional round, and they presented their project in person at NASTP Karachi on Main Shahrah-e-Faisal on 3 October 2026.\n\nYou can view the actual certificate in the Professional Certificates section of this portfolio.`,
    ],
    urduResponses: [
      `Yeh uske credentials ka sab se bara highlight hai. Fatimah 16,000 students ke pool mein se chuni gayi thin, aur uski team un sirf 420 teams mein se ek thi jo Alibaba Cloud competition ke regional round tak pahunchi.\n\n3 October 2026 ko team ne Karachi Regional Round mein NASTP Karachi, Main Shahrah-e-Faisal par apna project personally present kiya.\n\nCertificate khud Professional Certificates section mein hai — card par click karo aur poori document dekh lo.`,
      `Is par usko properly naaz hai. 16,000 students mein se Fatimah select hui, aur uski team un sirf 420 teams mein se ek thi jo regional round tak pahunchi.\n\nPhir uski team ne 3 October 2026 ko NASTP Karachi, Main Shahrah-e-Faisal par Alibaba Cloud competition ke Karachi Regional Round mein apna project present kiya.\n\nProfessional Certificates section tak scroll karo aur certificate poori tarah dekh lo.`,
      `Ji haan — uske paas Alibaba Cloud Certificate hai, jo kisi paid course se nahi balke competitive selection process se mila hai.\n\nFatimah 16,000 students mein se chuni gayi, uski team 420 mein se ek thi jo regional round tak pahunchi, aur unhone apna project 3 October 2026 ko NASTP Karachi, Main Shahrah-e-Faisal par present kiya.\n\nCertificate aap is portfolio ke Professional Certificates section mein dekh sakte hain.`,
    ],
  },
  // CERTIFICATES (CertificatesSection ke data se auto-update hota hai)
  {
    keywords: ["certificate", "certificat", "certified", "credential", "pafla", "membership", "registered freelancer", "sanaad", "sanad", "sirtificate", "sertificate", "sanaadein"],
    responses: [
      `Yes — here is exactly what she holds:\n\n${certificateList}\n\nThe full documents are in the Professional Certificates section — click a card and the certificate opens right on the page, no download needed. ${certificateHook}`,
      `Absolutely — and they are worth a closer look.\n\n${certificateList}\n\nEach one opens full size from its own card in the Professional Certificates section, so the whole certificate is a click away. ${certificateHook}`,
      `She does — here they are:\n\n${certificateList}\n\nScroll to the Professional Certificates section and open whichever card interests you — the full certificate appears on the page itself. ${certificateHook}`,
    ],
    urduResponses: [
      `Ji haan — uske paas bilkul ye hain:\n\n${certificateList}\n\nPoori documents Professional Certificates section mein hain — kisi bhi card par click karo aur certificate wahi page par khul jata hai, koi download ki zaroorat nahi. ${urduCertificateHook}`,
      `Bilkul — aur yeh close-up dekhne layak hain.\n\n${certificateList}\n\nHar ek apne card se full size khulta hai Professional Certificates section mein — poori certificate ek click par hai. ${urduCertificateHook}`,
      `Haan, uske paas hain — yeh lo:\n\n${certificateList}\n\nProfessional Certificates section tak scroll karo aur jo card dil kare kholein — poori certificate page par hi khul jayegi. ${urduCertificateHook}`,
    ],
  },
  // ELIGIBILITY / INTERNSHIP / HIRING
  {
    keywords: ["eligible", "eligibl", "qualify", "qualification", "intern", "internship", "hiring", "hire", "position", "role", "apply", "recruit", "eligible hai", "qualify kar", "qualify karti", "internship k liye", "internship ke liye", "job k liye", "job ke liye", "apply kar", "kaam kar sakti", "bana sakti hai"],
    responses: [
      "Absolutely! Fatimah is highly eligible for AI and automation-related internships and roles. She has hands-on experience with OpenAI's Agents SDK, multi-agent systems, Python (advanced OOP), and full-stack development with Next.js and React. She's also participated in 3+ hackathons and has 25+ GitHub repos showcasing her work. Any company that needs AI systems built and shipped would benefit from having her.",
      "Yes, definitely! Fatimah has the skills and drive that any automation or AI team would value. She's built autonomous AI agents, full-stack web apps, and has strong Python fundamentals. She's pursuing her BBA while simultaneously building production-level projects — that's the kind of dedication employers look for. She's open to internships, freelance work, and full-time opportunities!",
      "Fatimah would be an excellent fit for automation and AI roles. Her project portfolio includes StudiesHelper (an autonomous AI agent), WellnessOracle, AURA Luxury Storefront, and many more. She understands the full pipeline — from designing AI logic to deploying on Vercel. She's a fast learner, self-motivated, and always building. Definitely worth considering!",
    ],
    urduResponses: [
      "Bilkul! Fatimah AI aur automation wali internships aur roles ke liye bilkul eligible hain. Uske paas OpenAI's Agents SDK, multi-agent systems, Python (advanced OOP), aur full-stack development (Next.js aur React) ka hands-on experience hai. 3+ hackathons mein bhi participate kiya hai aur 25+ GitHub repos hain jin mein uska kaam dikhta hai. Jis bhi company ko AI systems banane aur ship karne ki zaroorat hai, usko Fatimah se fayda hoga.",
      "Ji haan, bilkul! Fatimah ke paas wo skills aur dedication hai jo koi bhi automation ya AI team chahti hai. Usne autonomous AI agents banaye hain, full-stack web apps banaye hain, aur Python ki strong fundamentals hain. Wo BBA kar rahi hai aur saath hi production-level projects bana rahi hai — aisi dedication employers ko pasand aati hai. Wo internships, freelance kaam, aur full-time opportunities ke liye open hain!",
      "Fatimah automation aur AI roles ke liye excellent fit hain. Uske project portfolio mein StudiesHelper (ek autonomous AI agent), WellnessOracle, AURA Luxury Storefront, aur aur bhi kaafi projects hain. Wo full pipeline samajhti hain — AI logic design karne se lekar Vercel par deploy karne tak. Wo jaldi seekhti hain, khud-motivated hain, aur hamesha kuch na kuch bana rahi hain. Zaroor consider karo!",
    ],
  },
  // AUTOMATION SPECIFIC
  {
    keywords: ["automation", "automate", "automated", "workflow", "rpa", "bot", "chatbot", "agent", "automate kar", "bot banate", "chatbot kese", "automation ka"],
    responses: [
      "Fatimah is passionate about automation! She's built autonomous AI agents that can reason, use tools, and make decisions. Her StudiesHelper agent automates the study process, and her WellnessOracle automates health guidance. She also understands chatbot development, workflow automation, and how to design intelligent systems that save time and solve real problems.",
      "Automation is right in Fatimah's wheelhouse! She builds AI agents that automate complex tasks — from student assistance to health management. She works with OpenAI's Agents SDK for tool design, guardrails, and multi-agent orchestration. If you need someone who can build systems that work autonomously and intelligently, Fatimah is your person!",
    ],
    urduResponses: [
      "Fatimah automation ke bare mein passionate hain! Usne autonomous AI agents banaye hain jo reason kar sakte hain, tools use kar sakte hain, aur decisions le sakte hain. Uska StudiesHelper agent study process automate karta hai, aur WellnessOracle health guidance automate karta hai. Chatbot development, workflow automation, aur aise intelligent systems design karna bhi jaanti hai jo waqt bachate aur asli masle solve karte hain.",
      "Automation Fatimah ke sweet spot mein hai! Wo AI agents banati hain jo complex tasks automate karte hain — student assistance se lekar health management tak. Wo OpenAI's Agents SDK ke saath tool design, guardrails, aur multi-agent orchestration par kaam karti hain. Agar aapko koi aisa chahiye jo autonomously aur intelligently kaam karne wale systems banaye, to Fatimah sahi choice hain!",
    ],
  },
  // WHAT SHE CAN DO / CAPABILITIES
  {
    keywords: ["what can she", "what does she", "capable", "ability", "able to", "strength", "good at", "best at", "expertise", "specialize", "kya kar sakti", "kya kar sakti hai", "kya karti", "kya karti hai", "kya kaam karti", "kya banati", "kya banati hai", "kya skills", "kya kya aata", "kya aata", "kis kaam mein achi", "kis mein achi"],
    responses: [
      "Fatimah's biggest strengths are Agentic AI systems, full-stack web development, and Python engineering — skills she now channels through her agency SFlyra Labs. She can build autonomous AI agents, design complete web applications, write clean OOP code, and deploy everything to production. What makes her special is that she combines all of this with business thinking from her BBA.",
      "Fatimah excels at building intelligent, end-to-end solutions. She can architect and deploy multi-agent AI systems, create responsive full-stack web apps with Next.js and React, write production-quality Python, and handle DevOps with Docker and Vercel. She's also great at rapidly learning new technologies and applying them to real projects.",
    ],
    urduResponses: [
      "Fatimah ki sab se badi strengths hain Agentic AI systems, full-stack web development, aur Python engineering — yeh skills wo ab apni agency SFlyra Labs ke zariye use kar rahi hain. Wo autonomous AI agents bana sakti hain, complete web applications design kar sakti hain, clean OOP code likh sakti hain, aur sab kuch production par deploy kar sakti hain. Jo cheez usko special banati hai wo yeh hai ke wo in sab ko BBA wali business thinking ke saath combine karti hain.",
      "Fatimah end-to-end intelligent solutions banane mein expert hain. Wo multi-agent AI systems architect aur deploy kar sakti hain, Next.js aur React ke saath responsive full-stack web apps bana sakti hain, production-quality Python likh sakti hain, aur Docker aur Vercel ke saath DevOps handle kar sakti hain. Naye technologies jaldi seekhna aur unhe real projects par apply karna bhi uska bara skill hai.",
    ],
  },
  // WHY HIRE / SELLING POINTS
  {
    keywords: ["why should", "why hire", "reason to", "sell me", "convince", "advantage", "benefit", "value", "kyu hire", "kyun hire", "kyu hire karein", "kyu choose", "kyun choose", "kya fayda", "kia faida", "kya faida", "fayda kya", "benefit kya"],
    responses: [
      "Here's why Fatimah stands out: she builds AI systems that work. She has 8+ flagship projects, 25+ GitHub repos, 3+ hackathon participations, and production-level deployment experience. Plus, she's pursuing a BBA which gives her business insight that most developers lack. She's self-driven, always learning, and passionate about building things that matter.",
      "Fatimah brings a rare combination of AI expertise, full-stack development skills, and business acumen. She's built autonomous agents, e-commerce platforms, and educational tools — all deployed in production. She's the type of person who sees a problem and builds a solution, no hand-holding needed. That kind of initiative is invaluable for any team.",
    ],
    urduResponses: [
      "Yahan Fatimah ko kaun si cheez alag banati hai: wo AI systems banati hain jo kaam karte hain. Uske paas 8+ flagship projects, 25+ GitHub repos, 3+ hackathon participations, aur production-level deployment ka experience hai. Saath hi wo BBA kar rahi hain jo unhe business insight deti hai jo zyada tar developers ke paas nahi hoti. Wo self-driven hain, hamesha seekhti hain, aur meaningful cheezein banane par passionate hain.",
      "Fatimah AI expertise, full-stack development skills, aur business acumen ka rare combination rakhti hain. Usne autonomous agents, e-commerce platforms, aur educational tools banaye hain — sab production par deployed hain. Wo us type ki person hain jo problem dekhti hain aur solution bana deti hain, bina kisi ke hand-holding ke. Aisi initiative kisi bhi team ke liye invaluable hai.",
    ],
  },
  // SKILLS
  {
    keywords: ["skill", "technolog", "tech stack", "what do you know", "tool", "language", "framework", "know", "skills kya", "skills hain", "kya skills", "technologies kya", "tech stack kya", "kya seekhi", "kya seekha", "kaunsi skills", "kaunsi technology", "kis kis cheez mein", "kia kia", "kia aata", "kia ata", "inko kia", "unhe kia", "usko kia", "kuch aata", "kuch ata", "aata hai", "ata hai"],
    responses: [
      "Fatimah's toolkit is pretty stacked! She works with Python (advanced OOP, async patterns), TypeScript, React, Next.js, Node.js, and Tailwind CSS. On the AI side, she's proficient with OpenAI SDK, multi-agent systems, RAG pipelines, and tool design. For deployment, she uses Docker, Vercel, and CI/CD pipelines. She's always learning something new!",
      "Let me break it down — her core skills include Python with advanced OOP patterns, Agentic AI systems using OpenAI's Agents SDK, full-stack development with Next.js and React, and deployment with Docker and Vercel. She also knows databases like PostgreSQL and has experience with Streamlit for rapid prototyping.",
    ],
    urduResponses: [
      "Fatimah ka toolkit kaafi solid hai! Wo Python (advanced OOP, async patterns), TypeScript, React, Next.js, Node.js, aur Tailwind CSS ke saath kaam karti hain. AI side par OpenAI SDK, multi-agent systems, RAG pipelines, aur tool design mein proficient hain. Deployment ke liye Docker, Vercel, aur CI/CD pipelines use karti hain. Wo hamesha kuch naya seekh rahi hain!",
      "Suno, isko break down karta hoon — uski core skills mein shamil hain Python advanced OOP patterns ke saath, OpenAI's Agents SDK ke saath Agentic AI systems, Next.js aur React ke saath full-stack development, aur Docker aur Vercel ke saath deployment. PostgreSQL jaise databases bhi jaanti hain aur rapid prototyping ke liye Streamlit ka experience hai.",
    ],
  },
  // PROJECTS
  {
    // "work" alone is deliberately absent: it sat ahead of the availability
    // entry, so "are you available for work?" was answered with projects.
    keywords: ["project", "portfolio", "her work", "your work", "worked on", "work on", "built", "created", "application", "showcase", "demo", "projects kya", "kya projects", "projects hain", "kya banaya", "ne banaya", "kya banaye", "kaunse projects", "kaunse project", "kis kis projects", "projects bata", "projects dikha"],
    responses: [
      "Fatimah has built some really cool projects! She created StudiesHelper — an autonomous AI agent that helps students study smarter, and WellnessOracle — a health-focused AI agent. She also built AURA Luxury Storefront (a luxury tech storefront with WhatsApp ordering) and this very portfolio you're looking at! She's also participated in hackathons and has 25+ GitHub repos.",
      "Her project portfolio is diverse! From multi-agent AI systems like StudiesHelper and WellnessOracle to full-stack apps like the Nexus SaaS Dashboard, the AURA Luxury Storefront and the Apex Booking Portal, plus a RAG-powered robotics textbook. Each project showcases her ability to handle everything from architecture to deployment.",
    ],
    urduResponses: [
      "Fatimah ne kaafi mazay ke projects banaye hain! Usne StudiesHelper banaya — ek autonomous AI agent jo students ko smart tareeqe se study karne mein help karta hai, aur WellnessOracle — ek health-focused AI agent. In ke ilawa AURA Luxury Storefront (WhatsApp ordering wala luxury tech storefront) aur yeh portfolio bhi banaya jis par aap abhi hain! Hackathons mein bhi participate kiya hai aur 25+ GitHub repos hain.",
      "Uska project portfolio kaafi diverse hai! Multi-agent AI systems jaise StudiesHelper aur WellnessOracle se lekar full-stack apps tak — Nexus SaaS Dashboard, AURA Luxury Storefront, Apex Booking Portal, aur ek RAG-powered robotics textbook. Har project mein architecture se lekar deployment tak handle karne ki skill nazar aati hai.",
    ],
  },
  // AI
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "agent", "agentic", "openai", "llm", "gpt", "ai mein", "agents kya", "ai agents kya", "ai kya"],
    responses: [
      "This is where Fatimah really shines! She's built multi-agent systems using OpenAI's Agents SDK — autonomous agents that can reason, use tools, and collaborate. She understands RAG pipelines, vector search, tool design, guardrails, and streaming. Two of the systems she has built are StudiesHelper, which runs study sessions, and WellnessOracle, which handles wellness guidance.",
      "Fatimah is deep into Agentic AI! She builds autonomous agents that reason, adapt, and solve problems instead of executing a fixed script. She's proficient with OpenAI's Agents SDK, multi-agent orchestration, tool design, and guardrails. She's built projects like StudiesHelper and WellnessOracle that showcase real-world AI applications.",
    ],
    urduResponses: [
      "Yeh woh jagah hai jahan Fatimah sach mein chamakti hain! Usne OpenAI's Agents SDK ke saath multi-agent systems banaye hain — autonomous agents jo reason kar sakte hain, tools use kar sakte hain, aur collaborate kar sakte hain. RAG pipelines, vector search, tool design, guardrails, aur streaming samajhti hain. Do systems jo usne banaye: StudiesHelper, jo study sessions chalaata hai, aur WellnessOracle, jo wellness guidance handle karta hai.",
      "Fatimah Agentic AI mein deep hain! Wo autonomous agents banati hain jo reason karte hain, adapt karte hain, aur fixed script chalane ke bajaye problems solve karte hain. OpenAI's Agents SDK, multi-agent orchestration, tool design, aur guardrails mein proficient hain. StudiesHelper aur WellnessOracle jaise projects banaye hain jo real-world AI applications showcase karte hain.",
    ],
  },
  // WEB / FULL STACK
  {
    keywords: ["web", "full stack", "fullstack", "frontend", "backend", "next", "react", "website", "node", "typescript", "tailwind", "full stack kya", "fullstack kya", "frontend kya", "backend kya", "website kese", "web kya"],
    responses: [
      "Fatimah is a capable full-stack developer! She builds modern web apps using Next.js, React, TypeScript, and Tailwind CSS. She handles everything from responsive UI design to API integration and deployment. Her portfolio, AURA Luxury Storefront, and several other projects all showcase her full-stack abilities. She deploys everything on Vercel with Docker for containerization.",
      "On the web side, Fatimah works with the Next.js ecosystem — React for components, TypeScript for type safety, Tailwind for styling, and Node.js for backend logic. She's deployed multiple production apps on Vercel and has experience with Docker for scalable architectures.",
    ],
    urduResponses: [
      "Fatimah ek capable full-stack developer hain! Wo Next.js, React, TypeScript, aur Tailwind CSS ke saath modern web apps banati hain. Responsive UI design se lekar API integration aur deployment tak sab handle karti hain. Uska portfolio, AURA Luxury Storefront, aur kai aur projects uski full-stack abilities dikhate hain. Sab kuch Vercel par deploy karti hain aur Docker se containerization karti hain.",
      "Web side par Fatimah Next.js ecosystem ke saath kaam karti hain — React components ke liye, TypeScript type safety ke liye, Tailwind styling ke liye, aur Node.js backend logic ke liye. Kai production apps Vercel par deploy kiye hain aur scalable architectures ke liye Docker ka experience hai.",
    ],
  },
  // EDUCATION
  {
    keywords: ["education", "study", "degree", "university", "college", "bba", "qualification", "academic", "school", "parhai", "padhai", "kahan parhti", "kahan parhi", "education kya", "degree kya", "bba kya", "college kahan", "school kahan"],
    responses: [
      "Fatimah is pursuing a Bachelor of Business Administration (BBA) because she believes the best technology needs understanding the people and businesses it serves. She completed her Intermediate in Commerce from St. Patrick's College, Karachi, and her Matriculation from St. Patrick's Girls High School. Her business education combined with her tech skills makes her uniquely valuable!",
      "She's currently doing her BBA — smart move because it gives her business acumen alongside her technical skills. She did her intermediate from St. Patrick's College in Karachi and has always been strong in analytical thinking.",
    ],
    urduResponses: [
      "Fatimah Bachelor of Business Administration (BBA) kar rahi hain kyunke wo maanti hain ke best technology ko un logon aur businesses ko samajhna zaroori hai jo ise use karte hain. Usne Intermediate in Commerce St. Patrick's College, Karachi se complete kiya, aur Matriculation St. Patrick's Girls High School se. Business education aur tech skills ka combination usko uniquely valuable banata hai!",
      "Wo abhi BBA kar rahi hain — smart move, kyunke isse technical skills ke saath business acumen milti hai. Intermediate St. Patrick's College, Karachi se kiya aur hamesha analytical thinking mein strong rahi hain.",
    ],
  },
  // AVAILABILITY / OPPORTUNITIES
  {
    keywords: ["available", "availability", "opportunity", "job", "work", "looking for work", "open to work", "freelance", "employ", "join", "team", "company", "offer", "remote", "onsite", "hiring you", "available hai", "available ho", "kaam hai", "job ka", "kaam dhoond", "kaam mil", "kisi team", "offer kar"],
    responses: [
      "Fatimah is absolutely open to opportunities! Whether it's freelance work, full-time positions, or exciting collaborations — she's interested. You can reach her directly through the contact form below, email her at mailto:fatimahnoman452@gmail.com, or connect on LinkedIn (https://www.linkedin.com/in/fatimayy-n/). She's quick to respond!",
      "Yes, she's available and looking for opportunities! She's open to freelance projects, full-time roles, and collaborations. The best ways to reach her are through the contact section on this portfolio, email at mailto:fatimahnoman452@gmail.com, or via LinkedIn (https://www.linkedin.com/in/fatimayy-n/) and X/Twitter (https://x.com/FatimahBuildsAI).",
    ],
    urduResponses: [
      `Fatimah opportunities ke liye bilkul open hain! Chahe freelance kaam ho, full-time position, ya mazedar collaborations — wo interested hain. Aap use seedha contact form ke zariye reach kar sakte hain (neeche), email par mailto:fatimahnoman452@gmail.com, ya LinkedIn par (https://www.linkedin.com/in/fatimayy-n/). Wo jaldi respond karti hain!`,
      `Ji haan, wo available hain aur opportunities dhoond rahi hain! Freelance projects, full-time roles, aur collaborations ke liye open hain. Reach karne ke best tariqe: is portfolio ka contact section, email mailto:fatimahnoman452@gmail.com, LinkedIn (https://www.linkedin.com/in/fatimayy-n/), ya X/Twitter (https://x.com/FatimahBuildsAI).`,
    ],
  },
  // CONTACT
  {
    keywords: ["contact", "email", "reach", "connect", "linkedin", "phone", "location", "where", "address", "kese contact", "kaise contact", "kysy contact", "contact kese", "contact kaise", "mail kya", "email kya", "number kya", "phone kya", "kahan se", "raabta kese", "kese mil", "kahan mil", "whatsapp", "mail kya hai", "email kya hai", "number kya hai", "bt ksy", "bt kese", "bt kaise", "bt kaisy", "bat kese", "bat ksy", "bat kaise", "bat kaisy", "baat kese", "baat ksy", "baat kaise", "ksy krskta", "kese krskta", "krskta ho", "kar sakta hoon", "bat karne ka", "baat karne ka", "connect kese", "connect ksy", "kese connect", "kese mil sakta", "mil sakta hoon", "kaise mil sakta"],
    responses: [
      "Here are all the ways to reach Fatimah:\n\n📧 Email: mailto:fatimahnoman452@gmail.com\n💼 LinkedIn: https://www.linkedin.com/in/fatimayy-n/\n💻 GitHub: https://github.com/Fatimahnoman\n🐦 X/Twitter: https://x.com/FatimahBuildsAI\n📸 Instagram: https://www.instagram.com/fatimah_builds_ai\n👤 Facebook: https://www.facebook.com/share/1Bx8NV5RLU/\n\nOr simply scroll down and use the contact form on this portfolio — she typically responds within 24 hours!",
      "The best way to reach Fatimah is via email at mailto:fatimahnoman452@gmail.com — just tap to open your mail app. You can also connect with her on:\n\n💼 LinkedIn: https://www.linkedin.com/in/fatimayy-n/\n🐦 X/Twitter: https://x.com/FatimahBuildsAI\n📸 Instagram: https://www.instagram.com/fatimah_builds_ai\n👤 Facebook: https://www.facebook.com/share/1Bx8NV5RLU/\n💻 GitHub: https://github.com/Fatimahnoman\n\nAll the links above are clickable — and the contact form on this portfolio works great too!",
    ],
    urduResponses: [
      `Fatimah tak pohanchne ke saare tariqe yeh hain:\n\n📧 Email: mailto:fatimahnoman452@gmail.com\n💼 LinkedIn: https://www.linkedin.com/in/fatimayy-n/\n💻 GitHub: https://github.com/Fatimahnoman\n🐦 X/Twitter: https://x.com/FatimahBuildsAI\n📸 Instagram: https://www.instagram.com/fatimah_builds_ai\n👤 Facebook: https://www.facebook.com/share/1Bx8NV5RLU/\n\nYa bas is portfolio ke contact form par scroll karo — wo aksar 24 ghanton ke andar reply kar deti hain!`,
      `Fatimah tak pohanchne ka best tareeqa email hai mailto:fatimahnoman452@gmail.com — bas tap karo aur mail app khul jayega. In par bhi connect kar sakte ho:\n\n💼 LinkedIn: https://www.linkedin.com/in/fatimayy-n/\n🐦 X/Twitter: https://x.com/FatimahBuildsAI\n📸 Instagram: https://www.instagram.com/fatimah_builds_ai\n👤 Facebook: https://www.facebook.com/share/1Bx8NV5RLU/\n💻 GitHub: https://github.com/Fatimahnoman\n\nUpar wale saare links clickable hain — aur portfolio ka contact form bhi kaam karta hai!`,
    ],
  },
  // SOCIAL MEDIA
  {
    keywords: ["social", "socials", "instagram", "facebook", "twitter", "x.com", "github", "linkedin", "follow", "social kya", "follow kese", "socials kya"],
    responses: [
      "Here are Fatimah's social profiles — give her a follow!\n\n💼 LinkedIn: https://www.linkedin.com/in/fatimayy-n/\n🐦 X/Twitter: https://x.com/FatimahBuildsAI\n📸 Instagram: https://www.instagram.com/fatimah_builds_ai\n👤 Facebook: https://www.facebook.com/share/1Bx8NV5RLU/\n💻 GitHub: https://github.com/Fatimahnoman\n\nHer LinkedIn is the best place to follow her professional journey — she shares her work, projects, and insights regularly!",
    ],
    urduResponses: [
      `Yeh rahein Fatimah ke social profiles — follow karo!\n\n💼 LinkedIn: https://www.linkedin.com/in/fatimayy-n/\n🐦 X/Twitter: https://x.com/FatimahBuildsAI\n📸 Instagram: https://www.instagram.com/fatimah_builds_ai\n👤 Facebook: https://www.facebook.com/share/1Bx8NV5RLU/\n💻 GitHub: https://github.com/Fatimahnoman\n\nLinkedIn uski professional journey follow karne ke liye best jagah hai — wo apna kaam, projects, aur insights regularly share karti hain!`,
    ],
  },
  // HACKATHON
  {
    keywords: ["hackathon", "competition", "event", "hack", "challenge", "win"],
    responses: [
      "Fatimah has participated in 3+ hackathons! She loves the fast-paced environment of building something meaningful in limited time. Her hackathon projects showcase her ability to think on her feet and deliver working solutions under pressure. It's where her AI and full-stack skills really come together! Her competitive work goes well beyond hackathons, too — she was selected from a pool of 16,000 students as one of just 420 to reach the Alibaba Cloud regional round, where her team presented their project in person at NASTP Karachi on 3 October 2026.",
    ],
    urduResponses: [
      "Fatimah ne 3+ hackathons mein participate kiya hai! Wo limited time mein meaningful cheezein banane ka fast-paced environment pasand karti hain. Uske hackathon projects dikhate hain ke wo apne pairon par khari ho kar pressure mein bhi working solutions deliver kar sakti hain. Yahin uski AI aur full-stack skills sach mein ek saath aati hain! Aur uski competitive work hackathons se bahar bhi jaati hai — wo 16,000 students ke pool mein se un sirf 420 mein se ek thi jo Alibaba Cloud regional round tak pahunchi, jahan uski team ne 3 October 2026 ko NASTP Karachi mein apna project personally present kiya.",
    ],
  },
  // PYTHON
  {
    keywords: ["python", "coding", "programming", "code", "oop", "object oriented", "kaunsi language", "kya language", "programming kya"],
    responses: [
      "Python is Fatimah's first love in programming! She's mastered advanced OOP patterns, data structures, async programming, type hints, and testing. She started with Python and that obsession naturally led her to AI development. She writes clean, scalable code and loves architecting complex systems.",
    ],
    urduResponses: [
      "Python Fatimah ki programming mein pehli mohabbat hai! Usne advanced OOP patterns, data structures, async programming, type hints, aur testing master kiye hain. Usne Python se shuru kiya aur yehi obsession unhe AI development tak le gayi. Wo clean, scalable code likhti hain aur complex systems architect karna pasand karti hain.",
    ],
  },
  // DOCKER / DEPLOY
  {
    keywords: ["docker", "deploy", "vercel", "devops", "ci", "cloud", "hosting", "server", "deploy kese", "deploy kaisy", "hosting kya", "server kya"],
    responses: [
      "Fatimah knows her way around deployment! She uses Docker for containerization, Vercel for hosting, and has experience with CI/CD pipelines. She deploys her Next.js apps on Vercel with optimized builds. She understands cloud-native architectures and scalable deployment patterns.",
    ],
    urduResponses: [
      "Fatimah deployment mein ghar jaisi hain! Wo Docker se containerization karti hain, Vercel par hosting, aur CI/CD pipelines ka experience hai. Wo apne Next.js apps optimized builds ke saath Vercel par deploy karti hain. Cloud-native architectures aur scalable deployment patterns samajhti hain.",
    ],
  },
  // DESIGN
  {
    keywords: ["design", "ui", "ux", "figma", "css", "style", "beautiful", "responsive", "design kese", "design kaisy", "kese design", "design kaise"],
    responses: [
      "Fatimah has a good eye for design! She works with Tailwind CSS for rapid styling and has experience building responsive, modern UIs. Her portfolio itself showcases her design sensibility — clean layouts, smooth animations with Framer Motion, and attention to detail. She believes great UX is just as important as great code.",
    ],
    urduResponses: [
      "Fatimah ki design par achi nazar hai! Wo Tailwind CSS se rapid styling karti hain aur responsive, modern UIs banane ka experience rakhti hain. Uski portfolio khud uski design sensibility dikhata hai — clean layouts, Framer Motion ke saath smooth animations, aur detail par tawajjoh. Wo maanti hain ke great UX utna hi important hai jitna great code.",
    ],
  },
  // DATABASE
  {
    keywords: ["database", "sql", "postgresql", "mongo", "data", "storage", "database kya"],
    responses: [
      "Fatimah has experience with databases including PostgreSQL. She also works with Pandas for data manipulation in Python. She understands data modeling and how to integrate databases with full-stack applications.",
    ],
    urduResponses: [
      "Fatimah ko databases ka experience hai, khaas kar PostgreSQL. Python mein data manipulation ke liye Pandas ke saath bhi kaam karti hain. Data modeling samajhti hain aur databases ko full-stack applications ke saath integrate karna jaanti hain.",
    ],
  },
  // SALARY / COMPENSATION
  {
    keywords: ["salary", "compensation", "pay", "stipend", "package", "rate", "cost", "budget", "price", "salary kitni", "kitni salary", "kitna lete", "kitna leti", "rate kya", "charges kya", "kitna charge", "payment kya"],
    responses: [
      "That's something you'd need to discuss directly with Fatimah! She's flexible and open to negotiating fair compensation based on the role, scope, and value she brings. You can reach her at mailto:fatimahnoman452@gmail.com, on LinkedIn (https://www.linkedin.com/in/fatimayy-n/), or through the contact form on this portfolio.",
    ],
    urduResponses: [
      "Yeh cheez aapko Fatimah se direct discuss karni hogi! Wo role, scope, aur value ke mutabiq fair compensation negotiate karne ke liye flexible aur open hain. Aap unhe mailto:fatimahnoman452@gmail.com par email kar sakte hain, LinkedIn (https://www.linkedin.com/in/fatimayy-n/) par connect kar sakte hain, ya is portfolio ke contact form se.",
    ],
  },
  // EXPERIENCE LEVEL
  {
    keywords: ["experience level", "fresher", "junior", "senior", "experience year", "year of exp", "how much experience", "experience kitna", "kitna experience", "kitne saal ka kaam", "kab se kaam", "kitne years", "kitna kaam kiya"],
    responses: [
      "Fatimah is an experienced developer with a strong portfolio to back it up — 8+ flagship projects, 25+ GitHub repos, 3+ hackathon participations, and hands-on experience with AI agents, full-stack development, and production deployment. She learns by building, and her work speaks for itself.",
      "While Fatimah is at an early stage in her career, she's already accumulated impressive hands-on experience. She's built autonomous AI agents, full-stack web apps, participated in hackathons, and deployed production applications. She's a fast learner who turns passion into output.",
    ],
    urduResponses: [
      "Fatimah ek experienced developer hain aur unke paas strong portfolio hai — 8+ flagship projects, 25+ GitHub repos, 3+ hackathon participations, aur AI agents, full-stack development, aur production deployment ka hands-on experience. Wo building se seekhti hain, aur uska kaam khud bolta hai.",
      "Fatimah career ke early stage par hain, lekin unke paas already impressive hands-on experience hai. Usne autonomous AI agents banaye, full-stack web apps banaye, hackathons mein participate kiya, aur production applications deploy kiye. Wo fast learner hain jo passion ko output mein badal deti hain.",
    ],
  },
  // GREETINGS
  {
    keywords: ["hello", "hi", "hey", "greetings", "sup", "how are you", "what's up", "salam", "salaam", "assalam", "assalamualaikum", "walaikum", "kese ho", "kaise ho", "keyse ho", "kese hain", "kaise hain", "kya hal", "kya haal", "suniye", "adaab"],
    responses: [
      "Hey! I'm doing great, thanks for asking! I'm Fatimah's AI assistant. Want to know about her skills, projects, or how to reach her? I'm here to help!",
      "Hi there! I'm Fatimah's virtual assistant. I can tell you everything about her work and expertise. What interests you?",
      "Hello! Nice to meet you. I'm here to help you learn about Fatimah. Feel free to ask about her skills, projects, or how to get in touch!",
    ],
    urduResponses: [
      "Hey! Main bohat acha hoon, poochne ke liye shukriya! Main Fatimah ki AI assistant hoon. Uski skills, projects, ya reach karne ke tareeqe ke bare mein jaanna chahte ho? Main madad ke liye hoon!",
      "Salam! Main Fatimah ki virtual assistant hoon. Main unke kaam aur expertise ke bare mein sab kuch bata sakti hoon. Kis cheez mein interest hai?",
      "Hello! Milkar khushi hui. Main yahan hoon aapko Fatimah ke bare mein batane ke liye. Uski skills, projects, ya contact karne ke tareeqe ke bare mein freely poochh sakte hain!",
    ],
  },
  // THANKS
  {
    keywords: ["thanks", "thank you", "thx", "appreciate", "helpful", "shukriya", "bohat shukriya", "jazak", "jazakallah", "meharbani"],
    responses: [
      "You're welcome! If you have any more questions about Fatimah, I'm always here. And don't forget — you can reach out to her directly through the contact form, email (mailto:fatimahnoman452@gmail.com), or connect on LinkedIn (https://www.linkedin.com/in/fatimayy-n/)!",
      "Happy to help! Let me know if there's anything else you'd like to know about Fatimah's work.",
      "Anytime! Hope I could help. Feel free to come back if more questions pop up!",
    ],
    urduResponses: [
      "Khush aamdeed! Fatimah ke bare mein mazeed sawal hain to main hamesha yahan hoon. Aur yaad rakhna — aap contact form, email (mailto:fatimahnoman452@gmail.com), ya LinkedIn (https://www.linkedin.com/in/fatimayy-n/) se unhe direct bhi reach kar sakte hain!",
      "Khushi hui madad karne mein! Agar Fatimah ke kaam ke bare mein kuch aur jaanna ho to batao.",
      "Anytime! Umeed hai madad mili. Aur sawal hon to phir aa jana!",
    ],
  },
  // NAME / IDENTITY
  {
    keywords: ["your name", "who are you", "what are you", "your bot", "assistant name", "kon ho", "kaun ho", "tum kon", "tum kaun", "aap kon", "kya bot", "bot kya hai"],
    responses: [
      "I'm Fatimah's AI portfolio assistant! Think of me as her virtual representative who can answer questions about her work, skills, and how to connect with her. Nice to meet you!",
      "I'm the AI assistant for Fatimah Noman's portfolio. I'm here to help recruiters and visitors learn about her. Ask me anything — her skills, projects, or how to reach her!",
    ],
    urduResponses: [
      "Main Fatimah ki AI portfolio assistant hoon! Mujhe uski virtual representative samjho jo uske kaam, skills, aur connect hone ke tareeqe ke bare mein answers de sakti hai. Milkar khushi hui!",
      "Main Fatimah Noman ke portfolio ki AI assistant hoon. Main recruiters aur visitors ko unke bare mein seekhne mein madad karti hoon. Kuch bhi poochho — skills, projects, ya reach karne ke tareeqe!",
    ],
  },
  // GENERAL FATIMAH
  {
    keywords: ["who", "about", "tell me about", "introduce", "profile", "describe", "kon hai", "kaun hai", "yeh kya hai", "kya hai ye", "wuh kya hai", "kya kaam karti hai", "uski profile", "kya profile", "kya background"],
    responses: [
      "Fatimah Noman is the Founder of SFlyra Labs — an AI Developer and Full-Stack Engineer based in Karachi, Pakistan. Through SFlyra Labs she builds intelligent AI systems, autonomous agents, and beautiful web applications for businesses. She's pursuing a BBA while pushing the boundaries of what AI can do — pretty impressive, right?",
      "So Fatimah founded SFlyra Labs to bring agentic AI and automation to real businesses. She started with Python, fell in love with building things, and now she's deep into Agentic AI and full-stack development. Oh, and she's also studying business — because great tech needs great strategy!",
      "Fatimah is the founder of SFlyra Labs and an AI engineer & full-stack developer who's passionate about building systems that make a difference. She combines technical skills with business thinking, and she is pursuing a BBA alongside both. Based in Karachi, always open to new challenges!",
    ],
    urduResponses: [
      "Fatimah Noman SFlyra Labs ki Founder hain — ek AI Developer aur Full-Stack Engineer jo Karachi, Pakistan mein base hain. SFlyra Labs ke zariye wo businesses ke liye intelligent AI systems, autonomous agents, aur beautiful web applications banati hain. Wo BBA kar rahi hain aur AI ki hadoon ko aage badha rahi hain — pretty impressive, hai na?",
      "To Fatimah ne SFlyra Labs is liye banaya ke agentic AI aur automation ko real businesses tak pahunchaya jaye. Usne Python se shuru kiya, cheezein banana pasand aaya, aur ab wo Agentic AI aur full-stack development mein deep hain. Oh, aur wo business bhi parh rahi hain — kyunke great tech ko great strategy chahiye!",
      "Fatimah SFlyra Labs ki founder hain aur ek AI engineer & full-stack developer hain jo aise systems banane par passionate hain jo farq paida karte hain. Wo technical skills ko business thinking ke saath combine karti hain, aur dono ke saath BBA bhi kar rahi hain. Karachi mein based hain, hamesha naye challenges ke liye open!",
    ],
  },
  // SFlyra Labs
  {
    keywords: ["sflyra", "agency", "company", "business", "brand", "labs", "kya hai sflyra", "sflyra kya hai", "agency kya hai", "sflyra kya"],
    responses: [
      "SFlyra Labs is Fatimah's agency where she builds intelligent AI systems, automation, and premium web experiences for businesses. As founder, she handles everything — from agentic AI and chatbots to full-stack web platforms and deployment. It's her vision of bringing practical, business-ready AI to the market!",
      "SFlyra Labs is Fatimah's own agency! Through it she delivers AI agents, automation workflows, and full-stack web applications for companies — where sharp engineering meets business thinking.",
    ],
    urduResponses: [
      "SFlyra Labs Fatimah ki agency hai jahan wo businesses ke liye intelligent AI systems, automation, aur premium web experiences banati hain. Founder hone ke naate wo sab kuch handle karti hain — agentic AI aur chatbots se lekar full-stack web platforms aur deployment tak. Yeh unka vision hai practical, business-ready AI ko market tak pahunchane ka!",
      "SFlyra Labs Fatimah ki apni agency hai! Iske zariye wo companies ke liye AI agents, automation workflows, aur full-stack web applications deliver karti hain — jahan sharp engineering business thinking se milti hai.",
    ],
  },
];

const fallbackResponses = [
  "That's a great question! While I primarily know about Fatimah's skills and work, let me try to help. I can tell you about her AI expertise, web development skills, projects, education, or how to contact her directly. What interests you most?",
  "Hmm, I want to give you the best answer! I'm most knowledgeable about Fatimah's technical skills, projects, and background. Try asking about her Python skills, AI projects, full-stack development, or availability for opportunities!",
  "I'd love to help with that! My expertise is in Fatimah's work and capabilities. I can share details about her projects, skills, education, or connect you with her directly. What would you like to know?",
  "Good question! Let me suggest some things I can help with — Fatimah's technical skills, her AI and automation projects, her web development experience, her education background, or how to get in touch with her via email, LinkedIn, or X/Twitter!",
];

const urduFallbackResponses = [
  "Yeh bohat acha sawal hai! Main aksar Fatimah ki skills aur kaam ke bare mein jaanti hoon, lekin koshish karti hoon. Main unke AI expertise, web development skills, projects, education, ya contact karne ke tareeqe ke bare mein bata sakti hoon. Kis cheez mein interest hai?",
  "Hmm, main aapko best answer dena chahti hoon! Main Fatimah ki technical skills, projects, aur background ke bare mein sab se zyada jaanti hoon. Python skills, AI projects, full-stack development, ya opportunities ke liye availability ke bare mein poochh kar dekho!",
  "Main ismein madad karna chahti hoon! Mera expertise Fatimah ke kaam aur capabilities mein hai. Main uske projects, skills, education ke details share kar sakti hoon, ya use direct connect karwa sakti hoon. Kya jaanna chahte ho?",
  "Acha sawal! Main bata doon ke kis kis cheez mein madad kar sakti hoon — Fatimah ki technical skills, AI aur automation projects, web development experience, education background, ya email, LinkedIn, X/Twitter ke zariye connect karne ka tareeqa!",
];

// A keyword only counts when it begins on a word boundary. Plain
// `includes` lets short keywords match inside unrelated words, so "ai"
// matched "av-ai-lable" and "em-ai-l" — the AI entry was swallowing
// "are you available?" and "what's her email?" and answering with a
// skills blurb. The closing boundary is deliberately not required, so
// "nextjs" still matches "next" and "roles" still matches "role".
function keywordIndex(text: string, keyword: string): number {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.search(new RegExp(`\\b${escaped}`, "i"));
}

/* Words that signal a fresh question. A message with two or more of them is
 * treated as several questions at once ("fatimah kon hai or inko kia kia
 * ata hai or insy se kese baat karo") and every distinct topic that matches
 * gets answered, in the order the topics appear in the sentence.
 */
const questionMarkers = new Set([
  // Roman Urdu
  "kon", "kaun", "kya", "kia", "kis", "kese", "kaise", "kaisay", "ksy",
  "kisi", "kahan", "kab", "kyun", "kyon", "kiu", "kyu", "kitna", "kitne",
  "kitni", "kaunsa", "kaunse", "kaunsi",
  // English
  "what", "who", "which", "how", "when", "where", "why", "whats", "whos",
]);

function countQuestionMarkers(lower: string): number {
  const tokens = lower.split(/[^a-z0-9]+/).filter(Boolean);
  return tokens.reduce((n, t) => n + (questionMarkers.has(t) ? 1 : 0), 0);
}

/* Every entry that matches the whole message. Kept in knowledge-array order
 * so the curated precedence still rules a single question ("Alibaba
 * certificate" must hit the dedicated Alibaba entry, not the general
 * certificates list). getResponse() re-sorts by keyword position only when
 * several questions are packed into one message, so "who is she and what
 * are her skills" answers about-then-skills without separator heuristics
 * that would misread "Python or JavaScript".
 */
function collectIntents(lower: string) {
  const hits: { entry: (typeof knowledge)[number]; pos: number }[] = [];
  for (const entry of knowledge) {
    let best = -1;
    for (const kw of entry.keywords) {
      const pos = keywordIndex(lower, kw);
      if (pos >= 0 && (best === -1 || pos < best)) best = pos;
    }
    if (best >= 0) hits.push({ entry, pos: best });
  }
  return hits;
}

function pickResponse(
  entry: (typeof knowledge)[number],
  lang: "english" | "roman-urdu",
): string {
  const count = Math.min(entry.responses.length, entry.urduResponses.length);
  const idx = Math.floor(Math.random() * count);
  return lang === "roman-urdu" ? entry.urduResponses[idx] : entry.responses[idx];
}

/* Mirrors the visitor's language. `detectLanguage` comes from the same
 * engine the StudiesHelper and WellnessOracle demos use, so a Roman Urdu
 * question ("kya uske paas certificates hain?") gets a Roman Urdu answer
 * and an English one keeps the English reply. The question decides the
 * entry exactly as before — language only picks which bank the text comes
 * from, so the curated facts never change between languages.
 *
 * When the visitor packs several questions into one message ("Fatimah kon
 * hai or inko kia kia ata hai?"), every distinct topic that matches is
 * answered, in the order it is asked. A single question keeps the old
 * first-match rule, so "Alibaba certificate" still gets the dedicated
 * Alibaba answer instead of the general certificates list.
 */
function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  const lang = detectLanguage(lower);
  const intents = collectIntents(lower);
  const several = countQuestionMarkers(lower) >= 2;

  if (intents.length > 0) {
    // One question: first matched entry in curated order, exactly as before.
    if (!several) return pickResponse(intents[0].entry, lang);
    // Several questions: answer every distinct topic, in ask order.
    const ordered = [...intents].sort((a, b) => a.pos - b.pos).slice(0, 3);
    // Two markers can still point at one topic ("kia kia aata hai" = skills
    // alone) — answer it plainly rather than prefixing a one-line "breakdown".
    if (ordered.length === 1) return pickResponse(ordered[0].entry, lang);
    const parts = ordered.map(({ entry }) => pickResponse(entry, lang));
    const lead =
      lang === "roman-urdu"
        ? "Suno, sawal ke mutabiq jawab:\n\n"
        : "Sure — here's the answer, point by point:\n\n";
    return lead + parts.join("\n\n");
  }

  const idx = Math.floor(Math.random() * fallbackResponses.length);
  return lang === "roman-urdu" ? urduFallbackResponses[idx] : fallbackResponses[idx];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        { id: Date.now(), text: greeting, sender: "bot", timestamp: new Date() },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const response = getResponse(userMsg.text);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "Does she have certificates?",
    "How do I reach her?",
  ];

  return (
    <>
      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-xl shadow-violet-500/30 flex items-center justify-center hover:shadow-violet-500/50 transition-shadow duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#000000] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-3rem)] bg-[#0e0a1c] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 border-b border-white/[0.06] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0e0a1c]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Fatimah&apos;s Assistant</h3>
                  <p className="text-gray-500 text-xs">AI Portfolio Bot</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-br-md"
                        : "bg-white/[0.05] border border-white/[0.08] text-gray-300 rounded-bl-md whitespace-pre-line"
                    }`}
                  >
                    {msg.sender === "bot" ? renderMessageText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.05] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-fuchsia-400/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-violet-400/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        const userMsg: Message = {
                          id: Date.now(),
                          text: q,
                          sender: "user",
                          timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, userMsg]);
                        setInput("");
                        setIsTyping(true);
                        setTimeout(() => {
                          const response = getResponse(q);
                          setMessages((prev) => [
                            ...prev,
                            { id: Date.now() + 1, text: response, sender: "bot", timestamp: new Date() },
                          ]);
                          setIsTyping(false);
                        }, 1000);
                      }, 100);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/20 text-gray-400 text-xs hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 focus-within:border-violet-500/40 transition-all duration-300">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about Fatimah..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:from-violet-400 hover:to-fuchsia-400 transition-all duration-300 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;