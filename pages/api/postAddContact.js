import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";


export default async function postAddContact(req, res) {

    try {

        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        // let to = req.body.To
        const {to} = req.query;



        const numberDoc =  await doc(db, "Text-Conversation", to)
        const docSnapshot = await getDoc(numberDoc)
        let request = docSnapshot.data()

        if (request === undefined) {
            await setDoc(numberDoc, {whenAdded: Date.now(), contactName: ""})

            const conversationInitDoc = await doc(collection(db, "Text-Conversation/" + to + "/Conversation"))
            await setDoc(conversationInitDoc, {})
        }
        else {
            res.status(201).json("Contact not added: " + to + " already exists")
        }
        res.status(200).json("Contact Added: " + to)
    }
    catch (e) {
        res.status(500).json(e)
    }
}
