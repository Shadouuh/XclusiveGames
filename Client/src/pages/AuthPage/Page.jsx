import './styles.css';
import { useState } from 'react';
import { LuMail, LuLock } from 'react-icons/lu';
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
        // Store token if needed

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

  return (
    <section className='auth-container'>
      <div className="auth-form">
        <div className="content">
          <h1>XclusiveGames</h1>
          <h4>{authState === "login" ? "Iniciar Sesión" : "Registrarse"}</h4>
          <p>{authState === "login" ? "Bienvenido de nuevo!" : "Crea tu cuenta"}</p>

          {/* Formulario Cambiante */}
          <form onSubmit={authState === "login" ? handleSubmitLogin : handleSubmitRegister}>
            <label>{`Correo Electrónico${authState === "login" ? " o Usuario" : ""}`}</label>
            <div className="input">
              <LuMail />
              <input
                type={authState === "login" ? "text" : "email"}
                name="nickOrEmail"
                placeholder={`Correo Electrónico${authState === "login" ? " o Usuario" : ""}`}
                value={formData.nickOrEmail}
                onChange={handleChange}
                required
              />
            </div>

            {authState === "register" && (
              <>
                <label>Usuario</label>
                <div className="input">
                  <LuMail />
                  <input
                    type="text"
                    name="nick"
                    placeholder='Usuario'
                    value={formData.nick}
                    onChange={handleChange}
                    required
                  />
                </div></>
            )}

            <label>Contraseña</label>
            <div className="input">
              <LuLock />
              <input
                type="password"
                name="password"
                placeholder='********'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {authState === "login" && (
              <div className="remember-forgot">
                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  Recordarme
                </label>
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
            )}

            <input
              type="submit"
              value={loading ? "Procesando..." : (authState === "login" ? "Iniciar Sesión" : "Registrarse")}
              className='submit-btn'
              disabled={loading}
            />
          </form>

          <div className="not-account">
            <p>{authState === "login" ? "¿No tienes una Cuenta?" : "¿Ya tienes una cuenta?"}</p>
            <button className='toggle-auth' onClick={toggleAuthState}>
              {authState === "login" ? "Registrarse" : "Iniciar Sesión"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;