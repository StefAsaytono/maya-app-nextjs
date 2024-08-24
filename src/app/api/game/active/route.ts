import { NextResponse } from "next/server"
import axios from 'axios';
import xml2js from 'xml2js'

export async function POST(req: Request) {
    const { guestExtID } = await req.json()

    if(guestExtID) {
        let bodyData =`<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <GetGuestProfile_Remote_Idx xmlns="http://ws.instawin.ph/">
                    <Idx>${guestExtID}</Idx>
                    <ClientKey>${process.env.WEB_SERVICE_KEY}</ClientKey>
                </GetGuestProfile_Remote_Idx>
            </soap:Body>
        </soap:Envelope>`;

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.WEB_SERVICE_MAIN}?op=GetGuestProfile_Remote_Idx`,
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
                        let data = result["soap:Envelope"]["soap:Body"][0]["GetGuestProfile_Remote_IdxResponse"][0]["GetGuestProfile_Remote_IdxResult"][0]["diffgr:diffgram"][0]["NewDataSet"][0]["Table"][0]
                        resolve({
                            responseCode: 200,
                            responseStatus: 'Success',
                            data: {
                                Idx: data.Idx === undefined ? '' : data.Idx[0],
                                FirstName: data.FirstName === undefined ? '' : data.FirstName[0],
                                MiddleName: data.MiddleName === undefined ? '' : data.MiddleName[0],
                                LastName: data.LastName === undefined ? '' : data.LastName[0],
                                ContactNo: data.ContactNo === undefined ? '' : data.ContactNo[0],
                                EmailAddress: data.EmailAddress === undefined ? '' : data.EmailAddress[0],
                                Username: data.Username === undefined ? '' : data.Username[0],
                                PasswordHash: data.PasswordHash === undefined ? '' : data.PasswordHash[0],
                                CardNo: data.CardNo === undefined ? '' : data.CardNo[0],
                                NetworkCode: data.NetworkCode === undefined ? '' : data.NetworkCode[0],
                                OutletRegistration: data.OutletRegistration === undefined ? '' : data.OutletRegistration[0],
                                LastSupplier: data.LastSupplier === undefined ? '' : data.LastSupplier[0],
                                LastTransaction: data.LastTransaction === undefined ? '' : data.LastTransaction[0],
                                LastAmount: data.LastAmount === undefined ? '' : data.LastAmount[0],
                                LastTransactionDate: data.LastTransactionDate === undefined ? '' : data.LastTransactionDate[0],
                                TempToken: data.TempToken === undefined ? '' : data.TempToken[0],
                                LastCashierAccount: data.LastCashierAccount === undefined ? '' : data.LastCashierAccount[0],
                                OutletIdx: data.OutletIdx === undefined ? '' : data.OutletIdx[0],
                                CardPin: data.CardPin === undefined ? '' : data.CardPin[0] ,
                                FundSource: data.FundSource === undefined ? '' : data.FundSource[0]
                            }
                        })
                    }
                })
            })
        })

        return NextResponse.json(response);
    }
    else {
        return NextResponse.json({
            responseCode: 400,
            responseStatus: 'Bad Request'
        })
    }
}