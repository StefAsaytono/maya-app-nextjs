import { NextResponse } from "next/server"
import axios from 'axios';
import xml2js from 'xml2js'

export async function POST(req: Request) {
    const { supplierIdx, outletIdx, guestExtID, cashier, username, amount, refCode } = await req.json()

    if(supplierIdx && outletIdx && guestExtID && cashier && username && amount && refCode) {
        let bodyData =`<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <InsertGuestDeposits_Temp_Lobby xmlns="http://ws.instawin.ph/">
                    <SupplierIdx>${supplierIdx}</SupplierIdx>
                    <OutletIdx>${outletIdx}</OutletIdx>
                    <GuestExtID>${guestExtID}</GuestExtID>
                    <CashierAccount>${cashier}</CashierAccount>
                    <TerminalAccount>${username}</TerminalAccount>
                    <DepositAmount>${amount}</DepositAmount>
                    <ExtRefCode>${refCode}</ExtRefCode>
                    <CreatedByUsername>${cashier}</CreatedByUsername>
                    <OutletBalance>0</OutletBalance>
                    <ClientKey>${process.env.WEB_SERVICE_KEY}</ClientKey>
                </InsertGuestDeposits_Temp_Lobby>
            </soap:Body>
        </soap:Envelope>`;
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.WEB_SERVICE_MAIN}?op=InsertGuestDeposits_Temp_Lobby`,
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
                            responseStatus: 'Success',
                            data: result["soap:Envelope"]["soap:Body"][0]["InsertGuestDeposits_Temp_LobbyResponse"][0]["InsertGuestDeposits_Temp_LobbyResult"][0]
                        })
                    }
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