import React from 'react'
import { Box, Stack, Typography, Link } from '@mui/material'
import Logo from '../assets/images/Logo.png'

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#FFFAFB" borderTop="2px solid #FF2625">
      <Stack 
        gap="40px" 
        sx={{ alignItems: 'center' }} 
        flexWrap="wrap" 
        px="40px" 
        pt="40px"
      >
        <img src={Logo} alt="logo" style={{ width: '200px', height: '41px' }} />
        
        {/* Navigation Links */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          gap={{ xs: '20px', sm: '40px' }}
          alignItems="center"
        >
          <Link 
            href="/" 
            underline="none" 
            color="#3A1212"
            fontSize="18px"
            sx={{ '&:hover': { color: '#FF2625' } }}
          >
            Home
          </Link>
          <Link 
            href="#exercises" 
            underline="none" 
            color="#3A1212"
            fontSize="18px"
            sx={{ '&:hover': { color: '#FF2625' } }}
          >
            Exercises
          </Link>
          <Link 
            href="#about" 
            underline="none" 
            color="#3A1212"
            fontSize="18px"
            sx={{ '&:hover': { color: '#FF2625' } }}
          >
            About Us
          </Link>
        </Stack>

        {/* Contact Info */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          gap={{ xs: '10px', sm: '30px' }}
          alignItems="center"
          textAlign="center"
        >
          <Typography color="#3A1212" fontSize="16px">
            📧 contact@anrfitness.com
          </Typography>
          <Typography color="#3A1212" fontSize="16px">
            📞 (555) 123-4567
          </Typography>
          <Typography color="#3A1212" fontSize="16px">
            📍 123 Fitness Ave, Workout City
          </Typography>
        </Stack>
      </Stack>
      
      {/* Copyright */}
      <Typography 
        variant="h5" 
        sx={{ fontSize: { lg: '20px', xs: '16px' } }} 
        mt="30px" 
        textAlign="center" 
        pb="30px"
        color="#3A1212"
      >
        Made with ❤️ by ANR Fitness © {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}

export default Footer