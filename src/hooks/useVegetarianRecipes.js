import { useState, useCallback } from 'react';
import { searchVegetarianRecipes } from '../api/spoonacular';

export default function useVegetarianRecipes(initialQuery = '') {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async ({ query = initialQuery, number = 10, offset = 0 } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchVegetarianRecipes({ query, number, offset });
      // Spoonacular returns { results: [...], totalResults }
      setRecipes(data.results || []);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [initialQuery]);

  return { recipes, loading, error, search };
}
