import { createTheme } from '@mui/material/styles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import MemoryIcon from '@mui/icons-material/Memory';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { Outlet } from 'react-router-dom';

const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Cryptocurrencies',
    icon: <CurrencyBitcoinIcon />,
  },
  {
    segment: 'exchanges',
    title: 'Coin Categories',
    icon: <CurrencyExchangeIcon />,
  },
  {
    segment: 'nfts',
    title: 'NFT',
    icon: <MemoryIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent !important', // Ensure no background on selection
            color: 'inherit', // Retain default text color
          },
          '&:hover': {
            backgroundColor: 'transparent', // No hover background
            color: 'inherit', // Prevent text color change on hover
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent !important', // Ensure no background on selection
            color: 'inherit',
          },
          '&:hover': {
            backgroundColor: 'transparent', // No hover background globally
            color: 'inherit', // Prevent text color change on hover
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'inherit', // Remove default blue color for the icons
          '&.Mui-selected': {
            color: 'inherit !important', // Ensure no blue for selected icons
          },
          '&:hover': {
            color: 'inherit', // Prevent icon color change on hover
          },
        },
      },
    },
  },
});

export default function DashboardLayoutBasic() {
  const BRANDING = {
    title: 'Crypto Tracker',
  };

  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING} theme={demoTheme}>
      <Outlet />
    </AppProvider>
  );
}
