import React, { useState } from 'react';
import { Box } from '@mui/material';

import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('');

  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} setBodyPart={setBodyPart} />
      <Exercises exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Home;