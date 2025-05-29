import './styles.css';
import { Link } from 'react-router-dom';
import { LuSwords, LuMountain, LuDices, LuCar, LuBrain, LuGhost, LuHeart, LuMusic, LuPuzzle, LuRocket } from 'react-icons/lu';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Acción', icon: <LuSwords size={40} />, color: '#e53935', count: 245 },
    { id: 2, name: 'Aventura', icon: <LuMountain size={40} />, color: '#43a047', count: 189 },
    { id: 3, name: 'RPG', icon: <LuDices size={40} />, color: '#1e88e5', count: 167 },
    { id: 4, name: 'Estrategia', icon: <LuDices size={40} />, color: '#f9a825', count: 124 },
    { id: 5, name: 'Shooter', icon: <LuDices size={40} />, color: '#e64a19', count: 155 },
    { id: 6, name: 'Deportes', icon: <LuHeart size={40} />, color: '#0097a7', count: 98 },
    { id: 7, name: 'Simulación', icon: <LuCar size={40} />, color: '#00897b', count: 87 },
    { id: 8, name: 'Indie', icon: <LuGhost size={40} />, color: '#8e24aa', count: 213 },
    { id: 9, name: 'Puzzle', icon: <LuPuzzle size={40} />, color: '#7cb342', count: 76 },
    { id: 10, name: 'Horror', icon: <LuGhost size={40} />, color: '#424242', count: 64 },
    { id: 11, name: 'Mundo Abierto', icon: <LuMusic size={40} />, color: '#0d47a1', count: 92 },
    { id: 12, name: 'Sci-Fi', icon: <LuRocket size={40} />, color: '#6200ea', count: 108 },
  ];

  return (
    <section className="categories-container">
      <div className="categories-header">
        <h1>Categorías de Juegos</h1>
        <p>Explora nuestra amplia selección de géneros y encuentra tu próxima aventura</p>
      </div>
      
      <div className="categories-flex">
        {categories.map(category => (
          <Link 
            to={`/games?genre=${category.name}`} 
            key={category.id} 
            className="category-card"
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon">
              {category.icon}
            </div>
            <h3>{category.name}</h3>
            <p>{category.count} juegos</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;