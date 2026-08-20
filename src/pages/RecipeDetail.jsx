import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { getRecipeInformation } from '../api/spoonacular';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeInformation(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Error loading recipe: {error}
        </Alert>
        <Button variant="outline-success" className="load-more-btn" onClick={() => navigate('/')}>
          Go back
        </Button>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Recipe not found</Alert>
        <Button variant="outline-success" className="load-more-btn" onClick={() => navigate('/')}>
          Go back
        </Button>
      </Container>
    );
  }

  return (
    <section className="py-5">
      <Container>
        <Button
          variant="outline-success"
          className="mb-3 load-more-btn"
          onClick={() => navigate('/')}
        >
          ← Go back
        </Button>

        <Row>
          <Col md={6}>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="img-fluid rounded mb-3"
              />
            )}
          </Col>

          <Col md={6}>
            <h1>{recipe.title}</h1>

            {recipe.sourceUrl && (
              <Button
                variant="primary"
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3"
              >
                View full recipe
              </Button>
            )}

            {recipe.summary && (
              <div className="mb-4">
                <h3>Description</h3>
                <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              </div>
            )}

            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
              <div className="mb-4">
                <h3>Ingredients</h3>
                <ListGroup>
                  {recipe.extendedIngredients.map((ing, idx) => (
                    <ListGroup.Item key={idx}>
                      {ing.name} - {ing.original}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </Col>
        </Row>

        {recipe.instructions && (
          <Row className="mt-5">
            <Col>
              <h3>Instructions</h3>
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}
