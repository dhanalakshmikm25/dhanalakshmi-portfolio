import { useState, useEffect } from "react";

// ── THEMES ─────────────────────────────────────────────────────────
const DARK = {
  bg:"#070509", bgCard:"#0f0b16", bgCardHov:"#150f1e", nav:"rgba(7,5,9,0.92)",
  border:"rgba(168,85,247,0.18)", borderHi:"rgba(217,70,239,0.45)",
  p1:"#a855f7", p2:"#d946ef", p3:"#818cf8",
  text:"#f1ecff", textSub:"#c4b5fd", muted:"rgba(241,236,255,0.5)", dim:"rgba(241,236,255,0.28)",
  divider:"rgba(168,85,247,0.12)", inputBg:"#0f0b16", shadow:"rgba(0,0,0,0.4)",
};
const LIGHT = {
  bg:"#faf8ff", bgCard:"#ffffff", bgCardHov:"#f5f0ff", nav:"rgba(250,248,255,0.95)",
  border:"rgba(168,85,247,0.2)", borderHi:"rgba(168,85,247,0.5)",
  p1:"#7c3aed", p2:"#c026d3", p3:"#4f46e5",
  text:"#1e0a3c", textSub:"#6d28d9", muted:"#4b3278", dim:"#9272c4",
  divider:"rgba(124,58,237,0.1)", inputBg:"#f5f0ff", shadow:"rgba(124,58,237,0.08)",
};

// ── DATA ───────────────────────────────────────────────────────────
const NAV_ITEMS = ["About","Experience","Education","Projects","Skills","Contact"];

const PROJECTS = [
  { name:"CloudShop Lite",           tag:"Cloud · AWS · Kubernetes",     color:"p1", desc:"Distributed microservices on AWS EKS with Docker orchestration, AI-Ops diagnostic layer, CloudWatch monitoring, and Nginx load balancing for fault-tolerant, dynamically scalable architecture.", stack:["AWS EKS","Docker","Kubernetes","PostgreSQL","Nginx","AI-Ops"], github:"https://github.com/kaanu1d", docs:"#" },
  { name:"MCP + LLM Systems",        tag:"AI · FastAPI · JSON-RPC",      color:"p2", desc:"Secure SQL read-only MCP server enabling safe LLM-database interaction via JSON-RPC tool registry. Dual-agent FastAPI + LLM architecture for automated enterprise diagnostics.",                   stack:["MCP","FastAPI","LLM","JSON-RPC","SQL Server"], github:"https://github.com/kaanu1d", docs:"#" },
  { name:"Intelligent Email Asst.",  tag:"NLP · LoRA · Capstone",        color:"p3", desc:"LLM-integrated email classification, summarization, and contextual retrieval system. LoRA-based privacy-preserving summarization to mitigate information overload.",                               stack:["Python","LoRA","NLP","LLM","RAG"], github:"https://github.com/kaanu1d", docs:"#" },
  { name:"Skin Lesion ViT Research", tag:"Vision Transformers",          color:"p1", desc:"Vision Transformer model for dermoscopic image classification using Multiple Instance Learning. Evaluated with precision, recall, F1-score. Preparing for publication.",                          stack:["ViT","PyTorch","MIL","Python"], github:"https://github.com/kaanu1d", docs:"#" },
  { name:"WasteLens",                tag:"Enterprise Systems · BIS 698", color:"p2", desc:"Food industry waste analysis platform with complete DFD architecture, ERD design, feasibility analysis, risk assessment, and analytics framework for waste classification.",                       stack:["System Design","ERD","DFD","MS Project","Analytics"], github:"https://github.com/kaanu1d", docs:"#" },
  { name:"Housing Affordability Viz",tag:"🏆 Award Winner · Tableau",    color:"p3", desc:"Award-winning Tableau dashboard — 'Where Can You Still Afford a Home in America?' Interactive KPI cards, parameter-driven affordability calculators, and storytelling-based visualization.",      stack:["Tableau","Data Storytelling","KPI Design","EDA"], github:"https://github.com/kaanu1d", docs:"#" },
];

