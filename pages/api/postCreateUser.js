import {twilioClient} from "config/twilio.config"
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";

export default async function postCreateUser(req, res) {

    try {

        const {username} = req.query

        // For some reason, the preflight check OPTIONS request fails on this route only
        // so this NextCors chunk ensures that it responds to OPTIONS requests with a success code.
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        const userDoc =  await doc(db, `Texting-User/${username}`)
        const docSnapshot = await getDoc(userDoc)
        let request = docSnapshot.data()

        if (request === undefined) {
            await setDoc(userDoc, {'number': ''})
            // let request2 = await fetch(`http://localhost:3000/api/postAddContact?to=${to}&username=${username}`)
            // console.log(request2.status)
            res.status(200).json(`User '${username}' created successfully`)
        }
        else
        {
            res.status(400).json("Username already exists")
        }

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}