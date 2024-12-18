import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid2, Pagination, PaginationProps, TableHead, styled } from '@mui/material';
import { Coin } from '../pages/LandingPage';
import { red, green } from '../lib/index'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import cg from '../assets/CG.png'
import { useNavigate } from 'react-router-dom';

type CoinListsProps = {
  coins: Coin[]
}

export default function CoinTable({ coins }: CoinListsProps) {
  const [page, setPage] = React.useState(0);
  const [coinPerPage, setRowsPerPage] = React.useState(25);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * coinPerPage - coins.length) : 0;

  const handleChange: PaginationProps['onChange'] = (event, value) => {
    setPage(value - 1);
  };

  const navigate = useNavigate()

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
            <TableRow key={coin.id} sx={{cursor:'pointer'}} onClick={()=> navigate(`/coin/${coin.id}`)}>
                <TableCell component="th" scope="row" style={{ width: 10 }}>
                  {coin.rank}
                </TableCell>
                <TableCell style={{ width: '30px' }} >
                  <Grid2 gap={'10px'} sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={coin.image} style={{ width: '30px', height: '30px' }} loading='lazy'></img>{coin.name} &nbsp; <b>{coin.symbol.toUpperCase()}</b>
                  </Grid2>
                </TableCell>
                <TableCell style={{ width: 30 }} >
                  {coin.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                </TableCell>
                <TableCell style={{ width: 20, color: coin.price24 < 0 ? red : coin.marketCap24 === 0 ? '' : green }} >
                  <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                    {coin.price24.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%
                    {coin.price24 < 0 ? <TrendingDownIcon /> : coin.price24 === 0 ? '-' : <TrendingUpIcon />}
                  </Grid2>
                </TableCell>
                <TableCell style={{ width: 50 }} >
                  {coin.marketCap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                </TableCell>
                <TableCell style={{ width: 20, color: coin.marketCap24 < 0 ? red : coin.marketCap24 === 0 ? '' : green }} >
                  <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                    {coin.marketCap24.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%
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
            <TableCell align='right' width={'100%'} colSpan={5}>
              <Pagination
                sx={{
                  display: 'flex', justifyContent: 'center'
                }}
                count={coins.length / coinPerPage}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell onClick={()=> window.open('https://www.coingecko.com/en/api')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '150px', cursor:'pointer' }} colSpan={1}> Powered by CoinGecko  <img src={cg} loading='lazy' style={{ width: '30px' }} /></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer >
  );
}
