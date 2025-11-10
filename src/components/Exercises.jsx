import React from 'react'
import { Box, Stack, Typography, Grid, Card, CardContent } from '@mui/material'

const Exercises = ({ exercises, search }) => {
  return (
    <Box id="exercises" sx={{ mt: { lg: '110px' } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px" textAlign="center">
        {search ? 'Search Results' : 'All Exercises'}
      </Typography>
      
      {exercises.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="text.secondary">
          No exercises found. Try a different search term.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {exercises.map((exercise) => (
            <Grid item xs={12} sm={6} md={4} key={exercise.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.02)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom color="#FF2625">
                    {exercise.name}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Body Part:</strong> {exercise.bodyPart}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Target:</strong> {exercise.target}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Equipment:</strong> {exercise.equipment}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {exercise.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default Exercises