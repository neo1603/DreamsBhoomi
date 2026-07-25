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

const emptyForm = { name: '', role: '', photo: '' };

const TeamAdmin = () => {
  const { data: team, loading } = useCollection('team');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toDelete, setToDelete] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => { setForm(emptyForm); setEditing({}); };
  const openEdit = (m) => { setForm({ name: m.name, role: m.role || '', photo: m.photo || '' }); setEditing(m); };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, photo: url }));
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
        await updateDoc(doc(db, 'team', editing.id), form);
      } else {
        await addDoc(collection(db, 'team'), form);
      }
      setEditing(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Could not save this team member — check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, 'team', toDelete.id));
    setToDelete(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>Team</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}>
          Add Team Member
        </Button>
      </Box>
      <Typography variant="body2" sx={{ color: '#9B9686', mb: 3 }}>
        Internal record only — not shown on the public site yet.
      </Typography>

      <Box sx={{ backgroundColor: '#1E2023', border: '1px solid #2E2A24', borderRadius: 2, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Photo', 'Name', 'Role', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ color: '#9B9686', fontWeight: 700, borderColor: '#2E2A24' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && team.length === 0 && (
              <TableRow><TableCell colSpan={4} sx={{ color: '#9B9686', borderColor: '#2E2A24' }}>No team members yet.</TableCell></TableRow>
            )}
            {team.map((m) => (
              <TableRow key={m.id}>
                <TableCell sx={{ borderColor: '#2E2A24' }}><Avatar src={m.photo} /></TableCell>
                <TableCell sx={{ color: '#fff', borderColor: '#2E2A24' }}>{m.name}</TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>{m.role}</TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <IconButton size="small" onClick={() => openEdit(m)} sx={{ color: '#9B9686' }}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => setToDelete(m)} sx={{ color: '#f87171' }}><Delete fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>{editing?.id ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <TextField label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          {form.photo && <Avatar src={form.photo} sx={{ width: 72, height: 72 }} />}
          <Button variant="outlined" component="label" disabled={uploading}>
            {uploading ? 'Uploading…' : form.photo ? 'Replace Photo' : 'Upload Photo'}
            <input type="file" accept="image/*" hidden onChange={handleUpload} />
          </Button>
          {uploading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving || uploading || !form.name}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>Remove "{toDelete?.name}" from the team?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Remove</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamAdmin;
