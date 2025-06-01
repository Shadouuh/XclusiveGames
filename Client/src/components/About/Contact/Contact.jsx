import React, { useEffect } from "react";
import { IoMdMail } from "react-icons/io";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaUser,
} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
import "./Contact.css";

const Contact = () => {
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
  window.addEventListener("load", () => {
    const titles = document.querySelectorAll(".contact-form h2");

    titles.forEach((title) => {
      const before = window.getComputedStyle(title, "::before");
      title.style.animation = "none";
      void title.offsetWidth;
      title.style.animation = "";
    });
  });
  return (
    <section className="contact-container">
      <div className="contact-info animate-on-scroll">
        <div className="info-title">
          <h2>Contáctanos</h2>
        </div>
        <p>
          ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte.
          Ponte en contacto con nuestro equipo de soporte.
        </p>

        <div className="contact-details ">
          <div
            className="contact-item animate-on-scroll"
            style={{ "--delay": "0.1s" }}
          >
            <div className="content-icon">
              <IoMdMail className="contact-icon" />
            </div>
            <div>
              <h4>Email</h4>
              <p>example@gmail.com</p>
            </div>
          </div>

          <div
            className="contact-item animate-on-scroll"
            style={{ "--delay": "0.1s" }}
          >
            <div className="content-icon">
              <FaMapMarkerAlt className="contact-icon" />
            </div>
            <div>
              <h4>Dirección</h4>
              <p>Av. Siempre Viva 742, Springfield</p>
            </div>
          </div>

          <div
            className="contact-item animate-on-scroll"
            style={{ "--delay": "0.1s" }}
          >
            <div className="content-icon">
              <BsFillTelephoneFill className="contact-icon" />
            </div>
            <div>
              <h4>Teléfono</h4>
              <p>+54 9 11 1234 5678</p>
            </div>
          </div>
        </div>

        <div className="contact-social">
          <h4>Nuestras redes</h4>
          <p>Síguenos para estar al tanto de nuestras novedades y eventos.</p>
          <div className="social-icons">
            <div
              className="content-icons-social animate-on-scroll"
              style={{ "--delay": "0.2s" }}
            >
              <div className="contact-blur"></div>
              <FaFacebookF className="social-icon" />
            </div>
            <div
              className="content-icons-social animate-on-scroll"
              style={{ "--delay": "0.2s" }}
            >
              <div className="contact-blur"></div>
              <FaXTwitter className="social-icon" />
            </div>
            <div
              className="content-icons-social animate-on-scroll"
              style={{ "--delay": "0.2s" }}
            >
              <div className="contact-blur"></div>
              <FaInstagram className="social-icon" />
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form animate-on-scroll">
        <h2 className="animate-on-scroll">Envíanos un mensaje</h2>
        <form>
          <label className="animate-on-scroll" style={{ "--delay": "0.1s" }}>
            Nombre
          </label>
          <div
            className="input-group animate-on-scroll"
            style={{ "--delay": "0.2s" }}
          >
            <FaUser />
            <input type="text" placeholder="Nombre" required />
          </div>

          <label className="animate-on-scroll" style={{ "--delay": "0.3s" }}>
            Email
          </label>
          <div
            className="input-group animate-on-scroll"
            style={{ "--delay": "0.4s" }}
          >
            <IoMdMail />
            <input type="email" placeholder="Email" required />
          </div>

          <label className="animate-on-scroll" style={{ "--delay": "0.5s" }}>
            Asunto
          </label>
          <div
            className="input-group animate-on-scroll"
            style={{ "--delay": "0.6s" }}
          >
            <HiOutlineMailOpen />
            <input type="text" placeholder="Asunto" required />
          </div>

          <label className="animate-on-scroll" style={{ "--delay": "0.7s" }}>
            Mensaje
          </label>
          <div
            className="input-group animate-on-scroll"
            style={{ "--delay": "0.8s" }}
          >
            <MdMessage />
            <textarea placeholder="Mensaje" rows="5" required></textarea>
          </div>
          <button
            className="animate-on-scroll"
            style={{ "--delay": "0.9s" }}
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
