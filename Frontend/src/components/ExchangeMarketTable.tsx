import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid2, Pagination, PaginationProps, TableHead } from '@mui/material';
import cg from '../assets/CG.png'
import { useNavigate } from 'react-router-dom';
import { Market } from '../pages/ExchangePage';

type marketProps = {
    markets: Market[]
}

export default function ExchangeMarketTable({ markets }: marketProps) {
    const [page, setPage] = React.useState(0);
    const [marketPerPage, setRowsPerPage] = React.useState(25);

    const handleChange: PaginationProps['onChange'] = (event, value) => {
        setPage(value - 1);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * marketPerPage - markets.length) : 0;

    const navigate = useNavigate()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Coin</TableCell>
                        <TableCell>Pair</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(marketPerPage > 0
                        ? markets.slice(page * marketPerPage, page * marketPerPage + marketPerPage)
                        : markets
                    ).map((market, index) => (
                        <TableRow key={index} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/coin/${market.coin_id}`)}>
                            <TableCell component="th" scope="row" style={{ width: 10 }}>
                                {index+1}
                            </TableCell>
                            <TableCell style={{ width: '30px' }} >
                                <Grid2 gap={'10px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {market.base}
                                </Grid2>
                            </TableCell>
                            <TableCell style={{ width: '30px' }} >
                                <Grid2 gap={'10px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {market.target? market.target : ' ' }
                                </Grid2>
                            </TableCell>
                            <TableCell style={{ width: 30 }} >
                                {market.last.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                            </TableCell>
                            <TableCell>
                                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>$
                                    {market.volume.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
                                count={markets.length / marketPerPage}
                                onChange={handleChange}
                            />
                        </TableCell>
                        <TableCell onClick={() => window.open('https://www.coingecko.com/en/api')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '150px', cursor: 'pointer' }} colSpan={1}> Powered by marketGecko  <img src={cg} loading='lazy' style={{ width: '30px' }} /></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
}