const SKILLS = {
  "Languages":      ["C#","Python","JavaScript","TypeScript","SQL","Java","C"],
  "Frameworks":     [".NET","ASP.NET Core","AngularJS","FastAPI","Entity Framework"],
  "Cloud & DevOps": ["AWS EKS","Docker","Kubernetes","GitLab CI/CD","EC2","RDS","CloudWatch"],
  "Databases":      ["SQL Server","PostgreSQL","MySQL"],
  "AI & Data":      ["Vision Transformers","LoRA","NLP","MCP","Tableau","EDA","Data Modeling"],
  "Tools":          ["Git","VS Code","PowerShell","Nginx","MS Project","MSBuild"],
};

const EXPERIENCE = [
  { role:"Full-Stack Software Developer", org:"Office of Information Technology, CMU", orgUrl:"https://www.cmich.edu/offices-departments/office-of-information-technology", period:"2024 – Present", color:"p1",
    points:[
  "Contributed to maintenance and enhancement of 30+ enterprise .NET (C#), AngularJS, and SQL Server applications supporting 18,000+ university users across academic and administrative departments",
  "Standardized GitLab CI/CD YAML pipelines for 85+ legacy applications, improving deployment stability and reducing environment-related release inconsistencies across UAT, Staging, and Production",
  "Modernized workflow architecture by implementing Building/Room metadata automation, invoice filtering modules, and structured status tracking, reducing request processing latency by ~30%",
  "Optimized SQL Server queries and refactored stored procedures, reducing backend execution time by ~20–35% and improving performance consistency in high-traffic systems",
  "Engineered a secure Model Context Protocol (MCP)–based read-only SQL interface to enable controlled AI-assisted database querying while enforcing strict access governance and preventing unsafe write operations",
  "Enhanced AngularJS controllers to support dynamic sorting, filtering, and reporting capabilities, improving data visibility and administrative decision-making across enterprise applications"
]},
  { role:"Software Engineering Intern",   org:"Secure Systems (Cybersecurity)",         orgUrl:"#", period:"Prior", color:"p2",
    points:["Developed secure web apps with authentication & role-based access control","Performed vulnerability testing and backend API validation (OWASP)","Implemented database encryption and secure data handling practices"] },
  { role:"Software Development Intern",   org:"Farmitopia (Agri-Tech Startup)",          orgUrl:"#", period:"Prior", color:"p3",
    points:["Built backend modules for data collection and processing pipelines","Designed relational database schema for farm-level analytics","Implemented dashboards for monitoring crop metrics and operational insights"] },
  { role:"Teaching Assistant",            org:"Central Michigan University",              orgUrl:"https://www.cmich.edu", period:"Aug–Dec 2023", color:"p1",
    points:["Assisted students with programming and database coursework","Proctored exams, evaluated assignments, and facilitated lab sessions","Served as liaison between students and faculty"] },
];

const EDUCATION = [
  { degree:"M.S. Computer Science",   school:"Central Michigan University", location:"Mount Pleasant, MI", period:"Expected May 2026", courses:["Modern Databases","Cloud Computing","Software Engineering","Intelligent Systems","Big Data Analytics","Data Modeling"], url:"https://www.cmich.edu", color:"p1" },
  { degree:"Bachelor of Engineering", school:"PES University",              location:"Bangalore, India",   period:"2022",             courses:["Data Structures","OS","Computer Networks","OOP","DBMS"],                                                                 url:"https://pes.edu",      color:"p2" },
];

// ── SHARED COMPONENTS ──────────────────────────────────────────────
function GradText({ children, T }) {
  return <span style={{ background:`linear-gradient(90deg,${T.p1},${T.p2})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{children}</span>;
}

function Divider({ T }) {
  return <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.divider},transparent)`, maxWidth:1100, margin:"0 auto" }} />;
}

