import { NextResponse } from "next/server"
import axios from 'axios';
import { GenerateString } from "@/functions/function";

export async function POST(req: Request) {
    const { username, provider, cashier, userIdx, outletIdx } = await req.json()
    console.log({ username, provider, cashier, userIdx, outletIdx })
    if(username && provider && cashier && userIdx && outletIdx) {
        const response = await new Promise((resolve, reject) => {
            if(provider === "MaxFair") {
                axios.post(`${process.env.MXF_URL}/DFNN/servlet/api?method=withdrawal&account=${username}&id=${GenerateString(15)}`).then((response: any) => {
                    console.log(response.data)
                    if(response.data.status === "complete") {
                        resolve({
                            responseCode: 200,
                            responseStatus: 'success',
                            data: {
                                withdrawalAmount: response.data.amount,
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
                    console.log(err)
                    resolve({
                        responseCode: err.response.status ? err.response.status : 500,
                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                        errMsg: err.response.data
                    })
                })
            }
            else if(provider === "Aruze") {
                axios.post(`${process.env.ARZ_URL}/DFNN/servlet/api?method=withdrawal&account=${username}&id=${GenerateString(15)}`).then((response: any) => {
                    console.log(response.data)
                    if(response.data.status === "complete") {
                        resolve({
                            responseCode: 200,
                            responseStatus: 'success',
                            data: {
                                withdrawalAmount: response.data.amount,
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
                axios.get(`${process.env.RDT_URL}/api/instawin?method=balance&account=${username}&auth_id=${GenerateString(15)}&player_type=${process.env.RDT_PLAYER_TYPE}`).then((response: any) => {
                    axios.post(`${process.env.RDT_URL}/api/instawin?method=withdrawal&account=${response.data.account}&id=${GenerateString(15)}&amount=${response.data.terminal_balance}&cardid=${response.data.account}&auth_id=${process.env.RDT_WITHDRAW_AUTHID}`).then((resp: any) => {
                        if(resp.data.success) {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                data: {
                                    withdrawalAmount: response.data.amount,
                                    refNo: response.data.external_id
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
                    })
                }).catch((err: any) => {
                    resolve({
                        responseCode: err.response.status ? err.response.status : 500,
                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                        errMsg: err.response.data.description
                    })
                })
            }
            else if(provider === "Caleta" || provider === "Vibra" || provider === "Zitro" || provider === "BFGames" || provider === "SAGaming" || provider === "Evolution" || provider === "TomHorn" || provider === "BigTimeGaming" || provider === "NoLimitCity" || provider === "NetEnt" || provider === "SimplePlay" || provider === "SmartSoft" || provider === "Aviatrix" || provider === "CosmoGaming" || provider === "Holi" || provider === "WorldMatch" || provider === "KingMaker" || provider === "SpadeGaming" || provider === "PragmaticPlay" || provider === "RedTiger" || provider === "PGSoft" || provider === "RealTimeGaming") {
                console.log(provider)
                axios.post(`${process.env.AGATHA_URL}/api/v1/cams/fastwin/wallet/token?key=${process.env.AGATHA_KEY}`, {
                    accountType: 1,
                    accountName: username
                }).then((response: any) => {
                    if(response.data.data.walletResult.UID) {
                        axios.get(`${process.env.AGATHA_URL}/api/v1/cams/fastwin/wallet/token?key=${process.env.AGATHA_KEY}&accountType=1&accountName=${username}&tokenID=${response.data.data.walletResult.UID}`).then((resp: any) => {
                            console.log(resp.data.data)
                            console.log({
                                    accountType: 1,
                                    outletIdx: outletIdx,
                                    guestExtID: resp.data.data.walletResult.Idx,
                                    cashierAccount: cashier,
                                    accountName: resp.data.data.walletResult.AccountName,
                                    withdrawalAmount: resp.data.data.walletResult.Wallet_Balance,
                                    extRefCode: GenerateString(25),
                                    createdByUserID: cashier,
                                    outletBalance: 1,
                                    tranMode: 1,
                                    tranSource: 1,
                                    supplierName: provider === "BigTimeGaming" || provider === "NoLimitCity" || provider === "NetEnt" ? 'Evolution' : provider === "KingMaker" || provider === "SpadeGaming" || provider === "PGSoft" ? 'ApexPlay' : provider
                                })
                            if(resp.data.data.walletResult.Idx > 0) {
                                axios.post(`${process.env.AGATHA_URL}/api/v1/cams/fastwin/wallet/withdrawal?key=${process.env.AGATHA_KEY}`, {
                                    accountType: 1,
                                    outletIdx: outletIdx,
                                    guestExtID: resp.data.data.walletResult.Idx,
                                    cashierAccount: cashier,
                                    accountName: resp.data.data.walletResult.AccountName,
                                    withdrawalAmount: resp.data.data.walletResult.Wallet_Balance,
                                    extRefCode: GenerateString(25),
                                    createdByUserID: cashier,
                                    outletBalance: 1,
                                    tranMode: 1,
                                    tranSource: 1,
                                    supplierName: provider === "BigTimeGaming" || provider === "NoLimitCity" || provider === "NetEnt" ? 'Evolution' : provider === "KingMaker" || provider === "SpadeGaming" || provider === "PGSoft" ? 'ApexPlay' : provider
                                }).then((response2: any) => {
                                    console.log('Withdrawal')
                                    console.log(response2.data.data)
                                    if(response2.data.data.walletResult.ResultCode === 0) {
                                        resolve({
                                            responseCode: 200,
                                            responseStatus: 'success',
                                            data: {
                                                withdrawalAmount: response2.data.data.walletResult.WithdrawalAmount,
                                                refNo: response2.data.data.walletResult.ExtRefCode
                                            }
                                        })
                                    }
                                    else {
                                        console.log(4)
                                        resolve({
                                            responseCode: 500,
                                            responseStatus: 'error',
                                            errMsg:'We were unable to complete your transfer. Please try again. If this issue persists, please contact us.'
                                        })
                                    }
                                }).catch((err: any) => {
                                    console.log(3)
                                    resolve({
                                        responseCode: err.response.status ? err.response.status : 500,
                                        responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error'
                                    })
                                })
                            }
                            else {
                                console.log(2)
                                resolve({
                                    responseCode: 500,
                                    responseStatus: `error`,
                                    errMsg: `User doesn't exists`
                                })
                            }
                        }).catch((err: any) => {
                            console.log(1)
                            resolve({
                                responseCode: err.response.status ? err.response.status : 500,
                                responseStatus: err.response.statusText ? err.response.statusText : 'Internal Server Error',
                                errMsg: err.response.data
                            })
                        })
                    }
                    else {
                        resolve({
                            responseCode: 500,
                            responseStatus: 'error',
                            errMsg: 'Invalid Wallet Token'
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