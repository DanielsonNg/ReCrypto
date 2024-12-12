import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid2, Pagination, PaginationProps, TableHead, styled } from '@mui/material';
import cg from '../assets/CG.png'
import { useNavigate } from 'react-router-dom';
import { Exchange } from '../pages/CoinExchangesPage';

type ExchangeProps = {
    exchanges: Exchange[]
}

export default function ExchangesTable({ exchanges }: ExchangeProps) {
    const [page, setPage] = React.useState(0);
    const [exchangePerPage, setRowsPerPage] = React.useState(25);

    const handleChange: PaginationProps['onChange'] = (event, value) => {
        setPage(value - 1);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * exchangePerPage - exchanges.length) : 0;

    const navigate = useNavigate()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>exchange</TableCell>
                        <TableCell>Trust</TableCell>
                        <TableCell>24 Volume</TableCell>
                        <TableCell>24 Volume (Normalized)</TableCell>
                        <TableCell>Year Established</TableCell>
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
                                    <img src={exchange.image} style={{ width: '30px', height: '30px' }} loading='lazy'></img>{exchange.name}
                                </Grid2>
                            </TableCell>
                            <TableCell style={{ width: 30 }} >
                                {exchange.trust} / 10
                            </TableCell>
                            <TableCell>
                                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>$
                                    {exchange.volume24.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                </Grid2>
                            </TableCell>
                            <TableCell>
                                <Grid2 columnGap={'5px'} sx={{ display: 'flex', alignItems: 'center' }}>
                                    {exchange.volume24normalized.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}$
                                </Grid2>
                            </TableCell>
                            <TableCell>
                                <Grid2>
                                    {exchange.year}
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
