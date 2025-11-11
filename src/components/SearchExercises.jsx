import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Stack, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { fetchExercises, fetchExercisesByBodyPart, searchExercises } from '../utils/exerciseApi';

const SearchExercises = ({ setExercises, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const bodyParts = ['chest', 'back', 'upper legs', 'shoulders', 'upper arms', 'lower legs'];

  // Fetch all exercises on component mount
  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);
      setError('');
      try {
        const exercisesData = await fetchExercises(1000);
        setAllExercises(exercisesData);
        setExercises(exercisesData.slice(0, 9)); // Show first 9 by default
      } catch (err) {
        setError('Failed to load exercises. Please try again later.');
        console.error('Error loading exercises:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, [setExercises]);

  // Debounced search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    const timeout = setTimeout(() => {
      if (value.trim()) {
        const searchedExercises = searchExercises(value, allExercises);
        setExercises(searchedExercises);
        setBodyPart('');
      } else {
        setExercises(allExercises.slice(0, 9));
        setBodyPart('');
      }
    }, 300); // 300ms debounce delay

    setSearchTimeout(timeout);
  };

  // Handle manual search button click
  const handleSearch = () => {
    if (search) {
      const searchedExercises = searchExercises(search, allExercises);
      setExercises(searchedExercises);
      setBodyPart('');
    }
  };

  // Handle body part filter
  const handleBodyPartClick = useCallback(async (bodyPart) => {
    setLoading(true);
    setError('');
    setSearch('');
    setBodyPart(bodyPart);

    try {
      const exercisesData = await fetchExercisesByBodyPart(bodyPart);
      setExercises(exercisesData);
    } catch (err) {
      setError(`Failed to load ${bodyPart} exercises. Please try again.`);
      console.error(`Error loading ${bodyPart} exercises:`, err);
    } finally {
      setLoading(false);
    }
  }, [setExercises, setBodyPart]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises <br />
        You Should Know
      </Typography>

      <Box position="relative" mb="72px" sx={{ width: { lg: '1170px', xs: '100%' } }}>
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px',
            },
            width: { lg: '1170px', xs: '100%' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          height="76px"
          value={search}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search Exercises by name, body part, target, or equipment"
          type="text"
          disabled={loading}
          inputProps={{
            'aria-label': 'Search exercises',
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0',
            '&:hover': {
              bgcolor: '#d32f2f',
            },
          }}
          onClick={handleSearch}
          disabled={loading}
          aria-label="Search button"
        >
          Search
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, width: { lg: '1170px', xs: '100%' } }}>
          {error}
        </Alert>
      )}

      {/* Body Part Filters */}
      <Box sx={{ width: { lg: '1170px', xs: '100%' } }}>
        <Typography
          fontWeight={600}
          sx={{ fontSize: { lg: '24px', xs: '20px' } }}
          mb="20px"
          textAlign="center"
        >
          Filter by Body Part
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mb={4}
        >
          {bodyParts.map((bodyPart) => (
            <Button
              key={bodyPart}
              onClick={() => handleBodyPartClick(bodyPart)}
              disabled={loading}
              sx={{
                bgcolor: '#fff',
                color: '#000',
                border: '2px solid #FF2625',
                textTransform: 'capitalize',
                fontSize: { lg: '16px', xs: '14px' },
                padding: { lg: '10px 20px', xs: '8px 16px' },
                borderRadius: '20px',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#FF2625',
                  color: '#fff',
                },
                '&:disabled': {
                  opacity: 0.6,
                },
              }}
              aria-label={`Filter by ${bodyPart}`}
            >
              {bodyPart}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#FF2625' }} aria-label="Loading exercises" />
        </Box>
      )}
    </Stack>
  );
};

export default SearchExercises;