/**
 * ExerciseDB API Integration Module
 * Provides utilities to interact with the ExerciseDB API via RapidAPI
 */

const EXERCISE_DB_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

/**
 * Base fetch function with error handling
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} API response data
 */
const fetchFromAPI = async (endpoint) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': API_KEY || ''
    }
  };

  try {
    const response = await fetch(`${EXERCISE_DB_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

/**
 * Fetch all exercises with optional limit
 * @param {number} limit - Maximum number of exercises to fetch
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercises = async (limit = 1000) => {
  try {
    const data = await fetchFromAPI(`/exercises?limit=${limit}`);
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

/**
 * Fetch exercises by body part
 * @param {string} bodyPart - Body part to filter by
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercisesByBodyPart = async (bodyPart) => {
  try {
    const data = await fetchFromAPI(`/exercises/bodyPart/${bodyPart}`);
    return data;
  } catch (error) {
    console.error(`Error fetching exercises for body part ${bodyPart}:`, error);
    return [];
  }
};

/**
 * Fetch exercises by target muscle
 * @param {string} target - Target muscle to filter by
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercisesByTarget = async (target) => {
  try {
    const data = await fetchFromAPI(`/exercises/target/${target}`);
    return data;
  } catch (error) {
    console.error(`Error fetching exercises for target ${target}:`, error);
    return [];
  }
};

/**
 * Fetch exercises by equipment
 * @param {string} equipment - Equipment type to filter by
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercisesByEquipment = async (equipment) => {
  try {
    const data = await fetchFromAPI(`/exercises/equipment/${equipment}`);
    return data;
  } catch (error) {
    console.error(`Error fetching exercises for equipment ${equipment}:`, error);
    return [];
  }
};

/**
 * Search exercises by name, body part, target muscle, or equipment
 * @param {string} searchTerm - Search term
 * @param {Array} allExercises - Array of all exercises to search through
 * @returns {Array} Filtered array of exercise objects
 */
export const searchExercises = (searchTerm, allExercises) => {
  if (!searchTerm || !allExercises) return allExercises || [];
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return allExercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(lowerSearchTerm) ||
      exercise.target.toLowerCase().includes(lowerSearchTerm) ||
      exercise.equipment.toLowerCase().includes(lowerSearchTerm) ||
      exercise.bodyPart.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * Get list of available body parts
 * @returns {Promise<Array>} Array of body part strings
 */
export const fetchBodyPartList = async () => {
  try {
    const data = await fetchFromAPI('/exercises/bodyPartList');
    return data;
  } catch (error) {
    console.error('Error fetching body part list:', error);
    // Return default body parts if API fails
    return ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];
  }
};
