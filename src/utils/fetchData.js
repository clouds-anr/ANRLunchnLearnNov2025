// ExerciseDB API Configuration and Data Fetching Utility

const EXERCISEDB_API_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || 'demo-key-limited';

// API request options with RapidAPI headers
export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

/**
 * Generic fetch function for ExerciseDB API
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (headers, method, etc.)
 * @returns {Promise<any>} The API response data
 */
export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/**
 * Fetch all exercises from ExerciseDB
 * @param {number} limit - Maximum number of exercises to fetch (default: 1000)
 * @param {number} offset - Offset for pagination (default: 0)
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchAllExercises = async (limit = 1000, offset = 0) => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises?limit=${limit}&offset=${offset}`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch exercises by body part
 * @param {string} bodyPart - Body part to filter by (e.g., 'back', 'chest', 'legs')
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercisesByBodyPart = async (bodyPart) => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/bodyPart/${bodyPart}`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch exercises by target muscle
 * @param {string} targetMuscle - Target muscle to filter by
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercisesByTarget = async (targetMuscle) => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/target/${targetMuscle}`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch exercises by equipment
 * @param {string} equipment - Equipment type to filter by
 * @returns {Promise<Array>} Array of exercise objects
 */
export const fetchExercisesByEquipment = async (equipment) => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/equipment/${equipment}`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch exercise by ID
 * @param {string} id - Exercise ID
 * @returns {Promise<object>} Exercise object
 */
export const fetchExerciseById = async (id) => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/exercise/${id}`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch list of all body parts
 * @returns {Promise<Array>} Array of body part names
 */
export const fetchBodyPartsList = async () => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/bodyPartList`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch list of all target muscles
 * @returns {Promise<Array>} Array of target muscle names
 */
export const fetchTargetMusclesList = async () => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/targetList`;
  return fetchData(url, exerciseOptions);
};

/**
 * Fetch list of all equipment types
 * @returns {Promise<Array>} Array of equipment names
 */
export const fetchEquipmentList = async () => {
  const url = `${EXERCISEDB_API_BASE_URL}/exercises/equipmentList`;
  return fetchData(url, exerciseOptions);
};

/**
 * Search exercises by name (client-side filtering)
 * @param {Array} exercises - Array of all exercises
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered array of exercises
 */
export const searchExercisesByName = (exercises, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return exercises;
  }
  
  const term = searchTerm.toLowerCase().trim();
  return exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.target.toLowerCase().includes(term) ||
    exercise.bodyPart.toLowerCase().includes(term) ||
    exercise.equipment.toLowerCase().includes(term)
  );
};

export default fetchData;