function SectionTitle({ label, sub, T }) {
  return (
    <div style={{ marginBottom:52, textAlign:"center" }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:T.p1, letterSpacing:4, textTransform:"uppercase", marginBottom:10, opacity:0.75 }}>// {sub}</div>
      <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(26px,4vw,40px)", fontWeight:700, color:T.text, margin:0 }}>{label}</h2>
      <div style={{ width:44, height:2, background:`linear-gradient(90deg,${T.p1},${T.p2})`, margin:"14px auto 0", borderRadius:2 }} />
    </div>
  );
}

function Tag({ label, color }) {
  return <span style={{ padding:"3px 10px", borderRadius:4, border:`1px solid ${color}44`, color, fontSize:11, fontFamily:"'IBM Plex Mono',monospace", letterSpacing:0.8, background:`${color}10` }}>{label}</span>;
}

function SkillChip({ label, color, T }) {
  const [hov, setHov] = useState(false);
  return (
    <span onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ padding:"5px 12px", borderRadius:6, border:`1.5px solid ${hov?color+"66":T.border}`, color:hov?color:T.muted, fontSize:12, fontFamily:"'IBM Plex Mono',monospace", background:hov?`${color}12`:T.inputBg, transition:"all 0.15s", cursor:"default" }}>
      {label}
    </span>
  );
}

// ── UNIFIED BUTTON — same style everywhere ─────────────────────────
function Btn({ href, onClick, children, variant="outline", T, download }) {
  const [hov, setHov] = useState(false);
  const base = { display:"inline-flex", alignItems:"center", gap:7, padding:"9px 20px", borderRadius:8, fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:600, textDecoration:"none", cursor:"pointer", transition:"all 0.2s", letterSpacing:0.3, border:"none" };
  const styles = {
    primary: { ...base, background:`linear-gradient(135deg,${T.p1},${T.p2})`, color:"#fff", boxShadow:hov?`0 0 28px ${T.p1}66`:`0 0 14px ${T.p1}33` },
    outline:  { ...base, background:hov?`${T.p1}16`:"transparent", color:T.p1, border:`1.5px solid ${hov?T.p1:T.border}`, boxShadow:hov?`0 0 12px ${T.p1}22`:"none" },
    ghost:    { ...base, background:hov?`${T.dim}22`:"transparent", color:T.muted, border:`1.5px solid ${hov?T.border:T.divider}` },
  };
  const s = styles[variant]||styles.outline;
  const handlers = { onMouseEnter:()=>setHov(true), onMouseLeave:()=>setHov(false) };
  if (href) return <a href={href} target={download?"_self":"_blank"} rel="noopener noreferrer" download={download||undefined} style={s} {...handlers}>{children}</a>;
  return <button onClick={onClick} style={s} {...handlers}>{children}</button>;
}

