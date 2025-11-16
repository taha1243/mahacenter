import React, { useMemo, useState } from "react";

/**
 * ClinicLanding — Single‑file React template (TailwindCSS) for a medical cabinet
 * - Bilingual FR/AR with live toggle
 * - RTL support for Arabic
 * - Doctor presentation section
 * - Google Maps (no API key needed — iframe embed)
 * - CTA buttons to "Voir le planning" and "Prendre rendez‑vous"
 *
 * How to use (pseudo‑usage — not executed here):
 *  <ClinicLanding
 *    clinicName="Cabinet Dentaire Dr. Maha El Marzouki"
 *    addressLine1="Av. Des Fleurs, Quartier Al Andalus"
 *    city="Meknès"
 *    phone="+212 6 12 34 56 78"
 *    email="contact@cabinet.ma"
 *    lat={33.8938}
 *    lng={-5.5473}
 *    onViewSchedule={() => {/* navigate to /planning (example) */}}
 *    onReserve={() => {/* navigate to /reservation (example) */}}
 *  />
 *
 * NOTE: The example above keeps block comments inside arrow functions short and avoids any
 *       closing sequence that could terminate this JSDoc. If your tooling still complains,
 *       just replace the inner comments with strings like "// navigate".
 */

// ---- Types ---------------------------------------------------------------
// Keep the Props in TS. If your environment is JS‑only, you can remove the
// annotations and convert this file to .jsx.

type Lang = 'fr' | 'ar';

type DictEntry = {
  welcome: string;
  viewSchedule: string;
  reserve: string;
  doctor: string;
  contact: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  map: string;
  switchTo: string;
};

type Props = {
  clinicName?: string;
  addressLine1?: string;
  city?: string;
  phone?: string;
  email?: string;
  lat?: number; // latitude for Google Maps
  lng?: number; // longitude for Google Maps
  mapZoom?: number;
  coverUrl?: string; // optional hero background image
  doctorName?: string;
  doctorTitle?: string; // e.g., "Chirurgien Dentiste"
  doctorBioFR?: string;
  doctorBioAR?: string;
  doctorAvatarUrl?: string;
  workingHoursFR?: string[]; // e.g., ["Lun-Ven: 09h-18h", "Sam: 09h-13h"]
  workingHoursAR?: string[];
  onViewSchedule?: () => void;
  onReserve?: () => void;
};

// ---- Component -----------------------------------------------------------

