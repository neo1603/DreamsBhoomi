import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDocument } from '../../hooks/useDocument';

const DEFAULTS = {
  phones: '+91 90842 03961, +91 80025 23318, +91 84451 50180, +91 98976 46552',
  whatsapp: '+91 90842 03961',
  email: 'info@dreamsbhoomi.com',
  salesEmail: 'sales@dreamsbhoomi.com',
  address: 'NH-2, Front of Flyover, Chhatikara, Vrindavan, Uttar Pradesh, India',
  facebook: 'https://facebook.com/dreamsbhoomi',
  instagram: 'https://instagram.com/dreamsbhoomi',
};

const SettingsAdmin = () => {
  const { data, loading } = useDocument('settings', 'general');
  const [form, setForm] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) setForm({ ...DEFAULTS, ...data });
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, 'settings', 'general'), form);
      setSaved(true);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Could not save — check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  const fieldSx = { input: { color: '#fff' }, label: { color: '#9B9686' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2E2A24' } };

  if (loading) return null;

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>Settings</Typography>
      <Typography variant="body2" sx={{ color: '#9B9686', mb: 3 }}>
        Contact details shown in the footer and contact page. Editing these updates the live site.
      </Typography>
      {saved && <Alert severity="success" sx={{ mb: 3 }}>Saved — the site will update automatically.</Alert>}
      <form onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone numbers (comma-separated)" value={form.phones} onChange={(e) => setForm({ ...form, phones: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="WhatsApp number" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Primary email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Sales email" value={form.salesEmail} onChange={(e) => setForm({ ...form, salesEmail: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Office address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Facebook URL" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Instagram URL" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={saving} sx={{ backgroundColor: 'secondary.main', px: 4, '&:hover': { backgroundColor: 'secondary.dark' } }}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SettingsAdmin;
