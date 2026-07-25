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
import { Search, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
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

const Hero = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: banners } = useCollection('banners');
  const SLIDES = banners;
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');

  useEffect(() => {
    if (SLIDES.length === 0) return;
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
      {/* Full-bleed banner — starts at the very top of the page so the fixed,
          translucent Header overlays it directly, instead of sitting in its
          own opaque strip above a separate side-by-side text/image split. */}
      <Box sx={{ position: 'relative', height: { xs: '560px', sm: '620px', md: '90vh' }, minHeight: { md: 560 }, maxHeight: { md: 780 }, overflow: 'hidden' }}>
        {SLIDES.map((s, i) => (
          <HeroSlideImage key={s.image} src={s.image} active={i === slide} eager={i === 0} />
        ))}

        {/* Dark gradient so the overlaid header/text stay legible over any photo */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(100deg, rgba(11,14,22,0.92) 0%, rgba(11,14,22,0.7) 42%, rgba(11,14,22,0.3) 72%, rgba(11,14,22,0.08) 100%), linear-gradient(0deg, rgba(11,14,22,0.55) 0%, rgba(11,14,22,0) 32%)',
          }}
        />

        {SLIDES.length > 1 && (
          <>
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
          </>
        )}

        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            left: { xs: 3, sm: 5, md: 8 },
            right: { xs: 3, sm: 'auto' },
            bottom: { xs: 56, md: 92 },
            maxWidth: 520,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: '#F2EEE3',
              fontWeight: 600,
              fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem' },
              lineHeight: 1.14,
              mb: 2,
            }}
          >
            <Box component="span" sx={{ display: 'block' }}>{t('hero_title_1')}</Box>
            <Box component="span" sx={{ display: 'block', color: 'secondary.main' }}>{t('hero_title_accent')}</Box>
            <Box component="span" sx={{ display: 'block' }}>{t('hero_title_2')}</Box>
          </Typography>

          <Typography sx={{ color: 'rgba(228,213,194,0.85)', fontSize: { xs: '0.92rem', md: '1rem' }, lineHeight: 1.65, mb: 3, maxWidth: 420 }}>
            {t('hero_subtitle')}
          </Typography>

          <Button
            variant="contained"
            onClick={() => { logEvent('select_content', { item: 'hero_view_projects' }); navigate('/projects'); }}
            sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', px: 4.5, py: 1.4, '&:hover': { backgroundColor: 'secondary.dark', color: '#fff' } }}
          >
            {t('hero_view_projects')}
          </Button>
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
            border: '1px solid #2E2A24',
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, mb: 1.5, borderBottom: '1px solid #2E2A24', pb: 1 }}>
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
              sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', px: 4, py: 1, '&:hover': { backgroundColor: 'secondary.dark', color: '#fff' } }}
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
