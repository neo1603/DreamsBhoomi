import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Business,
  Apartment,
  Construction,
  Security,
  Payment,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const services = [
    {
      icon: <Home sx={{ fontSize: 50, color: 'text.primary' }} />,
      title: 'Residential Plots',
      description: 'Premium residential plots with modern amenities, 24/7 security, and excellent connectivity. Perfect for building your dream home.',
      features: [
        'Gated Community',
        '24/7 Security',
        'Water & Electricity',
        'Garden Areas',
        'Parking Space',
        'Children\'s Park',
      ],
      price: 'Starting from ₹25,000/sq yd',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    },
    {
      icon: <Business sx={{ fontSize: 50, color: 'text.primary' }} />,
      title: 'Commercial Properties',
      description: 'Prime commercial spaces for business growth. Strategic locations with high footfall and excellent investment potential.',
      features: [
        'Prime Location',
        'High ROI',
        'Business Ready',
        'Parking Facility',
        'Security System',
        'Power Backup',
      ],
      price: 'Starting from ₹50,000/sq yd',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    },
    {
      icon: <Apartment sx={{ fontSize: 50, color: 'text.primary' }} />,
      title: 'Luxury Villas',
      description: 'Exclusive luxury villas with world-class facilities, premium finishes, and personalized design options.',
      features: [
        'Premium Finishes',
        'Smart Home',
        'Private Garden',
        'Swimming Pool',
        'Gym Access',
        'Concierge Service',
      ],
      price: 'Starting from ₹2.5 Cr',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    },
    {
      icon: <Construction sx={{ fontSize: 50, color: 'text.primary' }} />,
      title: 'Construction Services',
      description: 'End-to-end construction and development services with quality assurance and timely delivery.',
      features: [
        'Quality Assurance',
        'Timely Delivery',
        'Expert Team',
        'Modern Technology',
        'Transparent Process',
        'Warranty Support',
      ],
      price: 'Custom Quote',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    },
    {
      icon: <Security sx={{ fontSize: 50, color: 'text.primary' }} />,
      title: 'Property Management',
      description: 'Professional property management services ensuring your investment is well-maintained and profitable.',
      features: [
        '24/7 Maintenance',
        'Tenant Management',
        'Rent Collection',
        'Legal Compliance',
        'Regular Inspections',
        'Financial Reports',
      ],
      price: '5% of rent',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    },
    {
      icon: <Payment sx={{ fontSize: 50, color: 'text.primary' }} />,
      title: 'Investment Advisory',
      description: 'Expert investment guidance and consultation to help you make informed real estate decisions.',
      features: [
        'Market Analysis',
        'Investment Planning',
        'Legal Guidance',
        'Tax Benefits',
        'Portfolio Management',
        'Risk Assessment',
      ],
      price: 'Free Consultation',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box id="services" sx={{ py: 8, backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800, 
            textAlign: 'center', 
            mb: 6,
            color: 'text.primary',
          }}
        >
          Our Services
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            mb: 8, 
            color: 'text.secondary',
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          Comprehensive real estate solutions tailored to your needs. From residential plots to luxury villas, 
          we provide end-to-end services with quality assurance and customer satisfaction.
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Service Image */}
                <Box
                  sx={{
                    height: 200,
                    background: `linear-gradient(45deg, rgba(30,58,138,0.8), rgba(59,130,246,0.6)), url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ textAlign: 'center', color: 'white' }}>
                    {service.icon}
                    <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
                      {service.title}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.6 }}>
                    {service.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                      Key Features:
                    </Typography>
                    <Grid container spacing={1}>
                      {service.features.map((feature, featureIndex) => (
                        <Grid item xs={6} key={featureIndex}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              {feature}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Price */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      color: 'secondary.main', 
                      mb: 2,
                      textAlign: 'center',
                      p: 1,
                      backgroundColor: 'rgba(245,158,11,0.1)',
                      borderRadius: 1,
                    }}
                  >
                    {service.price}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => scrollToSection('#contact')}
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box 
          sx={{ 
            mt: 8, 
            p: 4, 
            backgroundColor: 'primary.main', 
            borderRadius: 3,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Start Your Real Estate Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Get in touch with our experts for personalized consultation and exclusive offers
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              href="tel:+919084203961"
              sx={{
                backgroundColor: 'secondary.main',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              Call Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSection('#contact')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'text.primary',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services; 