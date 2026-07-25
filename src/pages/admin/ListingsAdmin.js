import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell,
  TextField, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCollection } from '../../hooks/useCollection';

const ListingsAdmin = ({ category }) => {
  const { data: listings, loading } = useCollection('listings');
  const items = listings.filter((l) => l.category === category);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState(null);

  const basePath = category === 'Property' ? '/admin/properties' : '/admin/projects';
  const label = category === 'Property' ? 'Properties' : 'Projects';

  const filtered = items.filter((p) =>
    `${p.title} ${p.location}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!toDelete) return;
    await deleteDoc(doc(db, 'listings', toDelete.id));
    setToDelete(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>{label}</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate(`${basePath}/new`)}
          sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
        >
          Add {category}
        </Button>
      </Box>

      <TextField
        placeholder="Search by title or location…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2, width: 320, input: { color: '#fff' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2E2A24' } }}
      />

      <Box sx={{ backgroundColor: '#1E2023', border: '1px solid #2E2A24', borderRadius: 2, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Title', 'Location', 'Status', 'Price', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ color: '#9B9686', fontWeight: 700, borderColor: '#2E2A24' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && filtered.length === 0 && (
              <TableRow><TableCell colSpan={5} sx={{ color: '#9B9686', borderColor: '#2E2A24' }}>No {label.toLowerCase()} found.</TableCell></TableRow>
            )}
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ color: '#fff', borderColor: '#2E2A24' }}>{item.title}</TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>{item.location}</TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <Chip label={item.status} size="small" sx={{ backgroundColor: 'secondary.main', color: '#fff', fontWeight: 700 }} />
                </TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>{item.price}</TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <IconButton size="small" onClick={() => navigate(`${basePath}/${item.id}/edit`)} sx={{ color: '#9B9686' }}>
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setToDelete(item)} sx={{ color: '#f87171' }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>Delete "{toDelete?.title}"?</DialogTitle>
        <DialogContent>This cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListingsAdmin;