// ── NAV ────────────────────────────────────────────────────────────
function Nav({ T, dark, toggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("About");
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      [...NAV_ITEMS].reverse().forEach(n => {
        const el = document.getElementById(n.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(n); }
      });
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, height:62, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px",
      background:scrolled?T.nav:"transparent", backdropFilter:scrolled?"blur(16px)":"none", borderBottom:scrolled?`1px solid ${T.border}`:"none", transition:"all 0.3s" }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color:T.text, letterSpacing:2 }}>
        DKM<GradText T={T}>.</GradText>
      </div>
      <div style={{ display:"flex", gap:4, alignItems:"center" }}>
        {NAV_ITEMS.map(n => {
          const isActive = active===n;
          return (
            <a key={n} href={`#${n.toLowerCase()}`}
              style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:isActive?700:500, letterSpacing:0.3,
                color:isActive?T.p1:T.muted, textDecoration:"none", padding:"6px 13px", borderRadius:8,
                background:isActive?`${T.p1}18`:"transparent", border:`1.5px solid ${isActive?T.p1+"55":"transparent"}`,
                transition:"all 0.2s" }}
              onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.color=T.textSub; e.currentTarget.style.background=`${T.p1}0c`; }}}
              onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.color=T.muted; e.currentTarget.style.background="transparent"; }}}>
              {n}
            </a>
          );
        })}
        {/* Theme toggle */}
        <button onClick={toggle} title="Toggle theme"
          style={{ marginLeft:10, width:36, height:36, borderRadius:9, border:`1.5px solid ${T.border}`, background:T.bgCard, color:T.p1, fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", flexShrink:0 }}>
          {dark?"☀":"🌙"}
        </button>
      </div>
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────────────
function Hero({ T }) {
  const [typed, setTyped] = useState("");
  const full = "Full-Stack Developer · Cloud Architect · AI Researcher";
  useEffect(() => {
    let i=0; const t=setInterval(()=>{ setTyped(full.slice(0,++i)); if(i>=full.length) clearInterval(t); },38);
    return ()=>clearInterval(t);
  }, []);

  return (
    <section id="about" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"110px 60px 80px", maxWidth:1100, margin:"0 auto", position:"relative" }}>
      <div style={{ flex:1, maxWidth:640 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${T.p1}14`, border:`1.5px solid ${T.p1}33`, borderRadius:100, padding:"5px 16px", marginBottom:28 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:T.p2, boxShadow:`0 0 8px ${T.p2}`, display:"inline-block" }} />
          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:T.p2, letterSpacing:2 }}>MS CS · CMU · May 2026</span>
        </div>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"clamp(36px,5.5vw,68px)", color:T.text, lineHeight:1.05, margin:"0 0 4px" }}>Dhanalakshmi</h1>
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:300, fontSize:"clamp(36px,5.5vw,68px)", color:T.dim, lineHeight:1.05, margin:"0 0 24px" }}>Kannur Munirathnam</h1>
        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:14, color:T.p2, marginBottom:28, minHeight:22 }}>
          {typed}<span style={{ animation:"blink 1s step-end infinite" }}>█</span>
        </p>
        <p style={{ color:T.muted, fontSize:15, lineHeight:1.85, maxWidth:520, marginBottom:36 }}>
          Building production-grade cloud systems, AI-integrated applications, and scalable microservices at CMU's Office of Information Technology. Award-winning data visualization. Actively researching multimodal AI & LLM systems.
        </p>
        {/* All 3 buttons use same Btn component — visually consistent */}
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:52 }}>
          <Btn href="#projects" variant="primary" T={T}>View Projects →</Btn>
          <Btn href="#contact"  variant="outline" T={T}>Get In Touch</Btn>
          <Btn href="/resume.pdf" variant="outline" T={T} download={true}>↓ Download Resume</Btn>
        </div>
        <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
          {[{n:"30+",l:"Enterprise Apps",c:T.p1},{n:"85+",l:"CI/CD Migrations",c:T.p2},{n:"6+",l:"Major Projects",c:T.p3},{n:"🏆",l:"CMU Award 2025",c:T.p1}].map(s=>(
            <div key={s.l}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:700, color:s.c, textShadow:`0 0 18px ${s.c}66`, lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:T.dim, letterSpacing:1.5, marginTop:4, textTransform:"uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Orb */}
      <div style={{ position:"absolute", right:40, top:"50%", transform:"translateY(-50%)", width:280, height:280, borderRadius:"50%", background:`radial-gradient(circle,${T.p1}14,transparent 70%)`, border:`1px solid ${T.border}`, pointerEvents:"none" }}>
        <div style={{ position:"absolute", inset:40, borderRadius:"50%", border:`1px solid ${T.p2}10` }} />
        <div style={{ position:"absolute", inset:80, borderRadius:"50%", border:`1px solid ${T.p1}08` }} />
      </div>
    </section>
  );
}

// ── EDUCATION ──────────────────────────────────────────────────────
function Education({ T }) {
  return (
    <section id="education" style={{ padding:"100px 60px", maxWidth:1100, margin:"0 auto" }}>
      <SectionTitle label="Education" sub="academic background" T={T} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(440px,1fr))", gap:20 }}>
        {EDUCATION.map(e => {
          const c = T[e.color];
          return (
            <div key={e.degree} style={{ background:T.bgCard, border:`1.5px solid ${T.border}`, borderRadius:14, padding:"28px 28px", position:"relative", overflow:"hidden", boxShadow:`0 4px 24px ${T.shadow}` }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${c},transparent)` }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:16 }}>
                <div>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color:T.text, marginBottom:5 }}>{e.degree}</div>
                  <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:c, textDecoration:"none" }}>
                    {e.school} · {e.location} ↗
                  </a>
                </div>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:c, background:`${c}14`, border:`1px solid ${c}33`, borderRadius:6, padding:"4px 12px", whiteSpace:"nowrap" }}>{e.period}</span>
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:T.dim, letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Coursework</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {e.courses.map(c2=><Tag key={c2} label={c2} color={c} />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── EXPERIENCE ─────────────────────────────────────────────────────
function ExCard({ e, T }) {
  const [hov, setHov] = useState(false);
  const c = T[e.color];
  return (
    <div style={{ background:T.bgCard, border:`1.5px solid ${hov?c+"44":T.border}`, borderRadius:12, padding:"22px 24px", transition:"all 0.2s", boxShadow:`0 4px 20px ${T.shadow}` }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:12, alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, color:c, marginBottom:4 }}>{e.role}</div>
          <a href={e.orgUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:T.muted, textDecoration:"none", transition:"color 0.15s" }}
            onMouseEnter={ev=>ev.currentTarget.style.color=c}
            onMouseLeave={ev=>ev.currentTarget.style.color=T.muted}>
            {e.org} ↗
          </a>
        </div>
        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:c, background:`${c}12`, border:`1px solid ${c}28`, borderRadius:5, padding:"3px 10px", whiteSpace:"nowrap" }}>{e.period}</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {e.points.map((pt,j)=>(
          <div key={j} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
            <span style={{ color:c, fontSize:13, lineHeight:1.75, flexShrink:0, marginTop:1, opacity:0.8 }}>›</span>
            <span style={{ color:T.muted, fontSize:13, lineHeight:1.75 }}>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Experience({ T }) {
  return (
    <section id="experience" style={{ padding:"100px 60px", maxWidth:1100, margin:"0 auto" }}>
      <SectionTitle label="Experience" sub="where I've worked" T={T} />
      <div style={{ position:"relative", paddingLeft:28 }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1.5, background:`linear-gradient(180deg,${T.p1},${T.p2},${T.p3},${T.p1},transparent)` }} />
        {EXPERIENCE.map((e,i)=>(
          <div key={i} style={{ position:"relative", marginBottom:24 }}>
            <div style={{ position:"absolute", left:-33, top:8, width:11, height:11, borderRadius:"50%", background:T[e.color], boxShadow:`0 0 10px ${T[e.color]}` }} />
            <ExCard e={e} T={T} />
          </div>
        ))}
      </div>
      {/* Leadership */}
      <div style={{ background:T.bgCard, border:`1.5px solid ${T.border}`, borderRadius:12, padding:"20px 24px", marginTop:8, position:"relative", overflow:"hidden", boxShadow:`0 4px 20px ${T.shadow}` }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1.5, background:`linear-gradient(90deg,transparent,${T.p3}55,transparent)` }} />
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:T.p3, letterSpacing:3, textTransform:"uppercase", marginBottom:6, opacity:0.75 }}>Leadership</div>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:15, color:T.text, marginBottom:4 }}>Vice President — Developer Club, PES University</div>
        <div style={{ color:T.muted, fontSize:13 }}>Aug 2022 – May 2024 · Organized hackathons, workshops, and cross-functional team coordination</div>
      </div>
    </section>
  );
}

