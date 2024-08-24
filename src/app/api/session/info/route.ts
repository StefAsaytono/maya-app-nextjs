import { NextResponse } from "next/server"
import axios from 'axios';

type ResponseData = {
    responseCode: number
    responseStatus: string
    data?: []
}

export async function POST(req: Request) {
    const { platformType, sessionID } = await req.json()
    
    if(platformType && sessionID) {
        const response = await new Promise((resolve, reject) => {
            axios.get(`${process.env.WAPI_URL}/api/v1/fastwin/wallet/psp/session?key=${process.env.AGATHA_KEY}&filter=1&platformType=${platformType}&sessionID=${sessionID}`).then((response: any) => {
                resolve({
                    responseCode: 200,
                    responseStatus: 'Success',
                    data: response.data.data.sessionResult
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