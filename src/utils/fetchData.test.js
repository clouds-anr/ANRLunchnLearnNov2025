import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchData,
  fetchAllExercises,
  fetchExercisesByBodyPart,
  fetchExercisesByTarget,
  fetchExercisesByEquipment,
  fetchExerciseById,
  fetchBodyPartsList,
  fetchTargetMusclesList,
  fetchEquipmentList,
  searchExercisesByName,
} from '../utils/fetchData';

describe('fetchData utility', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchData', () => {
    it('should fetch data successfully', async () => {
      const mockData = [{ id: '1', name: 'test' }];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchData('https://test.com', {});
      expect(result).toEqual(mockData);
    });

    it('should handle fetch errors', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(fetchData('https://test.com', {})).rejects.toThrow('API Error: 404 Not Found');
    });

    it('should handle network errors', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchData('https://test.com', {})).rejects.toThrow('Network error');
    });
  });

  describe('fetchAllExercises', () => {
    it('should fetch exercises with default parameters', async () => {
      const mockExercises = [
        { id: '1', name: 'push up' },
        { id: '2', name: 'squat' },
      ];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchAllExercises();
      expect(result).toEqual(mockExercises);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=1000&offset=0'),
        expect.any(Object)
      );
    });

    it('should fetch exercises with custom parameters', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await fetchAllExercises(50, 10);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('limit=50&offset=10'),
        expect.any(Object)
      );
    });
  });

  describe('fetchExercisesByBodyPart', () => {
    it('should fetch exercises for a specific body part', async () => {
      const mockExercises = [{ id: '1', bodyPart: 'chest' }];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercisesByBodyPart('chest');
      expect(result).toEqual(mockExercises);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('bodyPart/chest'),
        expect.any(Object)
      );
    });
  });

  describe('fetchExercisesByTarget', () => {
    it('should fetch exercises for a target muscle', async () => {
      const mockExercises = [{ id: '1', target: 'pectorals' }];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercisesByTarget('pectorals');
      expect(result).toEqual(mockExercises);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('target/pectorals'),
        expect.any(Object)
      );
    });
  });

  describe('fetchExercisesByEquipment', () => {
    it('should fetch exercises for specific equipment', async () => {
      const mockExercises = [{ id: '1', equipment: 'dumbbell' }];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercises,
      });

      const result = await fetchExercisesByEquipment('dumbbell');
      expect(result).toEqual(mockExercises);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('equipment/dumbbell'),
        expect.any(Object)
      );
    });
  });

  describe('fetchExerciseById', () => {
    it('should fetch a specific exercise by ID', async () => {
      const mockExercise = { id: '123', name: 'bench press' };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockExercise,
      });

      const result = await fetchExerciseById('123');
      expect(result).toEqual(mockExercise);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('exercise/123'),
        expect.any(Object)
      );
    });
  });

  describe('fetchBodyPartsList', () => {
    it('should fetch list of body parts', async () => {
      const mockBodyParts = ['chest', 'back', 'legs'];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBodyParts,
      });

      const result = await fetchBodyPartsList();
      expect(result).toEqual(mockBodyParts);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('bodyPartList'),
        expect.any(Object)
      );
    });
  });

  describe('fetchTargetMusclesList', () => {
    it('should fetch list of target muscles', async () => {
      const mockTargets = ['pectorals', 'lats', 'quads'];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTargets,
      });

      const result = await fetchTargetMusclesList();
      expect(result).toEqual(mockTargets);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('targetList'),
        expect.any(Object)
      );
    });
  });

  describe('fetchEquipmentList', () => {
    it('should fetch list of equipment types', async () => {
      const mockEquipment = ['barbell', 'dumbbell', 'bodyweight'];
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEquipment,
      });

      const result = await fetchEquipmentList();
      expect(result).toEqual(mockEquipment);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('equipmentList'),
        expect.any(Object)
      );
    });
  });

  describe('searchExercisesByName', () => {
    const mockExercises = [
      { id: '1', name: 'push up', target: 'pectorals', bodyPart: 'chest', equipment: 'bodyweight' },
      { id: '2', name: 'bench press', target: 'pectorals', bodyPart: 'chest', equipment: 'barbell' },
      { id: '3', name: 'squat', target: 'quads', bodyPart: 'legs', equipment: 'bodyweight' },
      { id: '4', name: 'dumbbell curl', target: 'biceps', bodyPart: 'arms', equipment: 'dumbbell' },
    ];

    it('should return all exercises when search term is empty', () => {
      const result = searchExercisesByName(mockExercises, '');
      expect(result).toEqual(mockExercises);
    });

    it('should return all exercises when search term is whitespace', () => {
      const result = searchExercisesByName(mockExercises, '   ');
      expect(result).toEqual(mockExercises);
    });

    it('should filter exercises by name', () => {
      const result = searchExercisesByName(mockExercises, 'push');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('push up');
    });

    it('should filter exercises by target muscle', () => {
      const result = searchExercisesByName(mockExercises, 'pectorals');
      expect(result).toHaveLength(2);
      expect(result.every(ex => ex.target === 'pectorals')).toBe(true);
    });

    it('should filter exercises by body part', () => {
      const result = searchExercisesByName(mockExercises, 'chest');
      expect(result).toHaveLength(2);
      expect(result.every(ex => ex.bodyPart === 'chest')).toBe(true);
    });

    it('should filter exercises by equipment', () => {
      const result = searchExercisesByName(mockExercises, 'dumbbell');
      expect(result).toHaveLength(1);
      expect(result[0].equipment).toBe('dumbbell');
    });

    it('should be case insensitive', () => {
      const result = searchExercisesByName(mockExercises, 'SQUAT');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('squat');
    });

    it('should handle partial matches', () => {
      const result = searchExercisesByName(mockExercises, 'press');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('bench press');
    });

    it('should return empty array when no matches found', () => {
      const result = searchExercisesByName(mockExercises, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should trim search term', () => {
      const result = searchExercisesByName(mockExercises, '  squat  ');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('squat');
    });
  });
});
