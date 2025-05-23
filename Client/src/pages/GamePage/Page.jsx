import './styles.css';
import { useParams } from 'react-router-dom';
const Game = () => {
  const { id } = useParams();
  return (
    <>
      <h1>Game ID: {id}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
        nunc eget ultricies ultricies, nunc nisl ultricies nunc, eget nunc nisl
        nisl.
      </p>
    </>
  );
};
export default Game;