import React, { useEffect, useState } from "react";
import { FaBorderAll, FaUser } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";
import "./Faq.css";

const FAQ = () => {
  const [category, setCategory] = useState("general");
  const [displayedCategory, setDisplayedCategory] = useState("general");
  const [transitioning, setTransitioning] = useState(false);

  const faqData = {
    general: [
      {
        question: "¿Qué es Xclusive Games?",
        answer:
          "Xclusive Games es una plataforma comunitaria para gamers donde puedes comprar, vender e intercambiar juegos, conectar con otros jugadores, compartir reseñas y mucho más.",
      },
      {
        question: "¿Cómo funciona el sistema de XCoins?",
        answer:
          "XCoins es nuestra moneda virtual que puedes ganar participando en la comunidad o comprar directamente. Puedes usarla para obtener descuentos en juegos, desbloquear contenido exclusivo y más.",
      },
      {
        question: "¿Está disponible en mi país?",
        answer:
          "Actualmente estamos disponibles en más de 50 países. Puedes verificar la disponibilidad en tu región durante el proceso de registro.",
      },
    ],
    cuenta: [
      {
        question: "¿Cómo creo una cuenta?",
        answer:
          "Puedes registrarte fácilmente haciendo clic en 'Iniciar Sesión' en la esquina superior derecha y seleccionando 'Crear cuenta'. Solo necesitas un correo electrónico válido.",
      },
      {
        question: "¿Puedo tener múltiples perfiles?",
        answer:
          "No, cada usuario debe tener una única cuenta. Tener múltiples cuentas va contra nuestros términos de servicio y puede resultar en la suspensión de todas tus cuentas.",
      },
      {
        question: "¿Cómo recupero mi contraseña?",
        answer:
          "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?' y sigue las instrucciones enviadas a tu correo electrónico registrado.",
      },
    ],
    marketplace: [
      {
        question: "¿Cómo vendo un juego?",
        answer:
          "Para vender un juego, ve a la sección 'Marketplace' y haz clic en 'Vender un producto'. Completa el formulario con los detalles del juego, sube algunas fotos y establece un precio.",
      },
      {
        question: "¿Qué comisión cobra Xclusive Games?",
        answer:
          "Cobramos una comisión del 5% sobre el precio final de venta para mantener la plataforma. Esta comisión se descuenta automáticamente cuando se completa la transacción.",
      },
      {
        question: "¿Cómo funcionan los intercambios?",
        answer:
          "Puedes ofrecer tus juegos para intercambio en lugar de venta. Cuando otro usuario esté interesado, recibirás una notificación y podrás negociar directamente con él a través de nuestro sistema de mensajería.",
      },
    ],
  };
  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    setTransitioning(true);
    setCategory(newCategory);
    setTimeout(() => {
      setDisplayedCategory(newCategory);
      setTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [category]);
  return (
    <section className="faq-section">
      <h2 className="animate-on-scroll">Preguntas Frecuentes</h2>

      <div className="faq-tabs">
        <div className="faq-navigation animate-on-scroll">
          <button
            className={`faq-tab-button ${
              category === "general" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("general")}
          >
            <FaBorderAll />
            General
          </button>
          <button
            className={`faq-tab-button ${
              category === "cuenta" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("cuenta")}
          >
            <FaUser />
            Cuenta
          </button>
          <button
            className={`faq-tab-button ${
              category === "marketplace" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("marketplace")}
          >
            <MdLocalGroceryStore />
            Marketplace
          </button>
        </div>
      </div>

      <ul
        className={`faq-list animate-on-scroll ${
          transitioning ? "fade-out" : "fade-in"
        }`}
      >
        {!transitioning &&
          faqData[displayedCategory].map((item, idx) => (
            <li key={idx} className="faq-item animate-on-scroll">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default FAQ;
