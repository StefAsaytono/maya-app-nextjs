import { NextResponse } from "next/server";
import axios from 'axios';
import { GenerateString } from "@/functions/function";

export async function POST(req: Request) {
    const { username, provider, cashier, userIdx, outletIdx, amount } = await req.json()
    console.log("deposit params")
    console.log({ username, provider, cashier, userIdx, outletIdx, amount })
    if(username && provider && cashier && userIdx && outletIdx && amount) {
        console.log("deposit:",provider)
        const response = await new Promise((resolve, reject) => {
            if(provider === "Maxfair" || provider === "MaxFair") {
                axios.post(`${process.env.MXF_URL}/DFNN/servlet/api?method=deposit&account=${username}&id=${GenerateString(25)}&amount=${amount}`).then((response: any) => {
                    console.log('Deposit')
                    console.log(response.data)
                    
                    if(response.data.status === "complete") {
                        resolve({
                            responseCode: 200,
                            responseStatus: 'success',
                            data: {
                                depositAmount: response.data.amount,
                                refNo: response.data.external_id
                            }
                        })
                    }
                    else {
                        resolve({
                            responseCode: 500,
                            responseStatus: 'error',
                            errMsg: response.data.description
                        })
                    }
                }).catch((err: any) => {
                    console.log("deposit error")
                    console.log(err)
                    resolve({
                        responseCode: err.response.status ? err.response.status : 500,
                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                        errMsg: err.response.data
                    })
                })
            }
            else if(provider === "Aruze") {
                axios.post(`${process.env.ARZ_URL}/DFNN/servlet/api?method=deposit&account=${username}&id=${GenerateString(25)}&amount=${amount}`).then((response: any) => {
                    if(response.data.status === "complete") {
                        resolve({
                            responseCode: 200,
                            responseStatus: 'success',
                            data: {
                                depositAmount: response.data.amount,
                                refNo: response.data.external_id
                            }
                        })
                    }
                    else {
                        resolve({
                            responseCode: 500,
                            responseStatus: 'error',
                            errMsg: response.data.description
                        })
                    }
                }).catch((err: any) => {
                    resolve({
                        responseCode: err.response.status ? err.response.status : 500,
                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                        errMsg: err.response.data
                    })
                })
            }
            else if(provider === "Red Thunder") {
                axios.post(`${process.env.RDT_URL}/api/instawin?method=deposit&account=${username}&id=${GenerateString(25)}&amount=${amount}&cardid=${username}&auth_id=${process.env.RDT_DEPOSIT_AUTHID}`).then((response: any) => {
                    if(response.data.success) {
                        resolve({
                            responseCode: 200,
                            responseStatus: 'success',
                            data: {
                                depositAmount: response.data.amount,
                                refNo: response.data.external_id
                            }
                        })
                    }
                    else {
                        resolve({
                            responseCode: 500,
                            responseStatus: 'error',
                            errMsg: 'We were unable to complete your transfer. Please try again. If this issue persists, please contact us.'
                        })
                    }
                }).catch((err: any) => {
                    resolve({
                        responseCode: err.response.status ? err.response.status : 500,
                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                        errMsg: err.response.data.description
                    })
                })
            }
            else if(provider === "Caleta" || provider === "Vibra" || provider === "Zitro" || provider === "BFGames" || provider === "SAGaming" || provider === "Evolution" || provider === "TomHorn" || provider === "BigTimeGaming" || provider === "NoLimitCity" || provider === "NetEnt" || provider === "SimplePlay" || provider === "SmartSoft" || "Aviatrix" || provider === "CosmoGaming" || provider === "Holi" || provider === "WorldMatch" || provider === "KingMaker" || provider === "SpadeGaming" || provider === "PragmaticPlay" || provider === "RedTiger" || provider === "PGSoft" || provider === "RealTimeGaming") {
                console.log("deposit2: ", provider)
                axios.post(`${process.env.AGATHA_URL}/api/v1/cams/fastwin/wallet/deposit?key=${process.env.AGATHA_KEY}`, {
                    accountType: 1,
                    outletIdx: outletIdx,
                    guestExtID: userIdx,
                    cashierAccount: cashier,
                    accountName: username,
                    depositAmount: amount,
                    extRefCode: GenerateString(25),
                    createdByUserID: cashier,
                    outletBalance: 1,
                    tranMode: 1,
                    tranSource: 1,
                    supplierName: provider === "BigTimeGaming" || provider === "NoLimitCity" || provider === "NetEnt" ? 'Evolution' : provider === "KingMaker" || provider === "SpadeGaming" || provider === "PGSoft" ? 'ApexPlay' : provider
                }).then((response: any) => {
                    console.log("deposit3: ", response.data)
                    if(response.data.data.walletResult.ResultCode === 0) {
                        resolve({
                            responseCode: 200,
                            responseStatus: 'success',
                            data: {
                                depositAmount: response.data.data.walletResult.DepositAmount,
                                refNo: response.data.data.walletResult.ExtRefCode
                            }
                        })
                    }
                    else {
                        resolve({
                            responseCode: 500,
                            responseStatus: 'error',
                            errMsg:'We were unable to complete your transfer. Please try again. If this issue persists, please contact us.'
                        })
                    }
                }).catch((err: any) => {
                    console.log("deposit4: ", err)
                    resolve({
                        responseCode: err.response.status ? err.response.status : 500,
                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                        errMsg: err.response.data
                    })
                })
            }
        })
        return NextResponse.json(response)
    }
    else {
        return NextResponse.json({
            responseCode: 400,
            responseStatus: 'Bad Request'
        })
    }
}