import React, { useState } from "react";

export default function ReservationForm({ isVisible, onClose, language = "fr" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferred_date: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Translations
  const translations = {
    fr: {
      title: "Prendre rendez-vous",
      name: "Nom complet",
      phone: "Téléphone",
      email: "Email (optionnel)",
      date: "Date préférée",
      message: "Motif de la consultation",
      submit: "Envoyer la demande",
      cancel: "Annuler",
      loading: "Envoi en cours...",
      success: "Votre demande de rendez-vous a été envoyée avec succès! Notre équipe vous contactera très prochainement pour confirmer votre rendez-vous.",
      error: "Une erreur est survenue, veuillez réessayer.",
      required: "Ce champ est requis",
    },
    ar: {
      title: "حجز موعد",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني (اختياري)",
      date: "التاريخ المفضل",
      message: "سبب الزيارة",
      submit: "إرسال الطلب",
      cancel: "إلغاء",
      loading: "جاري الإرسال...",
      success: "تم إرسال طلب الموعد بنجاح! سيتواصل معكم فريقنا قريباً لتأكيد الموعد.",
      error: "حدث خطأ، يرجى المحاولة مرة أخرى.",
      required: "هذا الحقل مطلوب",
    },
  };

  const t = translations[language] || translations.fr;
  const isRTL = language === "ar";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Erreur serveur");
      }

      const data = await res.json();
      console.log("Réservation créée:", data);
      
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        preferred_date: "",
        message: "",
      });

      // Close form after 3 seconds of success
      setTimeout(() => {
        onClose();
        setStatus(null);
      }, 3000);

    } catch (err) {
      console.error("Erreur lors de l'envoi:", err);
      setStatus("error");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="reservation-modal-overlay" style={{
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div className={`reservation-modal ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} style={{
        animation: 'slideIn 0.4s ease-out'
      }}>
        <div className="modal-header">
          <h2 className="modal-title">{t.title}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={t.name}
              value={form.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder={t.phone}
              value={form.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t.email}
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="datetime-local"
              name="preferred_date"
              value={form.preferred_date}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().slice(0, 16)}
            />
            <label className="form-label">{t.date}</label>
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder={t.message}
              value={form.message}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-buttons">
            <button 
              type="button" 
              onClick={onClose}
              className="btn-cancel"
            >
              {t.cancel}
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? t.loading : t.submit}
            </button>
          </div>

          {status === "success" && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              zIndex: 10000,
              textAlign: 'center',
              border: '2px solid #16a34a',
              minWidth: '350px',
              fontSize: '18px',
              fontWeight: '500'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎉</div>
              <p style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold' }}>
                Réservation bien mise!
              </p>
              <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.5' }}>
                {t.success}
              </p>
              <div style={{
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                ⏱️ Cette fenêtre se fermera automatiquement dans 3 secondes
              </div>
            </div>
          )}
          
          {status === "error" && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '20px',
              borderRadius: '8px',
              marginTop: '20px',
              textAlign: 'center',
              border: '1px solid #fca5a5'
            }}>
              <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>❌ {t.error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}