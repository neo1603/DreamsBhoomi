import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  EmojiEvents,
  Celebration,
  Star,
  Close,
  Visibility,
} from '@mui/icons-material';

const Insights = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const awards = [
    {
      id: 1,
      title: "Best Real Estate Developer 2024",
      organization: "Real Estate Excellence Awards",
      year: "2024",
      description: "Recognized for outstanding contribution to residential development in Mathura Vrindavan region with innovative projects and customer satisfaction.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      category: "Excellence",
      icon: <EmojiEvents sx={{ fontSize: 40, color: '#fbbf24' }} />,
    },
    {
      id: 2,
      title: "Customer Choice Award",
      organization: "Property Awards India",
      year: "2023",
      description: "Voted as the most trusted real estate developer by customers for transparent dealings and quality construction.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      category: "Customer Satisfaction",
      icon: <Star sx={{ fontSize: 40, color: '#fbbf24' }} />,
    },
    {
      id: 3,
      title: "Green Building Excellence",
      organization: "Sustainable Development Council",
      year: "2023",
      description: "Awarded for implementing eco-friendly construction practices and sustainable development initiatives.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      category: "Sustainability",
      icon: <EmojiEvents sx={{ fontSize: 40, color: '#10b981' }} />,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "1000+ Happy Families",
      description: "Successfully delivered homes to over 1000 families across Mathura Vrindavan region with 100% customer satisfaction.",
      metric: "1000+",
      unit: "Families",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      category: "Customer Success",
    },
    {
      id: 2,
      title: "50+ Projects Completed",
      description: "Successfully completed more than 50 residential and commercial projects across different cities.",
      metric: "50+",
      unit: "Projects",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      category: "Project Delivery",
    },
    {
      id: 3,
      title: "15+ Years of Excellence",
      description: "Over 15 years of experience in real estate development with consistent growth and innovation.",
      metric: "15+",
      unit: "Years",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
      category: "Experience",
    },
    {
      id: 4,
      title: "₹500+ Crore Portfolio",
      description: "Successfully managed and delivered projects worth over ₹500 crores in real estate value.",
      metric: "₹500+",
      unit: "Crore",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      category: "Portfolio Value",
    },
  ];

  const celebrations = [
    {
      id: 1,
      title: "Project Launch Celebration",
      description: "Grand launch of our flagship project 'Dream City' with over 500 attendees including government officials and industry leaders.",
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const AwardCard = ({ award }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={award.image}
        alt={award.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {award.icon}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {award.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {award.organization}
            </Typography>
          </Box>
        </Box>
        
        <Chip 
          label={award.category} 
          color="primary" 
          size="small" 
          sx={{ alignSelf: 'flex-start', mb: 2 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {award.description.substring(0, 120)}...
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip label={award.year} variant="outlined" size="small" />
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility />}
            onClick={() => handleItemClick(award)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const AchievementCard = ({ achievement }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={achievement.image}
        alt={achievement.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
          {achievement.metric}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>
          {achievement.unit}
        </Typography>
        
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
          {achievement.title}
        </Typography>
        
        <Chip 
          label={achievement.category} 
          color="secondary" 
          size="small" 
          sx={{ alignSelf: 'center', mb: 2 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {achievement.description}
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          startIcon={<Visibility />}
          onClick={() => handleItemClick(achievement)}
          sx={{ alignSelf: 'center' }}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );

  const CelebrationCard = ({ celebration }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={celebration.image}
        alt={celebration.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Celebration sx={{ fontSize: 20, color: 'secondary.main', mr: 1 }} />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {celebration.title}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {celebration.date}
        </Typography>
        
        <Chip 
          label={celebration.category} 
          color="secondary" 
          size="small" 
          sx={{ alignSelf: 'flex-start', mb: 2 }}
        />
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {celebration.description.substring(0, 100)}...
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {celebration.attendees} attendees
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility />}
            onClick={() => handleItemClick(celebration)}
          >
            View Photos
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box id="insights" sx={{ py: 8, backgroundColor: 'white' }}>
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
          Insights & Achievements
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
          Celebrating our journey of excellence, awards, and memorable moments
        </Typography>

        {/* Awards Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 4, 
              color: '#f59e0b',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: '#f59e0b',
                borderRadius: 2,
              }
            }}
          >
            Awards & Recognition
          </Typography>
          <Grid container spacing={3}>
            {awards.map((award) => (
              <Grid item xs={12} md={4} key={award.id}>
                <AwardCard award={award} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Achievements Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 4, 
              color: '#3b82f6',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: '#3b82f6',
                borderRadius: 2,
              }
            }}
          >
            Key Achievements
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement) => (
              <Grid item xs={12} sm={6} lg={3} key={achievement.id}>
                <AchievementCard achievement={achievement} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Celebrations Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 4, 
              color: '#10b981',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                backgroundColor: '#10b981',
                borderRadius: 2,
              }
            }}
          >
            Celebrations & Events
          </Typography>
          <Grid container spacing={3}>
            {celebrations.map((celebration) => (
              <Grid item xs={12} sm={6} lg={3} key={celebration.id}>
                <CelebrationCard celebration={celebration} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedItem && (
          <>
            <DialogTitle sx={{ m: 0, p: 2, backgroundColor: 'primary.main', color: 'white' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedItem.title}
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  sx={{ color: 'white' }}
                >
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title}
                style={{ 
                  width: '100%', 
                  height: 300, 
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 16
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                {selectedItem.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedItem.description}
              </Typography>
              {selectedItem.organization && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Organization:</strong> {selectedItem.organization}
                </Typography>
              )}
              {selectedItem.year && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Year:</strong> {selectedItem.year}
                </Typography>
              )}
              {selectedItem.date && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Date:</strong> {selectedItem.date}
                </Typography>
              )}
              {selectedItem.attendees && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Attendees:</strong> {selectedItem.attendees}
                </Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Insights; 