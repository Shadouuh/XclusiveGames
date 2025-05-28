import './styles.css';
import { Link } from 'react-router-dom';
import { Games } from '../../exampleData/games.js';
import GameCard from '../../components/GameCard/GameCard';
import { LuGamepad, LuGamepad2, LuTablet, LuMonitor, LuLibrary, LuUsers, LuZap } from 'react-icons/lu';
const Home = () => {
  return (
    <section className="home-container">
      <section className="hero-header">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Tu Comunidad <span>Gamer Xclusiva</span></h1>
          <p className="hero-description">
            Compra, intercambia y conecta con otros gamers.
            Juegos para PlayStation, Nintendo Switch, Xbox y PC en un solo lugar.
          </p>
          <div className="hero-buttons">
            <Link to="/catalog" className="btn btn-primary">Explorar Juegos</Link>
            <Link to="/auth" className="btn btn-secondary">Unirse a la Comunidad</Link>
          </div>
        </div>
      </section>
      <section className="game-container-home">
        <h1>Juegos Destacados</h1>
        <div className="games-container-home">

          {Games.length > 0 ? (
            Games.slice(0, 6).map(game => (
              <GameCard
                key={game.id}
                id={game.id}
                name={game.nombre}
                image={game.imagen}
                platform={game.plataforma[0]}
                price={game.precio}
              />
            ))
          ) : (
            <div className="no-games">No se encontraron juegos con los filtros seleccionados</div>
          )}
        </div>
      </section>

      <section className="consoles-feature-container">
        <div className="consoles-header">
          <h2>Todas las Plataformas</h2>
          <p>Encuentra juegos para todas tus consolas favoritas</p>
        </div>

        <div className="consoles-grid">
          <Link to="/catalog?platform=PlayStation" className="console-card playstation">
            <div className="console-icon-wrapper">
              <LuGamepad2 size={42} stroke='snow' strokeWidth={1.5} />
            </div>
            <h3>PlayStation</h3>
          </Link>

          <Link to="/catalog?platform=Xbox" className="console-card xbox">
            <div className="console-icon-wrapper">
              <LuGamepad size={42} stroke='snow' strokeWidth={1.5} />
            </div>
            <h3>Xbox</h3>
          </Link>

          <Link to="/catalog?platform=Nintendo Switch" className="console-card nintendo">
            <div className="console-icon-wrapper">
              <LuTablet size={42} stroke='snow' strokeWidth={1.5} />
            </div>
            <h3>Nintendo</h3>
          </Link>

          <Link to="/catalog?platform=PC" className="console-card pc">
            <div className="console-icon-wrapper">
              <LuMonitor size={42} stroke='snow' strokeWidth={1.5} />
            </div>
            <h3>PC</h3>
          </Link>
        </div>
      </section>
      <section className="why-xclusive-container">
        <div className="why-xclusive-header">
          <h2>¿Por qué elegir Xclusive Games?</h2>
          <p>Una plataforma completa para todos tus juegos y necesidades de gaming</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <LuLibrary size={32} />
            </div>
            <h3>Amplio Catálogo</h3>
            <p>Juegos para todas las plataformas: PlayStation, Nintendo Switch, Xbox y PC</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <LuUsers size={32} />
            </div>
            <h3>Comunidad Activa</h3>
            <p>Conecta con otros gamers, comparte reseñas y experiencias</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <LuZap size={32} />
            </div>
            <h3>PC Builder</h3>
            <p>Arma tu PC virtual y verifica la compatibilidad con tus juegos favoritos</p>
          </div>
        </div>
      </section>

      <section className="game-container-home">
      <h1>Nuevos Lanzamientos</h1>
      <div className="games-container-home">
      
      {Games.length > 0 ? (
        Games.slice(10, 17).map(game => (
          <GameCard 
            key={game.id}
            id={game.id}
            name={game.nombre}
            image={game.imagen}
            platform={game.plataforma[0]} 
            price={game.precio}
          />
        ))
      ) : (
        <div className="no-games">No se encontraron juegos con los filtros seleccionados</div>
      )}
    </div>
      </section>

    </section>
  );
};
export default Home;