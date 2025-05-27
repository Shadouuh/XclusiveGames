import './styles.css';
import { useEffect, useState } from 'react';
import { LuMail, LuLock, LuUser } from 'react-icons/lu';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';
const AuthPage = () => {
  const [authState, setAuthState] = useState("login");
  const toggleAuthState = () => setAuthState(authState === "login" ? "register" : "login");

  const { notify } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nickOrEmail: '',
    nick: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/user/login", formData);

      if (response.status === 200) {
        const user = response.data.user;
        window.localStorage.setItem("user", JSON.stringify(user));
        notify(response.data.message, "success");
        navigate("/");
      }
    } catch (err) {
      notify(err.response?.data?.message || "Error al iniciar sesión", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      notify("Las contraseñas no coinciden", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/user/register", {...formData, email: formData.nickOrEmail});

      if (response.status === 201) {
        notify(response.data.message, "success");
        toggleAuthState();
      }
    } catch (err) {
      notify(err.response?.data?.message || "Error al iniciar sesión", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

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
              <form onSubmit={handleSubmitLogin}>
                <label>Correo Electronico o Usuario</label>
                <div className="input">
                  <LuMail stroke='#ccc9cb'/>
                  <input 
                    type="text" 
                    name="nickOrEmail"
                    placeholder='tu@dominio.com o usuario' 
                    value={formData.nickOrEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label>Contraseña</label>
                <div className="input">
                  <LuLock stroke='#ccc9cb'/>
                  <input 
                    type="password" 
                    name="password"
                    placeholder='********' 
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="remember-forgot">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Recordarme</span>
                  </label>
                </div>

                <input 
                  type="submit" 
                  value={loading ? "Procesando..." : "Iniciar Sesion"} 
                  className='submit-btn'
                  disabled={loading}
                />
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
              <form onSubmit={handleSubmitRegister}>
                <label>Nombre de Usuario</label>
                <div className="input">
                  <LuUser stroke='#ccc9cb'/>
                  <input 
                    type="text"
                    name="nick"
                    placeholder='my_nick_123'
                    value={formData.nick}
                    onChange={handleChange}
                    required />
                </div>
                <label>Correo Electronico</label>
                <div className="input">
                  <LuMail stroke='#ccc9cb'/>
                  <input 
                    type="email"
                    name="nickOrEmail"
                    placeholder='tu@dominio.com'
                    value={formData.nickOrEmail}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <label>Contraseña</label>
                <div className="input">
                  <LuLock stroke='#ccc9cb'/>
                  <input 
                    type="password"
                    name="password"
                    placeholder='********'
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <label>Confirmar Contraseña</label>
                <div className="input">
                  <LuLock stroke='#ccc9cb'/>
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder='********'
                    onChange={handleChange}
                    required 
                  />
                </div>

                <input 
                  type="submit"
                  value={loading ? "Procesando..." : "Registrarse"}
                  className='submit-btn'
                  disabled={loading}
                />
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