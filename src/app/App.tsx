import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  X, // <-- Ícono nuevo para cerrar el pop-up
} from "lucide-react";
import carImage from "../assets/car-cutout.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const PAGES = ["home", "projects", "skills", "contact"] as const;
type Page = (typeof PAGES)[number];

const PAGE_LABELS: Record<Page, string> = {
  home: "Inicio",
  projects: "Proyectos",
  skills: "Habilidades",
  contact: "Contacto",
};

const PROJECTS = [
  {
    title: "Tickets X",
    desc: "Participe en este proyecto como desarrollador tanto backend como front end aplicando diferentes tecnicas de codigo, usando APIS, etc...",
    tech: ["TypeScript", "Node.js", "CSS", "JavaScript"],
    emoji: "🛍️",
    link: "https://github.com/ChrisDjMh/ProyectoAurelioParte2.git", // <--- AGREGA TU LINK AQUÍ
  },
  {
    title: "Age Recovery v1",
    desc: "Participe activamente en este proyecto como desarrollador backend y algo de frontend",
   tech: ["PHP", "HTML", "CSS", "JavaScript"],
    emoji: "✅",
    link: "https://github.com/ChrisDjMh/CopiaEjercicio.git", // <--- AGREGA TU LINK AQUÍ
  },
  {
    title: "Magical Superpowers",
    desc: "Videojuego con mas de 3.1 Millones de visitas siendo el desarrollador y dueño principal del juego, unico Desarrollador",
    tech: ["LUA"],
    emoji: "✅",
    link: "https://www.roblox.com/games/12747041813/Magical-SuperPowers", // <--- AGREGA TU LINK AQUÍ
  },
    {
    title: "Magical Superpowers Tycoon 2",
    desc: "Proyecto mas reciente siendo el desarrollador y dueño principal del juego, unico Desarrollador trabajando y actualizando el juego activamente actualmente",
    tech: ["LUA"],
    emoji: "✅",
    link: "https://www.roblox.com/games/136511590274888/Magical-Superpowers-Tycoon-2", // <--- AGREGA TU LINK AQUÍ
  },
];

const SKILLS = [
  { name: "JavaScript", color: "#F7DF1E", pct: 50 },
  { name: "TypeScript", color: "#60A5FA", pct: 60 },
  { name: "React", color: "#7EE8FA", pct: 70 },
  { name: "Node.js", color: "#86EFAC", pct: 80 },
  { name: "Python", color: "#FDE68A", pct: 90 },
  { name: "PostgreSQL", color: "#93C5FD", pct: 80 },
  { name: "MongoDB", color: "#6EE7B7", pct: 80 },
  { name: "LUA", color: "#F0ABFC", pct: 95 },
];

// ─── Motion Variants ──────────────────────────────────────────────────────────

const contentVariants = {
  enter: (dir: number) => ({
    x: dir === 0 ? 0 : dir > 0 ? "100%" : "-100%",
    opacity: dir === 0 ? 0 : 0.85,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 270, damping: 28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.93,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 0.55] as const },
  }),
};

// ─── Road Scene Components ───────────────────────────────────────────────────

function LampPost() {
  return (
    <svg viewBox="0 0 44 128" width="42" height="110" xmlns="http://www.w3.org/2000/svg">
      <rect x="19" y="30" width="5" height="98" fill="#111" />
      <path d="M 21 30 Q 21 10 36 7" stroke="#111" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="36" cy="5" r="8" fill="#1A1A1A" />
      <circle cx="36" cy="5" r="5.5" fill="#FFF9C4" opacity="0.88" />
      <circle cx="36" cy="5" r="12" fill="#FFFDE7" opacity="0.12" />
      <rect x="14" y="122" width="15" height="6" rx="2" fill="#111" />
    </svg>
  );
}

