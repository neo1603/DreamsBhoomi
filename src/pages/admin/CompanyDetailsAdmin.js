import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDocument } from '../../hooks/useDocument';

const DEFAULTS = { founded: '2008', familiesServed: '1,000+', projectsDelivered: '50+', yearsInBrij: '15+' };

const CompanyDetailsAdmin = () => {
  const { data, loading } = useDocument('settings', 'companyDetails');
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
      await setDoc(doc(db, 'settings', 'companyDetails'), form);
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
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>Company Details</Typography>
      <Typography variant="body2" sx={{ color: '#9B9686', mb: 3 }}>
        These four numbers appear in the "About DreamsBhoomi" section on the homepage.
      </Typography>
      {saved && <Alert severity="success" sx={{ mb: 3 }}>Saved — the homepage will update automatically.</Alert>}
      <form onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Founded (year)" value={form.founded} onChange={(e) => setForm({ ...form, founded: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Families Served" value={form.familiesServed} onChange={(e) => setForm({ ...form, familiesServed: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Projects Delivered" value={form.projectsDelivered} onChange={(e) => setForm({ ...form, projectsDelivered: e.target.value })} sx={fieldSx} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Years in Brij" value={form.yearsInBrij} onChange={(e) => setForm({ ...form, yearsInBrij: e.target.value })} sx={fieldSx} />
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

export default CompanyDetailsAdmin;
