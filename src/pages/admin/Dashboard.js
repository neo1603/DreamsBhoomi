import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Button, Chip, Alert, Avatar } from '@mui/material';
import { Add, Apartment, Image as ImageIcon, Inbox } from '@mui/icons-material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { db } from '../../firebase';
import { useCollection } from '../../hooks/useCollection';
import { projects as staticProjects } from '../../data/projects';
import { properties as staticProperties } from '../../data/properties';
import { staticTestimonials } from '../../components/Testimonials';

const StatCard = ({ label, value, sub }) => (
  <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24' }}>
    <Typography variant="body2" sx={{ color: '#9B9686', mb: 1 }}>{label}</Typography>
    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>{value}</Typography>
    {sub && <Typography variant="caption" sx={{ color: '#9B9686' }}>{sub}</Typography>}
  </Paper>
);

const QuickAction = ({ label, icon, color, to }) => (
  <Button
    component={RouterLink}
    to={to}
    startIcon={icon}
    sx={{
      flex: 1,
      py: 1.5,
      backgroundColor: color,
      color: '#fff',
      fontWeight: 700,
      '&:hover': { backgroundColor: color, opacity: 0.9 },
    }}
  >
    {label}
  </Button>
);

const Dashboard = () => {
  const { data: listings } = useCollection('listings');
  const { data: leads } = useCollection('leads');
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  const projects = listings.filter((l) => l.category === 'Project');
  const properties = listings.filter((l) => l.category === 'Property');
  const ongoing = projects.filter((p) => p.status === 'ONGOING').length;
  const upcoming = projects.filter((p) => p.status === 'UPCOMING').length;
  const completed = projects.filter((p) => p.status === 'COMPLETED').length;
  const newLeads = leads.filter((l) => l.status !== 'Contacted').length;
  const recentLeads = [...leads]
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5);

  // Real data only — see project memory on why this isn't a fabricated
  // "Visitors" chart: Firebase Analytics traffic isn't queryable client-side
  // without a paid backend, so we chart actual enquiry volume instead.
  const enquiriesByDay = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const count = leads.filter((l) => {
        if (!l.createdAt?.seconds) return false;
        return new Date(l.createdAt.seconds * 1000).toISOString().slice(0, 10) === dayKey;
      }).length;
      days.push({ date: label, count });
    }
    return days;
  }, [leads]);

  const statusBreakdown = useMemo(() => {
    const counts = { AVAILABLE: 0, SOLD: 0, BOOKED: 0 };
    properties.forEach((p) => { if (counts[p.status] !== undefined) counts[p.status] += 1; });
    return [
      { name: 'Available', value: counts.AVAILABLE, color: '#2F8F5B' },
      { name: 'Sold', value: counts.SOLD, color: '#9B9686' },
      { name: 'Booked', value: counts.BOOKED, color: '#BCA78D' },
    ];
  }, [properties]);
  const totalProperties = statusBreakdown.reduce((sum, s) => sum + s.value, 0);

  const recentlyAdded = [...listings]
    .filter((l) => l.createdAt?.seconds)
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    .slice(0, 5);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      for (const project of staticProjects) {
        const { id, ...rest } = project;
        await addDoc(collection(db, 'listings'), { ...rest, createdAt: serverTimestamp() });
      }
      for (const property of staticProperties) {
        const { id, ...rest } = property;
        await addDoc(collection(db, 'listings'), { ...rest, createdAt: serverTimestamp() });
      }
      for (const testimonial of staticTestimonials) {
        const { id, ...rest } = testimonial;
        await addDoc(collection(db, 'testimonials'), rest);
      }
      setSeedDone(true);
    } catch (err) {
      console.error('Seeding failed:', err);
      alert('Seeding failed — check the console for details.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 4 }}>Dashboard</Typography>

      {listings.length === 0 && (
        <Alert
          severity="info"
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" size="small" onClick={handleSeed} disabled={seeding || seedDone}>
              {seedDone ? 'Done' : seeding ? 'Importing…' : 'Import now'}
            </Button>
          }
        >
          No listings in the database yet. Import the {staticProjects.length} existing projects, {staticProperties.length} sample properties, and {staticTestimonials.length} testimonials to get started — this only needs to run once.
        </Alert>
      )}

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Projects" value={projects.length} sub={`${ongoing} ongoing · ${upcoming} upcoming · ${completed} completed`} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Properties" value={properties.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Enquiries" value={leads.length} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="New Enquiries" value={newLeads} sub="not yet marked contacted" />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Enquiries Overview</Typography>
            <Typography variant="caption" sx={{ color: '#9B9686', display: 'block', mb: 1 }}>Last 30 days · actual leads received</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={enquiriesByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2A24" />
                <XAxis dataKey="date" stroke="#9B9686" tick={{ fontSize: 11 }} interval={4} />
                <YAxis stroke="#9B9686" tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#161719', border: '1px solid #2E2A24', color: '#fff' }} />
                <Line type="monotone" dataKey="count" stroke="#BCA78D" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Property Status</Typography>
            <Box sx={{ position: 'relative' }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusBreakdown} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2}>
                    {statusBreakdown.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#161719', border: '1px solid #2E2A24', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>{totalProperties}</Typography>
                <Typography variant="caption" sx={{ color: '#9B9686' }}>Total</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
              {statusBreakdown.map((s) => (
                <Box key={s.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: s.color }} />
                  <Typography variant="caption" sx={{ color: '#C4B7A5' }}>{s.name} ({s.value})</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Recent Enquiries</Typography>
            {recentLeads.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#9B9686' }}>No enquiries yet.</Typography>
            ) : (
              recentLeads.map((lead) => (
                <Box key={lead.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid #2E2A24' }}>
                  <Box>
                    <Typography sx={{ color: '#fff', fontWeight: 600 }}>{lead.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#9B9686' }}>{lead.subject || lead.message?.slice(0, 60)}</Typography>
                  </Box>
                  <Chip
                    label={lead.status === 'Contacted' ? 'Contacted' : 'New'}
                    size="small"
                    sx={{ backgroundColor: lead.status === 'Contacted' ? '#2F8F5B' : 'secondary.main', color: '#fff', fontWeight: 700 }}
                  />
                </Box>
              ))
            )}
            {leads.length > 0 && (
              <Button component={RouterLink} to="/admin/enquiries" sx={{ mt: 2, color: 'secondary.light' }}>
                View All Enquiries →
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24', height: '100%' }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Recently Added</Typography>
            {recentlyAdded.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#9B9686' }}>Nothing added yet.</Typography>
            ) : (
              recentlyAdded.map((item, i) => (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25, borderBottom: '1px solid #2E2A24' }}>
                  <Typography sx={{ color: '#9B9686', fontWeight: 700, width: 18 }}>{i + 1}</Typography>
                  <Avatar variant="rounded" src={item.image} sx={{ width: 36, height: 28 }} />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</Typography>
                    <Typography variant="caption" sx={{ color: '#9B9686' }}>{item.category} · {item.location}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <QuickAction label="Add Project" icon={<Add />} color="#BCA78D" to="/admin/projects/new" />
        <QuickAction label="Add Property" icon={<Apartment />} color="#6D5BD0" to="/admin/properties/new" />
        <QuickAction label="Add Banner" icon={<ImageIcon />} color="#855E3F" to="/admin/banners" />
        <QuickAction label="View Enquiries" icon={<Inbox />} color="#DC2626" to="/admin/enquiries" />
      </Box>
    </Box>
  );
};

export default Dashboard;
