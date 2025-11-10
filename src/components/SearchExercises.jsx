import React, {useState, useEffect} from 'react'
import  { Box, Button, Stack, TextField, Typography } from '@mui/material'

const SearchExercises = () => {
  return (
    <Stack alignItems="center" 
           mt="37px" justifyContent="center" p="20px">

            <Typography fontWeight={700} 
                        sx={{ fontSize: { lg: '44px', xs: '30px' } }} 
                        mb="50px" textAlign="center"
            >
              Awesome Exercises <br/>
              You Should Know
            </Typography>

            <Box position="relative" mb="72px">
              <TextField
              sx={{
              input:{
                fontWeight:"700px",
                border:"none",
                borderRadius:"4px"
              },
              width:{lg:"1170px", xs:"100%"},
              backgroundColor:"#fff",
              borderRadius:"40px"
              }}
              height="76px"
              value=""
              onChange={(e) => {}}
              placeholder="Search Exercises" 
              type="text"
            />
            <Button className="search-btn"
            sx={{
              bgcolor:"#FF2625",
              color:"#fff",
              textTransform:"none",
              width:{lg:"175px", xs:"80px"},
              fontSize:{lg:"20px", xs:"14px"},
              height:"56px",
              position:"absolute"
            }}
            >
              Search
            </Button>
            </Box>

    </Stack>
  )
}

export default SearchExercises