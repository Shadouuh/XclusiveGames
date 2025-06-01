import React, { useEffect } from "react";
import "./Team.css";

const teamMembers = [
  {
    name: "Dipper Pines",
    role: "Fundador & CEO",
    image: "../../../assets/dipper.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Gumball Watterson",
    role: "Directora de Comunidad",
    image: "../../../assets/gumbal.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Kick Buttowski",
    role: "Jefe de Desarrollo",
    image: "../../../assets/kick-buttowski.jpg",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Juan",
    role: "Backend & Seguridad",
    image: "../../../assets/juan.jpeg",
    socials: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

const Team = () => {
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
    <section className="team-section">
      <div className="team-title">
        <h2 className="animate-on-scroll">Nuestro Equipo</h2>
      </div>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card animate-on-scroll">
            <div className="image-wrapper">
              <div className="team-blur"></div>
              <img src={member.image} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="team-socials">
              <a href={member.socials.twitter}>Twitter</a>
              <a href={member.socials.linkedin}>LinkedIn</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
