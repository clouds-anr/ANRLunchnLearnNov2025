import React, { useState } from 'react'
import { Box } from '@mui/material'

import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'
import { exerciseData } from '../data/exerciseData'

const Home = () => {
  const [search, setSearch] = useState('')
  const [exercises, setExercises] = useState(exerciseData)

  return (

    <Box>
      <HeroBanner />
      <SearchExercises 
        search={search}
        setSearch={setSearch}
        setExercises={setExercises}
      />
      <Exercises 
        exercises={exercises}
        search={search}
      />
    </Box>

  )
}

export default Home