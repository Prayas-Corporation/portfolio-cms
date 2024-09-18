import Link from 'next/link';
import { Box, BottomNavigation, BottomNavigationAction, IconButton, AppBar, Toolbar, Typography, Switch } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Brightness4, Brightness7 } from '@mui/icons-material';
import { CssBaseline } from '@mui/material';

// Light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function CMSLayout({ children }: any) {
  const [darkMode, setDarkMode] = useState(true);
  const [value, setValue] = useState(0);
  const isLargeScreen = useMediaQuery('(min-width:700px)'); // Detect screen size greater than 700px

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const storedPreference = localStorage.getItem('theme');
    if (storedPreference) {
      setDarkMode(storedPreference === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navItems = [
    { label: 'Hero', icon: <HomeIcon />, href: '/cms/hero' },
    { label: 'Summary', icon: <InfoIcon />, href: '/cms/summary' },
    { label: 'Work', icon: <WorkIcon />, href: '/cms/work' },
    { label: 'Education', icon: <SchoolIcon />, href: '/cms/education' },
    { label: 'Skills', icon: <CodeIcon />, href: '/cms/skills' },
    { label: 'Projects', icon: <AccountTreeIcon />, href: '/cms/projects' },
    { label: 'Certificates', icon: <EmojiEventsIcon />, href: '/cms/hackathons' },
    { label: 'Contact', icon: <ContactMailIcon />, href: '/cms/contact' },
  ];

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* AppBar with Dark Mode Toggle */}
        <AppBar position="sticky" sx={{ padding: '0.5rem', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">CMS</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Switch checked={darkMode} onChange={toggleDarkMode} />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Conditional Navigation Rendering */}
        {isLargeScreen ? (
          // BottomNavigation for larger screens
          <BottomNavigation
  value={value}
  onChange={(event, newValue) => setValue(newValue)}
  showLabels
  sx={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: darkMode ? '#424242' : '#f5f5f5',
    zIndex: (theme) => theme.zIndex.appBar + 1, // Add zIndex for larger screens
  }}
>
 

            {navItems.map((item, index) => (
              <BottomNavigationAction
                key={index}
                label={item.label}
                icon={item.icon}
                component={Link}
                href={item.href}
              />
            ))}
          </BottomNavigation>
        ) : (
          // Flexbox solution for smaller screens
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: darkMode ? '#424242' : '#f5f5f5',
              zIndex: 1300,
              overflowX: 'auto', // Enable horizontal scrolling
              whiteSpace: 'nowrap', // Prevent items from wrapping
              display: 'flex',
              alignItems: 'center',
              scrollbarWidth: 'thin', // Add scrollbar for WebKit and Firefox
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: darkMode ? '#888' : '#ccc',
                borderRadius: '8px',
              },
            }}
          >
            {navItems.map((item, index) => (
              <Box key={index} sx={{ display: 'inline-block', textAlign: 'center', minWidth: '80px', mx: 1 }}>
                <Link href={item.href} passHref>
                  <IconButton color="primary">
                    {item.icon}
                  </IconButton>
                </Link>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Main Content */}
        <Box component="main" sx={{ padding: '1rem', mt: 4 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
