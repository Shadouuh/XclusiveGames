import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import useNotification from '../../hooks/useNotification.jsx';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { notify } = useNotification();
  
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userLocal = localStorage.getItem('user');
    if (!userLocal) {
      navigate('/auth');
      return;
    }
    
    fetchCartItems();
  }, [navigate]);
  
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/cart', {
        withCredentials: true // Para enviar las cookies con la petición
      });
      setItems(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      setError('Error al cargar los productos del carrito');
      if (error.response && error.response.status === 401) {
        navigate('/auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id_cart, change, currentQuantity) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    try {
      await axios.put(`/cart/update/${id_cart}`, {
        quantity: newQuantity
      }, {
        withCredentials: true
      });
      
      setItems(items.map(item => 
        item.id_cart === id_cart ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      notify('Error al actualizar cantidad', 'error');
    }
  };

  const removeItem = async (id_cart) => {
    try {
      await axios.delete(`/cart/remove/${id_cart}`, {
        withCredentials: true
      });
      
      setItems(items.filter(item => item.id_cart !== id_cart));
      notify('Producto eliminado del carrito', 'success');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      notify('Error al eliminar producto', 'error');
    }
  };

  const openPreview = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const subtotal = Array.isArray(items) ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
  const total = subtotal;

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {loading ? (
            <div className="loading">Cargando carrito...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : items.length === 0 ? (
            <div className="empty-cart">
              <h3>Tu carrito está vacío</h3>
              <p>Agrega productos desde el catálogo</p>
              <button onClick={() => navigate('/catalog')} className="continue-shopping">Ir al Catálogo</button>
            </div>
          ) : (
            Array.isArray(items) ? items.map(item => (
              <div key={item.id_cart} className="cart-item">
                <div className="item-image">
                  <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="game-info">{item.plataform} | {item.genre}</p>
                  
                  <div className="game-actions">
                    <button className="preview-button" onClick={() => openPreview(item)}>Vista Previa</button>
                    <button className="details-button" onClick={() => navigate(`/game/${item.id_game}`)}>Ver Más</button>
                  </div>

                  <div className="quantity-controls">
                    <span>Cantidad:</span>
                    <button onClick={() => updateQuantity(item.id_cart, -1, item.quantity)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id_cart, 1, item.quantity)}>+</button>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <button className="remove-item" onClick={() => removeItem(item.id_cart)}>×</button>
              </div>
            ))
          : null)}
        </div>

        <div className="cart-summary">
          <div className="price-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Métodos de Pago</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="payment" value="credit" defaultChecked />
                <span>Tarjeta de Crédito</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" value="debit" />
                <span>Tarjeta de Débito</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="payment" value="paypal" />
                <span>PayPal</span>
              </label>
            </div>
          </div>

          <button 
            className="checkout-button" 
            onClick={() => notify('Funcionalidad de pago en desarrollo', 'info')}
            disabled={items.length === 0}
          >
            Proceder al Pago
          </button>
        </div>
      </div>

      {showModal && selectedGame && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
            <img src={selectedGame.image || 'https://via.placeholder.com/300'} alt={selectedGame.name} className="modal-image" />
            <h3>{selectedGame.name}</h3>
            <p className="modal-description">{selectedGame.description}</p>
            <div className="modal-details">
              <p><strong>Plataforma:</strong> {selectedGame.plataform}</p>
              <p><strong>Género:</strong> {selectedGame.genre}</p>
              <p><strong>Precio:</strong> ${selectedGame.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;