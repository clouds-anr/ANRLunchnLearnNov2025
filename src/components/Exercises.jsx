import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, bodyPart }) => {
  if (!exercises || exercises.length === 0) {
    return (
      <Box sx={{ mt: { lg: '110px' } }} mt="50px" p="20px">
        <Typography
          variant="h5"
          textAlign="center"
          sx={{ fontSize: { lg: '24px', xs: '20px' } }}
        >
          No exercises found. Try a different search or filter.
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '110px' } }} mt="50px" p="20px">
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        >
          {bodyPart ? `${bodyPart} Exercises` : 'Showing Results'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { lg: '20px', xs: '16px' },
            color: '#666',
          }}
        >
          ({exercises.length} exercise{exercises.length !== 1 ? 's' : ''})
        </Typography>
      </Stack>

      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{
          justifyContent: 'flex-start',
        }}
      >
        {exercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} key={exercise.id}>
            <ExerciseCard exercise={exercise} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Exercises;