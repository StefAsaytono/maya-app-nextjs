import CryptoJS from "crypto-js"

export function GenerateString(length: number) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function EncryptURL(data: string) {
    const srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
    const encrypted = CryptoJS.AES.encrypt(srcs,
        CryptoJS.enc.Utf8.parse("8080808080808080"), {
            iv: CryptoJS.enc.Utf8.parse("8080808080808080"),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            keySize: 256,
            blockSize: 128
        }
    )
    
    return encrypted.toString()
}