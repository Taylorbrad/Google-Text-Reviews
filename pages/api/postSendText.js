// import {twilioClient} from "big.config";
import {twilioClient} from "config/twilio.config"
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";

export default async function postSendText(req, res) {

    try {

        // For some reason, the preflight check OPTIONS request fails on this route only
        // so this NextCors chunk ensures that it responds to OPTIONS requests with a success code.
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        let body = req.body.Body
        let from = '+18669539161'
        let to = req.body.To

        let message = await twilioClient.messages
            .create({
                body: body,
                from: from,
                to: to
            })


            // .then(message => {
            //     console.log(mesage.status)
            //     if (message.status !== "delivered") {throw Error("Message not sent")}
            // }/*console.log(message.sid)*/)

        let textJSON = {
            body: body,
            timestamp: Date.now(),
            type: "outgoing"
        }
        const numberDoc =  await doc(db, "Text-Conversation", to)
        const docSnapshot = await getDoc(numberDoc)
        let request = docSnapshot.data()

        if (request === undefined) {
            let request2 = await fetch(`http://localhost:3000/api/postAddContact?to=${to}`)
            console.log(request2.status)
        }



        const dataCol = await doc(collection(db, "Text-Conversation/" + to + "/Conversation"))
        await setDoc(dataCol, textJSON)

        // console.log(message.status)

        res.status(200).json("sent")

    } catch (e) {
        if (req.body.Body == undefined || req.body.To == undefined)
        {
            console.log("Message body or Recipient is undefined")
            res.status(400).json("Message body or Recipient is undefined")
        }
        else
        {
            console.log(e)
            res.status(500).json(e)
        }

    }

}
