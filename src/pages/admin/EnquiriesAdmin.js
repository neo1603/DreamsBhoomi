import React from 'react';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Chip, IconButton, Tooltip } from '@mui/material';
import { Phone, Email, WhatsApp, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useCollection } from '../../hooks/useCollection';

const formatDate = (timestamp) => {
  if (!timestamp?.seconds) return '—';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const EnquiriesAdmin = () => {
  const { data: leads, loading } = useCollection('leads');
  const sorted = [...leads].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

  const toggleStatus = async (lead) => {
    await updateDoc(doc(db, 'leads', lead.id), {
      status: lead.status === 'Contacted' ? 'New' : 'Contacted',
    });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 3 }}>Enquiries</Typography>

      <Box sx={{ backgroundColor: '#1E2023', border: '1px solid #2E2A24', borderRadius: 2, overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Name', 'Contact', 'Subject', 'Date', 'Status', 'Actions'].map((h) => (
                <TableCell key={h} sx={{ color: '#9B9686', fontWeight: 700, borderColor: '#2E2A24' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && sorted.length === 0 && (
              <TableRow><TableCell colSpan={6} sx={{ color: '#9B9686', borderColor: '#2E2A24' }}>No enquiries yet.</TableCell></TableRow>
            )}
            {sorted.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell sx={{ color: '#fff', borderColor: '#2E2A24' }}>{lead.name}</TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>
                  <Box>{lead.phone}</Box>
                  <Box sx={{ fontSize: '0.8rem', color: '#9B9686' }}>{lead.email}</Box>
                </TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24', maxWidth: 240 }}>
                  {lead.subject}
                  <Box sx={{ fontSize: '0.8rem', color: '#9B9686' }}>{lead.message?.slice(0, 80)}</Box>
                </TableCell>
                <TableCell sx={{ color: '#C4B7A5', borderColor: '#2E2A24' }}>{formatDate(lead.createdAt)}</TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <Chip
                    label={lead.status === 'Contacted' ? 'Contacted' : 'New'}
                    size="small"
                    icon={lead.status === 'Contacted' ? <CheckCircle /> : <RadioButtonUnchecked />}
                    onClick={() => toggleStatus(lead)}
                    sx={{
                      backgroundColor: lead.status === 'Contacted' ? '#2F8F5B' : 'secondary.main',
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderColor: '#2E2A24' }}>
                  <Tooltip title="Call">
                    <IconButton size="small" href={`tel:${lead.phone}`} sx={{ color: '#9B9686' }}><Phone fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="Email">
                    <IconButton size="small" href={`mailto:${lead.email}`} sx={{ color: '#9B9686' }}><Email fontSize="small" /></IconButton>
                  </Tooltip>
                  <Tooltip title="WhatsApp">
                    <IconButton size="small" href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" sx={{ color: '#9B9686' }}>
                      <WhatsApp fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default EnquiriesAdmin;
