import './styles.css'
import { useState, useEffect } from 'react';
import { getReviewsByGameId, getAverageRating } from '../../exampleData/gameReviewsData.js';
import { LuShoppingCart, LuStar } from 'react-icons/lu';

const GameCard = ({id, name, image, platform, price}) => {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const gameReviews = getReviewsByGameId(id);
        setReviews(gameReviews);
        const avgRating = getAverageRating(id);
        setRating(avgRating);
    }, [id]);
    
    return (
        <div className="game-card">
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
                        ARS ${price}
                    </div>
                    <button className='add-to-cart btn'>
                        <LuShoppingCart/>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};
export default GameCard;