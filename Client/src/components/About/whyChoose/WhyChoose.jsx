import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaTrophy, FaComments } from "react-icons/fa";
import { MdVideogameAsset } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import "./WhyChoose.css";

const benefits = [
  {
    icon: <MdVideogameAsset />,
    title: "Amplio Catálogo",
    description:
      "Juegos para todas las plataformas: PlayStation, Nintendo Switch, Xbox y PC.",
  },
  {
    icon: <FaUsers />,
    title: "Comunidad Activa",
    description: "Conecta con otros gamers, comparte reseñas y experiencias",
  },
  {
    icon: <IoShieldCheckmarkSharp />,
    title: "Transacciones Seguras",
    description: "Sistema de protección para compradores y vendedores",
  },
  {
    icon: <FaTrophy />,
    title: "Eventos y Torneos",
    description: "Participa en eventos exclusivos y gana premios increíbles",
  },
  {
    icon: <FaComments />,
    title: "Foros y Discusiones",
    description: "Comparte tus opiniones y aprende de otros jugadores",
  },
  {
    icon: <AiOutlineThunderbolt />,
    title: "PC Builder",
    description:
      "Arma tu PC virtual y verifica la compatibilidad con tus juegos favoritos",
  },
];

const WhyChoose = () => {
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
  }, []);
  return (
<section className="why-choose">
      <h2>¿Por qué elegir Xclusive Games?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="benefit-card animate-on-scroll"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="card-blur card-blur-left"></div>
            <div className="card-blur card-blur-center"></div>
            <div className="card-blur card-blur-right"></div>
            <div className="container-icon">
              <div className="benefit-icon">{benefit.icon}</div>
            </div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default WhyChoose;
