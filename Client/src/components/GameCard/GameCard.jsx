import './styles.css'
import { useState, useEffect } from 'react';


// IMPORTAR AXIOS DE SU CONFIGURACION NO DEL NODE_MODULES
import axios from '../../api/axios';


import { getReviewsByGameId, getAverageRating } from '../../exampleData/gameReviewsData.js';
import { LuShoppingCart, LuStar } from 'react-icons/lu';
import useNotification from '../../hooks/useNotification.jsx';

const GameCard = ({id, name, image, platform, price}) => {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { notify } = useNotification();

    useEffect(() => {
        const gameReviews = getReviewsByGameId(id);
        setReviews(gameReviews);
        const avgRating = getAverageRating(id);
        setRating(avgRating);
    }, [id]);
    
    const handleAddToCart = async () => {
        // Verificar si el usuario está autenticado
        const userLocal = localStorage.getItem('user');
        if (!userLocal) {
            notify('Debes iniciar sesión para agregar al carrito', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('/cart/add/' + id, {
                quantity: 1,
                id_login: JSON.parse(userLocal).id_login
            });
            
            console.log('Respuesta del servidor:', response.data);

            if(response.status == 200 || response.status == 201) {
                notify(response.data.message, 'success');
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            notify('Error al agregar al carrito', 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="game-card-comp">
            <div className="game-image">
                <div className="platform-feature">
                    {platform}
                </div>
                <img src={image} alt={name} />
            </div>
            <div className="game-info">
                <h3>{name}</h3>
                <div className="rating">
                    <LuStar/>{rating}
                </div>
                <div className="game-bottom">
                    <div className="game-price">
                        {price === 0 ? 'Gratis' : `ARS ${price}`} 
                    </div>
                    <button 
                        className='add-to-cart btn' 
                        onClick={handleAddToCart}
                        disabled={isLoading}
                    >
                        <LuShoppingCart/>
                        {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default GameCard;