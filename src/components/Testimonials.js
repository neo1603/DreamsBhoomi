import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { useCollection } from '../hooks/useCollection';

export const staticTestimonials = [
  {
    id: 'static-1',
    quote: "We bought our plot at Green Valley Residency two years ago. The paperwork was transparent and the site visit team answered every question we had before we paid a rupee.",
    name: 'Plot buyer',
    context: 'Green Valley Residency, Vrindavan',
  },
  {
    id: 'static-2',
    quote: "Booked a showroom at Kvaan Tower for our shop. The gated society and underground parking make it easy to recommend to other shopkeepers looking to move to Krishna Nagar.",
    name: 'Showroom owner',
    context: 'Kvaan Tower, Mathura',
  },
  {
    id: 'static-3',
    quote: "Straightforward dealing from first call to registry. We'd been let down by a broker before this, so transparency mattered more to us than anything else.",
    name: 'Villa owner',
    context: 'Royal Heights, Mathura',
  },
];

const Testimonials = () => {
  const { data: firestoreTestimonials } = useCollection('testimonials');
  const testimonials = firestoreTestimonials.length > 0 ? firestoreTestimonials : staticTestimonials;

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1 }}
        >
          What Our Customers Say
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400, maxWidth: 700 }}>
          Real feedback from families and business owners we've worked with.
        </Typography>

        <Grid container spacing={3}>
          {testimonials.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Box
                sx={{
                  height: '100%',
                  p: 3.5,
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: '1px solid #2E2A24',
                  boxShadow: '0px 10px 24px -16px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <FormatQuote sx={{ color: 'secondary.main', fontSize: 32, mb: 1, transform: 'scaleX(-1)' }} />
                <Typography
                  sx={{ fontFamily: 'Charter, Georgia, serif', color: 'text.primary', mb: 3, flexGrow: 1, lineHeight: 1.7, fontStyle: 'italic' }}
                >
                  "{item.quote}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ backgroundColor: 'primary.main', width: 36, height: 36, fontSize: '0.9rem' }}>
                    {item.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {item.context}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
