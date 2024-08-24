import { NextResponse } from "next/server";
import axios from 'axios';
import xml2js from 'xml2js'


export async function POST(req: Request) {
    const { guestExtId, idType, idNo, idType2, idNo2, birthDate, occupation, source, emailAddress, contactNo, address } = await req.json()
    
    if(guestExtId && idType && idNo && birthDate && occupation && source && contactNo && emailAddress) {
        let bodyData =`<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <UpdateGuestProfile_Remote_Details xmlns="http://ws.instawin.ph/">
                <Idx>${guestExtId}</Idx>
                <BirthPlace>${birthDate}</BirthPlace>
                <ContactNo>${contactNo}</ContactNo>
                <EmailAddress>${emailAddress}</EmailAddress>
                <AddressLine>${address}</AddressLine>
                <IDType>${idType}$${source}</IDType>
                <IDNumber>${idNo}$${occupation}</IDNumber>
                <IDType2>${idType2}</IDType2>
                <IDNumber2>${idNo2}</IDNumber2>
                <UpdatedByUserIdx>${guestExtId}</UpdatedByUserIdx>
                <ClientKey>${process.env.WEB_SERVICE_KEY}</ClientKey>
            </UpdateGuestProfile_Remote_Details>
          </soap:Body>
        </soap:Envelope>`;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.WEB_SERVICE_MAIN}?op=GetGuestProfile_Remote`,
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
                            data: result["soap:Envelope"]["soap:Body"][0]["UpdateGuestProfile_Remote_DetailsResponse"][0]["UpdateGuestProfile_Remote_DetailsResult"][0]
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