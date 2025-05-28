import './styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import useNotification from '../../hooks/useNotification';
const Game = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const { notify } = useNotification();

  if (!id) return

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/games/getById/" + id);

        if (response.status === 200) {
          setGame(response.data.game);
        }
      } catch (err) {
        notify(err.response?.data?.message || "Error al obtener el juego", 'error');
      } finally {
        setLoading(false);
      }
    }
    fetchGame();
  }, [])

  return (
    <>
      <p>Nombre: {game.name}</p>
      <p>Descripción: {game.description}</p>
      <p>Precio: {game.price}</p>
      <p>Plataforma: {game.platforms}</p>
      <p>Genero: {game.genres}</p>
    </>
  );
};
export default Game;