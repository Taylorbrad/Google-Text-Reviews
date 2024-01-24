import {twilioClient} from "config/twilio.config"
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";

export default async function postLogin(req, res) {
    try {
        const {username} = req.query

        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        const userDoc =  await doc(db, `Texting-User/${username}`)
        const docSnapshot = await getDoc(userDoc)
        let request = docSnapshot.data()

        if (request === undefined)
        {
            res.status(202).json("User not found")
        }
        else {
            res.status(200).json(`Welcome ${username}`)
        }
    } catch (e) {
        res.status(500).json(e)
    }
}