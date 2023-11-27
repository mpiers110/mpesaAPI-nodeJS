const axios = require('axios');
const moment = require('moment');
require('dotenv').config()

let token;
const createToken = async (req, res, next)=>{
    const auth = new Buffer.from(`${process.env.MPESA_API_CONSUMER_KEY}:${process.env.MPESA_API_CONSUMER_SECRET}`).toString("base64");
    await axios.get(process.env.MPESA_API_AUTHENTICATION_URL, {
        headers: {
            authorization: `Basic ${auth}`
        }
    })
    .then((data)=>{
        token = data.data.access_token;        
        next()
    })
    .catch((error)=>{
        console.error(error)
        res.status(400).json(error.message);
    })
};

const stkPush = async (req, res,)=>{
    const timestamp = moment().format('YYYYMMDDHHmmss')
    const phoneNumber = await req.body.phoneNumber && req.body.phoneNumber.substring(1);
    const amount = req.body.amount;
    const accountReference = req.body.accountReference;
    const password = new Buffer.from(process.env.MPESA_API_BUSINESS_SHORTCODE + process.env.MPESA_API_PASSKEY + timestamp).toString("base64")
    const requestBody = {    
        "BusinessShortCode": process.env.MPESA_API_BUSINESS_SHORTCODE,    
        "Password": password,    
        "Timestamp":timestamp,    
        "TransactionType": "CustomerPayBillOnline",//"CustomerBuyGoodsOnline",    
        "Amount": amount,    
        "PartyA": `254${phoneNumber}`,    
        "PartyB": process.env.MPESA_API_BUSINESS_SHORTCODE,    
        "PhoneNumber":`254${phoneNumber}`,    
        "CallBackURL": process.env.CALLBACK_URL,    
        "AccountReference": accountReference,    
        "TransactionDesc":"Test"
    }
    await axios.post(process.env.MPESA_API_STKPUSH_REQUEST_URL, requestBody, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then((data)=>{
        console.log(data.data);
    })
    .catch((error)=>{
        console.error(error)
        res.status(400).json(error.message);
    })
}

module.exports={ createToken, stkPush};