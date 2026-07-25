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

const PrivacyPolicy = () => {
  const { data: settingsDoc } = useDocument('settings', 'general');
  const settings = { ...DEFAULT_SETTINGS, ...settingsDoc };

  return (
    <Container maxWidth="md" sx={{ pt: { xs: '110px', md: '140px' }, pb: { xs: 6, md: 10 } }}>
      <Typography variant="h3" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'primary.dark', mb: 1 }}>
        Privacy Policy
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
        Last updated: July 2026
      </Typography>

      <Section title="What we collect">
        When you submit our contact or enquiry form, we collect your name, email address, phone number, and message so our team can respond to you. We don't ask for or store any payment, banking, or government ID information anywhere on this site.
      </Section>

      <Section title="How we use it">
        Your enquiry details are used only to get in touch with you about the property or project you asked about. We don't sell, rent, or share your contact information with third parties, and we don't use it for unrelated marketing.
      </Section>

      <Section title="Analytics">
        We use Firebase Analytics (built on Google Analytics) to understand how many people visit the site and which pages they view, so we can improve it. This is aggregate, anonymized usage data — it doesn't include the contents of any form you submit.
      </Section>

      <Section title="Data storage">
        Enquiry details are stored securely with Firebase (a Google Cloud service) and are accessible only to our admin team. We keep enquiry records for as long as needed to follow up with you, and remove them when they're no longer relevant.
      </Section>

      <Section title="Your rights">
        You can ask us to review, correct, or delete any information you've submitted to us at any time. Just reach out using the details below and we'll take care of it.
      </Section>

      <Section title="Contact us">
        {`If you have any questions about this policy or your data, email us at ${settings.email} or write to us at ${settings.address}.`}
      </Section>
    </Container>
  );
};

export default PrivacyPolicy;
