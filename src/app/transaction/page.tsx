'use client'

import styles from "../page.module.css";
import Topbar from '@/components/Topbar';
import Bot from '@/components/Bot';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { 
    Grid,
    Box,
    Tab,
    Tabs,
    Typography,
    Button,
    Chip,
    Divider,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Stack 
} from "@mui/material";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomTabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            sx={{ height: "100%"}}
        >
            {value === index && (
                <Box sx={{ p: 3, height: "100%" }} key={index}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Promo() {
    const [value, setValue] = useState<number>(0);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [arrList, setArrList] = useState([]);
    const [dateFrom, setDateFrom] = useState<Dayjs | null | undefined>()
    const [dateTo, setDateTo] = useState<Dayjs | null | undefined>()
    const [dateOpen, setDateOpen] = useState<boolean>(true);
    const [arrList2, setArrList2] = useState([]);
    const [date, setDate] = useState<Dayjs | null | undefined>(dayjs(new Date()));
    const [amount, setAmount] = useState<string>('');
    const [IsCashIn, setIsCashIn] = useState<string>('');
    const [channel, setChannel] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);

        if(newValue === 1) {
            WithdrawalCode()
        }
    };

    const handleChangeTrans = (e: any) => {
        e.preventDefault()
        setOpen(true)
        axios.post('/api/transaction', {
            "dateFrom": `${dayjs(dateFrom).format('M/DD/YYYY')} 6:00:00 AM`,
            "dateTo": `${dayjs(dateTo).format('M/DD/YYYY')} 5:59:59 AM`,
            "username": "sidlesss"
        }).then((response: any) => {
            setOpen(false)
            setArrList(response.data.data)
            toast.success("Successfully fetch data!", { position: 'bottom-center' })
        }).catch((err) => {
            toast.error("Internal Server Error", { position: 'bottom-center' })
            setOpen(false)
        })
    }

    const handleClickView = (e: any, game: string, date: any, tranSource: string, IsCashIn: string, amount: string, status: string, TranMode: string) => {
        e.preventDefault()
        setDialogOpen(true)
        setDate(date)
        setType(tranSource)
        setIsCashIn(IsCashIn)
        setAmount(amount)
        setStatus(status)
        setChannel(TranMode)
    }

    const WithdrawalCode = async () => {
        setOpen(true)
        await axios.post('/api/withdrawal/request-code', {
            guestExtId: 13278
        }).then((response: any) => {
            setOpen(false)
            setArrList2(response.data.data)
            toast.success("Successfully fetch withdrawal request data!", { position: 'bottom-center' })
        }).catch((err) => {
            toast.error("Internal Server Error", { position: 'bottom-center' })
            setOpen(false)
        })
    }

    return(
        <main className={styles.container}>
            <Topbar title={'Transactions'} />
            <Box sx={{ height: "100%" }}>
                <Grid container justifyContent='center'>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Cash Transaction" {...a11yProps(0)} />
                        <Tab label="Withdrawal Request" {...a11yProps(1)} />
                    </Tabs>
                </Grid>
                <CustomTabPanel value={value} index={0}>
                    <Stack direction="column" sx={{ height: "100%", pb: 18 }}>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Typography align="left">Filter by Date: </Typography>
                                <Grid container direction='row' justifyContent='space-around' sx={{ pt: 2 }}>
                                    <DatePicker sx={{ width: '47%' }} value={dateFrom} onChange={(newValue: any) => {
                                        setDateOpen(false)
                                        setDateFrom(dayjs(newValue.$d))
                                    }}/>
                                    <Typography align='center' sx={{ mt: 2 }}>to</Typography>
                                    <DatePicker sx={{ width: '47%' }} value={dateTo} disabled={dateOpen} onChange={(newValue2: any) => {
                                        setDateTo(dayjs(newValue2.$d))
                                    }}/>
                                </Grid>
                                <Button variant="contained" sx={{ mt: 1 }} fullWidth onClick={(e) => handleChangeTrans(e)}>Generate</Button>
                            </LocalizationProvider>
                        </Box>
                        <TableContainer component={Paper} sx={{ my: 2, overflow: "scroll", maxHeight: "100vh"}}>
                            <Table>
                                <TableBody>
                                    {arrList.length > 0 ? 
                                    <>
                                        {arrList.map((res: any, index: any) => {
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Typography sx={{ fontSize: '14px' }}>{res.SupplierName[0]}</Typography>
                                                        <Typography sx={{ fontSize: '12px' }}>
                                                            {`${res.DateCreated[0].split("T")[0]} ${res.DateCreated[0].split("T")[1].split("+")[0]}`}
                                                        </Typography>
                                                        <Chip sx={{ mt: 0.7 }} label={res.TranSource[0] === "1" ? 'Transfer' : res.IsCashIn[0] === '1' ? 'Deposit' : 'Withdraw'} color={res.TranSource[0] === "1" ? 'primary' : res.IsCashIn[0] === '1' ? 'success' : 'secondary'} size="small" />
                                                        <Chip sx={{ mt: 0.7, mx: 1}} label={res.IsPosted[0] === "1" ? "Posted" : 'Unposted'} color={res.IsPosted[0] === "1" ? 'primary' : 'secondary'} size="small" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography sx={{ fontSize: '14px' }}>{parseFloat(res.Amount[0]).toFixed(2)}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton aria-label="view">
                                                            <MoreHorizIcon onClick={(e) => handleClickView(e, res.SupplierName[0], res.DateCreated[0], res.TranSource[0], res.IsCashIn[0], res.Amount[0], res.IsPosted[0], res.TranMode[0])} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <TableRow>
                                            <TableCell align='center' colSpan={2}>No record</TableCell>
                                        </TableRow>
                                    </>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer> 
                    </Stack>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <TableContainer component={Paper} sx={{ width: '100%', overflow: 'scroll', maxHeight: "100vh", pb: 25 }}>
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    arrList2.length > 0 ?
                                    <>
                                    {
                                        arrList2.map((res: any, index: any) => {
                                            return(
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {`${res.DateCreated[0].split("T")[0]} ${res.DateCreated[0].split("T")[1].split(".")[0]}`}
                                                    </TableCell>
                                                    <TableCell>
                                                        {res.RequestCode[0]}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip 
                                                            label={
                                                                res.RequestCode[0].split("T")[0] === dayjs(new Date()).format("YYYY-MM-DD") ?
                                                                res.IsCompleted[0] === "1" ? 'Completed' : 'Pending'
                                                                :
                                                                res.IsCompleted[0] === "1" ? 'Completed' : 'Expired'
                                                            } 
                                                            size="small"
                                                            color={res.IsCompleted[0] === "1" ? 'success' : 'secondary'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                    </> :
                                    <>
                                        <TableRow>
                                            <TableCell align='center' colSpan={3}>No record</TableCell>
                                        </TableRow>
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomTabPanel>
                <Dialog
                    fullWidth
                    open={dialogOpen}
                    maxWidth="xs"
                >
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: '14px' }}>Date & Time</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{`${dayjs(date).format('LLL')}`}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: '14px' }}>Amount</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{parseFloat(amount).toFixed(2)}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: '14px' }}>Channel</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{channel === '1' ? 'Cash' : channel === '2' ? 'PSP-Maya' : channel === '3' ? 'PSP-Fortune Pay' : ''}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: '14px' }}>Transaction Type</Typography>
                            <Typography sx={{ fontSize: '14px' }}>{type === "1" ? 'Transfer': IsCashIn === '1' ? 'Deposit' : 'Withdraw'}</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography sx={{ fontSize: '14px' }}>Status</Typography>
                            <Typography sx={{ fontSize: '14px' }} color={status === '1' ? 'primary' : 'secondary'}>{status === '1' ? 'Posted' : 'Unposted'}</Typography>
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button fullWidth variant="contained" onClick={() => setDialogOpen(false)}>Okay</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <ToastContainer />
            <Loading open={open} />
            <Bot val={2} />
        </main>
    )
}