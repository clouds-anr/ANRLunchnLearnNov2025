import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchExercises,
  fetchExercisesByBodyPart,
  fetchExercisesByTarget,
  fetchExercisesByEquipment,
  searchExercises,
  fetchBodyPartList,
} from '../utils/exerciseApi';

// Mock fetch globally
global.fetch = vi.fn();

describe('exerciseApi', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchExercises', () => {
    it('should fetch exercises successfully with default limit', async () => {
      const mockExercises = [
        { id: '1', name: 'Push Up', bodyPart: 'chest', target: 'pectorals', equipment: 'body weight' },
        { id: '2', name: 'Pull Up', bodyPart: 'back', target: 'lats', equipment: 'body weight' },
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercises();

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://exercisedb.p.rapidapi.com/exercises?limit=1000',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          }),
        })
      );
      expect(result).toEqual(mockExercises);
    });

    it('should fetch exercises with custom limit', async () => {
      const mockExercises = [{ id: '1', name: 'Push Up' }];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercises(50);

      expect(fetch).toHaveBeenCalledWith(
        'https://exercisedb.p.rapidapi.com/exercises?limit=50',
        expect.any(Object)
      );
      expect(result).toEqual(mockExercises);
    });

    it('should return empty array on error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('API Error'));

      const result = await fetchExercises();

      expect(result).toEqual([]);
    });

    it('should handle HTTP error responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await fetchExercises();

      expect(result).toEqual([]);
    });
  });

  describe('fetchExercisesByBodyPart', () => {
    it('should fetch exercises for specific body part', async () => {
      const mockExercises = [
        { id: '1', name: 'Bench Press', bodyPart: 'chest', target: 'pectorals', equipment: 'barbell' },
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercisesByBodyPart('chest');

      expect(fetch).toHaveBeenCalledWith(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest',
        expect.any(Object)
      );
      expect(result).toEqual(mockExercises);
    });

    it('should return empty array on error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network Error'));

      const result = await fetchExercisesByBodyPart('chest');

      expect(result).toEqual([]);
    });
  });

  describe('fetchExercisesByTarget', () => {
    it('should fetch exercises for specific target muscle', async () => {
      const mockExercises = [
        { id: '1', name: 'Bicep Curl', bodyPart: 'upper arms', target: 'biceps', equipment: 'dumbbell' },
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercisesByTarget('biceps');

      expect(fetch).toHaveBeenCalledWith(
        'https://exercisedb.p.rapidapi.com/exercises/target/biceps',
        expect.any(Object)
      );
      expect(result).toEqual(mockExercises);
    });

    it('should return empty array on error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('API Error'));

      const result = await fetchExercisesByTarget('biceps');

      expect(result).toEqual([]);
    });
  });

  describe('fetchExercisesByEquipment', () => {
    it('should fetch exercises for specific equipment', async () => {
      const mockExercises = [
        { id: '1', name: 'Dumbbell Press', bodyPart: 'chest', target: 'pectorals', equipment: 'dumbbell' },
      ];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercisesByEquipment('dumbbell');

      expect(fetch).toHaveBeenCalledWith(
        'https://exercisedb.p.rapidapi.com/exercises/equipment/dumbbell',
        expect.any(Object)
      );
      expect(result).toEqual(mockExercises);
    });

    it('should return empty array on error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('API Error'));

      const result = await fetchExercisesByEquipment('dumbbell');

      expect(result).toEqual([]);
    });
  });

  describe('searchExercises', () => {
    const mockExercises = [
      { id: '1', name: 'Push Up', bodyPart: 'chest', target: 'pectorals', equipment: 'body weight' },
      { id: '2', name: 'Pull Up', bodyPart: 'back', target: 'lats', equipment: 'body weight' },
      { id: '3', name: 'Bicep Curl', bodyPart: 'upper arms', target: 'biceps', equipment: 'dumbbell' },
      { id: '4', name: 'Squat', bodyPart: 'upper legs', target: 'quadriceps', equipment: 'barbell' },
    ];

    it('should filter exercises by name', () => {
      const result = searchExercises('push', mockExercises);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Push Up');
    });

    it('should filter exercises by body part', () => {
      const result = searchExercises('chest', mockExercises);

      expect(result).toHaveLength(1);
      expect(result[0].bodyPart).toBe('chest');
    });

    it('should filter exercises by target muscle', () => {
      const result = searchExercises('biceps', mockExercises);

      expect(result).toHaveLength(1);
      expect(result[0].target).toBe('biceps');
    });

    it('should filter exercises by equipment', () => {
      const result = searchExercises('dumbbell', mockExercises);

      expect(result).toHaveLength(1);
      expect(result[0].equipment).toBe('dumbbell');
    });

    it('should be case insensitive', () => {
      const result = searchExercises('PUSH', mockExercises);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Push Up');
    });

    it('should return all exercises if search term is empty', () => {
      const result = searchExercises('', mockExercises);

      expect(result).toEqual(mockExercises);
    });

    it('should return all exercises if search term is null', () => {
      const result = searchExercises(null, mockExercises);

      expect(result).toEqual(mockExercises);
    });

    it('should return empty array if exercises is null', () => {
      const result = searchExercises('push', null);

      expect(result).toEqual([]);
    });

    it('should return empty array if no matches found', () => {
      const result = searchExercises('nonexistent', mockExercises);

      expect(result).toEqual([]);
    });
  });

  describe('fetchBodyPartList', () => {
    it('should fetch body part list successfully', async () => {
      const mockBodyParts = ['chest', 'back', 'legs', 'shoulders', 'arms'];

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBodyParts,
      });

      const result = await fetchBodyPartList();

      expect(fetch).toHaveBeenCalledWith(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        expect.any(Object)
      );
      expect(result).toEqual(mockBodyParts);
    });

    it('should return default body parts on error', async () => {
      global.fetch.mockRejectedValueOnce(new Error('API Error'));

      const result = await fetchBodyPartList();

      expect(result).toEqual([
        'back',
        'cardio',
        'chest',
        'lower arms',
        'lower legs',
        'neck',
        'shoulders',
        'upper arms',
        'upper legs',
        'waist',
      ]);
    });
  });
});
