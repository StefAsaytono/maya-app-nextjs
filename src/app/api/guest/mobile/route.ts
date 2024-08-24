import { NextResponse } from "next/server"
import axios from 'axios';
import xml2js from 'xml2js'

type ResponseData = {
    responseCode: number
    responseStatus: string
    data?: []
}

export async function POST(req: Request) {
    const { mobile } = await req.json()

    if(mobile) {
        let bodyData =`<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetGuestProfile_Remote_By_MobileNo xmlns="http://ws.instawin.ph/">
              <MobileNo>${mobile}</MobileNo>
              <ClientKey>${process.env.WEB_SERVICE_KEY}</ClientKey>
            </GetGuestProfile_Remote_By_MobileNo>
          </soap:Body>
        </soap:Envelope>`;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.WEB_SERVICE_MAIN}?op=GetGuestProfile_Remote_By_MobileNo`,
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
                        if(result["soap:Envelope"]["soap:Body"][0]["GetGuestProfile_Remote_By_MobileNoResponse"][0]["GetGuestProfile_Remote_By_MobileNoResult"][0]["diffgr:diffgram"][0]["NewDataSet"] === undefined) {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'Success',
                                data: []
                            })
                        }
                        else {
                            let resultArr = await result["soap:Envelope"]["soap:Body"][0]["GetGuestProfile_Remote_By_MobileNoResponse"][0]["GetGuestProfile_Remote_By_MobileNoResult"][0]["diffgr:diffgram"][0]["NewDataSet"][0]["Table"]
                            resolve({
                                responseCode: 200,
                                responseStatus: 'Success',
                                data: resultArr
                            })
                        }
                    }
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