import { NextResponse } from "next/server"
import axios from 'axios';
import xml2js from 'xml2js'

type ResponseData = {
    responseCode: number
    responseStatus: string
    data?: []
}

export async function GET() {
    let bodyData =`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ViewGenericCodes xmlns="http://ws.instawin.ph/">
                <GenericType>5</GenericType>
                <ClientKey>${process.env.WEB_SERVICE_KEY}</ClientKey>
            </ViewGenericCodes>
        </soap:Body>
    </soap:Envelope>`;
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.WEB_SERVICE_MAIN}?op=ViewGenericCodes`,
        headers: { 
            'Content-Type': 'text/xml'
        },
        data : bodyData
    };
    const response = await new Promise((resolve, reject) => {
        axios.request(config).then((response) => {
            xml2js.parseString(response.data, async (err, result) => {
                if(err) {
                    reject({
                        responseCode: 500,
                        responseStatus: 'Internal Server Error'
                    })
                }
                else {
                    resolve({
                        responseCode: 200,
                        responseStatus: 'sucess',
                        data: result["soap:Envelope"]["soap:Body"][0]["ViewGenericCodesResponse"][0]["ViewGenericCodesResult"][0]["diffgr:diffgram"][0]["NewDataSet"][0]["Table"]
                    })
                }
            })
        })
    })

    return NextResponse.json(response)
}