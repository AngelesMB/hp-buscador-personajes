import { Link } from "react-router-dom";

const CharacterDetail = ({ selectedCharacter }) => {
  return (
    <>
      <Link to="/">Volver al inicio</Link>
      <h2>Detalle del usuario:</h2>
      <div>{selectedCharacter.name}</div>
    </>
  );
};

export default CharacterDetail;
