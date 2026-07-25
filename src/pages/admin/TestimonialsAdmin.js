import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { doc, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCollection } from '../../hooks/useCollection';

const emptyForm = { name: '', context: '', quote: '' };

const TestimonialsAdmin = () => {
  const { data: testimonials, loading } = useCollection('testimonials');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [form, setForm] = useState(emptyForm);
  const [toDelete, setToDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setForm(emptyForm); setEditing({}); };
  const openEdit = (t) => { setForm({ name: t.name, context: t.context, quote: t.quote }); setEditing(t); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing?.id) {
        await updateDoc(doc(db, 'testimonials', editing.id), form);
      } else {
        await addDoc(collection(db, 'testimonials'), form);
      }
      setEditing(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Could not save this testimonial — check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, 'testimonials', toDelete.id));
    setToDelete(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>Testimonials</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}>
          Add Testimonial
        </Button>
      </Box>

      <Box sx={{ backgroundColor: '#1E2023', border: '1px solid #2E2A24', borderRadius: 2, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Name', 'Context', 'Quote', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ color: '#9B9686', fontWeight: 700, borderColor: '#2E2A24' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && testimonials.length === 0 && (
              <TableRow><TableCell colSpan={4} sx={{ color: '#9B9686', borderColor: '#2E2A24' }}>No testimonials yet.</TableCell></TableRow>
            )}
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell sx={{ color: '#fff', borderColor: '#2E2A24' }}>{t.name}</TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>{t.context}</TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24', maxWidth: 320 }}>{t.quote?.slice(0, 90)}…</TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <IconButton size="small" onClick={() => openEdit(t)} sx={{ color: '#9B9686' }}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => setToDelete(t)} sx={{ color: '#f87171' }}><Delete fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>{editing?.id ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField label="Context (e.g. project, location)" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          <TextField label="Quote" multiline rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || !form.name || !form.quote}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>Delete testimonial from "{toDelete?.name}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestimonialsAdmin;
