// Simple Spoonacular client for vegetarian recipes
// Uses Vite env var VITE_SPOONACULAR_API_KEY (put your key in a `.env` file)
import axios from 'axios';

const API_BASE = 'https://api.spoonacular.com';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const client = axios.create({
  baseURL: API_BASE,
  params: {
    apiKey: API_KEY,
  },
});

/**
 * Search vegetarian recipes using the Spoonacular complexSearch endpoint
 * @param {Object} options
 * @param {string} options.query - search string
 * @param {number} [options.number=10] - number of results
 * @param {number} [options.offset=0] - offset for pagination
 * @returns {Promise<Object>} JSON response from Spoonacular
 */
export async function searchVegetarianRecipes({ query = '', type = '', number = 10, offset = 0 } = {}) {
  try {
    const params = {
      diet: 'vegetarian',
      query,
      number,
      offset,
    };

    if (type) {
      params.type = type;
    }

    const res = await client.get('/recipes/complexSearch', {
      params,
    });
    return res.data;
  } catch (err) {
    throw new Error(`Spoonacular error: ${err.response?.data?.message || err.message}`);
  }
}

/**
 * Get detailed information for a single recipe
 * @param {number|string} id - recipe id
 * @returns {Promise<Object>}
 */
export async function getRecipeInformation(id) {
  try {
    const res = await client.get(`/recipes/${id}/information`);
    return res.data;
  } catch (err) {
    throw new Error(`Spoonacular error: ${err.response?.data?.message || err.message}`);
  }
}
