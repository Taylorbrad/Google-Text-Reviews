import {twilioClient} from "../../twilio.config";

export default async function postSendText(req, res) {

    try {
        twilioClient.messages
            .create({
                body: 'Single Text Test',
                from: '+18669539161',
                to: '+14355900217'
            })
            .then(message => console.log(message.sid))

        res.status(200).json("sent")
    } catch (e) {
        res.status(500).json("Internal Server Error")
    }

    

}
