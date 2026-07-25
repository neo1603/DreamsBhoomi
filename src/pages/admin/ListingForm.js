import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Grid, MenuItem, FormControlLabel,
  Checkbox, LinearProgress, Chip, Alert,
} from '@mui/material';
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { uploadImage } from '../../cloudinary';
import { RIBBON_PRESETS } from '../../components/RibbonBadge';

const OPTIONS_BY_CATEGORY = {
  Project: {
    statuses: ['ONGOING', 'UPCOMING', 'COMPLETED'],
    types: ['Plot', 'Villa', 'Flat', 'Commercial'],
  },
  Property: {
    statuses: ['AVAILABLE', 'BOOKED', 'SOLD'],
    types: ['Independent House', 'Commercial Shop', 'Residential Plot', 'Luxury Apartment'],
  },
};

const emptyForm = {
  title: '', location: '', price: '', area: '', facing: '', status: '', type: '',
  featured: false, description: '', features: '', plotSizes: '', mapLink: '', contact: '',
  email: '', completionDate: '', launchDate: '', images: [], badgeLabel: '',
};

const ListingForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const category = location.pathname.includes('/properties') ? 'Property' : 'Project';
  const options = OPTIONS_BY_CATEGORY[category];
  const [form, setForm] = useState({ ...emptyForm, status: options.statuses[0], type: options.types[0] });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const snap = await getDoc(doc(db, 'listings', id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          ...emptyForm,
          ...data,
          features: (data.features || []).join(', '),
          plotSizes: (data.plotSizes || []).join(', '),
          images: data.images || (data.image ? [data.image] : []),
          badgeLabel: data.badge?.label || '',
        });
      }
    })();
  }, [id, isEdit]);

  const handleChange = (field) => (e) => {
    const value = field === 'featured' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const uploaded = [];
      for (const file of files) {
        uploaded.push(await uploadImage(file));
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Image upload failed — check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const { badgeLabel, ...rest } = form;
      const payload = {
        ...rest,
        category,
        features: form.features.split(',').map((s) => s.trim()).filter(Boolean),
        plotSizes: form.plotSizes.split(',').map((s) => s.trim()).filter(Boolean),
        image: form.images[0] || '',
        badge: badgeLabel ? { label: badgeLabel, color: RIBBON_PRESETS[badgeLabel] } : null,
      };
      if (isEdit) {
        await updateDoc(doc(db, 'listings', id), payload);
      } else {
        await addDoc(collection(db, 'listings'), { ...payload, createdAt: serverTimestamp() });
      }
      navigate(category === 'Property' ? '/admin/properties' : '/admin/projects');
    } catch (err) {
      console.error('Save failed:', err);
      setError('Could not save this listing — check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  const fieldSx = { input: { color: '#fff' }, textarea: { color: '#fff' }, label: { color: '#9B9686' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2E2A24' } };

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>
        {isEdit ? `Edit ${category}` : `Add ${category}`}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Title" value={form.title} onChange={handleChange('title')} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Location" value={form.location} onChange={handleChange('location')} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Price (e.g. ₹25,000/sq yd)" value={form.price} onChange={handleChange('price')} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Area" value={form.area} onChange={handleChange('area')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth select label="Status" value={form.status} onChange={handleChange('status')} sx={fieldSx}>
              {options.statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth select label="Type" value={form.type} onChange={handleChange('type')} sx={fieldSx}>
              {options.types.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth select label="Promo Badge" value={form.badgeLabel} onChange={handleChange('badgeLabel')} sx={fieldSx}>
              <MenuItem value="">None</MenuItem>
              {Object.keys(RIBBON_PRESETS).map((label) => <MenuItem key={label} value={label}>{label}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Facing" value={form.facing} onChange={handleChange('facing')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Completion Date" value={form.completionDate} onChange={handleChange('completionDate')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Launch Date" value={form.launchDate} onChange={handleChange('launchDate')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Description" value={form.description} onChange={handleChange('description')} required sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Features (comma-separated)" value={form.features} onChange={handleChange('features')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Available Sizes / Units (comma-separated)" value={form.plotSizes} onChange={handleChange('plotSizes')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Contact Phone" value={form.contact} onChange={handleChange('contact')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Contact Email" value={form.email} onChange={handleChange('email')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Google Maps Link" value={form.mapLink} onChange={handleChange('mapLink')} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={form.featured} onChange={handleChange('featured')} sx={{ color: '#9B9686' }} />}
              label={`Show on homepage as a featured ${category.toLowerCase()}`}
              sx={{ color: '#C4B7A5' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: '#9B9686', mb: 1 }}>Photos</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
              {form.images.map((img, i) => (
                <Chip key={img} label={`Photo ${i + 1}`} onDelete={() => removeImage(i)} sx={{ backgroundColor: '#2E2A24', color: '#fff' }} />
              ))}
            </Box>
            <Button
              variant="outlined"
              component="label"
              disabled={uploading}
              sx={{ borderColor: '#2E2A24', color: '#C4B7A5' }}
            >
              {uploading ? 'Uploading…' : 'Upload Photos'}
              <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
            </Button>
            {uploading && <LinearProgress sx={{ mt: 1 }} />}
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" disabled={saving || uploading} sx={{ backgroundColor: 'secondary.main', px: 4, '&:hover': { backgroundColor: 'secondary.dark' } }}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : `Add ${category}`}
            </Button>
            <Button onClick={() => navigate(category === 'Property' ? '/admin/properties' : '/admin/projects')} sx={{ color: '#9B9686' }}>Cancel</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ListingForm;
