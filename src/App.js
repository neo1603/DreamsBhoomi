import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Header from './components/Header';
import Hero from './components/Hero';
import HomeFeatures from './components/HomeFeatures';
import Projects from './components/Projects';
import FeaturedProperties from './components/FeaturedProperties';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsListPage from './pages/ProjectsListPage';
import PropertiesListPage from './pages/PropertiesListPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
import PageTransition from './components/PageTransition';
import FloatingContactButtons from './components/FloatingContactButtons';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ListingsAdmin from './pages/admin/ListingsAdmin';
import ListingForm from './pages/admin/ListingForm';
import EnquiriesAdmin from './pages/admin/EnquiriesAdmin';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import BannersAdmin from './pages/admin/BannersAdmin';
import CompanyDetailsAdmin from './pages/admin/CompanyDetailsAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import TeamAdmin from './pages/admin/TeamAdmin';
import { LanguageProvider } from './context/LanguageContext';
import { logEvent } from './firebase';

const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    logEvent('page_view', { page_path: location.pathname });
  }, [location.pathname]);
  return null;
};

// Lets header/footer links like "/#contact" work from any page — scrolls to
// the section once the target route has rendered.
const ScrollToHash = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    let attempts = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      attempts += 1;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    const initial = setTimeout(tryScroll, 50);

    return () => { cancelled = true; clearTimeout(initial); };
  }, [location.pathname, location.hash]);
  return null;
};

const PublicLayout = () => (
  <>
    <Header />
    <PageTransition />
    <MobileActionBar />
    <FloatingContactButtons />
    <Footer />
  </>
);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E2023', // card/panel dark
      light: '#2B2E33',
      dark: '#161719', // page background
      contrastText: '#E4D5C2',
    },
    secondary: {
      main: '#BCA78D', // muted tan accent — icons, borders, links
      light: '#D3C3AC',
      dark: '#855E3F', // button gradient base
      contrastText: '#241606',
    },
    background: {
      default: '#161719',
      paper: '#1E2023',
    },
    text: {
      primary: '#E4D5C2',
      secondary: '#9B9686',
    },
    success: {
      main: '#5C9E76', // Completed — kept distinct enough to read on dark
    },
    warning: {
      main: '#C2803E', // Ongoing
    },
    info: {
      main: '#6D93A8', // Upcoming
    },
    error: {
      main: '#e57373',
    },
    divider: '#2E2A24',
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '3.5rem',
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      fontSize: '2rem',
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: '0.875rem',
      lineHeight: 1.55,
    },
    button: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 10px 24px -16px rgba(0,0,0,0.5)',
          border: '1px solid #2E2A24',
          backgroundColor: '#1E2023',
          '&:hover': {
            boxShadow: '0px 14px 28px -14px rgba(0,0,0,0.6)',
            borderColor: '#BCA78D',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '@keyframes pageFadeIn': {
            from: { opacity: 0, transform: 'translateY(8px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="App">
              <AnalyticsTracker />
              <ScrollToHash />
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <HomeFeatures />
                        <Projects />
                        <FeaturedProperties />
                      </>
                    }
                  />
                  <Route path="/projects" element={<ProjectsListPage />} />
                  <Route path="/properties" element={<PropertiesListPage />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/property/:id" element={<ProjectDetail />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="projects" element={<ListingsAdmin category="Project" />} />
                  <Route path="projects/new" element={<ListingForm />} />
                  <Route path="projects/:id/edit" element={<ListingForm />} />
                  <Route path="properties" element={<ListingsAdmin category="Property" />} />
                  <Route path="properties/new" element={<ListingForm />} />
                  <Route path="properties/:id/edit" element={<ListingForm />} />
                  <Route path="enquiries" element={<EnquiriesAdmin />} />
                  <Route path="testimonials" element={<TestimonialsAdmin />} />
                  <Route path="banners" element={<BannersAdmin />} />
                  <Route path="company-details" element={<CompanyDetailsAdmin />} />
                  <Route path="analytics" element={<AnalyticsAdmin />} />
                  <Route path="settings" element={<SettingsAdmin />} />
                  <Route path="team" element={<TeamAdmin />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App; 