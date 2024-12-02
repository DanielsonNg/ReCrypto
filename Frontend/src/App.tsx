import { createTheme } from '@mui/material/styles';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import MemoryIcon from '@mui/icons-material/Memory';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CoinPage from './pages/CoinPage';
import CoinCategoryPage from './pages/CoinCategoryPage';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Cryptocurrencies',
    icon: <CurrencyBitcoinIcon />,
  },
  {
    segment: 'categories',
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
});

export default function DashboardLayoutBasic() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout sx={{ padding: '30px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/coin/:id' element={<CoinPage />} />
          <Route path='/categories' element={<CoinCategoryPage />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}
