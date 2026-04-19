import { useState, useEffect } from "react";
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

// Images for slider
const DIRTY_IMG = "/before-car.png"; 
const CLEAN_IMG = "/after-car.png";

const CURRENT_PRICE = 400;
const ORIGINAL_PRICE = 420;

function formatPrice(amount) {
  return new Intl.NumberFormat("en-US").format(amount);
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Slider State
  const [sliderPos, setSliderPos] = useState(50);
  
  // Timer State (Random between 1 hour and 2 hours)
  const [timeLeft, setTimeLeft] = useState(() => Math.floor(Math.random() * 3600) + 3600);

  useScrollReveal();
  const formattedCurrentPrice = formatPrice(CURRENT_PRICE);
  const formattedOriginalPrice = formatPrice(ORIGINAL_PRICE);

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Set RTL direction for Arabic language
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
    document.body.style.direction = "rtl";
    return () => {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.style.direction = "ltr";
    };
  }, []);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reviews Data
  const testimonials = [
    { name: "عبدالله م.", rating: 5, date: "قبل أسبوعين", text: "صراحة المضخة مجنونة، ضغطها 90 بار فعلي، غسلت الحوش والسيارة بربع ساعة وما قطع معي." },
    { name: "ياسر الحربي", rating: 5, date: "قبل شهر", text: "جودة ألمانية ممتازة ومقارنة بالسعر تعتبر الأفضل في السوق. التوصيلات كاملة والفوم قوي جداً." },
    { name: "سلطان العتيبي", rating: 5, date: "قبل 5 أيام", text: "سهلة التنقل وقوتها ممتازة جداً ما شاء الله، تستاهل كل ريال وضمانهم يطمن." }
  ];

  // Product specifications
  const specs = [
    { name: "العلامة التجارية", value: "BOSS" },
    { name: "الضغط", value: "80-90 بار" },
    { name: "أقصى تدفق", value: "8 لتر/دقيقة" },
    { name: "قوة المحرك", value: "3000 واط" },
    { name: "الجهد الكهربائي", value: "220-240 فولت" },
    { name: "التردد", value: "50/60 هرتز" },
  ];

  // Feature highlights
  const features = [
    { icon: "⚡", title: "3000 واط مستمرة", text: "تدفق قوي ومتواصل دون انقطاع — مصمم للاستخدام اليومي المكثف." },
    { icon: "💧", title: "ضغط 90 بار", text: "يزيل أعتى الأوساخ والملوثات من السيارات والأسطح الثقيلة في ثوانٍ." },
    { icon: "🔧", title: "تقنية ألمانية BOSS", text: "جودة هندسية مُثبتة. أكثر من 113 عملية شراء ناجحة وتقييمات موثوقة." },
    { icon: "🧴", title: "فوم قن مدمج", text: "رغوة كثيفة وجاهزة — لا تحتاج لشراء إضافات لتجربة تنظيف احترافية." },
    { icon: "🎒", title: "كفرات للنقل", text: "تصميم عملي يسهّل الحمل والتخزين في أي بيئة عمل أو مرآب." },
    { icon: "🪣", title: "مرونة المياه", text: "سحب مباشر من السطل أو الشبكة — مرونة كاملة في أي موقع." },
  ];

  // Included accessories
  const accessories = [
    { icon: "🔫", name: "مسدس رش", detail: "تحكم كامل بزاوية الرش" },
    { icon: "🌊", name: "خرطوم 7م", detail: "وصول بعيد دون تحريك الجهاز" },
    { icon: "🧴", name: "فوم قن", detail: "رغوة كثيفة للتنظيف العميق" },
    { icon: "🔌", name: "التوصيلات", detail: "كامل التجهيزات جاهزة للاستخدام" },
  ];

  return (
    <>
      {/* NAVIGATION BAR */}
      <nav className={`navbar-container${scrolled ? " scrolled" : ""}`} role="navigation">
        <div className="logo" aria-label=" ADAPTER store logo">عدتنا<span>.</span></div>

        <button 
          className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          aria-label="Toggle Navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#interactive" className="nav-link" onClick={() => setMobileMenuOpen(false)}>الأداء</a></li>
          <li><a href="#specs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>المواصفات</a></li>
          <li><a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>الميزات</a></li>
          <li><a href="#reviews" className="nav-link" onClick={() => setMobileMenuOpen(false)}>التقييمات</a></li>
        </ul>

        <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="cta-primary header-cta">اشتري الآن</a>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="hero" aria-label="Hero section">
        <div className="hero-content">
          
          {/* Discount & Countdown */}
          <div className="hero-badge-group">
            <div className="hero-badge">
              <span style={{ color: "#FF6B2B", fontSize: "9px" }}>●</span> خصم 5% — عرض محدود
            </div>
            <div className="countdown-timer">
              ⏳ ينتهي العرض خلال: <span style={{marginLeft: "6px"}}>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <h1 className="hero-title">
            واشقان
            <br />
            مضخة <span className="hero-title-highlight">BOSS</span>
            <br />
            <span style={{ color: "var(--text-mid)" }}>غسيل</span>
          </h1>

          {/* Social Proof Star Rating */}
          <div className="hero-social-proof">
            <div className="stars">★★★★★</div>
            <span className="rating-text">4.9/5 بناءً على 113 تقييم</span>
          </div>

          <p className="hero-subtitle">
            مضخة ضغط عالٍ بتقنية ألمانية — 3000 واط، ضغط 90 بار.
            تنظيف احترافي للسيارات والأسطح الثقيلة بكل سهولة ودقة.
          </p>

          {/* Price Section */}
          <div className="hero-price-section" style={{marginTop: "2rem"}}>
            <div className="hero-price">
              <div className="price-label">السعر</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="price-value">
                  <span className="price-symbol">$</span>
                  <span className="price-amount">{formattedCurrentPrice}</span>
                </div>
                <span className="price-old-value">
                  <span className="price-symbol">$</span>
                  <span>{formattedOriginalPrice}</span>
                </span>
                
                {/* Risk Reversal Badge */}
                <div className="warranty-badge">🛡️ ضمان سنتين</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="cta-primary">
              اطلب الآن واحصل على الخصم
            </a>
            <a href="#interactive" className="cta-secondary">شاهد الأداء</a>
          </div>

          {/* Low Stock Indicator */}
          <div className="stock-indicator">
            <div className="stock-text">🔥 سارع بالطلب! متبقي 3 قطع فقط</div>
            <div className="stock-bar"><div className="stock-fill" style={{width: '15%'}}></div></div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges-container" style={{marginTop: "2rem"}}>
            <span className="trust-badge-label">دفع آمن وموثوق</span>
            <div className="trust-badges" style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <div 
                title="مدى" 
                style={{background: 'linear-gradient(135deg, #00A859 0%, #8CC63F 100%)', color: 'white', fontWeight: 900, fontStyle: 'italic', padding: '0 8px', borderRadius: '4px', height: '26px', display: 'flex', alignItems: 'center', letterSpacing: '0.5px', fontSize: '13px', fontFamily: 'sans-serif' }}>
                mada
              </div>
              <img src="https://api.iconify.design/logos:apple-pay.svg" alt="Apple Pay" title="أبل باي" style={{height: "28px", filter: "invert(0.7)"}} />
              <img src="https://api.iconify.design/logos:visa.svg" alt="Visa" title="فيزا" style={{height: "18px"}} />
              <img src="https://api.iconify.design/logos:mastercard.svg" alt="MasterCard" title="ماستركارد" style={{height: "22px"}} />
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <div className="product-image-wrapper">
            <img src={PRODUCT_IMG} alt="BOSS Pressure Washer" loading="lazy" />
          </div>
        </div>
      </section>

      {/* INTERACTIVE SLIDER SECTION */}
      <section className="interactive-section reveal" id="interactive" aria-label="Before and after slider">
         <div className="section-header">
          <h2 className="section-title">شاهد قوة التنظيف</h2>
          <p className="section-subtitle">إزالة الأوساخ المستعصية بفضل الضغط العالي 90 بار.</p>
        </div>
        <div className="slider-wrapper" dir="ltr">
           <div className="slider-container">
             <img src={DIRTY_IMG} alt="Dirty Surface" className="slider-image-dirty" />
             <div className="slider-image-clean" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
               <img src={CLEAN_IMG} alt="Clean Surface" />
             </div>
             <input 
               type="range" min="0" max="100" value={sliderPos} 
               onChange={(e) => setSliderPos(e.target.value)} 
               className="slider-input" aria-label="Before and after comparison slider"
             />
             <div className="slider-line" style={{ left: `${sliderPos}%` }}>
               <div className="slider-button">↔</div>
             </div>
             <div className="slider-label label-before">بعد</div>
             <div className="slider-label label-after">قبل</div>
           </div>
        </div>
      </section>

      {/* SPECIFICATIONS SECTION */}
      <section className="specs-section reveal" id="specs">
        <div className="specs-grid">
          {specs.map((spec, i) => (
            <div key={i} className="spec-card">
              <div className="spec-card-label">{spec.name}</div>
              <div className="spec-card-value">{spec.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section reveal" id="features">
        <div className="section-header">
          <h2 className="section-title">لماذا BOSS</h2>
          <p className="section-subtitle">الأداء والجودة والقيمة — كل ما تحتاجه في جهاز واحد.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card staggered-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="reviews-section reveal" id="reviews">
        <div className="section-header">
          <h2 className="section-title">تقييمات العملاء</h2>
          <p className="section-subtitle">انضم لأكثر من 113 عميل راضٍ عن أدائنا.</p>
        </div>
        <div className="reviews-grid">
          {testimonials.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-header">
                <div className="review-name">{review.name}</div>
                <div className="review-date">{review.date}</div>
              </div>
              <div className="review-stars">{"★".repeat(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section reveal" id="gallery">
        <div className="section-header">
          <h2 className="section-title">معرض الصور</h2>
        </div>
        <div className="gallery-grid">
          {[PRODUCT_IMG, PRODUCT_IMG2, PRODUCT_IMG3].map((src, i) => (
            <div key={i} className="gallery-item staggered-item">
              <img src={src} alt={`BOSS Washer view ${i + 1}`} loading="lazy" />
              <div className="gallery-overlay" />
            </div>
          ))}
        </div>
      </section>

      {/* ACCESSORIES SECTION */}
      <section className="accessories-section reveal" id="accessories">
        <div className="section-header">
          <h2 className="section-title">ما داخل الصندوق</h2>
          <p className="section-subtitle">يصلك المنتج مكتملاً بجميع الملحقات.</p>
        </div>
        <div className="accessories-grid">
          {accessories.map((accessory, i) => (
            <div key={i} className="accessory-card staggered-item">
              <div className="accessory-icon">{accessory.icon}</div>
              <h3 className="accessory-title">{accessory.name}</h3>
              <p className="accessory-description">{accessory.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section" id="order">
        <div className="cta-text">اطلب الآن واحصل على خصم 5%</div>
        <div className="cta-button-group">
          <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="cta-primary">اشتري الآن</a>
          <a href="https://tea87m.sa/ar" target="_blank" rel="noreferrer" className="cta-secondary">المتجر الرئيسي</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <div className="footer-text">متجر عدتنا - معدات احترافية</div>
          <div className="footer-links">
            <a href="https://tea87m.sa/ar/blog" target="_blank" rel="noreferrer">المدونة</a>
            <a href="https://tea87m.sa/ar/p/wpYPX" target="_blank" rel="noreferrer">سياسة الإرجاع</a>
            <a href="https://tea87m.sa/ar" target="_blank" rel="noreferrer">المتجر الرئيسي</a>
          </div>
          <div className="footer-bottom">© 2026 متجر عدتنا. جميع الحقوق محفوظة.</div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="mobile-sticky-cta">
        <a href="https://tea87m.sa/ar/wAWGOzR" target="_blank" rel="noreferrer" className="cta-primary">اطلب الآن واحصل على الخصم</a>
      </div>
    </>
  );
}
