import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import vyomLogo from "@/imports/WhatsApp_Image_2026-09-08_at_3.06.36_PM.jpeg";

// ── Color tokens (Coolors palette) ─────────────────────────────────────────
// bg:       #F6F4F5  (smoke white)
// surface:  #FFFFFF
// card:     #FFFFFF
// border:   #C2DFD5  (teal-mint)
// primary:  #005064  (deep teal)
// secondary:#2FA8C2  (sky blue)
// accent:   #BA5A31  (rust orange)
// gray:     #919098  (neutral gray)
// text:     #005064
// muted:    #919098

const PRODUCTS = [
  {
    tag: "Industrial",
    name: "Power Distribution Boards",
    desc: "Reliable and safe distribution of electricity — designed for high performance and long-lasting durability across demanding environments.",
    img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="10" y="15" width="60" height="50" rx="3" strokeWidth="1.5"/><line x1="10" y1="28" x2="70" y2="28" strokeWidth="1"/><rect x="16" y="34" width="10" height="8" rx="1" strokeWidth="1"/><rect x="30" y="34" width="10" height="8" rx="1" strokeWidth="1"/><rect x="44" y="34" width="10" height="8" rx="1" strokeWidth="1"/><line x1="20" y1="50" x2="20" y2="58" strokeWidth="1.5"/><line x1="40" y1="50" x2="40" y2="58" strokeWidth="1.5"/><line x1="60" y1="50" x2="60" y2="58" strokeWidth="1.5"/></svg>,
  },
  {
    tag: "Multi-use",
    name: "Electrical Distribution Boards",
    desc: "Built to handle electrical systems with efficiency and reliability, offering protection and control for a wide variety of applications.",
    img: "https://images.unsplash.com/photo-1635335874521-7987db781153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="8" y="10" width="64" height="60" rx="3" strokeWidth="1.5"/><line x1="8" y1="24" x2="72" y2="24" strokeWidth="1"/><rect x="14" y="30" width="8" height="12" rx="1" strokeWidth="1"/><rect x="26" y="30" width="8" height="12" rx="1" strokeWidth="1"/><rect x="38" y="30" width="8" height="12" rx="1" strokeWidth="1"/><rect x="50" y="30" width="8" height="12" rx="1" strokeWidth="1"/><rect x="14" y="50" width="52" height="8" rx="2" strokeWidth="1"/></svg>,
  },
  {
    tag: "Premium",
    name: "Legrand Distribution Boards",
    desc: "Premium boards featuring advanced Legrand technology — superior performance and safety, ideal for commercial and industrial environments.",
    img: "https://images.unsplash.com/photo-1566417110090-6b15a06ec800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="12" y="12" width="56" height="56" rx="4" strokeWidth="1.5"/><circle cx="40" cy="40" r="12" strokeWidth="1.5"/><circle cx="40" cy="40" r="4" strokeWidth="1.5"/><line x1="40" y1="12" x2="40" y2="28" strokeWidth="1"/><line x1="40" y1="52" x2="40" y2="68" strokeWidth="1"/><line x1="12" y1="40" x2="28" y2="40" strokeWidth="1"/><line x1="52" y1="40" x2="68" y2="40" strokeWidth="1"/></svg>,
  },
  {
    tag: "Versatile",
    name: "Distribution Panel Boards",
    desc: "Optimal power distribution with versatility and robust functionality, meeting the demands of complex electrical systems.",
    img: "https://images.unsplash.com/photo-1558054665-fbe00cd7d920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="6" y="6" width="68" height="68" rx="3" strokeWidth="1.5"/><rect x="14" y="14" width="24" height="24" rx="2" strokeWidth="1"/><rect x="42" y="14" width="24" height="24" rx="2" strokeWidth="1"/><rect x="14" y="42" width="24" height="24" rx="2" strokeWidth="1"/><rect x="42" y="42" width="24" height="24" rx="2" strokeWidth="1"/></svg>,
  },
  {
    tag: "Safety",
    name: "MCB Distribution Boards",
    desc: "Miniature Circuit Breaker boards providing essential protection against overcurrents and short circuits for electrical circuit safety.",
    img: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="20" y="8" width="40" height="64" rx="4" strokeWidth="1.5"/><rect x="26" y="16" width="28" height="4" rx="1" strokeWidth="1"/><rect x="26" y="24" width="28" height="4" rx="1" strokeWidth="1"/><rect x="26" y="32" width="28" height="4" rx="1" strokeWidth="1"/><circle cx="40" cy="52" r="8" strokeWidth="1.5"/><path d="M36 52l3 3 6-6" strokeWidth="1.5"/></svg>,
  },
  {
    tag: "3-Phase",
    name: "TPN Distribution Boards",
    desc: "Three-Phase Neutral boards designed for high-efficiency industrial applications, providing uninterrupted power flow for critical operations.",
    img: "https://images.unsplash.com/photo-1660330589693-99889d60181e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><path d="M40 8 L70 26 L70 54 L40 72 L10 54 L10 26 Z" strokeWidth="1.5"/><path d="M40 20 L58 30 L58 50 L40 60 L22 50 L22 30 Z" strokeWidth="1"/><circle cx="40" cy="40" r="6" strokeWidth="1.5"/></svg>,
  },
  {
    tag: "Premium+",
    name: "Legrand MCB Distribution Boards",
    desc: "Combining Legrand's trusted technology with MCB safety features for maximum reliability and protection in electrical systems.",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="10" y="18" width="60" height="44" rx="3" strokeWidth="1.5"/><line x1="10" y1="30" x2="70" y2="30" strokeWidth="1"/><rect x="16" y="36" width="6" height="10" rx="1" strokeWidth="1"/><rect x="26" y="36" width="6" height="10" rx="1" strokeWidth="1"/><rect x="36" y="36" width="6" height="10" rx="1" strokeWidth="1"/><rect x="46" y="36" width="6" height="10" rx="1" strokeWidth="1"/><path d="M56 36 L62 41 L56 46" strokeWidth="1.5"/></svg>,
  },
  {
    tag: "Industrial",
    name: "Electric Control Panels",
    desc: "Efficient electric control panels essential for the automated operation of machinery and complex industrial systems.",
    img: "https://images.unsplash.com/photo-1601462904263-f2fa0c851cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="8" y="8" width="64" height="64" rx="4" strokeWidth="1.5"/><rect x="16" y="16" width="20" height="20" rx="2" strokeWidth="1"/><rect x="44" y="16" width="20" height="20" rx="2" strokeWidth="1"/><rect x="16" y="44" width="48" height="20" rx="2" strokeWidth="1"/><circle cx="26" cy="54" r="4" strokeWidth="1"/><circle cx="54" cy="54" r="4" strokeWidth="1"/></svg>,
  },
  {
    tag: "Commercial",
    name: "Control Panels",
    desc: "Designed for industrial and commercial purposes — ensuring smooth operations, efficient energy use, and enhanced safety across facilities.",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    svg: <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="w-16 h-16"><rect x="10" y="10" width="60" height="60" rx="4" strokeWidth="1.5"/><rect x="18" y="18" width="44" height="14" rx="2" strokeWidth="1"/><rect x="18" y="36" width="18" height="18" rx="2" strokeWidth="1"/><rect x="44" y="36" width="18" height="18" rx="2" strokeWidth="1"/><line x1="18" y1="60" x2="62" y2="60" strokeWidth="1"/></svg>,
  },
];

