'use client'

import React, { useState, useEffect } from 'react'
import {
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Button,
    Toolbar,
    Divider,
    Typography,
    IconButton,
    Autocomplete,
    Accordion,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
} from '@mui/material';
import { ExpandMoreSharp } from '@mui/icons-material';
import styles from "../page.module.css";
import Top from '@/components/Top';
import Bot from '@/components/Bot';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import Caleta from '@/assets/games/caleta.png'
import Vibra from '@/assets/games/vibra.png'
import Zitro from '@/assets/games/zitro.png'
import BFGames from '@/assets/games/bf_games.png'
import Tomhorn from '@/assets/games/tomhorn.png'
import Cosmo from '@/assets/games/cosmo_gaming.png'
import Evo from '@/assets/games/evolution.png'
import BTG from '@/assets/games/big_time_gaming.png'
import NLC from '@/assets/games/no_limit_city.png'
import NetEnt from '@/assets/games/netent.png'
import RedTiger from '@/assets/games/red_tiger.png'
import RTG from '@/assets/games/realtime_gaming.png'
import SimplePlay from '@/assets/games/simpleplay.png'
import Beter from '@/assets/games/beter_live.png'
import SmartSoft from '@/assets/games/smartsoft.png'
import avia from '@/assets/games/aviatrix.png'
import Pragma from '@/assets/games/pragmatic_play.png'
import WorldMatch from '@/assets/games/world_match.png'
import KingMaker from '@/assets/games/kingmaker.png'
import Spade from '@/assets/games/spade_gaming.png'
import PG from '@/assets/games/pg_soft_1.png'
import Holi from '@/assets/games/holi.png'
import RTD from '@/assets/games/red-thunder.png'
import MaxFair from '@/assets/games/maxfair.png'
import Aruze from '@/assets/games/aruze.png'
import SAGaming from '@/assets/games/sa_gaming.png'
import Cashier from '@/assets/icons/cashier.png'
import Maya from '@/assets/icons/maya.png'
import EPlayment from '@/assets/icons/ep.png'
import FortunePay from '@/assets/icons/fp2.png'
import PisoPay from '@/assets/icons/pisopay1.png'
import Image from 'next/image'
import moment from 'moment';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AssistantIcon from '@mui/icons-material/Assistant';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Lobby() {
    const router = useRouter()
    const currentDate = moment().format('MMMM DD, YYYY hh:mm:ss a')
    const guestExtId = "13278"
    const [openFAQ, setOpenFAQ] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [open2, setOpen2] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const [guestIdx, setGuestIdx] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [guestPhoto, setGuestPhoto] = useState<string>('')
    const [mobileNo, setMobileNo] = useState<string>("09194582413")
    const [balance, setBalance] = useState<number>(0)
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [activeGame, setActiveGame] = useState<string>('loading...')

    type gameSet = {
        name: string,
        image: any,
        categories: string[]
    }[]

    const amounts = [100, 500, 1000, 2000, 3000, 5000, 10000,  20000, 30000, 40000, 50000]

    const arrListCategories = [
        { category: 'slot' },
        { category: 'ibingo' },
        { category: 'table' },
        { category: 'live' },
        { category: 'arcade' },
    ]

    const games: gameSet = [
        { name: 'Caleta', image: Caleta, categories: ['slot', 'ibingo'] },
        { name: 'Vibra', image: Vibra, categories: ['slot', 'ibingo', 'table'] },
        { name: 'Zitro', image: Zitro, categories: ['ibingo'] },
        { name: 'BFGames', image: BFGames, categories: ['slot'] },
        { name: 'TomHorn', image: Tomhorn, categories: ['slot', 'live', 'table'] },
        { name: 'CosmoGaming', image: Cosmo, categories: ['live'] },
        { name: 'Evolution', image: Evo, categories: ['live', 'table'] },
        { name: 'BigTimeGaming', image: BTG, categories: ['slot'] },
        { name: 'NoLimitCity', image: NLC, categories: ['slot'] },
        { name: 'NetEnt', image: NetEnt, categories: ['slot'] },
        { name: 'RedTiger', image: RedTiger, categories: ['slot'] },
        { name: 'RealTimeGaming', image: RTG, categories: ['slot', 'table'] },
        { name: 'SimplePlay', image: SimplePlay, categories: ['slot'] },
        { name: 'BeterLive', image: Beter, categories: ['live'] },
        { name: 'SmartSoft', image: SmartSoft, categories: ['slot', 'arcade', 'table'] },
        { name: 'Aviatrix', image: avia, categories: ['arcade'] },
        { name: 'PragmaticPlay', image: Pragma, categories: ['slot', 'table', 'live'] },
        { name: 'WorldMatch', image: WorldMatch, categories: ['slot'] },
        { name: 'KingMaker', image: KingMaker, categories: ['slot', 'table', 'live'] },
        { name: 'SpadeGaming', image: Spade, categories: ['arcade', 'slot', 'table'] },
        { name: 'PGSoft', image: PG, categories: ['slot', 'table'] },
        { name: 'Holi', image: Holi, categories: ['live'] },
        { name: 'Aruze', image: Aruze, categories: ['slot'] },
        { name: 'MaxFair', image: MaxFair, categories: ['ibingo'] },
        { name: 'Red Thunder', image: RTD, categories: ['slot', 'arcade'] },
        { name: 'SAGaming', image: SAGaming, categories: ['slot', 'arcade'] }
    ]

    const registerFAQs = [
        'Click ‘Sign Up’',
        'Input your preferred username and password',
        'Enter you contact number, birthday and chosen preferred outlet',
        'Click \'Get OTP\'',
        'The player will receive the OTP through SMS',
        'Check the box to agree with the terms and conditions',
        'Click \'Register\''
    ]

    const validIDFAQs = [
        'Driver’s License',
        'Passport',
        'Professional Regulation Commission (PRC) ID',
        'National Bureau of Investigation (NBI) Clearance',
        'SSS Card (digitized)',
        'Postal ID',
        'Voter’s ID',
        'Philhealth Card',
    ]


    const options = games.map((option: any) => {
        const firstLetter = option.name[0].toUpperCase()
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option
        }
    })

    const handleLaunchGame = async (gameName: string) => {
        setOpen2(true)
        await axios.post('/api/game/active', {
            guestExtID: 13278
        }).then((resp: any) => {
            console.log("Last active: ", resp.data.data.LastSupplier)
            console.log("active: ", gameName)
            if(parseInt(resp.data.data.Idx) > 0) {
                if(resp.data.data.LastSupplier === gameName) {
                    // Dito ka mela ---> Game Launcher
                    axios.post('/api/game/launcher', {
                        username: resp.data.data.Username,
                        provider: resp.data.data.LastSupplier
                    }).then((response: any) => {
                        console.log(response.data.result)
                        setOpen2(false)
                        router.push(response.data.result.url)
                    }).catch((err: any) => {
                        console.log(err)
                        toast.error("Internal Server Error: Please contact the administrator", { position: 'bottom-center' })
                    })
                }
                else {
                    console.log({
                        username: resp.data.data.Username,
                        provider: gameName,
                        cashier: resp.data.data.LastCashierAccount,
                        userIdx: resp.data.data.Idx,
                        outletIdx: resp.data.data.OutletIdx
                    })
                    axios.post('/api/game/withdrawal', {
                        username: resp.data.data.Username,
                        provider: resp.data.data.LastSupplier,
                        cashier: resp.data.data.LastCashierAccount,
                        userIdx: resp.data.data.Idx,
                        outletIdx: resp.data.data.OutletIdx
                    }).then((response: any) => {
                        setOpen2(false)
                        console.log(response)
                        if(response.data.responseCode === 200) {
                            if(gameName === "MaxFair" || gameName === "Aruze" || gameName === "Red Thunder") {
                                let supplierId: string | undefined
                                if(gameName === "MaxFair") {
                                    supplierId = "60"
                                }
                                else if(gameName === "Aruze") {
                                    supplierId = "85"
                                }
                                else if(gameName === "Red Thunder") {
                                    supplierId = "1136"
                                }

                                axios.post('/api/logs/withdrawal-logs', {
                                    supplierIdx: supplierId,
                                    outletIdx: resp.data.data.OutletIdx,
                                    guestExtID: resp.data.data.Idx,
                                    cashier: resp.data.data.LastCashierAccount,
                                    username: resp.data.data.Username,
                                    amount: response.data.data.withdrawalAmount,
                                    refCode: response.data.data.refNo
                                }).then((response2: any) => {
                                    axios.post('/api/game/deposit', {
                                        username: resp.data.data.Username,
                                        provider: gameName,
                                        cashier: resp.data.data.LastCashierAccount,
                                        userIdx: resp.data.data.Idx,
                                        outletIdx: resp.data.data.OutletIdx,
                                        amount: response.data.data.withdrawalAmount
                                    }).then((res: any) => {
                                        if(res.data.responseCode === 200) {
                                            console.log("desposit logs: ", gameName)
                                            let supplierId2: string | undefined
        
                                            if(gameName === "MaxFair") {
                                                supplierId2 = "60"
                                            }
                                            else if(gameName === "Aruze") {
                                                supplierId2 = "85"
                                            }
                                            else if(gameName === "Red Thunder") {
                                                supplierId2 = "1136"
                                            }
    
                                            axios.post('/api/logs/deposit-logs', {
                                                supplierIdx: supplierId2,
                                                outletIdx: resp.data.data.OutletIdx,
                                                guestExtID: resp.data.data.Idx,
                                                cashier: resp.data.data.LastCashierAccount,
                                                username: resp.data.data.Username,
                                                amount: res.data.data.depositAmount,
                                                refCode: res.data.data.refNo
                                            }).then((result: any) => {
                                                console.log('Deposit Logs')
                                                console.log(result.data)
                                                setOpen2(false)
                                                activeGame2()
                                                // Game Launcher
                                                axios.post('/api/game/launcher', {
                                                    username: resp.data.data.Username,
                                                    provider: gameName
                                                }).then((response: any) => {
                                                    console.log(response.data.result)
                                                    setOpen2(false)
                                                    router.push(response.data.result.url)
                                                }).catch((err: any) => {
                                                    console.log(err)
                                                    toast.error("Internal Server Error: Please contact the administrator", { position: 'bottom-center' })
                                                })
                                            }).catch((err: any) => {
                                                toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
                                                setOpen2(false)
                                            })
                                        }
                                        else {
                                            toast.error(response.data.responseStatus, { position: 'bottom-center' })
                                        }
                                    }).catch((err: any) => {
                                        toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
                                    })
                                }).catch((err: any) => {
                                    toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
                                })
                            }
                            else {
                                axios.post('/api/game/deposit', {
                                    username: resp.data.data.Username,
                                    provider: gameName,
                                    cashier: resp.data.data.LastCashierAccount,
                                    userIdx: resp.data.data.Idx,
                                    outletIdx: resp.data.data.OutletIdx,
                                    amount: response.data.data.withdrawalAmount
                                }).then((res: any) => {
                                    console.log(res.data)
                                    if(res.data.responseCode === 200) {
                                        activeGame2()
                                        // Game Launcher
                                        axios.post('/api/game/launcher', {
                                            username: resp.data.data.Username,
                                            provider: gameName
                                        }).then((response: any) => {
                                            console.log(response.data.result)
                                            setOpen2(false)
                                            router.push(response.data.result.url)
                                        }).catch((err: any) => {
                                            console.log(err)
                                            toast.error("Internal Server Error: Please contact the administrator", { position: 'bottom-center' })
                                        })
                                    }
                                    else {
                                        toast.error(response.data.responseStatus, { position: 'bottom-center' })
                                    }
                                }).catch((err: any) => {
                                    toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
                                })
                            }
                        }
                        else {
                            toast.error("Internal Server Error: Please contact the administrator.", { position: 'bottom-center' })
                            setOpen2(false)
                        }
                    }).catch((err: any) => {
                        console.log(err)
                        toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
                        setOpen2(false)
                    })
                }
            }
            else {
                toast.error("Invalid username: Please contact the administrator.", { position: "bottom-center" })
            }
        }).catch((err: any) => {
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
        })
    }

    const activeGame2 = () => {
        setOpen2(true)
        axios.post('/api/game/active', {
            guestExtID: 13278
        }).then((response: any) => {
            setOpen2(false)
            setActiveGame(response.data.data.LastSupplier)
        }).catch((err: any) => {
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
            setOpen2(false)
        })
    }

    const handleClickDeposit = () => {
        setOpen(true)
    };

    const handleClickFAQ = () => {
        setOpenFAQ(true)
    }

    useEffect(() => {
        axios.post('/api/guest/mobile', {
            mobile: mobileNo
        }).then((response: any) => {
            if(response.data.data[0].Idx[0] > 0) {
                setGuestIdx(response.data.data[0].Idx[0])
                axios.post('/api/account/info', {
                    guestExtId: response.data.data[0].Idx[0]
                }).then((response: any) => {
                    setOpen2(false)
                    setUserName(response.data.data.Username[0])
                    setGuestPhoto(response.data.data.GuestPhoto[0])
                }).catch((error: any) => {
                    setOpen2(false)
                    toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
                })
            }
            else {
                toast.error("Invalid username: Please contact the administrator.", { position: "bottom-center" })
            }
        }).catch((error: any) => {
            setOpen2(false)
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
        })
    }, [])

    useEffect(() => {
        axios.post('/api/balance', {
            username: "sidlesss"
        }).then((response: any) => {
            let bal = 0
            if(response.data.data[0].message === "success") {
                bal += response.data.data[0].balance
            }
            else {
                bal += response.data.data[0].balance
            }

            if(response.data.data[1].message === "success") {
                bal += response.data.data[1].balance
            }
            else {
                bal += response.data.data[1].balance
            }

            if(response.data.data[2].message === "success") {
                bal += response.data.data[2].balance
            }
            else {
                bal += response.data.data[2].balance
            }

            if(response.data.data[3].message === "success") {
                bal += response.data.data[3].balance
            }
            else {
                bal += response.data.data[3].balance
            }
            setBalance(bal)
        }).catch((error: any) => {
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
        })
    }, [])

    useEffect(() => {
        activeGame2()
    }, [])

    return(
        <main className={styles.container}>
            <Top handleClick={handleClickDeposit} handleClickFAQ={handleClickFAQ} user={userName} guestPhoto={guestPhoto} balance={balance} />
            <Container sx={{ height: "100%" }}>
                <Grid container sx={{ mt: 2 }}>
                    <Grid item spacing={1}>Active Game: {activeGame}</Grid>
                </Grid>
                <Autocomplete
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                    sx={{ my: 2 }}
                    onChange={(e: any) => setSearch(e.target?.textContent)}
                />
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ height: "100%", overflow: "scroll", pb: 30 }}>
                    {
                        games.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })).filter(result => {
                            return search === '' ? result : result.name.toString().toLowerCase().includes(search.toString().toLowerCase())
                        })
                        .filter(res => {
                            return category === '' ? res : res.categories.toString().toLowerCase().includes(category.toString().toLowerCase())
                        })
                        .map((response: any, index: any) => {
                            return(
                                <Grid key={index} item xs={4} sm={4} md={4}>
                                    <Image
                                        src={response.image}
                                        alt={response.name}
                                        loading="lazy"
                                        style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                                        onClick={() => handleLaunchGame(response.name)}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            <Bot val={0} />
            <Dialog
                className={styles.containerDialog}
                fullScreen
                open={open}
                TransitionComponent={Transition}
            >
                <Grid container justifyContent="space-between">
                    <DialogTitle>Cash In</DialogTitle>
                    <IconButton aria-label='delete' size='small' sx={{ mr: 2 }}>
                        <CancelIcon onClick={() => setOpen(false)}/>
                    </IconButton>
                </Grid>
                <Divider />
                <DialogContent>
                    <TextField fullWidth InputProps={{ readOnly: true }} value={`Set Amount: ${amount}`} sx={{ mb: 2 }}/>
                    <Typography>Choose from the amount below (PHP)</Typography>
                    <Grid container justifyContent='center' alignItems='center' spacing={1} sx={{ my: 2 }}>
                        {
                            amounts.map((value, index) => (
                                <Grid item key={index} xs={4}>
                                    <Button variant='contained' fullWidth sx={{ bgcolor: "#78909c", '&:hover': { bgcolor: '#546e7a' } }} onClick={()=>setAmount(value)}>
                                        {value}
                                    </Button>
                                </Grid>
                            ))
                        }
                    </Grid>

                </DialogContent>
            </Dialog>
            <Dialog
                className={styles.containerDialog}
                fullScreen
                open={openFAQ}
                TransitionComponent={Transition}
            >
                <Grid container justifyContent="space-between">
                    <DialogTitle>Help & Support</DialogTitle>
                    <IconButton aria-label='delete' size='small' sx={{ mr: 2 }}>
                        <CancelIcon onClick={() => setOpenFAQ(false)}/>
                    </IconButton>
                </Grid>
                <Divider />
                <DialogContent>
                    <h3 style={{ marginBottom: "10px" }}>Frequently Ask Question: </h3>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreSharp/>}
                        >
                            How to register your account?
                        </AccordionSummary>
                        <AccordionDetails sx={{ mx: 2 }}>
                            <ul style={{ fontSize: "14px" }}>
                                <li>Go to the Fastwin website<a href="https://fastwin.ph/">(https://fastwin.ph/)</a></li>
                                {
                                    registerFAQs.map((step: any, index: number) => {
                                        return(
                                            <li key={index}>
                                                {step}
                                            </li>
                                        )                                    
                                    })
                                }
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreSharp/>}
                        >
                            Which ID's are accepted for the account verification process ?
                        </AccordionSummary>
                        <AccordionDetails sx={{ mx: 2 }}>
                            <ul style={{ fontSize: "14px" }}>
                                {
                                    validIDFAQs.map((id: any, index: number) => {
                                        return(
                                            <li key={index}>
                                                {id}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreSharp/>}
                        >
                            How long withdrawal takes?
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontSize: "14px" }}>
                            - Minimum of 3-5 minutes
                        </AccordionDetails>
                    </Accordion>
                    <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>Support:</h3>
                    <Grid container sx={{ mt: 3, display: 'table' }} spacing={1}>
                        <Grid item xs={6} sx={{ display: "table-cell" }}>
                            <Button sx={{ boxShadow: '0 0 1px rgba(0,0,0,.125),0 1px 3px rgba(0,0,0,.2)', textTransform: "none" }} onClick={() => { window.open("https://chat.fastwin.ph/index.php/chat/startchat/(leaveamessage)/true/(theme)/1/(department)/2/(vid)/e61c49c7b9e32ccb5f03/(er)/1?URLReferer=%2F%2Fsta.fastwin.com.ph%2Flobby%2FDefault.aspx&tzuser=9&r=%2F%2Fsta.fastwin.com.ph%2Flobby%2FLogin.aspx", '_blank')}}>
                                <SupportAgentIcon sx={{ color: "#ca69aa", fontSize: 60 }}/>
                                <h5 style={{ fontWeight: "bold", color: '#ca69aa' }}> Technical Support </h5>
                            </Button>
                        </Grid>
                        <Grid item xs={6} sx={{ display: "table-cell" }}>
                            <Button sx={{ boxShadow: '0 0 1px rgba(0,0,0,.125),0 1px 3px rgba(0,0,0,.2)', textTransform: "none" }} onClick={() => { window.open("https://go.fastwin.com.ph/register/SelfService.aspx", '_blank')}}>
                                <AssistantIcon sx={{ color: "#7961BF", fontSize: 60 }}/>
                                <h5 style={{ fontWeight: "bold", color: '#7961BF' }}> Self Service Facilty </h5>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <ToastContainer />
            <Loading open={open2}/>
        </main>
    )
}