// ── PROJECTS ───────────────────────────────────────────────────────
function ProjectCard({ p, T }) {
  const [hov, setHov] = useState(false);
  const c = T[p.color];
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:hov?T.bgCardHov:T.bgCard, border:`1.5px solid ${hov?c+"55":T.border}`, borderRadius:12, padding:"24px 22px", transition:"all 0.25s", boxShadow:hov?`0 0 28px ${c}18`:`0 4px 16px ${T.shadow}`, position:"relative", overflow:"hidden" }}>
      {hov&&<div style={{ position:"absolute", top:0, left:0, right:0, height:1.5, background:`linear-gradient(90deg,transparent,${c},transparent)` }} />}
      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:c, margin:"0 0 6px" }}>{p.name}</h3>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:T.dim, letterSpacing:1.5, marginBottom:12, textTransform:"uppercase" }}>{p.tag}</div>
      <p style={{ color:T.muted, fontSize:13, lineHeight:1.75, marginBottom:16 }}>{p.desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
        {p.stack.map(s=><Tag key={s} label={s} color={c} />)}
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <Btn href={p.github} variant="outline" T={T}>⌥ GitHub</Btn>
        <Btn href={p.docs}   variant="outline" T={T}>↗ Docs</Btn>
      </div>
    </div>
  );
}

