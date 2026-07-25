import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Slider,
  Grid,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const formatINR = (num) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(num));

const LoanCalculator = () => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(15);

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emiValue =
      monthlyRate === 0
        ? amount / months
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const total = emiValue * months;
    return {
      emi: emiValue,
      totalInterest: total - amount,
      totalPayment: total,
    };
  }, [amount, rate, tenure]);

  return (
    <Box id="loan-calculator" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1 }}
        >
          {t('calc_title')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400, maxWidth: 700 }}>
          {t('calc_subtitle')}
        </Typography>

        <Box
          sx={{
            borderRadius: 5,
            border: '1px solid #2E2A24',
            backgroundColor: 'background.paper',
            boxShadow: '0px 12px 28px -18px rgba(0,0,0,0.5)',
            p: { xs: 3, md: 5 },
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>{t('calc_amount')}</Typography>
                  <Typography sx={{ fontWeight: 700, color: 'secondary.main', fontVariantNumeric: 'tabular-nums' }}>
                    ₹{formatINR(amount)}
                  </Typography>
                </Box>
                <Slider
                  value={amount}
                  onChange={(e, v) => setAmount(v)}
                  min={500000}
                  max={20000000}
                  step={100000}
                  sx={{ color: 'text.primary' }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>{t('calc_rate')}</Typography>
                  <Typography sx={{ fontWeight: 700, color: 'secondary.main', fontVariantNumeric: 'tabular-nums' }}>
                    {rate.toFixed(1)}%
                  </Typography>
                </Box>
                <Slider
                  value={rate}
                  onChange={(e, v) => setRate(v)}
                  min={6}
                  max={14}
                  step={0.1}
                  sx={{ color: 'text.primary' }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>{t('calc_tenure')}</Typography>
                  <Typography sx={{ fontWeight: 700, color: 'secondary.main', fontVariantNumeric: 'tabular-nums' }}>
                    {tenure} {t('calc_years')}
                  </Typography>
                </Box>
                <Slider
                  value={tenure}
                  onChange={(e, v) => setTenure(v)}
                  min={1}
                  max={30}
                  step={1}
                  sx={{ color: 'text.primary' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  backgroundColor: 'primary.dark',
                  color: 'white',
                  borderRadius: 4,
                  p: 3.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>
                  {t('calc_monthly_emi')}
                </Typography>
                <Typography
                  sx={{ fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, fontSize: '2.2rem', color: 'secondary.light', mb: 3, fontVariantNumeric: 'tabular-nums' }}
                >
                  ₹{formatINR(emi)}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{t('calc_principal')}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>₹{formatINR(amount)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{t('calc_total_interest')}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>₹{formatINR(totalInterest)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{t('calc_total_payment')}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>₹{formatINR(totalPayment)}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2 }}>
          {t('calc_disclaimer')}
        </Typography>
      </Container>
    </Box>
  );
};

export default LoanCalculator;
