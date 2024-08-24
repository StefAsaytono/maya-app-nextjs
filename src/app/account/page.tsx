
'use client'

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import Topbar from '@/components/Topbar';
import Bot from '@/components/Bot';
import { Avatar, Badge, Box, IconButton, Stepper, Step, Stack, StepLabel, Divider, TextField, Typography, InputLabel, FormControl, MenuItem, Select, Button, Grid } from "@mui/material";
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loading from "@/components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 100,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 100,
    zIndex: 10000
});

export default function Account() {
    const steps = ['Basic Level', 'Semi-Verified', 'Fully-Verfied']
    const [fullName, setFullName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [cardNo, setCardNo] = useState<string>('')
    const [fundOfSource, setFundOfSource] = useState<string>('')
    const [idType, setIDType] = useState<string>('')
    const [idNumber, setIDNumber] = useState<string>('')
    const [IDImage, setIDImage] = useState<string>('')
    const [idType2, setIDType2] = useState<string>('')
    const [idNumber2, setIDNumber2] = useState<string>('')
    const [occupation, setOccupation] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [profilePhoto, setProfilePhoto] = useState<string>('')
    const [contactNo, setContactNo] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [kycLevel, setKycLevel] = useState<number>(0)
    const [dateRegistered, setDateRegistered] = useState<Dayjs | null | undefined>(null)
    const [codeList, setCodeList] = useState<any>([])
    const [editBoolean, setEditBoolean] = useState<Boolean>(true)
    const [editProfile, setEditProfile] = useState<Boolean>(true)
    const [birthPlace, setBirthPlace] = useState<string>('')
    const [open, setOpen] = useState<Boolean>(false)
    
    const kyc = async () => {
        setOpen(true)
        await axios.post('/api/account/kyc', {
            guestExtId: 13278
        }).then((response: any) => {
            setOpen(false)
            setKycLevel(response.data.data.KYCLevel)
        }).catch((err: any) => {
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
        })
    }
    const code = async () => {
        setOpen(true)
        await axios.get('/api/account/generic-code').then((response: any) => {
            setOpen(false)
            setCodeList(response.data.data)
        }).catch((err: any) => {
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
        })
    }

    const getPlayerInfo = async () => {
        setOpen(true)
        await axios.post('/api/account/info', {
            guestExtId: 13278
        }).then((response: any) => {
            setOpen(false)
            kyc()
            setFullName(`${response.data.data.FirstName[0]} ${response.data.data.MiddleName[0]} ${response.data.data.LastName[0]}`)
            setUsername(response.data.data.Username[0])
            setCardNo(response.data.data.CardNo[0])
            setOccupation(response.data.data.Occupation[0])
            setFundOfSource(response.data.data.FundSource[0])
            setAddress(response.data.data.AddressLine[0])
            setProfilePhoto(response.data.data.GuestPhoto[0])
            setIDImage(response.data.data.IDImage[0])
            setIDType(response.data.data.IDType[0])
            setIDNumber(response.data.data.IDNumber[0])
            setIDNumber2(response.data.data.IDNumber2[0])
            setIDType2(response.data.data.IDType2[0])
            setBirthPlace(response.data.data.BirthPlace[0])
            setEmail(response.data.data.EmailAddress[0])
            setContactNo(response.data.data.ContactNo[0])
            setDateRegistered(response.data.data.RegistrationDate[0])
        }).catch((err: any) => {
            toast.error("Internal Server Error: Please contact the administrator.", { position: "bottom-center" })
        })
    }

    const handleSaveChanges = (e: any) => {
        e.preventDefault()
        setEditProfile(true)
        setEditBoolean(true)
        setOpen(true)
        axios.post('/api/account/info/edit', {
            guestExtId: 13278,
            birthDate: birthPlace,
            contactNo: contactNo,
            emailAddress: email,
            address: address,
            idType: idType,
            idNo: idNumber,
            idType2: idType2,
            idNo2: idNumber2,
            source: fundOfSource,
            occupation: occupation
        }).then((response: any) => {
            setOpen(false)
            getPlayerInfo()
            if(response.data.data > 0) {
                toast.success('Your profile has been updated successfully.', { position: 'bottom-center' })
            }
            else {
                toast.error('Failed to update the profile information. Please try again later.', { position: 'bottom-center' })
            }
        }).catch((err: any) => {
            toast.error('Internal Server Error', { position: 'bottom-center' })
        })

    }

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    })

    const photo = async (file: any) => {
        setOpen(true)
        const proofImg: any = await toBase64(file) as unknown

        axios.post('/api/account/info/edit/photo', {
            cardNo: cardNo,
            guestPhoto: proofImg.split(",")[1]
        }).then((response: any) => {
            setOpen(false)
            getPlayerInfo()
            if(parseInt(response.data.data) === 1) {
                toast.success('Your profile photo has been updated successfully.', { position: 'bottom-center' })
            }
            else {
                toast.error('Failed to update the profile photo. Please try again later.', { position: 'bottom-center' })
            }
        }).catch((err) => {
            toast.error('Internal Server Error', { position: 'bottom-center' })
        })
    }

    const idPhoto = async (file: any) => {
        setOpen(true)
        const proofImg: any = await toBase64(file) as unknown

        axios.post('/api/account/info/edit/id-photo', {
            cardNo: cardNo,
            idPhoto: proofImg.split(",")[1]
        }).then((response: any) => {
            setOpen(false)
            getPlayerInfo()
            if(parseInt(response.data.data) === 1) {
                toast.success('Your primary id photo has been updated successfully.', { position: 'bottom-center' })
            }
            else {
                toast.error('Failed to update the primary id photo. Please try again later.', { position: 'bottom-center' })
            }
        }).catch((err) => {
            toast.error('Internal Server Error', { position: 'bottom-center' })
        })
    }
    useEffect(() => {
        code()
        getPlayerInfo()
    }, [])

    return(
        <main className={styles.container}>
            <Topbar title={'Account'} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction="column" sx={{ height: "100%"}}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", my: 2 }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <IconButton tabIndex={-1} role={undefined} component="label">
                                            <VisuallyHiddenInput type='file' onChange={(e) => photo(e.target.files?.[0])}/>
                                            <AddIcon sx={{ bgcolor: "#cccccc", borderRadius: 5, border: '2px solid white', color: "white" }}/>
                                        </IconButton>
                                    }
                                >
                                    <Avatar 
                                        src={`data:image/jpeg; base64, ${profilePhoto}`}
                                        alt="Sid"
                                        sx= {{
                                            m: 'auto',
                                            marginTop: '10px',
                                            height: '90px',
                                            width: '90px',
                                            border: '2px solid white'
                                        }}
                                    />
                                </Badge>
                            </Box>
                            <Box sx={{ width: '100%', my: 2 }}>
                                <Stepper activeStep={kycLevel} alternativeLabel>
                                    { 
                                        steps.map((label, index) => (
                                            <Step key={label} sx={{ "& .MuiSvgIcon-root" : { color: index+1 <= kycLevel ? 'green !important' : "grey"  }, "& .MuiStepLabel-label": { fontSize: "12px", color: index+1 <= kycLevel ? '#1a5b3e !important' : "grey" }}}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                            </Box>
                            <Divider />
                        </Box>
                        <Box sx={{ overflow: "scroll", height: "100%", pb: 8 }}>
                            <Box sx={{ m: 2 }}>
                                <Typography> Player Information: </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', m: 1 }}>
                                <TextField
                                    label="Name"
                                    value={fullName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ m: 1 }}
                                    fullWidth
                                />
                                <TextField
                                    label="Username"
                                    value={username}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ m: 1 }}
                                    fullWidth
                                />
                            </Box>
                            <Box sx={{ mx: 2 }}>
                                <TextField
                                    label="Card Number"
                                    value={cardNo}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ mb: 2 }}
                                    fullWidth
                                />
                                <TextField
                                    label="Date Registered"
                                    defaultValue={dateRegistered ? `${dayjs(dateRegistered).format('L')} ${dayjs(dateRegistered).format('LTS')}` : `${dayjs("1900-01-01T11:59:59.16+08:00").format('L')} ${dayjs("2023-10-24T00:00:00.16+08:00").format('LTS')}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{ mb: 2 }}
                                    fullWidth
                                />
                            </Box>
                            <Divider />
                            <Box sx={{ m: 2 }}>
                                <Typography>Other Details: </Typography>
                                <FormControl fullWidth sx={{ my: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Primary ID Type</InputLabel>
                                    <Select
                                        value={idType}
                                        label="Primary ID Type"
                                        inputProps={{ readOnly: editBoolean }}
                                        onChange={(e) => setIDType(e.target.value)}
                                    >
                                        {
                                            codeList.map((code: any, index: any) => {
                                                return(<MenuItem value={code.GenericName[0]} key={index}>{code.GenericName[0]}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField 
                                    label="Primary ID No" 
                                    fullWidth 
                                    value={idNumber}
                                    inputProps={{ readOnly: editBoolean }}
                                    sx={{ mb: 2 }}
                                    onChange={(e) => setIDNumber(e.target.value)}
                                />
                                <Typography sx={{ fontSize: '14px' }}> Primary ID Photo: </Typography>
                                <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", mb: 1 }}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <IconButton tabIndex={-1} role={undefined} component="label">
                                                <VisuallyHiddenInput type='file' onChange={(e) => idPhoto(e.target.files?.[0])}/>
                                                <AddIcon sx={{ bgcolor: "#cccccc", borderRadius: 5, border: '2px solid white', color: "white" }}/>
                                            </IconButton>
                                        }
                                    >
                                        <Image 
                                            src={`data:image/jpeg; base64, ${IDImage}`}
                                            alt="Photo"
                                            width={300}
                                            height={200}
                                            style={{ filter: 'blur(5px)'}}
                                        />
                                    </Badge>
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField
                                        label="Contact No"
                                        value={contactNo}
                                        inputProps={{
                                            readOnly: editBoolean,
                                            maxLength: 11
                                        }}
                                        fullWidth
                                        onChange={(e) => setContactNo(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <TextField
                                        label="Email Address"
                                        value={email}
                                        inputProps={{
                                            readOnly: editBoolean,
                                        }}
                                        fullWidth
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Box>
                                <TextField 
                                    label="Current Address" 
                                    multiline
                                    rows={3}
                                    fullWidth 
                                    value={address}
                                    inputProps={{ readOnly: editBoolean }}
                                    sx={{ mb: 2 }}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Source of Income</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={fundOfSource}
                                        label="Source of Income"
                                        inputProps={{ readOnly: editBoolean }}
                                        onChange={(e) => setFundOfSource(e.target.value)}
                                    >
                                        <MenuItem value="Salary">Salary</MenuItem>
                                        <MenuItem value="Pension">Pension</MenuItem>
                                        <MenuItem value="Business/Self Employment">Business/Self Employment</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField 
                                    label="Nature of Work" 
                                    fullWidth 
                                    value={occupation}
                                    inputProps={{ readOnly: editBoolean }}
                                    onChange={(e) => setOccupation(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Box sx={{ mb: 8 }}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ display: editProfile ? 'block' : 'none' }} 
                                        onClick={() =>{
                                            setEditProfile(false)
                                            setEditBoolean(false)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Grid sx={{ display: 'flex' }}>
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            fullWidth 
                                            sx={{ display: editProfile ? 'none' : 'block', mr: 1 }} 
                                            onClick={(e) => handleSaveChanges(e)}
                                        >
                                            Save Changes
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            fullWidth 
                                            sx={{ display: editProfile ? 'none' : 'block', ml: 1 }} 
                                            onClick={() => {
                                                setEditProfile(true)
                                                setEditBoolean(true)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </LocalizationProvider>
                <Loading open={open} />
                <ToastContainer />
            <Bot val={3} />
        </main>
    )
}