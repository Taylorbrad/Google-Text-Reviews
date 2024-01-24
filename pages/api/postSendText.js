// import {twilioClient} from "big.config";
import {twilioClient} from "config/twilio.config"
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";

export default async function postSendText(req, res) {

    try {
        let from
        let to = req.body.To
        let body = req.body.Body
        let username = req.body.username

        // For some reason, the preflight check OPTIONS request fails on this route only
        // so this NextCors chunk ensures that it responds to OPTIONS requests with a success code.
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        const userDoc =  await doc(db, `Texting-User/${username}`)
        const docSnap = await getDoc(userDoc)
        let request = docSnap.data()

        if (request !== undefined)
        {
            if (request.number === '') {
                res.status(202).json('No phone number found for this user')
                return
            }
            else
            {
                from = request.number
            }
        }
        else
        {
            res.status(202).json('User not found')
            return
        }

        // console.log('after response: ' + from)



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

        const numberDoc =  await doc(db, `Texting-User/${username}/Contacts/`, to)
        const docSnapshot = await getDoc(numberDoc)
        let request2 = docSnapshot.data()

        if (request2 === undefined) {
            let request2 = await fetch(`http://localhost:3000/api/postAddContact?to=${to}&username=${username}`)
            console.log(request2.status)
        }



        const dataCol = await doc(collection(db, `Texting-User/${username}/Contacts/` + to + "/Conversation"))
        await setDoc(dataCol, textJSON)


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
