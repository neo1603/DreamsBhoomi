import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
} from '@mui/material';
import { CalendarMonth, Groups } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const Events = () => {
  const { t } = useLanguage();
  const celebrations = [
    {
      id: 1,
      title: "Project Launch Celebration",
      description: "Grand launch of our flagship project with over 500 attendees including local officials and industry partners.",
      date: "January 2024",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      category: "Project Launch",
      attendees: "500+",
    },
    {
      id: 2,
      title: "Customer Meet & Greet",
      description: "Annual customer appreciation event where we celebrated the success of our homeowners and shared future plans.",
      date: "December 2023",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      category: "Customer Event",
      attendees: "300+",
    },
    {
      id: 3,
      title: "Award Ceremony",
      description: "Celebrating our team's achievements at the Real Estate Excellence Awards ceremony.",
      date: "November 2023",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      category: "Awards",
      attendees: "200+",
    },
    {
      id: 4,
      title: "Team Building Event",
      description: "Annual team building and celebration event to recognize employee contributions and strengthen team bonds.",
      date: "October 2023",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      category: "Team Event",
      attendees: "150+",
    },
  ];

  return (
    <Box id="events" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1 }}
        >
          {t('events_title')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400, maxWidth: 700 }}>
          {t('events_subtitle')}
        </Typography>

        <Grid container spacing={3}>
          {celebrations.map((event) => (
            <Grid item xs={12} sm={6} lg={3} key={event.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s ease',
                  '&:hover': { borderColor: 'secondary.main' },
                }}
              >
                <Box sx={{ position: 'relative', p: 1.5, pb: 0 }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover', borderRadius: 3 }}
                  />
                  <Chip
                    label={event.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 24,
                      left: 24,
                      backgroundColor: 'rgba(255,255,255,0.94)',
                      color: 'primary.dark',
                      fontWeight: 700,
                      borderRadius: 100,
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid', borderColor: '#2E2A24' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarMonth sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">{event.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Groups sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">{event.attendees}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Events;
