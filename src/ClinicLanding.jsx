import React, { useMemo, useState, useEffect } from "react";
import clinicLogo from "./assets/clinic-logo-new.png";

/* ===== SVG Icon Components ===== */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ChevronDown = () => (
  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ===== Main Component ===== */
const ClinicLanding = ({
  clinicName = "Centre Dentaire Dr Maha El Marzouki",
  addressLine1 = "Avenue Moulay Youssef",
  city = "Meknès",
  phone = "+212 7 08 07 66 64",
  email = "dr.elmarzouki.maha@gmail.com",
  lat = 33.8950184,
  lng = -5.5441453,
  mapZoom = 15,
  doctorName = "Dr. Maha El Marzouki",
  doctorTitle = "Chirurgien-Dentiste",
  doctorBioFR = "Diplômée de la Faculté de Médecine Dentaire de Rabat, Dr. Maha El Marzouki se spécialise dans la dentisterie esthétique et conservatrice. Elle offre des soins dentaires de haute qualité dans un environnement chaleureux et rassurant.",
  doctorBioAR = "خريجة كلية طب الأسنان بالرباط، الدكتورة مها المرزوقي متخصصة في طب الأسنان التجميلي والمحافظ. تقدم رعاية أسنان عالية الجودة في بيئة دافئة ومطمئنة.",
  workingHoursFR = ["Lundi - Vendredi : 9h - 18h", "Samedi : 9h - 13h", "Dimanche : Fermé"],
  workingHoursAR = ["الإثنين - الجمعة : 9:00 - 18:00", "السبت : 9:00 - 13:00", "الأحد : مغلق"],
}) => {
  const [lang, setLang] = useState("fr");
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const reservationUrl = "https://dentisto.ma/rendez-vous/docteurs/dr-maha-el-marzouki-2637";

  // Scroll detection for navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  /* ===== Translations ===== */
  const dict = {
    fr: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      gallery: "Cabinet",
      testimonials: "Avis",
      contact: "Contact",
      switchTo: "العربية",
      bookAppointment: "Prendre rendez-vous",
      callUs: "Appelez-nous",

      heroTitle: "Votre sourire, notre priorité",
      heroSubtitle: "Des soins dentaires d'excellence dans un environnement moderne, confortable et bienveillant au cœur de Meknès.",
      heroBadge: "Centre Dentaire d'Excellence",

      aboutLabel: "À propos",
      aboutTitle: "Un cabinet moderne dédié à votre bien-être",
      aboutText1: "Le Centre Dentaire Dr Maha El Marzouki offre des soins dentaires complets dans un environnement moderne et confortable, avec un équipement de dernière génération.",
      aboutText2: "Notre approche allie expertise médicale et attention personnalisée pour vous garantir une expérience de soins exceptionnelle.",

      servicesLabel: "Nos services",
      servicesTitle: "Des soins dentaires complets",
      servicesSubtitle: "Une gamme complète de traitements pour prendre soin de votre santé bucco-dentaire avec expertise et délicatesse.",

      galleryLabel: "Notre espace",
      galleryTitle: "Découvrez notre cabinet",

      testimonialsLabel: "Témoignages",
      testimonialsTitle: "Ce que disent nos patients",

      faqLabel: "FAQ",
      faqTitle: "Questions fréquentes",

      ctaTitle: "Prêt pour un sourire parfait ?",
      ctaSubtitle: "Réservez votre consultation dès maintenant et faites le premier pas vers des soins dentaires de qualité.",

      contactLabel: "Contact",
      contactTitle: "Nous contacter",
      address: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "Email",
      hours: "Horaires",

      trustYears: "Années d'expérience",
      trustPatients: "Patients satisfaits",
      trustServices: "Spécialités dentaires",
      trustEquipment: "Équipement moderne",
    },
    ar: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      gallery: "العيادة",
      testimonials: "الآراء",
      contact: "اتصل بنا",
      switchTo: "Français",
      bookAppointment: "حجز موعد",
      callUs: "اتصل بنا",

      heroTitle: "ابتسامتك، أولويتنا",
      heroSubtitle: "رعاية أسنان متميزة في بيئة حديثة ومريحة ومرحبة في قلب مكناس.",
      heroBadge: "مركز طب أسنان متميز",

      aboutLabel: "من نحن",
      aboutTitle: "عيادة حديثة مخصصة لراحتكم",
      aboutText1: "يقدم مركز طب الأسنان الدكتورة مها المرزوقي رعاية شاملة للأسنان في بيئة حديثة ومريحة، بأحدث المعدات التكنولوجية.",
      aboutText2: "نهجنا يجمع بين الخبرة الطبية والاهتمام الشخصي لضمان تجربة علاجية استثنائية.",

      servicesLabel: "خدماتنا",
      servicesTitle: "رعاية أسنان شاملة",
      servicesSubtitle: "مجموعة كاملة من العلاجات للعناية بصحة فمك وأسنانك بخبرة ورفق.",

      galleryLabel: "مساحتنا",
      galleryTitle: "اكتشفوا عيادتنا",

      testimonialsLabel: "شهادات",
      testimonialsTitle: "ماذا يقول مرضانا",

      faqLabel: "الأسئلة الشائعة",
      faqTitle: "أسئلة متكررة",

      ctaTitle: "مستعد لابتسامة مثالية؟",
      ctaSubtitle: "احجز استشارتك الآن واتخذ الخطوة الأولى نحو رعاية أسنان عالية الجودة.",

      contactLabel: "اتصل بنا",
      contactTitle: "تواصل معنا",
      address: "العنوان",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      hours: "ساعات العمل",

      trustYears: "سنوات من الخبرة",
      trustPatients: "مريض راضٍ",
      trustServices: "تخصصات طب الأسنان",
      trustEquipment: "معدات حديثة",
    },
  };

  const services = {
    fr: [
      { title: "Soins Conservateurs", description: "Traitements des caries, obturations esthétiques et dévitalisation pour préserver vos dents naturelles.", image: "/images/services/conservateurs.jpg" },
      { title: "Esthétique Dentaire", description: "Blanchiment professionnel, facettes et couronnes esthétiques pour un sourire éclatant.", image: "/images/services/esthetique.jpg" },
      { title: "Chirurgie Dentaire", description: "Extractions, implants dentaires et greffes osseuses avec précision et douceur.", image: "/images/services/chirurgie.jpg" },
      { title: "Prothèses Dentaires", description: "Prothèses fixes et amovibles, bridges et couronnes pour restaurer votre dentition.", image: "/images/services/protheses.jpg" },
      { title: "Parodontologie", description: "Traitement des maladies des gencives, détartrage profond et surfaçage radiculaire.", image: "/images/services/parodontologie.jpg" },
      { title: "Détartrage et Hygiène", description: "Nettoyage professionnel, détartrage ultrasonique et conseils d'hygiène pour une santé bucco-dentaire optimale.", image: "/images/clinic/treatment-room-2.jpg" },
    ],
    ar: [
      { title: "العلاجات التحفظية", description: "علاج التسوس، الحشوات التجميلية وعلاج الجذور للحفاظ على أسنانك الطبيعية.", image: "/images/services/conservateurs.jpg" },
      { title: "تجميل الأسنان", description: "تبييض احترافي، القشور التجميلية والتيجان الجمالية لابتسامة مشرقة.", image: "/images/services/esthetique.jpg" },
      { title: "جراحة الأسنان", description: "قلع الأسنان، زراعة الأسنان وطعوم العظام بدقة ورفق.", image: "/images/services/chirurgie.jpg" },
      { title: "التركيبات السنية", description: "التركيبات الثابتة والمتحركة، الجسور والتيجان لاستعادة أسنانك.", image: "/images/services/protheses.jpg" },
      { title: "علاج اللثة", description: "علاج أمراض اللثة، إزالة الجير العميق وكشط الجذور.", image: "/images/services/parodontologie.jpg" },
      { title: "تنظيف وصحة الفم", description: "تنظيف احترافي، إزالة الجير بالموجات فوق الصوتية ونصائح صحية لصحة فم مثالية.", image: "/images/clinic/treatment-room-2.jpg" },
    ],
  };

  const testimonials = {
    fr: [
      { name: "Jaouad Jihane", text: "Excellente expérience. Dentiste très professionnelle, à l'écoute et rassurante. Les soins ont été réalisés avec beaucoup de précision et de douceur. Je me suis sentie en confiance du début à la fin. Je recommande vivement !", rating: 5 },
      { name: "Rabia Bel", text: "Excellente prise en charge, travail soigné et grande gentillesse. Une dentiste compétente et rassurante. Je recommande sans hésitation.", rating: 5 },
      { name: "Yousra Berhili", text: "Je recommande vivement. Dr Maha est très professionnelle, douce et à l'écoute. Elle prend le temps d'expliquer chaque étape du soin. En plus du cabinet qui est très propre et bien organisé.", rating: 5 },
    ],
    ar: [
      { name: "Jaouad Jihane", text: "تجربة رائعة. الطبيبة محترفة جداً، تستمع وتطمئن. تمت العناية بدقة ولطف كبيرين. شعرت بالثقة من البداية حتى النهاية. أنصح بشدة!", rating: 5 },
      { name: "Rabia Bel", text: "استقبال ممتاز، عمل دقيق ولطف كبير. طبيبة أسنان كفؤة ومطمئنة. أنصح بها دون تردد.", rating: 5 },
      { name: "Yousra Berhili", text: "أنصح بشدة. الدكتورة مها محترفة جداً، لطيفة ومنتبهة. تأخذ وقتها لشرح كل خطوة من العلاج. علاوة على ذلك، العيادة نظيفة ومنظمة جيداً.", rating: 5 },
    ],
  };

  const faqs = {
    fr: [
      { question: "Comment prendre rendez-vous ?", answer: "Vous pouvez réserver en ligne via dentisto.ma, nous appeler au +212 7 08 07 66 64, ou nous envoyer un email. Notre équipe vous répondra dans les plus brefs délais." },
      { question: "Acceptez-vous les assurances ?", answer: "Oui, nous acceptons la plupart des mutuelles et assurances santé. N'hésitez pas à nous contacter pour vérifier votre couverture." },
      { question: "Quels sont vos horaires d'ouverture ?", answer: "Nous sommes ouverts du lundi au vendredi de 9h à 18h, et le samedi de 9h à 13h. Fermé le dimanche." },
      { question: "Proposez-vous des consultations d'urgence ?", answer: "Oui, nous proposons des consultations d'urgence. Appelez-nous pour plus d'informations sur la disponibilité." },
    ],
    ar: [
      { question: "كيفية حجز موعد؟", answer: "يمكنكم الحجز عبر الإنترنت من خلال dentisto.ma، أو الاتصال بنا على +212 7 08 07 66 64، أو إرسال بريد إلكتروني. سيرد فريقنا في أقرب وقت." },
      { question: "هل تقبلون التأمين الصحي؟", answer: "نعم، نقبل معظم شركات التأمين الصحي والتعاضديات. لا تترددوا في الاتصال بنا للتحقق من تغطيتكم." },
      { question: "ما هي ساعات العمل؟", answer: "نحن مفتوحون من الإثنين إلى الجمعة من 9:00 إلى 18:00، والسبت من 9:00 إلى 13:00. مغلق الأحد." },
      { question: "هل تقدمون استشارات طوارئ؟", answer: "نعم، نقدم استشارات الطوارئ. اتصلوا بنا لمزيد من المعلومات حول التوفر." },
    ],
  };

  const galleryImages = [
    { src: "/images/clinic/reception.jpg", alt: "Réception du cabinet" },
    { src: "/images/clinic/waiting-room.jpg", alt: "Salle d'attente" },
    { src: "/images/clinic/signage.jpg", alt: "Enseigne du cabinet" },
    { src: "/images/clinic/treatment-room-1.jpg", alt: "Salle de soins" },
    { src: "/images/clinic/treatment-room-2.jpg", alt: "Équipement dentaire" },
  ];

  const t = useMemo(() => dict[lang], [lang]);
  const isRTL = lang === "ar";
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=${lang}&z=${mapZoom}&output=embed`;
  const workingHours = lang === "fr" ? workingHoursFR : workingHoursAR;

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="dental-clinic">

      {/* ===== NAVIGATION ===== */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <a href="#home" className="nav-brand" onClick={closeMobile}>
            <img src={clinicLogo} alt={clinicName} className="logo" width="200" height="52" />
          </a>

          <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
            <a href="#home" className="nav-link" onClick={closeMobile}>{t.home}</a>
            <a href="#about" className="nav-link" onClick={closeMobile}>{t.about}</a>
            <a href="#services" className="nav-link" onClick={closeMobile}>{t.services}</a>
            <a href="#gallery" className="nav-link" onClick={closeMobile}>{t.gallery}</a>
            <a href="#testimonials" className="nav-link" onClick={closeMobile}>{t.testimonials}</a>
            <a href="#contact" className="nav-link" onClick={closeMobile}>{t.contact}</a>
            <button className="lang-toggle" onClick={() => { setLang(lang === "fr" ? "ar" : "fr"); closeMobile(); }}>
              {t.switchTo}
            </button>
            <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={closeMobile}>
              {t.bookAppointment}
            </a>
          </nav>

          <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="nav-cta nav-cta-desktop">
            {t.bookAppointment}
          </a>

          <button
            className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
        {mobileMenuOpen && <div className="nav-overlay" onClick={closeMobile} />}
      </header>

      {/* ===== HERO ===== */}
      <section id="home" className="hero">
        <img
          src="/images/clinic/reception.jpg"
          alt="Cabinet dentaire Dr Maha El Marzouki"
          className="hero-bg"
          fetchpriority="high"
          loading="eager"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {t.heroBadge}
          </div>
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="hero-buttons">
            <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.bookAppointment}
            </a>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn-outline">
              {t.callUs}
            </a>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-images fade-up">
              <img src="/images/clinic/waiting-room.jpg" alt="Salle d'attente élégante" className="about-img-main" loading="lazy" />
              <img src="/images/clinic/decor.jpg" alt="Décoration du cabinet" className="about-img-secondary" loading="lazy" />
              <img src="/images/clinic/signage.jpg" alt="Logo du cabinet" className="about-img-accent" loading="lazy" />
            </div>
            <div className="about-text fade-up">
              <span className="section-label">{t.aboutLabel}</span>
              <h2 className="section-title">{t.aboutTitle}</h2>
              <p className="about-paragraph">{t.aboutText1}</p>
              <p className="about-paragraph">{t.aboutText2}</p>
              <div className="doctor-card">
                <h3>{doctorName}</h3>
                <p className="doctor-title">{doctorTitle}</p>
                <p className="doctor-bio">{lang === "fr" ? doctorBioFR : doctorBioAR}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">{t.servicesLabel}</span>
            <h2 className="section-title">{t.servicesTitle}</h2>
            <p className="section-subtitle">{t.servicesSubtitle}</p>
          </div>
          <div className="services-grid">
            {services[lang].map((service, index) => (
              <div key={index} className="service-card fade-up">
                <div className="service-img-wrapper">
                  <img src={service.image} alt={service.title} loading="lazy" />
                </div>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">{t.galleryLabel}</span>
            <h2 className="section-title">{t.galleryTitle}</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((img, index) => (
              <div key={index} className={`gallery-item gallery-item-${index + 1} fade-up`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">{t.testimonialsLabel}</span>
            <h2 className="section-title">{t.testimonialsTitle}</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials[lang].map((item, index) => (
              <div key={index} className="testimonial-card fade-up">
                <div className="quote-mark">"</div>
                <div className="testimonial-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="testimonial-text">{item.text}</p>
                <p className="testimonial-author">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-label">{t.faqLabel}</span>
            <h2 className="section-title">{t.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {faqs[lang].map((faq, index) => (
              <div key={index} className="faq-item fade-up">
                <button
                  className={`faq-question ${activeFaq === index ? "active" : ""}`}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown />
                </button>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title fade-up">{t.ctaTitle}</h2>
          <p className="cta-subtitle fade-up">{t.ctaSubtitle}</p>
          <div className="fade-up">
            <a href={reservationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.bookAppointment}
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="fade-up">
              <div className="contact-header">
                <span className="section-label">{t.contactLabel}</span>
                <h2 className="section-title">{t.contactTitle}</h2>
              </div>
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon"><MapPinIcon /></div>
                  <div>
                    <h4>{t.address}</h4>
                    <p>{addressLine1}, {city}</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><PhoneIcon /></div>
                  <div>
                    <h4>{t.phoneLabel}</h4>
                    <p dir="ltr">{phone}</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><MailIcon /></div>
                  <div>
                    <h4>{t.emailLabel}</h4>
                    <p>{email}</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><ClockIcon /></div>
                  <div>
                    <h4>{t.hours}</h4>
                    {workingHours.map((h, i) => <p key={i}>{h}</p>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="map-wrapper fade-up">
              <iframe
                title="Google Maps"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand-name">{clinicName}</h3>
              <p className="footer-brand-desc">
                {lang === "fr"
                  ? "Des soins dentaires d'excellence dans un environnement moderne et chaleureux."
                  : "رعاية أسنان متميزة في بيئة حديثة ومرحبة."}
              </p>
            </div>
            <div>
              <h4>{lang === "fr" ? "Navigation" : "التنقل"}</h4>
              <ul className="footer-links">
                <li><a href="#home">{t.home}</a></li>
                <li><a href="#about">{t.about}</a></li>
                <li><a href="#services">{t.services}</a></li>
                <li><a href="#gallery">{t.gallery}</a></li>
                <li><a href="#contact">{t.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4>{t.contact}</h4>
              <div className="footer-contact-item">
                <MapPinIcon />
                <span>{addressLine1}, {city}</span>
              </div>
              <div className="footer-contact-item">
                <PhoneIcon />
                <span dir="ltr">{phone}</span>
              </div>
              <div className="footer-contact-item">
                <MailIcon />
                <span>{email}</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {clinicName}. {lang === "fr" ? "Tous droits réservés" : "جميع الحقوق محفوظة"}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClinicLanding;

export const DemoLanding = () => (
  <ClinicLanding
    clinicName="Centre Dentaire Dr Maha El Marzouki"
    addressLine1="Avenue Moulay Youssef"
    city="Meknès"
    phone="+212 7 08 07 66 64"
    email="dr.elmarzouki.maha@gmail.com"
    lat={33.8950184}
    lng={-5.5441453}
    doctorName="Dr. Maha El Marzouki"
    doctorTitle="Chirurgien-dentiste"
    doctorBioFR="Diplômée de la Faculté de Médecine Dentaire de Rabat, Dr. Maha El Marzouki se spécialise dans la dentisterie esthétique et conservatrice. Elle offre des soins dentaires de haute qualité dans un environnement chaleureux et rassurant."
    doctorBioAR="خريجة كلية طب الأسنان بالرباط، الدكتورة مها المرزوقي متخصصة في طب الأسنان التجميلي والمحافظ. تقدم رعاية أسنان عالية الجودة في بيئة دافئة ومطمئنة."
  />
);
