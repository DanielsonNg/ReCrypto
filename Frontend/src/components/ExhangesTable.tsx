import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid2, Pagination, PaginationProps, TableHead, styled } from '@mui/material';
import { red, green } from '../lib/index'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import cg from '../assets/CG.png'
import { useNavigate } from 'react-router-dom';

type exchangeListsProps<data> = {
    exchanges: data[]
}

export default function ExchangesTable<T>({ exchanges }: exchangeListsProps<T>) {
    const [page, setPage] = React.useState(0);
    const [exchangePerPage, setRowsPerPage] = React.useState(25);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * exchangePerPage - exchanges.length) : 0;

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
                        <TableCell>exchange</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>24h</TableCell>
                        <TableCell>MarketCap</TableCell>
                        <TableCell>Volume 24h</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(exchangePerPage > 0
                        ? exchanges.slice(page * exchangePerPage, page * exchangePerPage + exchangePerPage)
                        : exchanges
                    ).map((exchange) => (
                        <TableRow key={exchange.id} sx={{ cursor: 'pointer' }} onClick={() => navigate(`/exchange/${exchange.id}`)}>
                            <TableCell component="th" scope="row" style={{ width: 10 }}>
                                {exchange.rank}
                            </TableCell>
                            <TableCell style={{ width: '30px' }} >
                                <Grid2 gap={'10px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={exchange.image} style={{ width: '30px', height: '30px' }} loading='lazy'></img>{exchange.name} &nbsp; <b>{exchange.symbol.toUpperCase()}</b>
                                </Grid2>
                            </TableCell>
                            <TableCell style={{ width: 30 }} >
                                {exchange.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                            </TableCell>
                            <TableCell style={{ width: 20, color: exchange.price24 < 0 ? red : exchange.marketCap24 === 0 ? '' : green }} >
                                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {exchange.price24.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%
                                    {exchange.price24 < 0 ? <TrendingDownIcon /> : exchange.price24 === 0 ? '-' : <TrendingUpIcon />}
                                </Grid2>
                            </TableCell>
                            <TableCell style={{ width: 50 }} >
                                {exchange.marketCap.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                            </TableCell>
                            <TableCell style={{ width: 20, color: exchange.marketCap24 < 0 ? red : exchange.marketCap24 === 0 ? '' : green }} >
                                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {exchange.marketCap24.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%
                                    {exchange.marketCap24 < 0 ? <TrendingDownIcon /> : exchange.marketCap24 === 0 ? '-' : <TrendingUpIcon />}
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
                                count={exchanges.length / exchangePerPage}
                                onChange={handleChange}
                            />
                        </TableCell>
                        <TableCell onClick={() => window.open('https://www.coingecko.com/en/api')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '150px', cursor: 'pointer' }} colSpan={1}> Powered by exchangeGecko  <img src={cg} loading='lazy' style={{ width: '30px' }} /></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >
    );
}
