import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BuildIcon from '@mui/icons-material/Build';

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
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
          border: '1px solid #f0f0f0',
          '&:hover': {
            transform: 'translateY(-10px) scale(1.02)',
            boxShadow: '0 12px 32px rgba(255,38,37,0.2)',
            borderColor: '#FF2625',
          },
        }}
        role="article"
        aria-label={`Exercise: ${exercise.name}`}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {exercise.gifUrl ? (
            <CardMedia
              component="img"
              height="240"
              image={exercise.gifUrl}
              alt={exercise.name}
              sx={{
                objectFit: 'cover',
                backgroundColor: '#f5f5f5',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              loading="lazy"
            />
          ) : (
            <Box
              sx={{
                height: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <FitnessCenterIcon sx={{ fontSize: 80, color: '#FF2625' }} />
            </Box>
          )}
          
          {/* Badge overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255, 38, 37, 0.95)',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {exercise.bodyPart}
          </Box>
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 2.5, backgroundColor: '#fafafa' }}>
          <Stack spacing={2}>
            {/* Exercise Name */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '18px', sm: '20px' },
                color: '#000',
                textTransform: 'capitalize',
                lineHeight: 1.3,
                mb: 1,
              }}
            >
              {exercise.name}
            </Typography>
            
            <Divider sx={{ borderColor: '#e0e0e0' }} />
            
            {/* Target Muscle with Icon */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#FFF5F5',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SportsMartialArtsIcon sx={{ fontSize: 24, color: '#FF2625' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#888',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Target Muscle
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {exercise.target}
                </Typography>
              </Box>
            </Stack>
            
            {/* Equipment with Icon */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  backgroundColor: '#FFF5F5',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BuildIcon sx={{ fontSize: 24, color: '#FF2625' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#888',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Equipment
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {exercise.equipment}
                </Typography>
              </Box>
            </Stack>
            
            {/* Secondary Muscles (if available) */}
            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    backgroundColor: '#FFF5F5',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccessibilityNewIcon sx={{ fontSize: 24, color: '#FF2625' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#888',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Secondary Muscles
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#000',
                      fontSize: '14px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {exercise.secondaryMuscles.join(', ')}
                  </Typography>
                </Box>
              </Stack>
            )}
            
            {/* View Details Button */}
            <Box
              sx={{
                mt: 1,
                pt: 2,
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#FF2625',
                  fontWeight: 700,
                  fontSize: '13px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Click for Details →
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