function Projects({ T }) {
  return (
    <section id="projects" style={{ padding:"100px 60px", maxWidth:1100, margin:"0 auto" }}>
      <SectionTitle label="Projects" sub="what I've built" T={T} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
        {PROJECTS.map(p=><ProjectCard key={p.name} p={p} T={T} />)}
      </div>
    </section>
  );
}

// ── SKILLS ─────────────────────────────────────────────────────────
function Skills({ T }) {
  const colorKeys = ["p1","p2","p3","p1","p2","p3"];
  return (
    <section id="skills" style={{ padding:"100px 60px", maxWidth:1100, margin:"0 auto" }}>
      <SectionTitle label="Skills & Stack" sub="technologies" T={T} />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20, marginBottom:44 }}>
        {Object.entries(SKILLS).map(([cat,items],ci)=>{
          const c = T[colorKeys[ci%colorKeys.length]];
          return (
            <div key={cat} style={{ background:T.bgCard, border:`1.5px solid ${T.border}`, borderRadius:12, padding:"22px 20px", position:"relative", overflow:"hidden", boxShadow:`0 4px 16px ${T.shadow}` }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:1.5, background:`linear-gradient(90deg,transparent,${c}55,transparent)` }} />
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:c, letterSpacing:3, marginBottom:14, textTransform:"uppercase", fontWeight:600 }}>{cat}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {items.map(s=><SkillChip key={s} label={s} color={c} T={T} />)}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ background:`linear-gradient(135deg,${T.p1}10,${T.p2}08)`, border:`1.5px solid ${T.p1}33`, borderRadius:14, padding:"26px 30px", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap", boxShadow:`0 4px 24px ${T.shadow}` }}>
        <div style={{ fontSize:34 }}>🏆</div>
        <div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:16, color:T.text, marginBottom:4 }}>Special Recognition — Excellence in Data Visualization</div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:T.muted }}>CMU Data Visualization Competition · 2025 · "Where Can You Still Afford a Home in America?"</div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────────
