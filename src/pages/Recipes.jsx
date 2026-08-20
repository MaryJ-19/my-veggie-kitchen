import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search, X } from 'react-bootstrap-icons';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const categoryTitles = {
  '': 'Vegetarian Recipes',
  breakfast: 'Breakfast',
  'main course': 'Mains',
  'side dish': 'Sides',
  dessert: 'Sweets',
  drink: 'Drinks',
};

export default function Recipes() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const selectedCategory = urlParams.get('category') || '';
  const initialQuery = urlParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [offset, setOffset] = useState(0);
  const { recipes, loading, error, searchRecipes, totalResults } = useRecipeContext();
  const debounceTimer = useRef(null);

  const pageTitle = categoryTitles[selectedCategory] || 'Vegetarian Recipes';

  useEffect(() => {
    setQuery(initialQuery);
    setOffset(0);
  }, [selectedCategory, initialQuery]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setOffset(0);

    if (query.length >= 3 || query.length === 0) {
      debounceTimer.current = setTimeout(() => {
        searchRecipes({
          query,
          number: 12,
          offset: 0,
          type: selectedCategory,
        }).catch(() => {});
      }, 500);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, selectedCategory, searchRecipes]);

  const onSearch = async (e) => {
    e?.preventDefault();
    if (query.length >= 3 || query.length === 0) {
      try {
        await searchRecipes({ query, number: 12, type: selectedCategory });
      } catch {
        // handled in context
      }
    }
  };

  return (
    <section id="ricette" className="py-4">
      <Container>
        <h2>{pageTitle}</h2>

        <Form className="mb-4" onSubmit={onSearch}>
          <Row>
            <Col md={8}>
              <div className="modern-search-wrapper justify-content-start">
                <InputGroup className="modern-search-group">
                  <InputGroup.Text className="modern-search-icon">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    className="modern-search-input"
                    placeholder="Search (e.g. pasta, salad)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      type="button"
                      className="clear-search-btn"
                      aria-label="Clear search"
                      onClick={() => setQuery('')}
                    >
                      <X size={18} />
                    </button>
                  )}
                </InputGroup>
              </div>
            </Col>
          </Row>
        </Form>

        {error && (
          <Alert variant="danger">
            Errore: {error.message}
          </Alert>
        )}

        <Row>
          {recipes && recipes.length > 0 ? (
            recipes.map((r) => (
              <Col key={r.id} sm={12} md={6} lg={4} className="mb-3">
                <RecipeCard recipe={r} />
              </Col>
            ))
          ) : (
            <Col>
              <div className="empty-state text-muted">
                <p>
                  {loading ? 'Loading recipes...' : 'No recipes found.'}
                </p>
                {!loading && (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => {
                      const nextQuery = query || '';
                      const targetUrl = nextQuery ? `/?query=${encodeURIComponent(nextQuery)}` : '/';
                      window.location.href = targetUrl;
                    }}
                  >
                    Search across the whole site
                  </Button>
                )}
              </div>
            </Col>
          )}
        </Row>

        {recipes.length > 0 && recipes.length < totalResults && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="outline-success"
                className="load-more-btn"
                onClick={async () => {
                  const newOffset = offset + 12;
                  setOffset(newOffset);
                  try {
                    await searchRecipes({ query, number: 12, offset: newOffset, append: true, type: selectedCategory });
                  } catch {
                    // handled in context
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'View more'}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}
