import React from 'react';
import { Box } from '@mui/material';
import TrustBadges from '../components/TrustBadges';
import AboutUs from '../components/AboutUs';
import Team from '../components/Team';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Events from '../components/Events';
import Contact from '../components/Contact';

const AboutPage = () => (
  <Box sx={{ pt: { xs: '56px', md: '64px' } }}>
    <TrustBadges />
    <AboutUs />
    <Team />
    <WhyChooseUs />
    <Testimonials />
    <Events />
    <Contact />
  </Box>
);

export default AboutPage;
