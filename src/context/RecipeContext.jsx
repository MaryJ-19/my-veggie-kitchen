import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { searchVegetarianRecipes as searchApi } from '../api/spoonacular';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchRecipes = useCallback(async ({ query = '', number = 12, offset = 0, append = false, type = '' } = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchApi({ query, number, offset, type });

      if (append) {
        setRecipes((prev) => [...prev, ...(data.results || [])]);
      } else {
        setRecipes(data.results || []);
      }
      setTotalResults(data.totalResults || 0);
      return data;
    } catch (err) {
      setError(err);
      if (!append) {
        setRecipes([]);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetRecipes = useCallback(() => {
    setRecipes([]);
    setLoading(false);
    setError(null);
    setTotalResults(0);
  }, []);

  const value = useMemo(
    () => ({ recipes, loading, error, totalResults, searchRecipes, resetRecipes }),
    [recipes, loading, error, totalResults, searchRecipes, resetRecipes]
  );

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within RecipeProvider');
  }
  return context;
}
