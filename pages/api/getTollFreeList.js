
// import {twilioClient} from "big.config";
import {twilioClient} from "config/twilio.config"
// import {collection, doc, getDoc, setDoc} from "firebase/firestore";
// import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";

export default async function getTollFreeList(req, res) {

    try {
        // const accountSid = process.env.TWILIO_ACCOUNT_SID;
        // const authToken = process.env.TWILIO_AUTH_TOKEN;
        // const client = require('twilio')(accountSid, authToken);

        let numberList = []

        await twilioClient.availablePhoneNumbers('US')
            .tollFree
            .list({limit: 20})
            .then(tollFree => tollFree.forEach(t => numberList.push(t.friendlyName)));

        res.status(200).json({
            'List of numbers': numberList
        })
    } catch(e) {
    console.log(e)
    }
}


