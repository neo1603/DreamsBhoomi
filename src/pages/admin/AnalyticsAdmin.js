import React, { useMemo } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { useCollection } from '../../hooks/useCollection';

const donutColors = ['#BCA78D', '#3B6E91', '#2F8F5B', '#9B9686'];

const Donut = ({ title, data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24', height: '100%' }}>
      <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>{title}</Typography>
      <Box sx={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2}>
              {data.map((entry, i) => <Cell key={entry.name} fill={donutColors[i % donutColors.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#161719', border: '1px solid #2E2A24', color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>{total}</Typography>
          <Typography variant="caption" sx={{ color: '#9B9686' }}>Total</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
        {data.map((d, i) => (
          <Box key={d.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: donutColors[i % donutColors.length] }} />
            <Typography variant="caption" sx={{ color: '#C4B7A5' }}>{d.name} ({d.value})</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const AnalyticsAdmin = () => {
  const { data: listings } = useCollection('listings');
  const { data: leads } = useCollection('leads');

  const projects = listings.filter((l) => l.category === 'Project');
  const properties = listings.filter((l) => l.category === 'Property');

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

  const byStatus = (items, statuses) => statuses.map((s) => ({ name: s, value: items.filter((i) => i.status === s).length }));
  const projectStatus = byStatus(projects, ['ONGOING', 'UPCOMING', 'COMPLETED']);
  const propertyStatus = byStatus(properties, ['AVAILABLE', 'BOOKED', 'SOLD']);

  const typeCounts = useMemo(() => {
    const counts = {};
    listings.forEach((l) => { if (l.type) counts[l.type] = (counts[l.type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [listings]);

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>Analytics</Typography>
      <Typography variant="body2" sx={{ color: '#9B9686', mb: 3 }}>
        Real numbers from your own data — enquiry volume and listing breakdowns. We don't show fabricated
        website-traffic figures here, since that requires a paid analytics backend we don't have wired up.
      </Typography>

      <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24', mb: 3 }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Enquiries — Last 30 Days</Typography>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={enquiriesByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2E2A24" />
            <XAxis dataKey="date" stroke="#9B9686" tick={{ fontSize: 11 }} interval={4} />
            <YAxis stroke="#9B9686" tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: '#161719', border: '1px solid #2E2A24', color: '#fff' }} />
            <Line type="monotone" dataKey="count" stroke="#BCA78D" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Donut title="Projects by Status" data={projectStatus} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Donut title="Properties by Status" data={propertyStatus} />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, backgroundColor: '#1E2023', border: '1px solid #2E2A24' }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>Listings by Type</Typography>
        {typeCounts.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#9B9686' }}>No listings yet.</Typography>
        ) : (
          typeCounts.map((t) => (
            <Box key={t.name} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
              <Typography variant="body2" sx={{ color: '#C4B7A5', width: 160 }}>{t.name}</Typography>
              <Box sx={{ flexGrow: 1, height: 8, backgroundColor: '#2E2A24', borderRadius: 4, overflow: 'hidden' }}>
                <Box sx={{ width: `${(t.value / listings.length) * 100}%`, height: '100%', backgroundColor: 'secondary.main' }} />
              </Box>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, width: 24, textAlign: 'right' }}>{t.value}</Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default AnalyticsAdmin;
