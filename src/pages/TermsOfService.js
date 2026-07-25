import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useDocument } from '../hooks/useDocument';

const DEFAULT_SETTINGS = {
  email: 'info@dreamsbhoomi.com',
  address: 'NH-2, Front of Flyover, Chhatikara, Vrindavan, Uttar Pradesh, India',
};

const Section = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.dark', mb: 1.5 }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
      {children}
    </Typography>
  </Box>
);

const TermsOfService = () => {
  const { data: settingsDoc } = useDocument('settings', 'general');
  const settings = { ...DEFAULT_SETTINGS, ...settingsDoc };

  return (
    <Container maxWidth="md" sx={{ pt: { xs: '110px', md: '140px' }, pb: { xs: 6, md: 10 } }}>
      <Typography variant="h3" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'primary.dark', mb: 1 }}>
        Terms of Service
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
        Last updated: July 2026
      </Typography>

      <Section title="About this site">
        This website is published by DreamsBhoomi Developers to showcase our residential and commercial projects and properties in the Mathura–Vrindavan region. By using this site, you agree to the terms below.
      </Section>

      <Section title="Listing information">
        We make every effort to keep project and property details — pricing, availability, area, and status — accurate and up to date. However, real estate details can change quickly, so listings on this site are indicative only and don't constitute a formal offer or contract. Please confirm final pricing, availability, and terms directly with our team before making any decision.
      </Section>

      <Section title="EMI calculator">
        The EMI calculator on this site provides an estimate only, based on the loan amount, interest rate, and tenure you enter. It doesn't reflect any specific lender's actual terms, processing fees, or eligibility criteria. Please speak with a bank or financing partner for exact figures.
      </Section>

      <Section title="No online transactions">
        We don't process any payments, bookings, or transactions through this website. All enquiries submitted here are followed up by our team directly, and any booking or payment happens offline through our usual process.
      </Section>

      <Section title="Intellectual property">
        The content, images, and branding on this site belong to DreamsBhoomi Developers unless otherwise noted, and shouldn't be reused without our permission.
      </Section>

      <Section title="Changes to these terms">
        We may update these terms from time to time as the site evolves. Continued use of the site after changes means you accept the updated terms.
      </Section>

      <Section title="Contact us">
        {`Questions about these terms? Reach us at ${settings.email} or write to us at ${settings.address}.`}
      </Section>
    </Container>
  );
};

export default TermsOfService;
