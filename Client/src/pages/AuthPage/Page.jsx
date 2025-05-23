import './styles.css';
import { useState } from 'react';
import { LuMail } from 'react-icons/lu';
const AuthPage = () => {
  const [authState, setAuthState] = useState("login");
  const toggleAuthState = () => setAuthState(authState === "login" ? "register" : "login");
  return (
    <section className='auth-container'>
      <div className="auth-form">
        <div className="content">
          <h1>XclusiveGames</h1>
          <h4>Iniciar Sesion</h4>
          <p>Bienvenido de nuevo!</p>
          {/* Formulario Cambiante*/}
          <form action="">
            <label>Correo Electronico</label>
            <div className="input">
              <LuMail />
              <input type="email" placeholder='tu@dominio.com' />
            </div>
            <label>Contraseña</label>
            <div className="input">
              <LuMail />
              <input type="password" placeholder='********' />
            </div>

            <input type="submit" value="Iniciar Sesion" className='submit-btn'/>
          </form>
          <div className="not-account">
            <p>No tienes una Cuenta?</p>
            <button className='toggle-auth'>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthPage;