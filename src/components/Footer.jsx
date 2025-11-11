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
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  Email,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import emailjs from '@emailjs/browser';

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
      // Initialize EmailJS with public key
      emailjs.init('YOUR_PUBLIC_KEY'); // Replace with actual public key from EmailJS dashboard
      
      // Send email using EmailJS
      const templateParams = {
        to_email: email,
        from_name: 'ANR Fitness Club',
        message: `Thank you for subscribing to our newsletter! You'll receive fitness tips and updates at ${email}.`,
        reply_to: 'contact@anrfitness.com',
      };
      
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams
      );
      
      // Track analytics
      if (window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'footer_newsletter',
        });
      }
      
      setSuccess(true);
      setEmail('');
      
      // Hide success message after 8 seconds
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      console.error('Newsletter signup error:', err);
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
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderTop: '4px solid #FF2625',
        mt: 8,
        py: { xs: 5, md: 7 },
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 38, 37, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
      role="contentinfo"
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={5}>
          {/* Branding Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              color="#FF2625"
              fontWeight={800}
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                letterSpacing: '0.5px',
                mb: 2,
              }}
            >
              ANR Fitness Club
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                mb: 3, 
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.95rem',
              }}
            >
              Your ultimate destination for fitness exercises and wellness.
              Transform your body, elevate your mind.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: '#FF2625',
                },
              }}
            >
              <Email sx={{ color: '#FF2625', fontSize: '1.2rem' }} />
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}
              >
                contact@anrfitness.com
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              sx={{ 
                fontSize: '1.1rem',
                mb: 2.5,
                color: '#fff',
                letterSpacing: '0.5px',
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="/"
                underline="none"
                onClick={() => handleLinkClick('home')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&::before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                aria-label="Navigate to home page"
              >
                Home
              </Link>
              <Link
                href="#exercises"
                underline="none"
                onClick={() => handleLinkClick('exercises')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&::before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                aria-label="Navigate to exercises section"
              >
                Exercises
              </Link>
              <Link
                href="#about"
                underline="none"
                onClick={() => handleLinkClick('about')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&::before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
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
              fontWeight={700}
              gutterBottom
              sx={{ 
                fontSize: '1.1rem',
                mb: 2.5,
                color: '#fff',
                letterSpacing: '0.5px',
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="#blog"
                underline="none"
                onClick={() => handleLinkClick('blog')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&::before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                aria-label="Navigate to blog"
              >
                Blog
              </Link>
              <Link
                href="#faq"
                underline="none"
                onClick={() => handleLinkClick('faq')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&::before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                aria-label="Navigate to FAQ"
              >
                FAQ
              </Link>
              <Link
                href="#privacy"
                underline="none"
                onClick={() => handleLinkClick('privacy')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&::before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
                aria-label="Navigate to privacy policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                underline="none"
                onClick={() => handleLinkClick('terms')}
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#FF2625',
                    transform: 'translateX(5px)',
                  },
                  '&:before': {
                    content: '"→"',
                    marginRight: '8px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
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
              fontWeight={700}
              gutterBottom
              sx={{ 
                fontSize: '1.1rem',
                mb: 2.5,
                color: '#fff',
                letterSpacing: '0.5px',
              }}
            >
              Newsletter
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3,
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.6,
              }}
            >
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
                size="medium"
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
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 2,
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF2625',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF2625',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#fff',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#FF6B6B',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    margin: '4px 0 0 0',
                    padding: '4px 8px',
                    borderRadius: 1,
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
                  icon={<CheckCircle sx={{ color: '#4CAF50' }} />}
                  severity="success"
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'rgba(76, 175, 80, 0.15)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    color: '#81C784',
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      fontSize: '0.9rem',
                    },
                  }}
                  aria-live="polite"
                  role="status"
                >
                  ✉️ Confirmation email sent! Check your inbox.
                </Alert>
              </Collapse>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || !email}
                endIcon={!loading && <Send />}
                sx={{
                  background: 'linear-gradient(135deg, #FF2625 0%, #d41f1f 100%)',
                  color: '#fff',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 12px rgba(255, 38, 37, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d41f1f 0%, #FF2625 100%)',
                    boxShadow: '0 6px 20px rgba(255, 38, 37, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.3)',
                    boxShadow: 'none',
                  },
                }}
                aria-label="Subscribe to newsletter"
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                ) : (
                  'Subscribe Now'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider 
          sx={{ 
            mt: 6, 
            mb: 4, 
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }} 
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography
            variant="body2"
            textAlign={{ xs: 'center', sm: 'left' }}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.85rem',
            }}
          >
            © {new Date().getFullYear()} ANR Fitness Club. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            role="navigation"
            aria-label="Social media links"
          >
            <IconButton
              aria-label="Follow us on Facebook"
              onClick={() => handleSocialClick('facebook')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#fff',
                  backgroundColor: '#FF2625',
                  borderColor: '#FF2625',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(255, 38, 37, 0.3)',
                },
              }}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Follow us on Twitter"
              onClick={() => handleSocialClick('twitter')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#fff',
                  backgroundColor: '#FF2625',
                  borderColor: '#FF2625',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(255, 38, 37, 0.3)',
                },
              }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Follow us on Instagram"
              onClick={() => handleSocialClick('instagram')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#fff',
                  backgroundColor: '#FF2625',
                  borderColor: '#FF2625',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(255, 38, 37, 0.3)',
                },
              }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Connect with us on LinkedIn"
              onClick={() => handleSocialClick('linkedin')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#fff',
                  backgroundColor: '#FF2625',
                  borderColor: '#FF2625',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(255, 38, 37, 0.3)',
                },
              }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="View our GitHub repository"
              onClick={() => handleSocialClick('github')}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#fff',
                  backgroundColor: '#FF2625',
                  borderColor: '#FF2625',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 12px rgba(255, 38, 37, 0.3)',
                },
              }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;