import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
  Stack,
  Alert,
  CircularProgress,
  Collapse,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  Email,
} from '@mui/icons-material';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Email validation with spam protection
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    // Check for common typos in email domains
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    const suspiciousDomains = ['test.com', 'example.com', 'fake.com', 'temporary.com'];
    
    if (suspiciousDomains.includes(domain)) {
      return 'Please use a valid email address';
    }
    
    return '';
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Track analytics
      if (window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'footer_newsletter',
        });
      }
      
      setSuccess(true);
      setEmail('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
      
      // Track error in analytics
      if (window.gtag) {
        window.gtag('event', 'newsletter_error', {
          event_category: 'error',
          event_label: 'footer_newsletter',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (linkName) => {
    // Track link clicks for analytics
    if (window.gtag) {
      window.gtag('event', 'footer_link_click', {
        event_category: 'navigation',
        event_label: linkName,
      });
    }
  };

  const handleSocialClick = (platform) => {
    // Track social media clicks
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        event_category: 'social',
        event_label: platform,
      });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        borderTop: '3px solid #FF2625',
        mt: 8,
        py: { xs: 4, md: 6 },
      }}
      role="contentinfo"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Branding Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              color="#FF2625"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
            >
              ANR Fitness Club
            </Typography>
            <Typography
              variant="body2"
              color="#3A1212"
              sx={{ mb: 2, lineHeight: 1.7 }}
            >
              Your ultimate destination for fitness exercises and wellness.
              Sweat, smile, and repeat with our comprehensive exercise database.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Email fontSize="small" />
              contact@anrfitness.com
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              color="#3A1212"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: '1rem' }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link
                href="/"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('home')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to home page"
              >
                Home
              </Link>
              <Link
                href="#exercises"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('exercises')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to exercises section"
              >
                Exercises
              </Link>
              <Link
                href="#about"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('about')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to about section"
              >
                About Us
              </Link>
            </Stack>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              color="#3A1212"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: '1rem' }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#blog"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('blog')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to blog"
              >
                Blog
              </Link>
              <Link
                href="#faq"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('faq')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to FAQ"
              >
                FAQ
              </Link>
              <Link
                href="#privacy"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('privacy')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to privacy policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                color="#3A1212"
                underline="hover"
                onClick={() => handleLinkClick('terms')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: '#FF2625' },
                  transition: 'color 0.2s',
                }}
                aria-label="Navigate to terms of service"
              >
                Terms of Service
              </Link>
            </Stack>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              color="#3A1212"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: '1rem' }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe to get fitness tips and updates delivered to your inbox.
            </Typography>
            
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              noValidate
              aria-label="Newsletter signup form"
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                disabled={loading}
                error={!!error}
                helperText={error}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FF2625',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF2625',
                    },
                  },
                }}
                inputProps={{
                  'aria-label': 'Email address for newsletter',
                  'aria-required': 'true',
                  'aria-invalid': !!error,
                }}
              />
              
              <Collapse in={success}>
                <Alert
                  severity="success"
                  sx={{ mb: 1 }}
                  aria-live="polite"
                  role="status"
                >
                  Successfully subscribed! Check your inbox.
                </Alert>
              </Collapse>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || !email}
                sx={{
                  backgroundColor: '#FF2625',
                  '&:hover': {
                    backgroundColor: '#d41f1f',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                  },
                  height: '40px',
                }}
                aria-label="Subscribe to newsletter"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: '1px solid #ddd',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={{ xs: 'center', sm: 'left' }}
          >
            © {new Date().getFullYear()} ANR Fitness Club. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            role="navigation"
            aria-label="Social media links"
          >
            <IconButton
              aria-label="Follow us on Facebook"
              onClick={() => handleSocialClick('facebook')}
              sx={{
                color: '#3A1212',
                '&:hover': { color: '#FF2625', backgroundColor: 'rgba(255, 38, 37, 0.08)' },
              }}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook />
            </IconButton>
            <IconButton
              aria-label="Follow us on Twitter"
              onClick={() => handleSocialClick('twitter')}
              sx={{
                color: '#3A1212',
                '&:hover': { color: '#FF2625', backgroundColor: 'rgba(255, 38, 37, 0.08)' },
              }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </IconButton>
            <IconButton
              aria-label="Follow us on Instagram"
              onClick={() => handleSocialClick('instagram')}
              sx={{
                color: '#3A1212',
                '&:hover': { color: '#FF2625', backgroundColor: 'rgba(255, 38, 37, 0.08)' },
              }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </IconButton>
            <IconButton
              aria-label="Connect with us on LinkedIn"
              onClick={() => handleSocialClick('linkedin')}
              sx={{
                color: '#3A1212',
                '&:hover': { color: '#FF2625', backgroundColor: 'rgba(255, 38, 37, 0.08)' },
              }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              aria-label="View our GitHub repository"
              onClick={() => handleSocialClick('github')}
              sx={{
                color: '#3A1212',
                '&:hover': { color: '#FF2625', backgroundColor: 'rgba(255, 38, 37, 0.08)' },
              }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;