function BushClump({ v }: { v: number }) {
  const palettes: [string, string, string][] = [
    ["#4CAF50", "#2E7D32", "#66BB6A"],
    ["#388E3C", "#1B5E20", "#4CAF50"],
    ["#43A047", "#2E7D32", "#56CC62"],
  ];
  const [a, b, c] = palettes[v % 3];
  return (
    <svg viewBox="0 0 110 62" width="110" height="62" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="55" cy="46" rx="52" ry="20" fill={b} />
      <ellipse cx="55" cy="37" rx="42" ry="23" fill={a} />
      <ellipse cx="26" cy="39" rx="27" ry="19" fill={a} />
      <ellipse cx="84" cy="39" rx="27" ry="19" fill={a} />
      <ellipse cx="55" cy="28" rx="25" ry="17" fill={c} />
      <circle cx="22" cy="21" r="4" fill="#FFD700" />
      <circle cx="55" cy="13" r="4" fill="#FFD700" />
      <circle cx="88" cy="21" r="4" fill="#FFD700" />
      <circle cx="37" cy="24" r="3" fill="#FFD700" />
      <circle cx="73" cy="24" r="3" fill="#FFD700" />
      <circle cx="22" cy="21" r="1.5" fill="#FF8C00" />
      <circle cx="55" cy="13" r="1.5" fill="#FF8C00" />
      <circle cx="88" cy="21" r="1.5" fill="#FF8C00" />
      <circle cx="37" cy="24" r="1.2" fill="#FF8C00" />
      <circle cx="73" cy="24" r="1.2" fill="#FF8C00" />
    </svg>
  );
}

