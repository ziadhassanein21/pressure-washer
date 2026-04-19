import { useState, useEffect, useRef } from "react";
// Import CSS files for organized styling
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/components.css";
import "./styles/responsive.css";

const PRODUCT_IMG = "https://cdn.salla.sa/PdbNje/91fd6006-90f2-4526-a9ba-710c36f04418-1000x1000-tzkQ9dEOTlWsxxWjESLASRhcKm59APoTJc7Hb26J.png";
const PRODUCT_IMG2 = "https://cdn.salla.sa/PdbNje/95ecf8fe-55c9-488d-bcc0-92ee7a1220e4-750x1000-IjlMmpKE5wTyQAa68QtRp18Nl9pGrMX5UpFnm3qH.jpg";
const PRODUCT_IMG3 = "https://cdn.salla.sa/PdbNje/d2f809ac-68a2-4280-9d6c-5f4590a4ecc1-750x1000-Q4FFyJZdEIlYzOdDa67s5uWjElTUxUuzk4ePSwqH.jpg";
  }
  .price-current {
    font-family: var(--font-display); font-size: 64px;
    font-weight: 900; line-height: 1; color: var(--text-hi);
  }
  .price-currency { font-size: 28px; color: var(--cyan); }
  .price-meta { display: flex; flex-direction: column; gap: 4px; }
  .price-old {
    font-size: 18px; color: var(--text-lo);
    text-decoration: line-through; font-weight: 400;
  }
  .price-save {
    background: var(--cyan); color: #000;
    font-family: var(--font-display); font-size: 13px; font-weight: 800;
    letter-spacing: 1px; padding: 3px 10px; width: fit-content;
  }
  .hero-actions {
    display: flex; gap: 16px; align-items: center;
    animation: fadeUp 0.7s 0.55s ease both; opacity: 0;
  }
  .btn-buy {
    background: var(--cyan); color: #000; border: none; cursor: pointer;
    font-family: var(--font-display); font-weight: 900;
    font-size: 18px; letter-spacing: 2px; text-transform: uppercase;
    padding: 18px 48px;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    transition: all 0.25s ease; text-decoration: none; display: inline-block;
    position: relative; overflow: hidden;
  }
  .btn-buy::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    background-size: 400px 100%;
    animation: shimmer 3s infinite;
  }
  .btn-buy:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 12px 40px var(--cyan-glow); }
  .btn-more {
    background: transparent; cursor: pointer;
    font-family: var(--font-display); font-weight: 700;
    font-size: 15px; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--steel); border: 1px solid var(--border-hi);
    padding: 17px 32px; transition: all 0.25s ease;
    text-decoration: none; display: inline-block;
  }
  .btn-more:hover { color: var(--cyan); border-color: var(--cyan); background: var(--cyan-dim); }
  .hero-trust {
    display: flex; gap: 24px; align-items: center;
    animation: fadeUp 0.7s 0.65s ease both; opacity: 0;
  }
  .trust-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; color: var(--text-mid); font-weight: 500;
  }
  .trust-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--cyan); flex-shrink: 0; }

  /* ── HERO RIGHT ── */
  .hero-right {
    position: relative; z-index: 2;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .hero-img-container {
    position: relative;
    animation: float 6s ease-in-out infinite;
  }
  .hero-img-glow {
    position: absolute; inset: -40px;
    background: radial-gradient(ellipse 60% 60% at 50% 60%, rgba(0,180,255,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-img {
    width: 480px; height: 480px; object-fit: contain;
    position: relative; z-index: 1;
    filter: drop-shadow(0 40px 80px rgba(0,180,255,0.25)) drop-shadow(0 0 1px rgba(0,180,255,0.5));
  }
  .hero-specs-overlay {
    position: absolute; left: -20px; top: 50%;
    transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 12px;
    animation: fadeUp 0.8s 0.8s ease both; opacity: 0;
  }
  .spec-pill {
    background: rgba(13,19,24,0.9);
    border: 1px solid var(--border-hi);
    backdrop-filter: blur(12px);
    padding: 10px 16px;
    display: flex; align-items: center; gap: 10px;
    cursor: default;
    transition: all 0.2s ease;
  }
  .spec-pill:hover {
    border-color: var(--cyan);
    background: rgba(0,180,255,0.08);
    transform: translateX(-4px);
  }
  .spec-pill-num {
    font-family: var(--font-display); font-size: 22px; font-weight: 900;
    color: var(--cyan); line-height: 1;
  }
  .spec-pill-label { font-size: 11px; color: var(--text-mid); font-weight: 500; letter-spacing: 0.5px; }
  .hero-sold-badge {
    position: absolute; bottom: 60px; right: -10px;
    background: var(--bg-raised); border: 1px solid var(--border-hi);
    padding: 12px 20px; backdrop-filter: blur(12px);
    animation: fadeUp 0.8s 1s ease both; opacity: 0;
  }
  .sold-num { font-family: var(--font-display); font-size: 32px; font-weight: 900; color: var(--text-hi); }
  .sold-label { font-size: 12px; color: var(--text-mid); letter-spacing: 1px; }

  /* ── STATS BAR ── */
  .stats-bar {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg-surface);
  }
  .stat-item {
    padding: 36px 24px; text-align: center;
    border-left: 1px solid var(--border);
    position: relative; overflow: hidden;
    transition: background 0.3s ease;
  }
  .stat-item:last-child { border-left: none; }
  .stat-item::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--cyan);
    transform: scaleX(0); transform-origin: center;
    transition: transform 0.3s ease;
  }
  .stat-item:hover::before { transform: scaleX(1); }
  .stat-item:hover { background: var(--cyan-dim); }
  .stat-num {
    font-family: var(--font-display); font-size: 52px; font-weight: 900;
    color: var(--text-hi); line-height: 1;
    display: block;
  }
  .stat-unit { color: var(--cyan); font-size: 28px; }
  .stat-label { font-size: 13px; color: var(--text-mid); margin-top: 6px; letter-spacing: 0.5px; font-weight: 500; }

  /* ── SECTIONS ── */
  .section { position: relative; padding: 100px 48px; overflow: hidden; }
  .section-label {
    display: inline-flex; align-items: center; gap: 10px;
    margin-bottom: 20px;
  }
  .section-label-line { width: 32px; height: 1px; background: var(--cyan); }
  .section-label-text {
    font-family: var(--font-display); font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase; color: var(--cyan);
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(40px, 5vw, 64px);
    font-weight: 900; line-height: 0.95; text-transform: uppercase;
    color: var(--text-hi); letter-spacing: -1px;
    margin-bottom: 20px;
  }
  .section-title .ghost { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
  .section-body { font-size: 16px; line-height: 1.8; color: var(--text-mid); max-width: 540px; }

  /* ── SPECS SECTION ── */
  .specs-layout {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: start; margin-top: 60px;
  }
  .spec-list { display: flex; flex-direction: column; gap: 2px; }
  .spec-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    cursor: default; transition: all 0.25s ease;
    position: relative; overflow: hidden;
  }
  .spec-row::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 0; background: var(--cyan);
    transition: width 0.25s ease;
  }
  .spec-row:hover { border-color: var(--border-hi); }
  .spec-row:hover::before { width: 3px; }
  .spec-row:hover .spec-value { color: var(--cyan); }
  .spec-name { font-size: 14px; color: var(--text-mid); font-weight: 500; position: relative; z-index: 1; }
  .spec-value {
    font-family: var(--font-display); font-size: 22px; font-weight: 800;
    color: var(--text-hi); letter-spacing: 0.5px;
    transition: color 0.25s ease; position: relative; z-index: 1;
  }
  .specs-visual {
    position: relative; display: flex; align-items: center; justify-content: center;
  }
  .specs-img-wrap {
    position: relative; width: 360px; height: 420px;
  }
  .specs-img-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,180,255,0.1) 0%, transparent 70%);
    border: 1px solid var(--border);
  }
  .specs-img {
    width: 100%; height: 100%; object-fit: contain;
    padding: 24px;
    filter: drop-shadow(0 20px 60px rgba(0,180,255,0.2));
  }
  .corner-mark {
    position: absolute; width: 20px; height: 20px;
    border-color: var(--cyan); border-style: solid; border-width: 0;
  }
  .corner-mark.tl { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
  .corner-mark.tr { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
  .corner-mark.bl { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }
  .corner-mark.br { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }

  /* ── FEATURES SECTION ── */
  .features-section { background: var(--bg-surface); }
  .features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; margin-top: 60px;
    border: 1px solid var(--border);
  }
  .feat-card {
    background: var(--bg-card);
    padding: 40px 32px; cursor: default;
    transition: all 0.3s ease;
    position: relative; overflow: hidden;
    border: 1px solid transparent;
  }
  .feat-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--cyan-dim) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s ease;
  }
  .feat-card:hover { border-color: var(--border-hi); transform: translateY(-4px); z-index: 1; }
  .feat-card:hover::after { opacity: 1; }
  .feat-icon-wrap {
    width: 52px; height: 52px; margin-bottom: 24px;
    display: flex; align-items: center; justify-content: center;
    background: var(--cyan-dim); border: 1px solid var(--border-hi);
    position: relative; z-index: 1;
  }
  .feat-icon { font-size: 22px; }
  .feat-title {
    font-family: var(--font-display); font-size: 20px; font-weight: 800;
    color: var(--text-hi); margin-bottom: 12px; letter-spacing: 0.3px;
    position: relative; z-index: 1;
  }
  .feat-text { font-size: 14px; line-height: 1.7; color: var(--text-mid); position: relative; z-index: 1; }

  /* ── ACCESSORIES ── */
  .acc-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; margin-top: 60px;
  }
  .acc-card {
    background: var(--bg-card); border: 1px solid var(--border);
    padding: 32px 20px; text-align: center;
    cursor: default; transition: all 0.25s ease;
    position: relative; overflow: hidden;
  }
  .acc-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 0; background: var(--cyan);
    transition: height 0.25s ease;
  }
  .acc-card:hover { border-color: var(--cyan); }
  .acc-card:hover::before { height: 2px; }
  .acc-icon { font-size: 36px; margin-bottom: 16px; display: block; }
  .acc-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text-hi); }
  .acc-detail { font-size: 12px; color: var(--text-mid); margin-top: 4px; }

  /* ── IMAGE GALLERY ── */
  .gallery-section { background: var(--bg-surface); }
  .gallery-grid {
    display: grid; grid-template-columns: 1.4fr 1fr 1fr;
    gap: 2px; margin-top: 60px; height: 480px;
  }
  .gallery-item {
    overflow: hidden; position: relative; cursor: pointer;
    border: 1px solid var(--border);
  }
  .gallery-item img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s ease; filter: brightness(0.8);
  }
  .gallery-item:hover img { transform: scale(1.06); filter: brightness(1); }
  .gallery-item-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,180,255,0.2) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ── CTA SECTION ── */
  .cta-section {
    position: relative; overflow: hidden; text-align: center;
    padding: 120px 48px;
    background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 100%);
  }
  .cta-bg-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,180,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-title {
    font-family: var(--font-display); font-size: clamp(52px, 7vw, 96px);
    font-weight: 900; text-transform: uppercase; letter-spacing: -2px; line-height: 0.9;
    position: relative; z-index: 1; margin-bottom: 24px;
  }
  .cta-price-display {
    display: inline-flex; align-items: baseline; gap: 8px; margin-bottom: 40px;
    position: relative; z-index: 1;
  }
  .cta-currency { font-family: var(--font-display); font-size: 28px; color: var(--cyan); font-weight: 700; }
  .cta-price { font-family: var(--font-display); font-size: 80px; font-weight: 900; color: var(--text-hi); line-height: 1; }
  .cta-actions { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 1; margin-bottom: 40px; }
  .cta-trust {
    display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;
    position: relative; z-index: 1;
  }

  /* ── PAYMENT ── */
  .payment-row {
    display: flex; gap: 10px; flex-wrap: wrap;
    justify-content: center; align-items: center; margin-top: 24px;
  }
  .pay-badge {
    background: var(--bg-raised); border: 1px solid var(--border);
    font-size: 12px; font-weight: 700; color: var(--steel);
    padding: 6px 16px; letter-spacing: 0.5px;
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--bg-deep); border-top: 1px solid var(--border);
    padding: 48px; display: flex; justify-content: space-between; align-items: center;
  }
  .footer-logo { font-family: var(--font-display); font-size: 24px; font-weight: 900; letter-spacing: 2px; }
  .footer-logo span { color: var(--cyan); }
  .footer-links { display: flex; gap: 24px; }
  .footer-links a { font-size: 13px; color: var(--text-mid); text-decoration: none; letter-spacing: 0.5px; transition: color 0.2s; }
  .footer-links a:hover { color: var(--cyan); }
  .footer-copy { font-size: 12px; color: var(--text-lo); letter-spacing: 0.5px; }

  /* ── SCROLLED REVEAL ── */
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; min-height: auto; }
    .hero-right { display: none; }
    .hero-left { padding: 60px 24px 48px; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .specs-layout { grid-template-columns: 1fr; }
    .specs-visual { display: none; }
    .features-grid { grid-template-columns: 1fr; }
    .acc-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-grid { grid-template-columns: 1fr; height: auto; }
    .section { padding: 72px 24px; }
    .footer { flex-direction: column; gap: 24px; text-align: center; }
    .footer-links { flex-wrap: wrap; justify-content: center; }
    .nav { padding: 0 24px; }
    .cta-actions { flex-direction: column; align-items: center; }
  }
