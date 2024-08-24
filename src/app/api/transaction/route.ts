import { NextResponse } from "next/server"
import axios from 'axios';
import xml2js from 'xml2js'

type ResponseData = {
    responseCode: number
    responseStatus: string
    data?: []
}
 
export async function POST(req: Request) {
    const { dateFrom, dateTo, username } = await req.json()

    let supplierId: number = 0
    let branchCode: string = 'ID$0'
    let networkCode: number = 0

    if(dateFrom && dateTo && username) {
        let bodyData =`<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <GetWebAllDeposits_Per_Game_2_MAP_Player xmlns="http://ws.instawin.ph/">
                    <SupplierID>${supplierId}</SupplierID>
                    <BranchCode>${branchCode}</BranchCode>
                    <DateFrom>${dateFrom}</DateFrom>
                    <DateTo>${dateTo}</DateTo>
                    <NetworkCode>${networkCode}</NetworkCode>
                    <Username>${username}</Username>
                    <ClientKey>${process.env.WEB_SERVICE_KEY}</ClientKey>
                </GetWebAllDeposits_Per_Game_2_MAP_Player>
            </soap:Body>
        </soap:Envelope>`;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.WEB_SERVICE_MAIN}?op=GetWebAllDeposits_Per_Game_2_MAP_Player`,
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
                        if(result["soap:Envelope"]["soap:Body"][0]["GetWebAllDeposits_Per_Game_2_MAP_PlayerResponse"][0]["GetWebAllDeposits_Per_Game_2_MAP_PlayerResult"][0]["diffgr:diffgram"][0]["NewDataSet"] === undefined) {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'Success',
                                data: []
                            })
                        }
                        else {
                            resolve({
                                responseCode: 200,
                                responseStatus: 'Success',
                                data: result["soap:Envelope"]["soap:Body"][0]["GetWebAllDeposits_Per_Game_2_MAP_PlayerResponse"][0]["GetWebAllDeposits_Per_Game_2_MAP_PlayerResult"][0]["diffgr:diffgram"][0]["NewDataSet"][0]["Table"]
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