function CarShowcase({ fast }: { fast: boolean }) {
  const scrollDur = fast ? "1.5s" : "8s";
  const lampDur = fast ? "3s" : "16s";
  const bobDur = fast ? "0.32s" : "1.3s";

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 overflow-hidden" style={{ top: "38%", height: "26%", background: "#1E5C0A" }}>
          <div className="flex absolute bottom-0 left-0 items-end" style={{ width: "200%", animation: `bbScrollLeft ${scrollDur} linear infinite` }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="flex-shrink-0" style={{ width: "calc(100% / 22)" }}>
                <BushClump v={i} />
              </div>
            ))}
          </div>
          <div className="flex absolute bottom-0 left-0 items-end" style={{ width: "200%", animation: `bbScrollLeft ${lampDur} linear infinite` }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 flex justify-center" style={{ width: "16.66%" }}>
                <LampPost />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-0 right-0" style={{ top: "64%", height: "4.5%", background: "repeating-linear-gradient(90deg, #CC1100 0px, #CC1100 22px, #ffffff 22px, #ffffff 44px)", backgroundSize: "44px 100%", animation: `bbCurbScroll ${scrollDur} linear infinite` }} />
        <div className="absolute left-0 right-0 bottom-0" style={{ top: "68.5%", background: "#888888" }}>
          <div className="absolute top-0 left-0 right-0" style={{ background: "#AAAAAA", height: 4 }} />
          <div className="absolute left-0 right-0 overflow-hidden" style={{ top: "44%", height: 6, transform: "translateY(-50%)" }}>
            <div className="flex absolute left-0" style={{ width: "200%", animation: `bbScrollLeft ${scrollDur} linear infinite` }}>
              {Array.from({ length: 56 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 mx-3" style={{ background: "#FFFFFF", width: 48, height: 6, opacity: 0.9 }} />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0" style={{ background: "#777777", height: 4 }} />
        </div>
      </div>
      <div className="absolute" style={{ right: "5%", bottom: "3%", width: "85%", maxWidth: "700px", zIndex: 5 }}>
        <div style={{ animation: `bbCarBob ${bobDur} ease-in-out infinite` }}>
          <img src={carImage} alt="Auto convertible rosa" className="w-full h-auto block" style={{ filter: "drop-shadow(0 22px 22px rgba(150,0,70,0.35))" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Page Sections (Text Only) ───────────────────────────────────────────────

function HomePage() {
  return (
    <div className="flex flex-col items-start justify-center text-left gap-5 w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.22)", color: "#fff" }}>
        <Sparkles size={14} />
        Web Developer
      </div>
      <h1 className="leading-tight" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)", color: "#fff", textShadow: "0 2px 20px rgba(180,0,80,0.4)" }}>
        Hola, soy<br />
        <span style={{ textShadow: "0 2px 28px rgba(255,255,255,0.55)" }}>Christian</span>
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
        Bienvenido, busco crear experiencias web hermosas y funcionales. Apasionada por el código limpio, el diseño creativo y las soluciones que marcan la diferencia.
      </p>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="w-full">
      <h2 className="text-left mb-5" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2.2rem, 4.4vw, 3rem)", color: "#fff", textShadow: "0 2px 12px rgba(180,0,80,0.35)" }}>
        Mis Proyectos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[45vh] lg:max-h-[35vh] overflow-y-auto pr-1">
        {PROJECTS.map((p) => (
          <div key={p.title} className="rounded-2xl p-4 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl flex gap-3" style={{ background: "rgba(255,255,255,0.93)" }}>
            <div className="text-3xl leading-none">{p.emoji}</div>
            <div className="min-w-0">
              <h3 className="mb-1" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem", color: "#C0005A" }}>{p.title}</h3>
              <p className="text-sm mb-2 leading-relaxed" style={{ color: "rgba(92,10,53,0.82)" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {p.tech.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#FFE0F0", color: "#C0005A" }}>{t}</span>)}
              </div>
              {/* AQUÍ ESTÁ EL CAMBIO: usamos la propiedad 'link' y 'target="_blank"' para abrir en otra pestaña */}
              <a 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-xs font-bold hover:underline w-fit" 
                style={{ color: "#D4006B" }}
              >
                Ver proyecto <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function SkillsPage() {
  return (
    <div className="w-full">
      <h2 className="text-left mb-5" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2.2rem, 4.4vw, 3rem)", color: "#fff", textShadow: "0 2px 12px rgba(180,0,80,0.35)" }}>
        Mis Habilidades
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 max-h-[45vh] lg:max-h-[35vh] overflow-y-auto pr-1">
        {SKILLS.map((s, i) => (
          <div key={s.name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-bold" style={{ color: "#fff" }}>{s.name}</span>
              <span className="text-sm font-black tabular-nums" style={{ color: s.color, textShadow: "0 0 8px rgba(0,0,0,0.15)" }}>{s.pct}%</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: 11, background: "rgba(255,255,255,0.22)" }}>
              <motion.div className="h-full rounded-full" style={{ background: s.color }} initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.75, delay: i * 0.055, ease: "easeOut" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="flex flex-col items-start text-left gap-6 w-full max-w-md">
      <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2.4rem, 5vw, 3.4rem)", color: "#fff", textShadow: "0 2px 16px rgba(180,0,80,0.4)" }}>
        ¡Hablemos!
      </h2>
      <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.88)" }}>
        ¿Tienes un proyecto en mente o quieres colaborar? Me encantaría escucharte.
      </p>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [fast, setFast] = useState(false);
  
  // Estado para el modal de correo
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navegación por flechas (relativa)
  const navigate = (dir: number) => {
    const next = pageIdx + dir;
    if (next < 0 || next >= PAGES.length) return;
    setDirection(dir);
    setFast(true);
    setPageIdx(next);
    setTimeout(() => setFast(false), 950);
  };

  // Navegación directa (para botones y dots)
  const goToPage = (targetIdx: number) => {
    if (targetIdx === pageIdx) return;
    const dir = targetIdx > pageIdx ? 1 : -1;
    setDirection(dir);
    setFast(true);
    setPageIdx(targetIdx);
    setTimeout(() => setFast(false), 950);
  };

  const currentPage = PAGES[pageIdx];

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden flex flex-col justify-between"
      style={{
        background: "linear-gradient(150deg, #FF0DB0 0%, #FF38BE 45%, #FF72CC 100%)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <style>{`
        @keyframes bbScrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bbCurbScroll {
          from { background-position-x: 0px; }
          to   { background-position-x: -44px; }
        }
        @keyframes bbCarBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>

      {/* Decorative blobs */}
      <div className="absolute rounded-full pointer-events-none" style={{ top: "-14%", right: "-7%", width: 300, height: 300, background: "#FF00AA", opacity: 0.17 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ top: "-5%", left: "-9%", width: 200, height: 200, background: "#C0007A", opacity: 0.13 }} />

      {/* Nav dots */}
      <div className="absolute left-1/2 z-30 flex gap-6 justify-center top-6 -translate-x-1/2">
        {PAGES.map((p, i) => (
          <button key={p} onClick={() => goToPage(i)} className="flex flex-col items-center gap-1 group">
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === pageIdx ? 14 : 10,
                height: i === pageIdx ? 14 : 10,
                background: i === pageIdx ? "#fff" : "rgba(255,255,255,0.38)",
                boxShadow: i === pageIdx ? "0 0 12px rgba(255,255,255,0.6)" : "none",
              }}
            />
            <span className="text-xs font-bold transition-all" style={{ color: i === pageIdx ? "#fff" : "rgba(255,255,255,0.45)" }}>
              {PAGE_LABELS[p]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Main Layout Split ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row justify-between px-6 sm:px-10 pt-20 pb-8 flex-1 gap-8 lg:gap-12">
        
        {/* Columna Izquierda: Texto e Información */}
        <div className="relative w-full lg:flex-1">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={pageIdx}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {currentPage === "home" && <HomePage />}
              {currentPage === "projects" && <ProjectsPage />}
              {currentPage === "skills" && <SkillsPage />}
              {currentPage === "contact" && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Columna Derecha: Botones y Flechas */}
        <div className="flex flex-col justify-end items-start lg:items-start gap-5 w-full lg:w-auto shrink-0 z-20">
          
          <div className="relative w-full">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={pageIdx}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col items-start"
              >
                {/* Botones de Inicio */}
                {currentPage === "home" && (
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      onClick={() => goToPage(1)} // <-- Navega a Proyectos (índice 1)
                      className="flex items-center gap-2 font-bold px-6 py-3 rounded-full shadow-lg text-sm transition-transform hover:scale-105" 
                      style={{ background: "#fff", color: "#D4006B" }}
                    >
                      <Code2 size={16} /> Ver proyectos
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(true)} // <-- Abre el modal
                      className="flex items-center gap-2 font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 cursor-pointer" 
                      style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.45)", color: "#fff" }}
                    >
                      <Mail size={16} /> Contacto
                    </button>
                  </div>
                )}
                
                {/* Botones de Contacto */}
                {currentPage === "contact" && (
                  <div className="flex flex-col gap-3 w-full sm:w-64">
                    <button 
                      onClick={() => setIsModalOpen(true)} 
                      className="w-full flex items-center justify-center gap-3 font-bold py-3.5 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer" 
                      style={{ background: "#fff", color: "#D4006B" }}
                    >
                      <Mail size={18} /> Enviar Mensaje
                    </button>
                    
                    {/* Botón de GitHub vinculado a tu perfil */}
                    <a 
                      href="https://github.com/ChrisDjMh" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 font-bold py-3.5 rounded-full transition-all hover:scale-105" 
                      style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.42)", color: "#fff" }}
                    >
                      <Github size={18} /> GitHub
                    </a>
                    
                   
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flechas de Navegación */}
          <div className="flex items-center gap-3 mt-2 lg:mt-0">
            <button
              onClick={() => navigate(-1)}
              disabled={pageIdx === 0}
              className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{ width: 46, height: 46, background: "rgba(255,255,255,0.22)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => navigate(1)}
              disabled={pageIdx === PAGES.length - 1}
              className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{ width: 46, height: 46, background: "rgba(255,255,255,0.22)", border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      </div>

      {/* ── Road Scene ── */}
      <div className="relative w-full shrink-0 h-[40vh] lg:h-[45vh]">
        <CarShowcase fast={fast} />
      </div>

      {/* ── Modal Pop-up de Contacto ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative"
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#D4006B] transition-colors"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Dancing Script', cursive", color: "#D4006B" }}>
                Envíame un mensaje
              </h3>
              
              {/* Formulario (Muestra alerta al enviar para probar la UI) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("¡Mensaje simulado enviado con éxito! 🚀");
                  setIsModalOpen(false);
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Tu Nombre"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF0DB0] focus:ring-2 focus:ring-[#FF0DB0]/20 transition-all text-gray-700"
                />
                <input
                  type="email"
                  placeholder="Tu Correo"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF0DB0] focus:ring-2 focus:ring-[#FF0DB0]/20 transition-all text-gray-700"
                />
                <textarea
                  placeholder="Escribe tu mensaje aquí..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF0DB0] focus:ring-2 focus:ring-[#FF0DB0]/20 transition-all resize-none text-gray-700"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
                  style={{ background: "linear-gradient(150deg, #FF0DB0 0%, #FF72CC 100%)" }}
                >
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}