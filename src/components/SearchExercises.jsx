import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  CircularProgress,
  Alert,
  Skeleton,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Favorite,
  FavoriteBorder,
  Share,
  PlayArrow,
  TrendingUp,
  FilterList,
  Close,
  History,
} from '@mui/icons-material';
import {
  fetchAllExercises,
  fetchBodyPartsList,
  fetchTargetMusclesList,
  fetchEquipmentList,
  searchExercisesByName,
} from '../utils/fetchData';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  // State management
  const [search, setSearch] = useState('');
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTime, setSearchTime] = useState(0);
  const [bodyParts, setBodyParts] = useState([]);
  const [targetMuscles, setTargetMuscles] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    bodyPart: '',
    target: '',
    equipment: '',
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteExercises');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);

  // Popular/trending exercises (static for now, could be dynamic)
  const trendingExercises = ['push up', 'squat', 'bench press', 'deadlift', 'plank'];
  const quickStartSearches = ['chest', 'back', 'legs', 'arms', 'abs', 'cardio'];

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [exercisesData, bodyPartsData, targetsData, equipmentData] = await Promise.all([
          fetchAllExercises(1000, 0),
          fetchBodyPartsList(),
          fetchTargetMusclesList(),
          fetchEquipmentList(),
        ]);

        setAllExercises(exercisesData);
        setFilteredExercises(exercisesData.slice(0, 20)); // Show first 20 initially
        setBodyParts(bodyPartsData);
        setTargetMuscles(targetsData);
        setEquipmentTypes(equipmentData);
        
        if (setExercises) {
          setExercises(exercisesData.slice(0, 20));
        }
      } catch (err) {
        setError(err.message || 'Failed to load exercises. Please try again.');
        console.error('Error fetching initial data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [setExercises]);

  // Debounced search effect
  useEffect(() => {
    if (!search) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    const debounceTimer = setTimeout(() => {
      handleSearch();
      setIsTyping(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle search
  const handleSearch = useCallback(() => {
    if (!search && !selectedFilters.bodyPart && !selectedFilters.target && !selectedFilters.equipment) {
      setFilteredExercises(allExercises.slice(0, 20));
      if (setExercises) {
        setExercises(allExercises.slice(0, 20));
      }
      return;
    }

    const startTime = performance.now();
    let results = allExercises;

    // Apply search filter
    if (search) {
      results = searchExercisesByName(results, search);
      
      // Add to search history
      if (search.trim() && !searchHistory.includes(search.trim().toLowerCase())) {
        const newHistory = [search.trim().toLowerCase(), ...searchHistory.slice(0, 9)];
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }
    }

    // Apply category filters
    if (selectedFilters.bodyPart) {
      results = results.filter(ex => ex.bodyPart === selectedFilters.bodyPart);
    }
    if (selectedFilters.target) {
      results = results.filter(ex => ex.target === selectedFilters.target);
    }
    if (selectedFilters.equipment) {
      results = results.filter(ex => ex.equipment === selectedFilters.equipment);
    }

    const endTime = performance.now();
    setSearchTime(((endTime - startTime) / 1000).toFixed(2));
    
    setFilteredExercises(results);
    if (setExercises) {
      setExercises(results);
    }
  }, [search, selectedFilters, allExercises, searchHistory, setExercises]);

  // Handle filter selection
  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
    }));
  };

  // Handle quick search
  const handleQuickSearch = (term) => {
    setSearch(term);
  };

  // Toggle favorite
  const toggleFavorite = (exerciseId) => {
    const newFavorites = favorites.includes(exerciseId)
      ? favorites.filter(id => id !== exerciseId)
      : [...favorites, exerciseId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteExercises', JSON.stringify(newFavorites));
  };

  // Handle share
  const handleShare = async (exercise) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: exercise.name,
          text: `Check out this exercise: ${exercise.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${exercise.name} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  // Get exercise count by category
  const getCountByCategory = (category, value) => {
    return allExercises.filter(ex => ex[category] === value).length;
  };

  // Get smart suggestions when no results
  const getSmartSuggestions = () => {
    if (filteredExercises.length > 0) return [];
    
    // Suggest popular exercises
    return allExercises
      .filter(ex => trendingExercises.some(trend => ex.name.toLowerCase().includes(trend)))
      .slice(0, 6);
  };

  const smartSuggestions = useMemo(() => getSmartSuggestions(), [filteredExercises]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="20px"
        textAlign="center"
      >
        Awesome Exercises <br />
        You Should Know
      </Typography>

      {/* Search Bar */}
      <Box position="relative" mb="40px" width="100%">
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
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
            endAdornment: search && (
              <IconButton onClick={() => setSearch('')} size="small">
                <Close />
              </IconButton>
            ),
          }}
        />
        <Button
          className="search-btn"
          onClick={handleSearch}
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: 0,
            '&:hover': {
              bgcolor: '#d32f2f',
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Live Typing Indicator */}
      {isTyping && search && (
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            🔍 Searching for &apos;{search}&apos;...
          </Typography>
        </Box>
      )}

      {/* Quick Start Buttons */}
      <Box mb={3} width="100%">
        <Typography variant="h6" mb={1} fontWeight={600}>
          🚀 Quick Start
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {quickStartSearches.map((term) => (
            <Chip
              key={term}
              label={term}
              onClick={() => handleQuickSearch(term)}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
                '&:hover': { bgcolor: '#FF2625', color: '#fff' },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Search History */}
      {searchHistory.length > 0 && !search && (
        <Box mb={3} width="100%">
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <History fontSize="small" />
            <Typography variant="body2" fontWeight={600}>
              Recent Searches
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {searchHistory.slice(0, 5).map((term, index) => (
              <Chip
                key={index}
                label={term}
                size="small"
                onClick={() => handleQuickSearch(term)}
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Filters */}
      <Box mb={3} width="100%">
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <FilterList />
          <Typography variant="h6" fontWeight={600}>
            Filters
          </Typography>
        </Stack>
        
        {/* Body Parts Filter */}
        <Box mb={2}>
          <Typography variant="subtitle2" mb={1} fontWeight={600}>
            💪 Body Parts
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {bodyParts.slice(0, 8).map((part) => (
              <Badge
                key={part}
                badgeContent={getCountByCategory('bodyPart', part)}
                color="primary"
                sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
              >
                <Chip
                  label={part}
                  onClick={() => handleFilterSelect('bodyPart', part)}
                  color={selectedFilters.bodyPart === part ? 'primary' : 'default'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Badge>
            ))}
          </Stack>
        </Box>

        {/* Equipment Filter */}
        <Box mb={2}>
          <Typography variant="subtitle2" mb={1} fontWeight={600}>
            🏋️ Equipment
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {equipmentTypes.slice(0, 8).map((equipment) => (
              <Badge
                key={equipment}
                badgeContent={getCountByCategory('equipment', equipment)}
                color="secondary"
                sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
              >
                <Chip
                  label={equipment}
                  onClick={() => handleFilterSelect('equipment', equipment)}
                  color={selectedFilters.equipment === equipment ? 'secondary' : 'default'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Badge>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Popular/Trending Section */}
      <Box mb={4} width="100%">
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <TrendingUp sx={{ color: '#FF2625' }} />
          <Typography variant="h6" fontWeight={600}>
            🔥 Popular Right Now
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {trendingExercises.map((exercise) => (
            <Chip
              key={exercise}
              label={exercise}
              icon={<TrendingUp />}
              onClick={() => handleQuickSearch(exercise)}
              sx={{
                textTransform: 'capitalize',
                bgcolor: '#ffe0e0',
                '&:hover': { bgcolor: '#ffcccc' },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Search Statistics Banner */}
      {search && (
        <Paper elevation={1} sx={{ p: 2, mb: 3, width: '100%', bgcolor: '#f5f5f5' }}>
          <Typography variant="body1" fontWeight={600}>
            📊 Found <strong>{filteredExercises.length}</strong> exercises
            {search && ` for "${search}"`} in <strong>{searchTime}s</strong>
          </Typography>
        </Paper>
      )}

      {/* Error State */}
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ mb: 3, width: '100%' }}
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Results - Smart Suggestions */}
      {!loading && filteredExercises.length === 0 && search && (
        <Box width="100%" textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary" mb={3}>
            No exercises found for &quot;{search}&quot;
          </Typography>
          {smartSuggestions.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" mb={2} fontWeight={600}>
                💡 No results? Try these instead...
              </Typography>
              <Grid container spacing={2}>
                {smartSuggestions.map((exercise) => (
                  <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                      onClick={() => handleQuickSearch(exercise.name)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={exercise.gifUrl}
                        alt={exercise.name}
                      />
                      <CardContent>
                        <Typography variant="h6" textTransform="capitalize">
                          {exercise.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      )}

      {/* Exercise Results */}
      {!loading && filteredExercises.length > 0 && (
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {filteredExercises.slice(0, 50).map((exercise) => (
            <Grid item xs={12} sm={6} md={4} key={exercise.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={exercise.gifUrl}
                  alt={exercise.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    textTransform="capitalize"
                    fontWeight={700}
                  >
                    {exercise.name}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" gap={1}>
                    <Chip
                      label={exercise.bodyPart}
                      size="small"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    />
                    <Chip
                      label={exercise.target}
                      size="small"
                      color="secondary"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                  
                  <Typography variant="body2" color="text.secondary">
                    Equipment: {exercise.equipment}
                  </Typography>
                  
                  {/* Difficulty Indicator (mock - could be enhanced) */}
                  <Box mt={1}>
                    <Typography variant="caption" color="text.secondary">
                      Difficulty: {'⭐'.repeat(Math.floor(Math.random() * 3) + 1)}
                    </Typography>
                  </Box>
                </CardContent>
                
                <Divider />
                
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Tooltip title="Add to favorites">
                    <IconButton
                      onClick={() => toggleFavorite(exercise.id)}
                      color="error"
                      size="small"
                    >
                      {favorites.includes(exercise.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Tooltip>
                  
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PlayArrow />}
                    sx={{
                      bgcolor: '#FF2625',
                      '&:hover': { bgcolor: '#d32f2f' },
                      textTransform: 'none',
                    }}
                  >
                    Start Workout
                  </Button>
                  
                  <Tooltip title="Share">
                    <IconButton onClick={() => handleShare(exercise)} size="small">
                      <Share />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Show more indicator */}
      {!loading && filteredExercises.length > 50 && (
        <Box mt={4} textAlign="center">
          <Typography variant="body1" color="text.secondary">
            Showing 50 of {filteredExercises.length} results. Refine your search for better results.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default SearchExercises;