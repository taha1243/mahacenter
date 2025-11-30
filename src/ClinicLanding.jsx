import React, { useMemo, useState } from "react";
import clinicLogo from "./assets/clinic-logo-new.png";
import ReservationForm from "./components/ReservationForm";

/**
 * Professional Dental Clinic Landing Page
 * - Bilingual FR/AR with live toggle
 * - RTL support for Arabic
 * - Professional dental clinic sections: Hero, About, Services, Testimonials, FAQ, Contact
 * - Modern responsive design based on professional dental clinic template
 */

const ClinicLanding = ({
  clinicName = "Centre Dentaire Dr Maha El Marzouki",
  addressLine1 = "Avenue Moulay Youssef",
  city = "Meknès",
  phone = "+212 7 08 07 66 64",
  email = "dr.elmarzouki.maha@gmail.com",
  lat = 33.8950184,
  lng = -5.5441453,
  mapZoom = 15,
  coverUrl,
  doctorName = "Dr. Maha El Marzouki",
  doctorTitle = "Chirurgien-Dentiste",
  doctorBioFR =
    "Diplômée de la Faculté de Médecine Dentaire de Rabat, Dr. Maha El Marzouki possède plus de 10 ans d'expérience en dentisterie esthétique et conservatrice. Elle se spécialise dans les traitements orthodontiques et les soins dentaires de haute qualité.",
  doctorBioAR =
    "خريجة كلية طب الأسنان بالرباط، الدكتورة مها المرزوقي تتمتع بخبرة تزيد عن 10 سنوات في طب الأسنان التجميلي والمحافظ. متخصصة في العلاجات التقويمية ورعاية الأسنان عالية الجودة.",
  doctorAvatarUrl,
  workingHoursFR = ["Lundi - Vendredi : 9h - 18h", "Samedi : 9h - 13h", "Dimanche : Fermé"],
  workingHoursAR = ["الإثنين - الجمعة : 9:00 - 18:00", "السبت : 9:00 - 13:00", "الأحد : مغلق"],
  onViewSchedule,
  onReserve,
}) => {
  const [lang, setLang] = useState("fr");
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  const dict = {
    fr: {
      // Navigation
      home: "Accueil",
      about: "À propos",
      services: "Services",
      testimonials: "Témoignages",
      contact: "Contact",
      switchTo: "العربية",
      
      // Hero Section
      heroTitle: "Votre sourire, notre priorité",
      heroSubtitle: "Des soins dentaires de qualité dans un environnement moderne et chaleureux",
      bookAppointment: "Prendre rendez-vous",
      callUs: "Appelez-nous",
      
      // About Section
      aboutTitle: "À propos du Centre",
      aboutText1: "Le Centre Dentaire Maha offre des soins dentaires complets dans un environnement moderne et confortable.",
      aboutText2: "Notre équipe qualifiée utilise les dernières technologies pour vous garantir des traitements de haute qualité.",
      
      // Services
      servicesTitle: "Nos Services",
      servicesSubtitle: "Une gamme complète de soins dentaires",
      
      // Testimonials
      testimonialsTitle: "Ce que disent nos patients",
      
      // FAQ
      faqTitle: "Questions Fréquentes",
      
      // Contact
      contactTitle: "Nous Contacter",
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      hours: "Horaires",
      map: "Notre Localisation",
    },
    ar: {
      // Navigation
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      testimonials: "شهادات المرضى",
      contact: "اتصل بنا",
      switchTo: "Français",
      
      // Hero Section
      heroTitle: "ابتسامتك أولويتنا",
      heroSubtitle: "رعاية أسنان عالية الجودة في بيئة حديثة ومريحة",
      bookAppointment: "حجز موعد",
      callUs: "اتصل بنا",
      
      // About Section
      aboutTitle: "حول المركز",
      aboutText1: "يقدم مركز الأسنان مها رعاية شاملة للأسنان في بيئة حديثة ومريحة.",
      aboutText2: "يستخدم فريقنا المؤهل أحدث التقنيات لضمان علاجات عالية الجودة.",
      
      // Services
      servicesTitle: "خدماتنا",
      servicesSubtitle: "مجموعة شاملة من رعاية الأسنان",
      
      // Testimonials
      testimonialsTitle: "ماذا يقول مرضانا",
      
      // FAQ
      faqTitle: "الأسئلة الشائعة",
      
      // Contact
      contactTitle: "اتصل بنا",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      hours: "ساعات العمل",
      map: "موقعنا",
    },
  };

  // Services data
  const services = {
    fr: [
      {
        title: "Soins Conservateurs",
        description: "Traitements des caries, obturations esthétiques, dévitalisation",
        icon: "🦷"
      },
      {
        title: "Orthodontie",
        description: "Appareils dentaires, aligneurs invisibles, correction des malpositions",
        icon: "📐"
      },
      {
        title: "Chirurgie Dentaire",
        description: "Extractions, implants dentaires, greffes osseuses",
        icon: "⚕️"
      },
      {
        title: "Esthétique Dentaire",
        description: "Blanchiment, facettes, couronnes esthétiques",
        icon: "✨"
      },
      {
        title: "Prothèses",
        description: "Prothèses fixes et amovibles, bridges, couronnes",
        icon: "🔧"
      },
      {
        title: "Parodontologie",
        description: "Traitement des gencives, détartrage, surfaçage radiculaire",
        icon: "🌿"
      }
    ],
    ar: [
      {
        title: "العلاجات التحفظية",
        description: "علاج التسوس، الحشوات التجميلية، علاج الجذور",
        icon: "🦷"
      },
      {
        title: "تقويم الأسنان",
        description: "أجهزة تقويم الأسنان، المقومات الشفافة، تصحيح وضعية الأسنان",
        icon: "📐"
      },
      {
        title: "جراحة الأسنان",
        description: "قلع الأسنان، زراعة الأسنان، طعوم العظام",
        icon: "⚕️"
      },
      {
        title: "تجميل الأسنان",
        description: "تبييض الأسنان، القشور التجميلية، التيجان الجمالية",
        icon: "✨"
      },
      {
        title: "التركيبات",
        description: "التركيبات الثابتة والمتحركة، الجسور، التيجان",
        icon: "🔧"
      },
      {
        title: "علاج اللثة",
        description: "علاج اللثة، إزالة الجير، كشط الجذور",
        icon: "🌿"
      }
    ]
  };

  // Testimonials data
  const testimonials = {
    fr: [
      {
        name: "Sarah Alami",
        text: "Excellent service ! Dr. Maha est très professionnelle et à l'écoute. Le cabinet est moderne et propre.",
        rating: 5
      },
      {
        name: "Ahmed Bennani",
        text: "Une expérience formidable. L'équipe est chaleureuse et les soins sont de très haute qualité.",
        rating: 5
      },
      {
        name: "Fatima Zahra",
        text: "Je recommande vivement ce centre. Les traitements orthodontiques ont donné d'excellents résultats.",
        rating: 5
      }
    ],
    ar: [
      {
        name: "سارة العلمي",
        text: "خدمة ممتازة! الدكتورة مها محترفة جداً ومتفهمة. العيادة حديثة ونظيفة.",
        rating: 5
      },
      {
        name: "أحمد البناني",
        text: "تجربة رائعة. الفريق ودود والرعاية عالية الجودة جداً.",
        rating: 5
      },
      {
        name: "فاطمة الزهراء",
        text: "أنصح بشدة بهذا المركز. علاجات تقويم الأسنان أعطت نتائج ممتازة.",
        rating: 5
      }
    ]
  };

  // FAQ data
  const faqs = {
    fr: [
      {
        question: "Comment prendre rendez-vous ?",
        answer: "Vous pouvez nous appeler directement au +212 7 08 07 66 64 ou envoyer un email à dr.elmarzouki.maha@gmail.com"
      },
      {
        question: "Acceptez-vous les assurances ?",
        answer: "Oui, nous acceptons la plupart des mutuelles et assurances santé. N'hésitez pas à nous contacter pour vérifier votre couverture."
      },
      {
        question: "Quels sont vos horaires d'ouverture ?",
        answer: "Nous sommes ouverts du lundi au vendredi de 9h à 18h, et le samedi de 9h à 13h. Fermé le dimanche."
      },
      {
        question: "Proposez-vous des consultations d'urgence ?",
        answer: "Oui, nous proposons des consultations d'urgence. Appelez-nous pour plus d'informations sur la disponibilité."
      }
    ],
    ar: [
      {
        question: "كيفية حجز موعد؟",
        answer: "يمكنكم الاتصال بنا مباشرة على +212 7 08 07 66 64 أو إرسال بريد إلكتروني إلى dr.elmarzouki.maha@gmail.com"
      },
      {
        question: "هل تقبلون التأمين الصحي؟",
        answer: "نعم، نقبل معظم شركات التأمين الصحي والتعاضديات. لا تترددوا في الاتصال بنا للتحقق من تغطيتكم."
      },
      {
        question: "ما هي ساعات العمل؟",
        answer: "نحن مفتوحون من الإثنين إلى الجمعة من 9:00 إلى 18:00، والسبت من 9:00 إلى 13:00. مغلق الأحد."
      },
      {
        question: "هل تقدمون استشارات طوارئ؟",
        answer: "نعم، نقدم استشارات الطوارئ. اتصلوا بنا لمزيد من المعلومات حول التوفر."
      }
    ]
  };

  const t = useMemo(() => dict[lang], [lang]);
  const isRTL = lang === "ar";
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=${lang}&z=${mapZoom}&output=embed`;

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="dental-clinic">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="container">
          <div className="nav-brand">
            <div className="logo-container">
              <img 
                src={clinicLogo} 
                alt="Logo Centre Dentaire"
                className="logo"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                width="880"
                height="220"

              />
            </div>
          </div>
          <nav className="nav-menu">
            <a href="#home" className="nav-link">{t.home}</a>
            <a href="#about" className="nav-link">{t.about}</a>
            <a href="#services" className="nav-link">{t.services}</a>
            <a href="#testimonials" className="nav-link">{t.testimonials}</a>
            <a href="#contact" className="nav-link">{t.contact}</a>
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="lang-toggle"
            >
              {t.switchTo}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="hero-buttons">
            <button 
              onClick={() => setShowReservationForm(true)} 
              className="btn-primary"
            >
              {t.bookAppointment}
            </button>
            <button onClick={() => window.location.href = `tel:${phone}`} className="btn-secondary">
              {t.callUs}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-title">{t.aboutTitle}</h2>
              <p className="about-paragraph">{t.aboutText1}</p>
              <p className="about-paragraph">{t.aboutText2}</p>
              
              <div className="doctor-info">
                <h3 className="doctor-name">{doctorName}</h3>
                <p className="doctor-title">{doctorTitle}</p>
                <p className="doctor-bio">{lang === "fr" ? doctorBioFR : doctorBioAR}</p>
              </div>
            </div>
            <div className="about-image">
              <div className="doctor-photo">
                {doctorAvatarUrl ? (
                  <img src={doctorAvatarUrl} alt={doctorName} />
                ) : (
                  <div className="photo-placeholder">👩‍⚕️</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.servicesTitle}</h2>
            <p className="section-subtitle">{t.servicesSubtitle}</p>
          </div>
          <div className="services-grid">
            {services[lang].map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title">{t.testimonialsTitle}</h2>
          <div className="testimonials-grid">
            {testimonials[lang].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-author">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">{t.faqTitle}</h2>
          <div className="faq-list">
            {faqs[lang].map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {faq.question}
                  <span className="faq-icon">{activeFaq === index ? '−' : '+'}</span>
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

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">{t.contactTitle}</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-item">
                <h3>{t.address}</h3>
                <p>{addressLine1}</p>
                <p>{city}</p>
              </div>
              <div className="info-item">
                <h3>{t.phone}</h3>
                <p>{phone}</p>
              </div>
              <div className="info-item">
                <h3>{t.email}</h3>
                <p>{email}</p>
              </div>
              <div className="info-item">
                <h3>{t.hours}</h3>
                {(lang === "fr" ? workingHoursFR : workingHoursAR).map((hour, i) => (
                  <p key={i}>{hour}</p>
                ))}
              </div>
            </div>
            <div className="map-container">
              <iframe
                title="Google Maps"
                src={mapSrc}
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>{clinicName}</h3>
              <p>{addressLine1}, {city}</p>
            </div>
            <div className="footer-contact">
              <p><strong>{t.phone}:</strong> {phone}</p>
              <p><strong>{t.email}:</strong> {email}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 {clinicName}. {lang === "fr" ? "Tous droits réservés" : "جميع الحقوق محفوظة"}.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Form Modal */}
      <ReservationForm 
        isVisible={showReservationForm}
        onClose={() => setShowReservationForm(false)}
        language={lang}
      />
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
    doctorTitle="Chirurgien‑dentiste"
    doctorBioFR="Spécialisée en dentisterie esthétique et soins conservateurs."
    doctorBioAR="متخصصة في تجميل الأسنان والعلاجات التحفظية."
    onViewSchedule={() => console.log('Voir le planning')}
    onReserve={() => console.log('Prendre rendez‑vous')}
  />
);
