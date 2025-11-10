import React from 'react'
import { Box, Typography, Stack } from '@mui/material'

const Exercises = ({ exercises, bodyPart }) => {
  return (
    <Box id="exercises" sx={{ mt: { lg: '110px' } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px" textAlign="center">
        {bodyPart !== 'all' ? `${bodyPart} Exercises` : 'All Exercises'}
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {exercises && exercises.length > 0 ? (
          <Typography variant="body1">
            Showing {exercises.length} exercises
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No exercises to display. Use the search above to find exercises.
          </Typography>
        )}
      </Stack>
    </Box>
  )
}

export default Exercises