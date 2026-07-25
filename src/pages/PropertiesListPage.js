import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  MenuItem,
  Select,
  FormControl,
  Pagination,
} from '@mui/material';
import { properties as staticProperties } from '../data/properties';
import { extractPriceValue } from '../data/projects';
import { useCollection } from '../hooks/useCollection';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from '../components/ProjectCard';

const PAGE_SIZE = 9;
const CITIES = ['Vrindavan', 'Mathura', 'Agra'];
const TYPES = ['Independent House', 'Commercial Shop', 'Residential Plot', 'Luxury Apartment'];
const STATUSES = ['AVAILABLE', 'BOOKED', 'SOLD'];

const PropertiesListPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const { data: listings } = useCollection('listings');
  const firestoreProperties = listings.filter((l) => l.category === 'Property');
  const allProperties = firestoreProperties.length > 0 ? firestoreProperties : staticProperties;

  const [city, setCity] = useState(searchParams.get('location') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = allProperties.filter((p) => {
      if (city !== 'all' && !p.location.includes(city)) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (status !== 'all' && p.status !== status) return false;
      return true;
    });
    if (sort === 'price_low') {
      list = [...list].sort((a, b) => extractPriceValue(a.price) - extractPriceValue(b.price));
    } else if (sort === 'price_high') {
      list = [...list].sort((a, b) => extractPriceValue(b.price) - extractPriceValue(a.price));
    }
    return list;
  }, [allProperties, city, type, status, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '70vh' }}>
      <Container maxWidth="lg" sx={{ pt: { xs: '110px', md: '140px' }, pb: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1 }}>
          {t('properties_page_title')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400, maxWidth: 800 }}>
          {t('properties_page_subtitle')}
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 2,
            flexWrap: 'wrap',
            mb: 4,
            p: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: '1px solid #2E2A24',
          }}
        >
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select value={city} onChange={handleFilterChange(setCity)}>
              <MenuItem value="all">{t('filter_all_cities')}</MenuItem>
              {CITIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select value={type} onChange={handleFilterChange(setType)}>
              <MenuItem value="all">{t('filter_all_types')}</MenuItem>
              {TYPES.map((ty) => <MenuItem key={ty} value={ty}>{ty}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select value={status} onChange={handleFilterChange(setStatus)}>
              <MenuItem value="all">{t('filter_all_status')}</MenuItem>
              {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select value={sort} onChange={handleFilterChange(setSort)}>
              <MenuItem value="default">{t('filter_sort_by')}</MenuItem>
              <MenuItem value="price_low">{t('filter_sort_price_low')}</MenuItem>
              <MenuItem value="price_high">{t('filter_sort_price_high')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {pageItems.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
            {t('no_projects_found')}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {pageItems.map((property) => (
              <Grid item xs={12} sm={6} lg={4} key={property.id}>
                <ProjectCard project={property} />
              </Grid>
            ))}
          </Grid>
        )}

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="secondary"
              shape="rounded"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PropertiesListPage;
