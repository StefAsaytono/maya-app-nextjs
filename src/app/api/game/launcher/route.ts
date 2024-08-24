import { NextResponse } from "next/server"
import axios from 'axios';
import { EncryptURL, GenerateString } from "@/functions/function";

export async function POST(req: Request) {
    const { username, provider } = await req.json()
    if(username && provider) {
        const response = await new Promise((resolve, reject) => {
            axios.post(`${process.env.AGATHA_URL}/api/v1/cams/fastwin/wallet/token?key=${process.env.AGATHA_KEY}`,{
                accountType: 1,
                accountName: username
            }).then((response: any) => {
                if(response.data.data.walletResult.UID === "-1") {
                    resolve({
                        responseCode: 500,
                        responseStatus: 'failed',
                        result: {
                            token: response.data.data.walletResult.UID,
                            provider: provider
                        }
                    })
                }
                else {
                    if(provider === "MaxFair") {
                        axios.post(`${process.env.MXF_URL}/DFNN/servlet/api?method=login&account=${username}&id=${GenerateString(30)}`).then((resp: any) => {
                            console.log('Launcher')
                            console.log(resp.data)
                            if(resp.data.uid) {
                                console.log(resp.data)
                                resolve({
                                    responseCode: 200,
                                    responseStatus: 'success',
                                    result: {
                                        url: `${process.env.MXF_URL}/GameLobbyApp/?uid=${resp.data.uid}&lobbyurl=${process.env.LOBBY_URL}`,
                                        token: response.data.data.walletResult.UID
                                    }
                                })
                            }
                            else {
                                resolve({
                                    responseCode: 500,
                                    responseStatus: 'failed',
                                    result: {
                                        provider: provider,
                                        err_msg: resp.data.description,
                                    }
                                })
                            }
                        }).catch((err: any) => {
                            resolve({
                                responseCode: err.response.status,
                                responseStatus: err.response.statusText,
                                result: {
                                    provider: provider
                                }
                            })
                        })
                    }
                    else if(provider === "Aruze") {
                        axios.post(`${process.env.ARZ_URL}/DFNN/servlet/api?method=login&account=${username}&id=${GenerateString(30)}`).then((resp: any) => {
                            if(resp.data.uid) {
                                resolve({
                                    responseCode: 200,
                                    responseStatus: 'success',
                                    result: {
                                        url: `${process.env.ARZ_URL}/SlotGameLobbyApp/?uid=${resp.data.uid}&lobbyurl=${process.env.LOBBY_URL}`,
                                        token: response.data.data.walletResult.UID
                                    }
                                })
                            }
                            else {
                                resolve({
                                    responseCode: 500,
                                    responseStatus: 'failed',
                                    result: {
                                        provider: provider,
                                        err_msg: resp.data.description
                                    }
                                })
                            }
                        }).catch((err: any) => {
                            resolve({
                                responseCode: err.response.status,
                                responseStatus: err.response.statusText,
                                result: {
                                    provider: provider
                                }
                            })
                        })
                    }
                    else if(provider === "Red Thunder") {
                        axios.get(`${process.env.RDT_URL}/api/instawin?method=login&account=${username}&password=${process.env.RDT_PASS}&redirect_url=${process.env.RDT_REDIRECT_URL}&logout_url=${process.env.RDT_LOGOUT_URL}`).then((resp: any) => {
                            if(resp.data.success) {
                                resolve({
                                    responseCode: 200,
                                    responseStatus: 'success',
                                    result: {
                                        url: resp.data.link,
                                        token: response.data.data.walletResult.UID
                                    }
                                })
                            }
                            else {
                                resolve({
                                    responseCode: 500,
                                    responseStatus: 'failed',
                                    result: {
                                        provider: provider,
                                        err_msg: "Link doesn't exist."
                                    }
                                })
                            }
                        }).catch((err: any) => {
                            resolve({
                                responseCode: err.response.status,
                                responseStatus: err.response.statusText,
                                result: {
                                    provider: provider
                                }
                            })
                        })
                    }
                    else if(provider === "Caleta" || provider === "Vibra" || provider === "Zitro" || provider === "BFGames" || provider === "TomHorn" || provider === "CosmoGaming" || provider === "Evolution" || provider === "BigTimeGaming" || provider === "NoLimitCity" || provider === "NetEnt" || provider === "RedTiger" || provider === "RealTimeGaming" || provider === "SimplePlay" || provider === "BeterLive" || provider === "SmartSoft" || provider === "Aviatrix" || provider === "PragmaticPlay" || provider === "WorldMatch" || provider === "KingMaker" || provider === "SpadeGaming" || provider === "PGSoft" || provider === "Holi") {

                        let params: string = `${1}&${username}&${response.data.data.walletResult.UID}`
                        if(provider === "Caleta") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.CAL_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "Vibra") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.VIB_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "Zitro") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.ZIT_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "BFGames") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.BF_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "TomHorn") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.TMH_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "Evolution") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.EVO_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "BigTimeGaming") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.EVO_BTG_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "NoLimitCity") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.EVO_NLC_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "NetEnt") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.EVO_NTE_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "RedTiger") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.EVO_RTG_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "RealTimeGaming") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.RTG_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "SimplePlay") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.SP_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "BeterLive") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.BL_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "SmartSoft") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.SS_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "Aviatrix") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.AVIA_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "PragmaticPlay") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.PRAGMATIC_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "WorldMatch") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.WM_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "KingMaker") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.APEX_KM_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "SpadeGaming") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.APEX_SP_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "PGSoft") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.APEX_PG_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else if(provider === "Holi") {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'success',
                                result: {
                                    url: `${process.env.HOLI_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`,
                                    token: response.data.data.walletResult.UID
                                }
                            })
                        }
                        else {
                            resolve({
                                responseCode: 500,
                                responseStatus: 'failed',
                                result: {
                                    provider: provider,
                                    err_msg: "Game provider doesn't exist."
                                }
                            })
                        }
                    }
                    else if(provider === "SAGaming") {
                        let params: string = `${1}&${username}&${response.data.data.walletResult.UID}`
                        axios.get(`${process.env.SA_LAUNCHER}?d=${encodeURIComponent(EncryptURL(params))}`).then((resp: any) => {
                            if(resp.data.ErrorMsg) {
                                resolve({
                                    responseCode: 200,
                                    responseStatus: 'success',
                                    result: {
                                        url: `${process.env.SA_LAUNCHER2}?username=${resp.data.DisplayName}&token=${resp.data.Token}&lang=en_US&lobby=A8656&mobile=${resp.data.Device}`,
                                        token: response.data.data.walletResult.UID
                                    }
                                })
                            }
                            else {
                                resolve({
                                    responseCode: 500,
                                    responseStatus: 'failed',
                                    result: {
                                        provider: provider,
                                        err_msg: resp.data.ErrorMsg
                                    }
                                })
                            }
                        }).catch((err: any) => {
                            resolve({
                                responseCode: err.response.status,
                                responseStatus: err.response.statusText,
                                result: {
                                    provider: provider
                                }
                            })
                        })
                    }
                }
            }).catch((err: any) => {
                resolve({
                    responseCode: err.response.status,
                    responseStatus: err.response.statusText
                })
            })
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