const SERVICE_DATA = [
  {
    num: "01",
    name: "Customized Electrical Solutions",
    desc: "Every project has unique requirements. Vyom Industries offers custom-designed electrical distribution boards and control panels tailored to meet your specific needs — whether for small residential setups or large-scale industrial projects.",
    features: ["Site assessment and requirement analysis", "Custom board and panel design", "Industrial and residential expertise", "Scalable from small to large projects"],
    img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    imgAlt: "Custom electrical components",
  },
  {
    num: "02",
    name: "Installation & Commissioning",
    desc: "Our team of experts provides professional installation and commissioning services, ensuring that your electrical systems are set up safely, efficiently, and to the highest technical standards.",
    features: ["Expert field installation team", "Full commissioning and testing", "Safety compliance verification", "Handover documentation provided"],
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    imgAlt: "Electrician installing wiring",
  },
  {
    num: "03",
    name: "Consultation & Design",
    desc: "Setting up a new electrical system or upgrading an existing one? Our engineers offer expert consultation to design systems that are reliable, safe, and cost-effective for your specific environment.",
    features: ["Free initial consultation", "System design and planning", "Code compliance review", "Cost-benefit analysis"],
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    imgAlt: "Engineer consulting on design",
  },
  {
    num: "04",
    name: "After-Sales Support",
    desc: "We believe in long-term customer satisfaction. Our after-sales services include troubleshooting, product maintenance, and technical support to ensure the continued performance of your electrical systems.",
    features: ["Dedicated technical support", "Remote and on-site troubleshooting", "Spare parts availability", "Extended warranty options"],
    img: "https://images.unsplash.com/photo-1635335874521-7987db781153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    imgAlt: "Switch box wiring support",
  },
  {
    num: "05",
    name: "Maintenance Services",
    desc: "Regular maintenance is key to longevity. We offer scheduled maintenance services to ensure your distribution boards and control panels operate at peak efficiency throughout their lifecycle.",
    features: ["Scheduled preventive maintenance", "Annual maintenance contracts", "Performance monitoring", "Priority response times"],
    img: "https://images.unsplash.com/photo-1558054665-fbe00cd7d920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    imgAlt: "Industrial panel maintenance",
  },
];

