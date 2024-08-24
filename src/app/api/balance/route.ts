import { NextResponse } from "next/server";
import axios from 'axios';
import { GenerateString } from "@/functions/function";

export async function POST(req: Request) {
    const { username } = await req.json()
    
    const maxfair = await new Promise((resolve, reject) => {
        axios.post(`${process.env.MXF_URL}/DFNN/servlet/api?method=balance&account=${username}`).then(response => {
            if(response.data.success === false) {
                reject({
                    provider: 'Maxfair',
                    balance: 0,
                    message: response.data.description
                })
            }
            else {
                resolve({
                    provider: 'Maxfair',
                    balance: response.data.balance,
                    message: 'success'
                })
            }
        }).catch(err => {
            console.log(err)
        })
    })

    const aruze = await new Promise((resolve, reject) => {
        axios.post(`${process.env.ARZ_URL}/DFNN/servlet/api?method=balance&account=${username}`).then(response => {
            if(response.data.success === false) {
                reject({
                    provider: 'Aruze',
                    balance: 0,
                    message: response.data.description
                })
            }
            else {
                resolve({
                    provider: 'Aruze',
                    balance: response.data.balance,
                    message: 'success'
                })
            }
        }).catch(err => {
            console.log(err)
        })
    })

    const redthunder = await new Promise((resolve, reject) => {
        axios.get(`${process.env.RDT_URL}/api/instawin?method=balance&account=${username}&auth_id=${GenerateString(25)}&player_type=${process.env.RDT_PLAYER_TYPE}`).then(response => {
            if(response.data.success) {
                resolve({
                    provider: 'RedThunder',
                    balance: response.data.terminal_balance,
                    message: 'success'
                })
            }
            else {
                reject({
                    provider: 'RedThunder',
                    balance: 0,
                    message: response.data.description
                })
            }
        }).catch(err => {
            console.log(err)
        })
    })

    const walletBalance = await new Promise((resolve, reject) => {
        axios.get(`${process.env.WAP_URL}/api/v1/wallet/requestBalance?key=${process.env.AGATHA_KEY}&accountType=1&accountName=${username}`).then((response: any) => {
            if(response.data.result === "OK") {
                resolve({
                    provider: response.data.data.lastGameProvider,
                    balance: response.data.data.accountBalance,
                    message: 'success'
                })
            }
            else {
                reject({
                    balance: 0,
                    message: response.error.message
                })
            }
        }).catch((err: any) => {
            console.error(err)
        })
    })
    
    return NextResponse.json({
        data: [ maxfair, aruze, redthunder, walletBalance ]
    })
}