const ClinicLanding: React.FC<Props> = ({
  clinicName = "Cabinet Médical",
  addressLine1 = "Adresse du cabinet",
  city = "Ville",
  phone = "+212 6 00 00 00 00",
  email = "contact@cabinet.ma",
  lat = 33.9716, // Rabat (placeholder)
  lng = -6.8498,
  mapZoom = 15,
  coverUrl,
  doctorName = "Dr. Nom Prénom",
  doctorTitle = "Spécialiste",
  doctorBioFR =
    "Médecin dévoué(e) à la qualité des soins, avec une approche centrée patient et des équipements modernes.",
  doctorBioAR =
    "طبيب(ة) مكرّس(ة) لتقديم رعاية صحية عالية الجودة، بنهج يركز على المريض وتجهيزات حديثة.",
  doctorAvatarUrl,
  workingHoursFR = ["Lun-Ven : 09h‑18h", "Sam : 09h‑13h", "Dim : Fermé"],
  workingHoursAR = ["الإثنين‑الجمعة : 09:00‑18:00", "السبت : 09:00‑13:00", "الأحد : مغلق"],
  onViewSchedule,
  onReserve,
}) => {
  const [lang, setLang] = useState<Lang>('fr');

  // i18n dictionary — avoid `as const` to support older TS/Babel pipelines
  const dict: Record<Lang, DictEntry> = {
    fr: {
      welcome: "Bienvenue au",
      viewSchedule: "Voir le planning",
      reserve: "Prendre rendez‑vous",
      doctor: "Présentation du docteur",
      contact: "Contact & Horaires",
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      hours: "Horaires",
      map: "Localisation (Google Maps)",
      switchTo: "العربية",
    },
    ar: {
      welcome: "مرحبا بكم في",
      viewSchedule: "عرض الجدول",
      reserve: "حجز موعد",
      doctor: "تعريف بالطبيب(ة)",
      contact: "الاتصال و أوقات العمل",
      address: "العنوان",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      hours: "أوقات العمل",
      map: "الموقع (خرائط جوجل)",
      switchTo: "Français",
    },
  };

  const t = useMemo(() => dict[lang], [lang]);
  const isRTL = lang === 'ar';
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=${lang}&z=${mapZoom}&output=embed`;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-tight text-lg">{clinicName}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="px-3 py-1.5 rounded-full border hover:bg-gray-100 transition"
              aria-label="toggle language"
            >
              {t.switchTo}
            </button>
            <div className="hidden sm:flex text-sm text-gray-600">
              <span className="mx-2">{phone}</span>
              <span className="mx-2">{email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative"
        style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className={`bg-gradient-to-b ${coverUrl ? 'from-black/30 to-white' : ''}`}>
          <div className="max-w-6xl mx-auto px-4 py-16">
            <p className="text-sm uppercase tracking-wide text-gray-600">{t.welcome}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              {clinicName}
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl">
              {lang === 'fr'
                ? `Nous assurons une prise en charge moderne et bienveillante. Situé à ${city}.`
                : `نوفّر رعاية حديثة وذات جودة في ${city}.`}
            </p>
            <div className={`mt-6 flex ${isRTL ? 'flex-row-reverse' : ''} gap-3`}>
              <button
                onClick={onViewSchedule}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 shadow-sm"
              >
                {t.viewSchedule}
              </button>
              <button
                onClick={onReserve}
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 shadow"
              >
                {t.reserve}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Card */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold">{t.doctor}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
          <div className="w-full">
            <div className="aspect-square rounded-2xl bg-gray-200 overflow-hidden">
              {doctorAvatarUrl ? (
                <img src={doctorAvatarUrl} alt={doctorName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Photo</div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{doctorName}</p>
                <p className="text-gray-600">{doctorTitle}</p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-gray-700">
              {lang === 'fr' ? doctorBioFR : doctorBioAR}
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium mb-1">{dict[lang].address}</p>
                <p className="text-gray-700">{addressLine1}</p>
                <p className="text-gray-700">{city}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-medium mb-1">{dict[lang].hours}</p>
                <ul className="text-gray-700 list-disc ms-4">
                  {(lang === 'fr' ? workingHoursFR : workingHoursAR).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold">{t.map}</h2>
          <div className="mt-6 rounded-2xl overflow-hidden shadow ring-1 ring-gray-200">
            <iframe
              title="Google Maps"
              src={mapSrc}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-lg">{clinicName}</p>
            <p className="text-gray-400 mt-1">{addressLine1}, {city}</p>
          </div>
          <div className={`${isRTL ? 'text-left' : 'text-right'} text-sm`}>
            <p>
              <span className="opacity-80">{t.phone}:</span> {phone}
            </p>
            <p>
              <span className="opacity-80">{t.email}:</span> {email}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClinicLanding;

// -------------------------------------------------------------------------
// Lightweight demo harness (acts like test cases in the preview)
// -------------------------------------------------------------------------
// This will not run automatically in all environments, but exporting a demo
// component helps validate props and i18n toggling manually.

export const DemoLanding: React.FC = () => (
  <ClinicLanding
    clinicName="Cabinet Dentaire — Dr. Maha El Marzouki"
    addressLine1="Quartier Al Andalus"
    city="Meknès"
    phone="+212 6 12 34 56 78"
    email="contact@cabinet.ma"
    lat={33.8938}
    lng={-5.5473}
    doctorName="Dr. Maha El Marzouki"
    doctorTitle="Chirurgien‑dentiste"
    doctorBioFR="Spécialisée en dentisterie esthétique et soins conservateurs."
    doctorBioAR="متخصصة في تجميل الأسنان والعلاجات التحفظية."
    onViewSchedule={() => console.log('Voir le planning')}
    onReserve={() => console.log('Prendre rendez‑vous')}
  />
);
