import { NextResponse } from "next/server"
import axios from 'axios';

type ResponseData = {
    responseCode: number
    responseStatus: string
    data?: []
}

export async function POST(req: Request) {
    const { accessToken, refreshToken, referenceNo } = await req.json()
    
    if(accessToken && refreshToken && referenceNo) {
        const response = await new Promise((resolve, reject) => {
            axios.post(`${process.env.WAPI_URL}/api/v1/fastwin/wallet/psp/session/maya`, {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresAt: 1652460714
            },{
                headers: {
                    "Request-Reference-No": referenceNo
                }
            }).then((response: any) => {
                resolve({
                    responseCode: 200,
                    responseStatus: 'Success',
                    data: response.data
                })
            }).catch((err: any) => {
                reject({
                    responseCode: 500,
                    responseStatus: 'Internal Server Error'
                })
            })
        })
        return NextResponse.json(response);
    }
    else {
        return NextResponse.json<ResponseData>({
            responseCode: 400,
            responseStatus: 'Bad Request'
        })
    }
}