import './styles.css';
import { useState } from 'react';
import { LuMail, LuLock, LuUser } from 'react-icons/lu';
const AuthPage = () => {
  const [authState, setAuthState] = useState("login");
  const toggleAuthState = () => setAuthState(authState === "login" ? "register" : "login");
  return (
    <section className='auth-container'>
      <div className={`auth-form ${authState === "register" ? "reverse" : ""}`}>
        <div className="content">
          <h1>XclusiveGames</h1>
          {authState === "login" ? (
            <>
              <h4>Iniciar Sesion</h4>
              <p>Bienvenido de nuevo!</p>
              {/* Formulario Login */}
              <form action="">
                <label>Correo Electronico</label>
                <div className="input">
                  <LuMail stroke='#ccc9cb'/>
                  <input type="email" placeholder='tu@dominio.com' />
                </div>
                <label>Contraseña</label>
                <div className="input">
                  <LuLock stroke='#ccc9cb'/>
                  <input type="password" placeholder='********' />
                </div>

                <input type="submit" value="Iniciar Sesion" className='submit-btn'/>
              </form>
              <div className="not-account">
                <p>No tienes una Cuenta?
                <span>
                  <a onClick={toggleAuthState}>Registrate</a>
                </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <h4>Crear Cuenta</h4>
              <p>Únete a nuestra comunidad de gamers!</p>
              {/* Formulario Registro */}
              <form action="">
                <label>Nombre de Usuario</label>
                <div className="input">
                  <LuUser stroke='#ccc9cb'/>
                  <input type="text" placeholder='Tu nombre de usuario' />
                </div>
                <label>Correo Electronico</label>
                <div className="input">
                  <LuMail stroke='#ccc9cb'/>
                  <input type="email" placeholder='tu@dominio.com' />
                </div>
                <label>Contraseña</label>
                <div className="input">
                  <LuLock stroke='#ccc9cb'/>
                  <input type="password" placeholder='********' />
                </div>
                <label>Confirmar Contraseña</label>
                <div className="input">
                  <LuLock stroke='#ccc9cb'/>
                  <input type="password" placeholder='********' />
                </div>

                <input type="submit" value="Registrarse" className='submit-btn'/>
              </form>
              <div className="not-account">
                <p>Ya tienes una Cuenta?
                <span>
                  <a onClick={toggleAuthState}>Inicia Sesión</a>
                </span>
                </p>
              </div>
            </>
          )}
        </div>
        <div className="auth-image">
          <div className="image-overlay">
            <div className="auth-text">
              <h2>Únete a la Comunidad Gamer Definitiva</h2>
              <p>Descubre nuevos juegos, conecta con otros jugadores y comparte tus experiencias en la plataforma gaming más exclusiva.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AuthPage;