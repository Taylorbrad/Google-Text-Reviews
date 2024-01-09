// import {twilioClient} from "big.config";
import {twilioClient} from "config/twilio.config"
import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";

export default async function postSendText(req, res) {

    try {

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

        const dataCol = await doc(collection(db, "Text-Conversation/" + to + "/Conversation"))
        await setDoc(dataCol, textJSON)

        res.status(200).json("sent")
    } catch (e) {
        console.log("Error")
        res.status(500).json("Internal Server Error")
    }

}
