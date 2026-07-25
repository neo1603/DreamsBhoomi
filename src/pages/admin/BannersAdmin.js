import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, LinearProgress, Avatar,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { doc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { uploadImage } from '../../cloudinary';
import { useCollection } from '../../hooks/useCollection';

const emptyForm = { image: '', tag: '', title: '', subtitle: '' };

const BannersAdmin = () => {
  const { data: banners, loading } = useCollection('banners');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toDelete, setToDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => { setForm(emptyForm); setEditing({}); };
  const openEdit = (b) => { setForm({ image: b.image, tag: b.tag || '', title: b.title || '', subtitle: b.subtitle || '' }); setEditing(b); };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed — check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await updateDoc(doc(db, 'banners', editing.id), form);
      } else {
        await addDoc(collection(db, 'banners'), form);
      }
      setEditing(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Could not save this banner — check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, 'banners', toDelete.id));
    setToDelete(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>Hero Banners</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}>
          Add Banner
        </Button>
      </Box>

      <Box sx={{ backgroundColor: '#1E2023', border: '1px solid #2E2A24', borderRadius: 2, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Photo', 'Title', 'Tag', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ color: '#9B9686', fontWeight: 700, borderColor: '#2E2A24' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && banners.length === 0 && (
              <TableRow><TableCell colSpan={4} sx={{ color: '#9B9686', borderColor: '#2E2A24' }}>No banners yet — the hero uses its default photos until you add some.</TableCell></TableRow>
            )}
            {banners.map((b) => (
              <TableRow key={b.id}>
                <TableCell sx={{ borderColor: '#2E2A24' }}><Avatar variant="rounded" src={b.image} sx={{ width: 56, height: 40 }} /></TableCell>
                <TableCell sx={{ color: '#fff', borderColor: '#2E2A24' }}>{b.title}</TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>{b.tag}</TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <IconButton size="small" onClick={() => openEdit(b)} sx={{ color: '#9B9686' }}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => setToDelete(b)} sx={{ color: '#f87171' }}><Delete fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>{editing?.id ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField label="Tag (e.g. Ongoing · Kvaan Tower)" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
          <TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <TextField label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          {form.image && <Avatar variant="rounded" src={form.image} sx={{ width: '100%', height: 140 }} />}
          <Button variant="outlined" component="label" disabled={uploading}>
            {uploading ? 'Uploading…' : form.image ? 'Replace Photo' : 'Upload Photo'}
            <input type="file" accept="image/*" hidden onChange={handleUpload} />
          </Button>
          {uploading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || uploading || !form.image || !form.title}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>Delete banner "{toDelete?.title}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BannersAdmin;
