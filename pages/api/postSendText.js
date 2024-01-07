// import {twilioClient} from "big.config";
import {twilioClient} from "config/twilio.config"
import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";

export default async function postSendText(req, res) {

    try {

        let body = 'Single Text Test'
        let from = '+18669539161'
        let to = '+14355900217'

        twilioClient.messages
            .create({
                body: body,
                from: from,
                to: to
            })
            .then(message => console.log(message.sid))

        let textJSON = {
            body: body,
            timestamp: Date.now(),
            type: "outgoing"
        }

        const dataCol = await doc(collection(db, "Text-Conversation/intermediate/Conversations"), to)
        await setDoc(dataCol, textJSON)

        res.status(200).json("sent")
    } catch (e) {
        res.status(500).json("Internal Server Error")
    }

}
