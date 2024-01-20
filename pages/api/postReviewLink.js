import Cookies from 'cookies'
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase.config";
import NextCors from "nextjs-cors";

export default async function postReviewLink(req, res) {

    //TODO: check for post request type
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const {linkId} = req.query;

    console.log(linkId)

    // res.setHeader('Set-Cookie', [`link=${linkIdJSON};max-age=86400`]);

    const docRef = doc(db, "Review-Requests-Public/" + linkId + "/Requests/init")
    const docSnapshot = await getDoc(docRef)
    let request = docSnapshot.data()

    console.log(request)

    if (request === undefined)
    {
        const dataCol = await doc(collection(db, "Review-Requests-Public/" + linkId + "/Requests"), "init")
        await setDoc(dataCol, {})
        res.status(200).json("New collection created for link")
    }
    else {
        res.status(200).json("Entry already exists")
    }
}