`;

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function AnimatedNumber({ target, suffix = "", duration = 1500 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * ease));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{value}{suffix}</span>;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const specs = [
    { name: "العلامة التجارية", value: "BOSS" },
    { name: "الضغط", value: "80–90 بار" },
    { name: "القدرة الكهربائية", value: "3000 واط" },
    { name: "طول الخرطوم", value: "7 متر" },
    { name: "مصدر المياه", value: "سطل / حنفية" },
    { name: "التقنية", value: "ألمانية" },
    { name: "التصنيف", value: "معدات احترافية" },
    { name: "التوريد الكامل", value: "جميع الملحقات" },
  ];

  const features = [
    { icon: "⚡", title: "3000 واط مستمرة", text: "تدفق قوي ومتواصل دون انقطاع — مصمم للاستخدام اليومي المكثف." },
    { icon: "💧", title: "ضغط 90 بار", text: "يزيل أعتى الأوساخ والملوثات من السيارات والأسطح الثقيلة في ثوانٍ." },
    { icon: "🔧", title: "تقنية ألمانية BOSS", text: "جودة هندسية مُثبتة. أكثر من 113 عملية شراء ناجحة وتقييمات موثوقة." },
    { icon: "🧴", title: "فوم قن مدمج", text: "رغوة كثيفة وجاهزة — لا تحتاج لشراء إضافات لتجربة تنظيف احترافية." },
    { icon: "🎒", title: "كفرات للنقل", text: "تصميم عملي يسهّل الحمل والتخزين في أي بيئة عمل أو مرآب." },
    { icon: "🪣", title: "مرونة المياه", text: "سحب مباشر من السطل أو الشبكة — مرونة كاملة في أي موقع." },
  ];

  const accessories = [
    { icon: "🔫", name: "مسدس رش", detail: "تحكم كامل بزاوية الرش" },
    { icon: "🌊", name: "خرطوم 7م", detail: "وصول بعيد دون تحريك الجهاز" },
    { icon: "🧴", name: "فوم قن", detail: "رغوة كثيفة للتنظيف العميق" },
    { icon: "🔌", name: "التوصيلات", detail: "كامل التجهيزات جاهزة للاستخدام" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">
          عدتنا<span>.</span>
          <div className="nav-dot" />
        </div>
        <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="nav-cta">
          اشتري الآن
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />

        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">متجر عدتنا — معدات احترافية</span>
          </div>

          <div className="hero-badge">
            <span style={{color:"#FF6B2B",fontSize:"9px"}}>●</span>
            خصم 5% — عرض محدود
          </div>

          <h1 className="hero-title">
            واشقان<br />
            مضخة <span className="accent-word">BOSS</span><br />
            <span className="highlight">غسيل</span>
          </h1>

          <p className="hero-sub">
            مضخة ضغط عالٍ بتقنية ألمانية — 3000 واط، ضغط 90 بار.
            تنظيف احترافي للسيارات والأسطح الثقيلة بكل سهولة ودقة.
          </p>

          <div className="hero-price-block">
            <span className="price-current">
              <span className="price-currency">ر.س </span>400
            </span>
            <div className="price-meta">
              <span className="price-old">420 ر.س</span>
              <span className="price-save">وفّر 20 ر.س</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="btn-buy">
              أضف إلى السلة
            </a>
            <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="btn-more">
              التفاصيل
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item"><div className="trust-dot" />شحن سريع وآمن</div>
            <div className="trust-item"><div className="trust-dot" />دفع آمن 100%</div>
            <div className="trust-item"><div className="trust-dot" />موثّق في منصة الأعمال</div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-specs-overlay">
            {[
              { num: "3000", label: "واط" },
              { num: "90", label: "بار" },
              { num: "7م", label: "خرطوم" },
            ].map((s, i) => (
              <div key={i} className="spec-pill">
                <div>
                  <div className="spec-pill-num">{s.num}</div>
                  <div className="spec-pill-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-img-container">
            <div className="hero-img-glow" />
            <img src={PRODUCT_IMG} alt="BOSS Pressure Washer" className="hero-img" />
          </div>

          <div className="hero-sold-badge">
            <div className="sold-num">113+</div>
            <div className="sold-label">عملية شراء ناجحة</div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          { num: 3000, suffix: "", unit: "W", label: "قدرة كهربائية بالواط" },
          { num: 90, suffix: "", unit: "BAR", label: "ضغط الماء" },
          { num: 7, suffix: "", unit: "M", label: "طول الخرطوم" },
          { num: 113, suffix: "+", unit: "", label: "عميل راضٍ" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-num">
              <AnimatedNumber target={s.num} suffix={s.suffix} />
              {s.unit && <span className="stat-unit"> {s.unit}</span>}
            </span>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SPECS */}
      <section className="section" id="specs">
        <div className="reveal">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">المواصفات التقنية</span>
          </div>
          <h2 className="section-title">
            قوة <span className="ghost">مصممة</span><br />للمحترفين
          </h2>
          <p className="section-body">
            كل مواصفة مُختارة بعناية لتمنحك الأداء الأعلى في كل جلسة تنظيف.
          </p>
        </div>

        <div className="specs-layout">
          <div className="spec-list reveal">
            {specs.map((s, i) => (
              <div key={i} className="spec-row">
                <span className="spec-name">{s.name}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="specs-visual reveal">
            <div className="specs-img-wrap">
              <div className="specs-img-bg" />
              <div className="corner-mark tl" /><div className="corner-mark tr" />
              <div className="corner-mark bl" /><div className="corner-mark br" />
              <img src={PRODUCT_IMG2} alt="BOSS Washer detail" className="specs-img" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section" id="features">
        <div className="reveal">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">لماذا BOSS</span>
          </div>
          <h2 className="section-title">
            الأداء <span className="ghost">يتكلم</span><br />عن نفسه
          </h2>
        </div>
        <div className="features-grid reveal">
          {features.map((f, i) => (
            <div key={i} className="feat-card">
              <div className="feat-icon-wrap"><span className="feat-icon">{f.icon}</span></div>
              <div className="feat-title">{f.title}</div>
              <p className="feat-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery-section" id="gallery">
        <div className="reveal">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">معرض الصور</span>
          </div>
          <h2 className="section-title">شاهد المنتج<br /><span className="ghost">عن قرب</span></h2>
        </div>
        <div className="gallery-grid reveal">
          {[PRODUCT_IMG, PRODUCT_IMG2, PRODUCT_IMG3].map((src, i) => (
            <div key={i} className="gallery-item">
              <img src={src} alt={`BOSS Washer view ${i+1}`} />
              <div className="gallery-item-overlay" />
            </div>
          ))}
        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="section" id="accessories">
        <div className="reveal">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">ما داخل الصندوق</span>
          </div>
          <h2 className="section-title">
            كل شيء<br /><span className="ghost">جاهز</span>
          </h2>
          <p className="section-body" style={{marginTop:"12px"}}>
            يصلك المنتج مكتملاً بجميع الملحقات — لا حاجة لأي مشتريات إضافية.
          </p>
        </div>
        <div className="acc-grid reveal">
          {accessories.map((a, i) => (
            <div key={i} className="acc-card">
              <span className="acc-icon">{a.icon}</span>
              <div className="acc-name">{a.name}</div>
              <div className="acc-detail">{a.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section" id="order">
        <div className="cta-bg-glow" />
        <div className="reveal">
          <h2 className="cta-title">
            اطلب الآن<br />
            <span style={{color:"var(--cyan)"}}>BOSS</span>
          </h2>
          <div className="cta-price-display">
            <span className="cta-currency">ر.س</span>
            <span className="cta-price">400</span>
            <div style={{display:"flex",flexDirection:"column",gap:"4px",alignSelf:"center"}}>
              <span style={{fontSize:"16px",color:"var(--text-lo)",textDecoration:"line-through",fontFamily:"var(--font-display)",fontWeight:700}}>420</span>
              <span style={{background:"var(--cyan)",color:"#000",fontSize:"12px",fontFamily:"var(--font-display)",fontWeight:800,padding:"2px 8px",letterSpacing:"1px"}}>-5%</span>
            </div>
          </div>
          <div className="cta-actions">
            <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="btn-buy" style={{fontSize:"20px",padding:"20px 64px"}}>
              اشتري الآن
            </a>
          </div>
          <div className="cta-trust">
            {["شحن سريع وآمن","دفع آمن 100%","سياسة إرجاع مضمونة","متاح في الاحساء"].map((t,i)=>(
              <div key={i} className="trust-item"><div className="trust-dot" />{t}</div>
            ))}
          </div>
          <div className="payment-row">
            {["Mada","Visa","Mastercard","Apple Pay","STC Pay","Tabby","COD"].map((p,i)=>(
              <span key={i} className="pay-badge">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">عدتنا<span>.</span></div>
        <div className="footer-links">
          <a href="https://tea87m.sa/ar/blog" target="_blank" rel="noreferrer">المدونة</a>
          <a href="https://tea87m.sa/ar/p/wpYPX" target="_blank" rel="noreferrer">سياسة الإرجاع</a>
          <a href="https://tea87m.sa/ar" target="_blank" rel="noreferrer">المتجر الرئيسي</a>
        </div>
        <div className="footer-copy">© 2026 متجر عدتنا. جميع الحقوق محفوظة.</div>
      </footer>
    </>
  );
}
