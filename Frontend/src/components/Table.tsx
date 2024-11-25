import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Grid2, Pagination, PaginationProps, TableHead, styled } from '@mui/material';
import { Coin } from '../pages/LandingPage';
import { red, green } from '../lib/index'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

type CoinListsProps = {
  coins: Coin[]
}

// export default function CoinTable({}: CoinListsProps) {
export default function CoinTable({ coins }: CoinListsProps) {
  const [page, setPage] = React.useState(0);
  const [coinPerPage, setRowsPerPage] = React.useState(25);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * coinPerPage - coins.length) : 0;

  const handleChange: PaginationProps['onChange'] = (event, value) => {
    setPage(value - 1);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>24h</TableCell>
            <TableCell>MarketCap</TableCell>
            <TableCell>Volume 24h</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(coinPerPage > 0
            ? coins.slice(page * coinPerPage, page * coinPerPage + coinPerPage)
            : coins
          ).map((coin) => (
            <TableRow key={coin.id}>
              <TableCell component="th" scope="row" style={{ width: 10 }}>
                {coin.rank}
              </TableCell>
              <TableCell style={{ width: '30px' }} >
                <Grid2 gap={'10px'} sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={coin.image} style={{ width: '30px', height: '30px' }} loading='lazy'></img>{coin.name} &nbsp; <b>{coin.symbol.toUpperCase()}</b>
                </Grid2>
              </TableCell>
              <TableCell style={{ width: 30 }} >
                {coin.price.toFixed(2)}$
              </TableCell>
              <TableCell style={{ width: 20, color: coin.price24 < 0 ? red : coin.marketCap24 === 0 ? '' : green }} >
                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                  {coin.price24.toFixed(2)}%
                  {coin.price24 < 0 ? <TrendingDownIcon /> : coin.price24 === 0 ? '-' : <TrendingUpIcon />}
                </Grid2>
              </TableCell>
              <TableCell style={{ width: 50 }} >
                {coin.marketCap}$
              </TableCell>
              <TableCell style={{ width: 20, color: coin.marketCap24 < 0 ? red : coin.marketCap24 === 0 ? '' : green }} >
                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                  {coin.marketCap24.toFixed(2)}%
                  {coin.marketCap24 < 0 ? <TrendingDownIcon /> : coin.marketCap24 === 0 ? '-' : <TrendingUpIcon />}
                </Grid2>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align='right' width={'100%'} colSpan={6}>
              <Pagination
                sx={{
                  display: 'flex', justifyContent: 'center'
                }}
                count={coins.length / coinPerPage}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer >
  );
}
