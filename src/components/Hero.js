import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
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

  useEffect(() => {
    if (SLIDES.length === 0) return;
    setSlide((s) => (s >= SLIDES.length ? 0 : s));
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

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
    </Box>
  );
};

export default Hero;
