import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "config/firebase.config";

export default async function postReviewRequest(req, res) {

    //TODO: check for post request type

    // const {request} = req.headers;

    console.log(req.body)

    const requestJSON = JSON.parse(req.body)

    console.log(requestJSON)

    const dataCol = await doc(collection(db, "Review-Requests"))

    await setDoc(dataCol, requestJSON)

    // res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json(
        {
            fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        }
    )
}