const WHY_CARDS = [
  { icon: <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>, title: "Commitment to Quality", desc: "Stringent quality control tests on every product for maximum safety and reliability." },
  { icon: <path d="M13 10V3L4 14h7v7l9-11h-7z"/>, title: "Innovation & Expertise", desc: "Latest technology combined with deep industry expertise for advanced, cost-effective solutions." },
  { icon: <><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></>, title: "Tailored Solutions", desc: "Custom-designed products for every scale — from small setups to large industrial projects." },
  { icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>, title: "Customer-Centric", desc: "Transparency, timely delivery, and strong after-sales support building long-term trust." },
  { icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>, title: "Reliability & Timeliness", desc: "On-time delivery commitment ensuring your projects are never delayed." },
  { icon: <><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></>, title: "Sustainability", desc: "Energy-efficient products that minimize environmental impact and optimize usage." },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const ITEMS_PER_SLIDE = 3;

function ProductCarousel({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [index, setIndex] = useState(0);
  const total = Math.ceil(PRODUCTS.length / ITEMS_PER_SLIDE);
  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);
  const slice = PRODUCTS.slice(index * ITEMS_PER_SLIDE, index * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-6 min-h-[400px]">
        {slice.map((p, i) => (
          <div key={p.name + index} className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default group"
            style={{ background: "#FFFFFF", border: "1px solid #C2DFD5", opacity: 0, animation: `fadeUp 0.5s ${i * 0.08}s forwards` }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#BA5A31")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#C2DFD5")}>
            <div className="h-[200px] relative overflow-hidden" style={{ borderBottom: "1px solid #C2DFD5" }}>
              <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest px-2 py-1 rounded" style={{ background: "rgba(0,80,100,0.72)", color: "#fff", backdropFilter: "blur(4px)" }}>{p.tag}</span>
              {p.img ? (
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: "#F6F4F5" }}>
                  <div className="text-[#C2DFD5] transition-colors duration-300 group-hover:text-[#BA5A31]">{p.svg}</div>
                </div>
              )}
            </div>
            <div className="p-6">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.03em", color: "#005064" }}>{p.name}</div>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "#919098" }}>{p.desc}</p>
              <button onClick={() => scrollTo("contact")} className="mt-4 flex items-center gap-1 text-xs uppercase tracking-widest transition-all hover:gap-2" style={{ color: "#BA5A31", letterSpacing: "0.1em" }}>
                Request Quote →
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className="rounded-full transition-all duration-300" style={{ width: i === index ? 28 : 8, height: 8, background: i === index ? "#BA5A31" : "#C2DFD5" }} />
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={prev} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: "#FFFFFF", border: "1px solid #C2DFD5" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#005064" strokeWidth="2" className="w-4 h-4"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: "#BA5A31" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" className="w-4 h-4"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", interest: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: "", lastName: "", email: "", phone: "", interest: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const svc = SERVICE_DATA[activeService];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#F6F4F5", color: "#005064", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[190] flex flex-col items-center justify-center gap-10" style={{ background: "#F6F4F5" }}>
          <div className="absolute top-4 left-8 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ background: "#fff" }}>
              <ImageWithFallback src={vyomLogo} alt="Vyom Industries globe icon" className="w-full object-cover object-top" style={{ height: "180%", marginTop: "-2%" }} />
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", color: "#005064", lineHeight: 1 }}>
              VYOM <span style={{ color: "#BA5A31" }}>INDUSTRIES</span>
            </span>
          </div>
          {["home","about","products","services","contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} className="uppercase tracking-widest text-3xl font-bold transition-colors hover:text-[#BA5A31]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#005064" }}>
              {id}
            </button>
          ))}
          <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-6 text-2xl" style={{ color: "#005064" }}>✕</button>
        </div>
      )}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 md:px-16 h-[68px] transition-all duration-300"
        style={{ background: scrolled ? "rgba(246,244,245,0.97)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid #C2DFD5" : "1px solid transparent" }}>
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ background: "#fff" }}>
            <ImageWithFallback src={vyomLogo} alt="Vyom Industries globe icon" className="w-full object-cover object-top" style={{ height: "180%", marginTop: "-2%" }} />
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.35rem", letterSpacing: "0.06em", color: "#005064", lineHeight: 1 }}>
            VYOM <span style={{ color: "#BA5A31" }}>INDUSTRIES</span>
          </span>
        </button>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {["home","about","products","services"].map(id => (
            <li key={id}><button onClick={() => scrollTo(id)} className="text-xs uppercase tracking-widest transition-colors hover:text-[#BA5A31]" style={{ color: "#919098", letterSpacing: "0.1em" }}>{id}</button></li>
          ))}
          <li><button onClick={() => scrollTo("contact")} className="text-xs uppercase tracking-widest font-medium px-5 py-2 rounded text-white transition-colors" style={{ background: "#BA5A31", letterSpacing: "0.08em" }}>Request Quote</button></li>
        </ul>
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(true)}>
          {[0,1,2].map(i => <span key={i} className="block w-6 h-0.5" style={{ background: "#005064" }} />)}
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen relative flex items-center overflow-hidden px-8 md:px-16 pt-20">
        {/* clean bg gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-[50%] h-full opacity-[0.03]" style={{ background: "linear-gradient(to left, #BA5A31, transparent)" }}/>
          <div className="absolute left-0 bottom-0 w-[40%] h-[60%] opacity-[0.06]" style={{ background: "linear-gradient(to top right, #2FA8C2, transparent)" }}/>
        </div>
        <div className="relative z-10 max-w-4xl w-full">
          <div className="flex items-center gap-3 mb-8" style={{ opacity: 0, animation: "fadeUp 0.7s 0.2s forwards" }}>
            <span className="w-12 h-0.5" style={{ background: "#BA5A31" }}/>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "#BA5A31" }}>Est. 2018 · Pune, Maharashtra</span>
          </div>
          <h1 className="leading-[0.9] mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem,10vw,10rem)", letterSpacing: "0.01em", color: "#005064", opacity: 0, animation: "fadeUp 0.8s 0.35s forwards" }}>
            POWER<br/>YOUR<br/><span style={{ color: "#BA5A31" }}>WORLD</span>
          </h1>
          <p className="text-lg mb-12 max-w-2xl leading-relaxed" style={{ color: "#919098", opacity: 0, animation: "fadeUp 0.8s 0.5s forwards" }}>
            High-quality electrical distribution boards and control panels for industrial and residential applications. Built for precision. Built to last.
          </p>
          <div className="flex flex-wrap gap-5" style={{ opacity: 0, animation: "fadeUp 0.8s 0.65s forwards" }}>
            <button onClick={() => scrollTo("products")} className="px-10 py-4 rounded-lg text-sm uppercase font-medium tracking-widest text-white transition-all hover:shadow-lg" style={{ background: "#BA5A31", letterSpacing: "0.1em" }}>Explore Products</button>
            <button onClick={() => scrollTo("contact")} className="px-10 py-4 rounded-lg text-sm uppercase tracking-widest transition-all" style={{ border: "2px solid #C2DFD5", color: "#005064", letterSpacing: "0.1em" }}>Request Quote</button>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl" style={{ opacity: 0, animation: "fadeUp 0.8s 0.8s forwards" }}>
            {[["9+","Product Lines"],["5","Services"],["2018","Founded"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", color: "#BA5A31", lineHeight: 1 }}>{n}</div>
                <div className="text-xs uppercase tracking-widest mt-2" style={{ color: "#919098" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-8 md:px-16" style={{ background: "#FFFFFF", borderTop: "1px solid #C2DFD5" }}>
        <div className="max-w-7xl mx-auto">
          {/* Top label */}
          <Reveal>
            <div className="flex items-center gap-3 mb-3"><span className="w-5 h-0.5" style={{ background: "#BA5A31" }}/><span className="text-xs uppercase tracking-[0.18em]" style={{ color: "#BA5A31" }}>About Us</span></div>
          </Reveal>

          {/* Two-column: text left, decorative stats right */}
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-stretch">
            {/* Left */}
            <Reveal>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem,5vw,5rem)", lineHeight: 0.92, letterSpacing: "0.02em", color: "#005064" }}>
                POWERING<br/><span style={{ color: "#BA5A31" }}>INDUSTRIES</span><br/>SINCE 2018
              </h2>
              <p className="mt-6 text-sm leading-relaxed max-w-lg" style={{ color: "#919098" }}>
                Vyom Industries is a Pune-based manufacturer and supplier of high-quality electrical distribution boards and control panels. We serve diverse industries with reliable, innovative solutions — from small residential setups to large-scale industrial projects.
              </p>
              <div className="mt-8 flex flex-col gap-3 max-w-lg">
                <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5" }}>
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded" style={{ background: "rgba(186,90,49,0.12)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#BA5A31" strokeWidth="1.5" className="w-4 h-4"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "#BA5A31", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em", fontSize: "0.95rem" }}>Our Vision</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#919098" }}>To be a global leader in reliable, innovative, and sustainable electrical distribution solutions.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-xl" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5" }}>
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded" style={{ background: "rgba(0,80,100,0.08)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2FA8C2" strokeWidth="1.5" className="w-4 h-4"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "#2FA8C2", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em", fontSize: "0.95rem" }}>Our Mission</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#919098" }}>To deliver top-notch electrical products with innovation, exceptional service, and a culture of sustainability and integrity.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: accent panel */}
            <Reveal delay={0.15}>
              <div className="h-full rounded-2xl overflow-hidden relative flex flex-col" style={{ background: "linear-gradient(135deg, #005064 60%, #2FA8C2)", minHeight: 420 }}>
                {/* decorative stripe */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#BA5A31" }} />
                <div className="flex-1 flex flex-col justify-between p-10">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>By the numbers</div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                      {[["9+","Product Lines"],["5","Services"],["100%","Quality Tested"],["2018","Year Founded"]].map(([n, l]) => (
                        <div key={l} className="pl-4" style={{ borderLeft: "2px solid #BA5A31" }}>
                          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "#BA5A31", lineHeight: 1 }}>{n}</div>
                          <div className="text-[10px] uppercase tracking-widest mt-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                      From Pune to projects across Maharashtra — delivering electrical solutions that power industries, protect assets, and enable growth.
                    </p>
                    <button onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-all hover:gap-3" style={{ color: "#BA5A31" }}>
                      Get in Touch →
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-8 md:px-16" style={{ background: "#F6F4F5", borderTop: "1px solid #C2DFD5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left heading */}
            <Reveal>
              <div className="flex items-center gap-3 mb-5"><span className="w-5 h-0.5" style={{ background: "#BA5A31" }}/><span className="text-xs uppercase tracking-[0.18em]" style={{ color: "#BA5A31" }}>Why Choose Us</span></div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,4vw,4rem)", lineHeight: 0.93, letterSpacing: "0.02em", color: "#005064" }}>
                SIX REASONS<br/>TO TRUST<br/><span style={{ color: "#BA5A31" }}>VYOM</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed max-w-sm" style={{ color: "#919098" }}>
                We combine engineering excellence with customer dedication — every product and service reflects our commitment to quality, safety, and reliability.
              </p>
            </Reveal>

            {/* Right: 2×3 cards */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {WHY_CARDS.map((c, i) => (
                  <div key={c.title} className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{ background: "#FFFFFF", border: "1px solid #C2DFD5" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#BA5A31"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(186,90,49,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#C2DFD5"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg" style={{ background: i % 2 === 0 ? "rgba(186,90,49,0.1)" : "rgba(0,80,100,0.07)" }}>
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-4 h-4" style={{ stroke: i % 2 === 0 ? "#BA5A31" : "#2FA8C2" }}>{c.icon}</svg>
                      </div>
                      <div className="text-xs font-medium leading-tight" style={{ color: "#005064" }}>{c.title}</div>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: "#919098" }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 px-8 md:px-16" style={{ background: "#F6F4F5" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="flex items-center gap-3 mb-4"><span className="w-5 h-0.5" style={{ background: "#BA5A31" }}/><span className="text-xs uppercase tracking-[0.18em]" style={{ color: "#BA5A31" }}>Our Products</span></div></Reveal>
          <div className="grid md:grid-cols-2 gap-8 items-end mb-12">
            <Reveal><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#005064" }}>DISTRIBUTION<br/><span style={{ color: "#BA5A31" }}>SOLUTIONS</span></h2></Reveal>
            <Reveal delay={0.1}><p className="text-sm leading-relaxed" style={{ color: "#919098" }}>A comprehensive range of high-quality electrical distribution boards and control panels — engineered for performance, durability, and safety across industrial and residential applications.</p></Reveal>
          </div>
          <Reveal delay={0.1}>
            <ProductCarousel scrollTo={scrollTo} />
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-8 md:px-16" style={{ background: "#FFFFFF", borderTop: "1px solid #C2DFD5" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="flex items-center gap-3 mb-4"><span className="w-5 h-0.5" style={{ background: "#BA5A31" }}/><span className="text-xs uppercase tracking-[0.18em]" style={{ color: "#BA5A31" }}>Our Services</span></div></Reveal>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <Reveal><h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#005064" }}>END-TO-END<br/><span style={{ color: "#BA5A31" }}>SUPPORT</span></h2></Reveal>
              <div className="mt-8">
                {SERVICE_DATA.map((s, i) => (
                  <div key={s.num} className="py-6 cursor-pointer transition-all duration-300" style={{ borderBottom: "1px solid #C2DFD5", borderTop: i === 0 ? "1px solid #C2DFD5" : "none" }} onClick={() => setActiveService(i)}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", lineHeight: 1, color: activeService === i ? "#BA5A31" : "#C2DFD5", transition: "color 0.3s" }}>{s.num}</span>
                        <span className="text-sm font-medium" style={{ color: "#005064" }}>{s.name}</span>
                      </div>
                      <span className="transition-all duration-300" style={{ color: activeService === i ? "#BA5A31" : "#919098", transform: activeService === i ? "translateX(4px)" : "none" }}>→</span>
                    </div>
                    {activeService === i && (
                      <p className="mt-3 text-sm leading-relaxed pl-14" style={{ color: "#919098" }}>{s.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Reveal delay={0.2}>
              <div className="rounded-xl overflow-hidden sticky top-24" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5" }}>
                <div className="h-52 overflow-hidden">
                  <img src={svc.img} alt={svc.imgAlt} className="w-full h-full object-cover transition-all duration-500" />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(186,90,49,0.1)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#BA5A31" strokeWidth="1.5" className="w-7 h-7">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em", color: "#005064" }}>{svc.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#919098" }}>{svc.desc}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    {svc.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm" style={{ color: "#005064" }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#BA5A31" }}/>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scrollTo("contact")} className="mt-6 inline-block px-6 py-3 rounded text-sm font-medium text-white" style={{ background: "#BA5A31" }}>Request Consultation</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY BANNER */}
      <div className="py-20 px-8 md:px-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #005064, #2FA8C2)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", lineHeight: 0.95, color: "#fff" }}>TRUSTED BY INDUSTRY.<br/>BUILT FOR RELIABILITY.</h2>
            <p className="mt-6 max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>From Pune to projects across Maharashtra, Vyom Industries delivers electrical distribution solutions that power industries, protect assets, and enable growth.</p>
            <button onClick={() => scrollTo("contact")} className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white pb-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.4)" }}>Get in Touch →</button>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[["9+","Product Lines"],["5","Services Offered"],["100%","Quality Tested"],["2018","Year Founded"]].map(([n,l]) => (
              <div key={l} className="pl-5" style={{ borderLeft: "3px solid rgba(186,90,49,0.5)" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "#BA5A31", lineHeight: 1 }}>{n}</div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-8 md:px-16" style={{ background: "#F6F4F5", borderTop: "1px solid #C2DFD5" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal><div className="flex items-center gap-3 mb-4"><span className="w-5 h-0.5" style={{ background: "#BA5A31" }}/><span className="text-xs uppercase tracking-[0.18em]" style={{ color: "#BA5A31" }}>Contact Us</span></div></Reveal>
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <Reveal>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,5vw,5rem)", lineHeight: 0.95, letterSpacing: "0.02em", color: "#005064" }}>LET'S POWER<br/><span style={{ color: "#BA5A31" }}>YOUR PROJECT</span></h2>
              <p className="mt-6 mb-10 text-sm leading-relaxed" style={{ color: "#919098" }}>Whether you need a standard product or a fully customized solution, we are ready to assist you. Get in touch today and let us help you power your world with precision and reliability.</p>
              <div className="flex flex-col gap-6">
                {[
                  { label: "Phone", value: "+91 8329851287", icon: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> },
                  { label: "Email", value: "harshal.vyomindustries@gmail.com", icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
                  { label: "Address", value: "372, Vivekanand Rd, Maharashtra Colony, Sector No. 1, Bhosari, Pimpri-Chinchwad, Pune — 411026", icon: <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></> },
                ].map(c => (
                  <div key={c.label} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#FFFFFF", border: "1px solid #C2DFD5" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#BA5A31" strokeWidth="1.5" className="w-5 h-5">{c.icon}</svg>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#919098" }}>{c.label}</div>
                      <div className="text-sm" style={{ color: "#005064" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-xl p-10" style={{ background: "#FFFFFF", border: "1px solid #C2DFD5" }}>
                {submitted ? (
                  <div className="h-64 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl" style={{ background: "#005064" }}>✓</div>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", color: "#005064" }}>Request Sent!</h3>
                    <p className="text-sm" style={{ color: "#919098" }}>We'll be in touch with you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.03em", color: "#005064", marginBottom: "1.5rem" }}>REQUEST A QUOTE</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {[["firstName","First Name","Rahul"],["lastName","Last Name","Sharma"]].map(([k,l,p]) => (
                        <div key={k} className="flex flex-col gap-1.5">
                          <label className="text-xs uppercase tracking-widest" style={{ color: "#919098" }}>{l}</label>
                          <input type="text" placeholder={p} value={form[k as keyof typeof form]} onChange={e => setForm({ ...form, [k]: e.target.value })} required className="px-4 py-3 rounded text-sm outline-none transition-all" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5", color: "#005064" }} onFocus={e => (e.target.style.borderColor = "#BA5A31")} onBlur={e => (e.target.style.borderColor = "#C2DFD5")} />
                        </div>
                      ))}
                    </div>
                    {[["email","Email Address","email","rahul@company.com"],["phone","Phone Number","tel","+91 9876543210"]].map(([k,l,t,p]) => (
                      <div key={k} className="flex flex-col gap-1.5 mb-4">
                        <label className="text-xs uppercase tracking-widest" style={{ color: "#919098" }}>{l}</label>
                        <input type={t} placeholder={p} value={form[k as keyof typeof form]} onChange={e => setForm({ ...form, [k]: e.target.value })} required className="px-4 py-3 rounded text-sm outline-none transition-all" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5", color: "#005064" }} onFocus={e => (e.target.style.borderColor = "#BA5A31")} onBlur={e => (e.target.style.borderColor = "#C2DFD5")} />
                      </div>
                    ))}
                    <div className="flex flex-col gap-1.5 mb-4">
                      <label className="text-xs uppercase tracking-widest" style={{ color: "#919098" }}>Product / Service Interest</label>
                      <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} className="px-4 py-3 rounded text-sm outline-none" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5", color: "#005064" }}>
                        <option value="">Select an option...</option>
                        {["Power Distribution Boards","Electrical Distribution Boards","Legrand Distribution Boards","MCB Distribution Boards","TPN Distribution Boards","Electric Control Panels","Control Panels","Customized Solutions","Installation & Commissioning","Consultation & Design","Maintenance Services"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5 mb-6">
                      <label className="text-xs uppercase tracking-widest" style={{ color: "#919098" }}>Message</label>
                      <textarea rows={4} placeholder="Tell us about your project requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="px-4 py-3 rounded text-sm outline-none resize-none" style={{ background: "#F6F4F5", border: "1px solid #C2DFD5", color: "#005064" }} onFocus={e => (e.target.style.borderColor = "#BA5A31")} onBlur={e => (e.target.style.borderColor = "#C2DFD5")} />
                    </div>
                    <button type="submit" className="w-full py-4 rounded text-sm font-medium uppercase tracking-widest text-white transition-colors" style={{ background: "#BA5A31", letterSpacing: "0.1em" }}>Send Request →</button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 pt-12 pb-8" style={{ background: "#FFFFFF", borderTop: "1px solid #C2DFD5" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0" style={{ background: "#fff", border: "1px solid #C2DFD5" }}>
                  <ImageWithFallback src={vyomLogo} alt="Vyom Industries globe icon" className="w-full object-cover object-top" style={{ height: "180%", marginTop: "-2%" }} />
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "0.06em", color: "#005064", lineHeight: 1.1 }}>
                  VYOM<br/><span style={{ color: "#BA5A31" }}>INDUSTRIES</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#919098" }}>High-quality electrical distribution boards and control panels for industrial and residential applications. Founded 2018, Pune, India.</p>
            </div>
            {[
              { h: "Products", links: ["Power Distribution Boards","Electrical Distribution Boards","Legrand Distribution Boards","MCB Distribution Boards","TPN Distribution Boards","Control Panels"] },
              { h: "Services", links: ["Customized Solutions","Installation & Commissioning","Consultation & Design","After-Sales Support","Maintenance Services"] },
              { h: "Company", links: ["About Us","Vision & Mission","Why Vyom Industries","Contact Us","Request a Quote"] },
            ].map(col => (
              <div key={col.h}>
                <div className="text-xs uppercase tracking-[0.15em] mb-4" style={{ color: "#BA5A31" }}>{col.h}</div>
                <ul className="flex flex-col gap-2">
                  {col.links.map(l => (
                    <li key={l}><button className="text-xs transition-colors hover:text-[#BA5A31]" style={{ color: "#919098" }} onClick={() => scrollTo(col.h.toLowerCase() === "company" ? "about" : col.h.toLowerCase())}>{l}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs" style={{ borderTop: "1px solid #C2DFD5", color: "#919098" }}>
            <span>© 2026 Vyom Industries. All rights reserved. Pune, Maharashtra, India.</span>
            <span>+91 8329851287 · harshal.vyomindustries@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