function Contact({ T }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const inp = { width:"100%", background:T.inputBg, border:`1.5px solid ${T.border}`, borderRadius:8, padding:"12px 16px", color:T.text, fontFamily:"'IBM Plex Mono',monospace", fontSize:13, outline:"none", transition:"border-color 0.2s" };

  return (
    <section id="contact" style={{ padding:"100px 60px 120px", maxWidth:760, margin:"0 auto" }}>
      <SectionTitle label="Get In Touch" sub="contact" T={T} />
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:36 }}>
        {[{l:"kaanu1d@cmich.edu",h:"mailto:kaanu1d@cmich.edu",i:"✉"},{l:"GitHub",h:"https://github.com/kaanu1d",i:"⌥"},{l:"LinkedIn",h:"#",i:"in"},{l:"989-317-5013",h:"tel:9893175013",i:"☏"}].map(x=>(
          <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px", background:T.bgCard, border:`1.5px solid ${T.border}`, borderRadius:100, fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:500, color:T.muted, textDecoration:"none", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.p1+"66";e.currentTarget.style.color=T.p1;e.currentTarget.style.background=`${T.p1}10`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.muted;e.currentTarget.style.background=T.bgCard;}}>
            <span style={{color:T.p1}}>{x.i}</span>{x.l}
          </a>
        ))}
      </div>
      {/* Resume download — same outline style as other buttons */}
      <div style={{ textAlign:"center", marginBottom:48 }}>
        <Btn href="/resume.pdf" variant="outline" T={T} download={true}>↓ Download Resume (PDF)</Btn>
      </div>
      {!sent ? (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {[["name","Name","John Doe"],["email","Email","john@example.com"]].map(([k,label,ph])=>(
              <div key={k}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:T.p1, letterSpacing:2, marginBottom:6, textTransform:"uppercase", opacity:0.75 }}>{label}</div>
                <input value={form[k]} onChange={set(k)} placeholder={ph} style={inp} onFocus={e=>e.target.style.borderColor=T.p1+"66"} onBlur={e=>e.target.style.borderColor=T.border} />
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:T.p1, letterSpacing:2, marginBottom:6, textTransform:"uppercase", opacity:0.75 }}>Message</div>
            <textarea value={form.message} onChange={set("message")} placeholder="Tell me about the opportunity or project..." rows={5} style={{...inp,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=T.p1+"66"} onBlur={e=>e.target.style.borderColor=T.border} />
          </div>
          <div><Btn variant="primary" T={T} onClick={()=>setSent(true)}>Send Message →</Btn></div>
        </div>
      ) : (
        <div style={{ padding:"40px", background:`${T.p1}08`, border:`1.5px solid ${T.p1}33`, borderRadius:14, textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:10 }}>✦</div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color:T.p1, marginBottom:6 }}>Message Sent!</div>
          <div style={{ color:T.muted, fontSize:14 }}>Thanks for reaching out — I'll get back to you soon.</div>
        </div>
      )}
    </section>
  );
}

// ── BACKGROUND FX ──────────────────────────────────────────────────
function Background({ T, dark }) {
  if (!dark) return null;
  return (
    <>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, opacity:0.04, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.012) 2px,rgba(0,0,0,0.012) 4px)" }} />
      <div style={{ position:"fixed", top:"-20vh", right:"-10vw", width:"50vw", height:"50vw", borderRadius:"50%", background:`radial-gradient(circle,${T.p1}10,transparent 70%)`, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:"-15vh", left:"-8vw", width:"40vw", height:"40vw", borderRadius:"50%", background:`radial-gradient(circle,${T.p2}08,transparent 70%)`, pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"40vh", left:"-5vw", width:"25vw", height:"25vw", borderRadius:"50%", background:`radial-gradient(circle,${T.p3}07,transparent 70%)`, pointerEvents:"none", zIndex:0 }} />
    </>
  );
}

function Footer({ T }) {
  return (
    <footer style={{ borderTop:`1px solid ${T.border}`, padding:"24px 60px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:T.dim }}>© 2025 Dhanalakshmi Kannur Munirathnam</div>
      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:T.dim }}>Built with React · Hosted on Vercel</div>
    </footer>
  );
}

// ── APP ────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const T = dark ? DARK : LIGHT;

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.text, position:"relative", overflowX:"hidden", transition:"background 0.3s,color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&family=IBM+Plex+Mono:wght@300;400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{margin:0}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${T.bg}}
        ::-webkit-scrollbar-thumb{background:${T.p1}55;border-radius:2px}
        ::selection{background:${T.p1}44;color:${T.text}}
        section{position:relative;z-index:1}
      `}</style>
      <Background T={T} dark={dark} />
      <Nav T={T} dark={dark} toggle={()=>setDark(d=>!d)} />
      <Hero       T={T} />
      <Divider    T={T} />
      <Experience T={T} />
      <Divider    T={T} />
      <Education  T={T} />
      <Divider    T={T} />
      <Projects   T={T} />
      <Divider    T={T} />
      <Skills     T={T} />
      <Divider    T={T} />
      <Contact    T={T} />
      <Footer     T={T} />
    </div>
  );
}
