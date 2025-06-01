import "./styles.css";
import WhyChoose from "../../components/About/whyChoose/WhyChoose";
import Team from "../../components/About/Team/Team";
import FAQ from "../../components/About/Faq/FAQ";
import ContactForm from "../../components/About/Contact/Contact";
import React, { useEffect, useRef, useState } from "react";

const About = () => {
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
    <main className="about-container">
      <section className="about-intro animate-on-load fade-up">
        <h1 className="animated-gradient-text">Sobre Xclusive Games</h1>
        <p>
          Tu comunidad gamer exclusiva para comprar, intercambiar y conectar con
          otros jugadores.
        </p>
      </section>

      <section className="about-story animate-on-scroll">
        <div className="story-text slide-in-left">
          <h2>Nuestra Historia</h2>
          <div className="text">
            <p>
              Xclusive Games nació en 2022 con una misión clara: crear un
              espacio único donde los gamers pudieran compartir su pasión por
              los videojuegos, más allá de las simples transacciones de compra y
              venta.
            </p>
            <p>
              Fundada por un grupo de entusiastas de los videojuegos, nuestra
              plataforma ha crecido hasta convertirse en una comunidad vibrante
              con miles de usuarios activos que comparten, intercambian y
              discuten sobre sus juegos favoritos.
            </p>
            <p>
              Hoy, Xclusive Games es mucho más que un marketplace: es un punto
              de encuentro para todos los amantes de los videojuegos,
              independientemente de su plataforma preferida o género favorito.
            </p>
          </div>
        </div>
        <div className="story-img zoom-in">
          <img src="../../../assets/bg.jpg" alt="Nuestra historia" />
        </div>
      </section>

      <section className="about-mission animate-on-scroll">
        <h2 className="rotate-in">Nuestra Misión</h2>
        <p>
          Fomentar una comunidad inclusiva, segura y activa para todos los
          jugadores, promoviendo el intercambio justo y el acceso a experiencias
          únicas.
        </p>
        <button className="join-button fade-up">Únete a la Comunidad</button>
      </section>

      <WhyChoose />
      <Team />
      <FAQ />
      <ContactForm />
    </main>
  );
};

export default About;
