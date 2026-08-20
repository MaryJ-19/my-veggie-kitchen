import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Card style={{ width: '18rem' }} className="m-2">
      {recipe.image && <Card.Img variant="top" src={recipe.image} alt={recipe.title} />}
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Link to={`/recipe/${recipe.id}`}>
          <Button variant="primary" className="w-100">
            Visualizza dettagli
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
