import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from '@mui/material';
import { Phone, WhatsApp, Search, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { logEvent } from '../firebase';
import { useCollection } from '../hooks/useCollection';
import { cloudinaryLowRes } from '../cloudinary';

// Shows a tiny blurred placeholder immediately (for Cloudinary-hosted
// images), then cross-fades to the full-quality image once it's actually
// loaded — so the banner never sits on a blank box while a multi-MB photo
// downloads. Browser HTTP caching (Cloudinary already serves images with
// long-lived cache headers) means this only costs the wait once per image.
const HeroSlideImage = ({ src, active, eager }) => {
  const [loaded, setLoaded] = useState(false);
  const lowRes = cloudinaryLowRes(src);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      {lowRes && (
        <Box
          component="img"
          src={lowRes}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(12px)',
            transform: 'scale(1.05)',
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </Box>
  );
};

const STATIC_SLIDES = [
  { image: '/images/kvaan-tower.jpg' },
  { image: '/images/goverdhan-chauraha-commercial.jpg' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=900&fit=crop' },
];

const Hero = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: banners } = useCollection('banners');
  const SLIDES = banners.length > 0 ? banners : STATIC_SLIDES;
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');

  useEffect(() => {
    setSlide((s) => (s >= SLIDES.length ? 0 : s));
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

  const PROJECT_TYPES = ['Plot', 'Villa', 'Flat', 'Commercial'];
  const PROPERTY_TYPES = ['Independent House', 'Commercial Shop', 'Residential Plot', 'Luxury Apartment'];
  const typeOptions = category === 'Property' ? PROPERTY_TYPES : PROJECT_TYPES;

  const handleCategoryChange = (next) => {
    setCategory(next);
    setType('all');
  };

  const handleSearch = () => {
    logEvent('select_content', { item: 'hero_search', category, location, type });
    const params = new URLSearchParams();
    if (location !== 'all') params.set('location', location);
    if (type !== 'all') params.set('type', type);
    const basePath = category === 'Property' ? '/properties' : '/projects';
    navigate(`${basePath}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const stats = [
    { value: '1,000+', label: t('stat_families') },
    { value: '50+', label: t('stat_projects') },
    { value: '15+', label: t('stat_years') },
  ];

  const arrowSx = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    cursor: 'pointer',
    zIndex: 3,
    backgroundColor: 'rgba(15,23,42,0.45)',
    borderRadius: '50%',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
    '&:hover': { opacity: 1, backgroundColor: 'rgba(15,23,42,0.65)' },
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          mt: { xs: '56px', md: '64px' },
        }}
      >
        {/* Text — plain page background, no overlay on the banner */}
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            width: { xs: '100%', md: 340, lg: 400 },
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2.25,
            pl: { xs: 3, sm: 4, md: 5, lg: 7 },
            pr: { xs: 3, sm: 4, md: 4 },
            py: { xs: 5, md: 4 },
          }}
        >
          <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: '0.15em', display: 'block' }}>
            {t('hero_eyebrow')}
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Optima, Candara, "Century Gothic", sans-serif',
              color: 'primary.dark',
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.2rem', md: '1.9rem', lg: '2.2rem' },
              lineHeight: 1.2,
            }}
          >
            {t('hero_title_1')}{' '}
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {t('hero_title_accent')}
            </Box>{' '}
            {t('hero_title_2')}
          </Typography>

          <Typography sx={{ fontFamily: 'Charter, Georgia, serif', color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.65 }}>
            {t('hero_subtitle')}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => { logEvent('select_content', { item: 'hero_view_projects' }); navigate('/projects'); }}
              sx={{ backgroundColor: 'secondary.main', color: '#fff', py: 1.25, '&:hover': { backgroundColor: 'secondary.dark' } }}
            >
              {t('hero_view_projects')}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              href="tel:+919084203961"
              onClick={() => logEvent('contact', { method: 'call', location: 'hero' })}
              startIcon={<Phone fontSize="small" />}
              sx={{ borderColor: 'primary.main', borderWidth: 1.5, color: 'primary.dark', py: 1.25, '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(15,23,42,0.05)' } }}
            >
              {t('hero_call_now')}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              href="https://wa.me/919084203961"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logEvent('contact', { method: 'whatsapp', location: 'hero' })}
              startIcon={<WhatsApp fontSize="small" />}
              sx={{ borderColor: 'primary.main', borderWidth: 1.5, color: 'primary.dark', py: 1.25, '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(15,23,42,0.05)' } }}
            >
              {t('hero_whatsapp')}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', pt: 1.5, borderTop: '1px solid #E5E7EB' }}>
            {stats.map((stat) => (
              <Box key={stat.label}>
                <Typography sx={{ fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: 'primary.dark' }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: '0.62rem', display: 'block' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Banner — fills all remaining space to the right edge of the screen.
            Height comes from aspect-ratio (not a fixed px value) so the box
            always matches the image's real proportions: no crop, no letterbox. */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            flex: { xs: 'none', md: 1 },
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: { xs: '16 / 9', md: 'auto' },
            alignSelf: { md: 'stretch' },
          }}
        >
          {SLIDES.map((s, i) => (
            <HeroSlideImage key={s.image} src={s.image} active={i === slide} eager={i === 0} />
          ))}

          <Box onClick={() => setSlide((slide - 1 + SLIDES.length) % SLIDES.length)} sx={{ ...arrowSx, left: 16 }}>
            <ArrowBackIos fontSize="small" sx={{ ml: 0.5 }} />
          </Box>
          <Box onClick={() => setSlide((slide + 1) % SLIDES.length)} sx={{ ...arrowSx, right: 16 }}>
            <ArrowForwardIos fontSize="small" />
          </Box>

          <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1, zIndex: 3 }}>
            {SLIDES.map((s, i) => (
              <Box
                key={s.image}
                onClick={() => setSlide(i)}
                sx={{
                  width: i === slide ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === slide ? 'secondary.main' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'width 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Search bar — sits cleanly below, no overlap with the banner */}
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Paper
          elevation={0}
          sx={{
            mt: { xs: 3, md: 4 },
            mb: { xs: 4, md: 6 },
            p: { xs: 2, md: 2.5 },
            borderRadius: 2,
            border: '1px solid #E5E7EB',
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, mb: 1.5, borderBottom: '1px solid #E5E7EB', pb: 1 }}>
            {[{ key: 'all', label: t('tab_all') }, { key: 'Project', label: t('nav_projects') }, { key: 'Property', label: t('nav_properties') }].map((tab) => (
              <Box
                key={tab.key}
                onClick={() => handleCategoryChange(tab.key)}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: category === tab.key ? 'secondary.dark' : 'text.secondary',
                  borderBottom: category === tab.key ? '2px solid' : '2px solid transparent',
                  borderColor: category === tab.key ? 'secondary.main' : 'transparent',
                  pb: 1,
                  mb: -1.1,
                }}
              >
                {tab.label}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 160, flex: 1 }}>
              <Select value={location} onChange={(e) => setLocation(e.target.value)} displayEmpty>
                <MenuItem value="all">{t('filter_all_cities')}</MenuItem>
                <MenuItem value="Vrindavan">Vrindavan</MenuItem>
                <MenuItem value="Mathura">Mathura</MenuItem>
                <MenuItem value="Agra">Agra</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160, flex: 1 }}>
              <Select value={type} onChange={(e) => setType(e.target.value)} displayEmpty>
                <MenuItem value="all">{t('filter_all_types')}</MenuItem>
                {typeOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{ backgroundColor: 'secondary.main', color: '#fff', px: 4, py: 1, '&:hover': { backgroundColor: 'secondary.dark' } }}
            >
              {t('filter_search_button')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Hero;
