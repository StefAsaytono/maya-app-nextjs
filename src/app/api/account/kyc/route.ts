import { NextResponse } from "next/server"
import axios from 'axios';

type ResponseData = {
    responseCode: number
    responseStatus: string
    data?: []
}

export async function POST(req: Request) {
    const { guestExtId } = await req.json()

    if(guestExtId) {
        const response = await new Promise((resolve, reject) => {
            axios.get(`${process.env.WAP_URL}/api/v1/cams/fastwin/accounts/kyc/level-v2?platform=FW&guestIdx=${guestExtId}`, {
                headers: {
                    "x-api-key": process.env.AGATHA_KEY
                }
            }).then((response: any) => {
                resolve({
                    responseCode: 200,
                    responseStatus: 'Success',
                    data: response.data.data
                })
            }).catch((err: any) => {
                console.log(err)
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