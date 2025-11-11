import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      to={`/exercise/${exercise.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
        }}
        role="article"
        aria-label={`Exercise: ${exercise.name}`}
      >
        {exercise.gifUrl ? (
          <CardMedia
            component="img"
            height="200"
            image={exercise.gifUrl}
            alt={exercise.name}
            sx={{
              objectFit: 'cover',
              backgroundColor: '#f5f5f5',
            }}
            loading="lazy"
          />
        ) : (
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: 80, color: '#FF2625' }} />
          </Box>
        )}
        
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Stack spacing={1.5}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '16px', sm: '18px' },
                color: '#000',
                textTransform: 'capitalize',
                lineHeight: 1.3,
              }}
            >
              {exercise.name}
            </Typography>
            
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <Chip
                label={exercise.bodyPart}
                size="small"
                sx={{
                  backgroundColor: '#FFF5F5',
                  color: '#FF2625',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  fontSize: '12px',
                }}
              />
              <Chip
                label={exercise.target}
                size="small"
                sx={{
                  backgroundColor: '#FFF5F5',
                  color: '#FF2625',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  fontSize: '12px',
                }}
              />
            </Stack>
            
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                fontSize: '14px',
                textTransform: 'capitalize',
              }}
            >
              Equipment: {exercise.equipment}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
