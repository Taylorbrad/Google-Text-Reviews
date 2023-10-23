import {collection, doc, getCountFromServer, setDoc} from "firebase/firestore";
import {db} from "@/firebase.config";

export default async function postObject(req, res) {

    //TODO: check for post request type

    const {reviewRequest} = req.headers;
    const userJSON = JSON.parse(reviewRequest)

    // const handle = userJSON.handle.toString()
    // delete userJSON.handle;

    const dataCol = await doc(collection(db, "Review-Requests"))

    await setDoc(dataCol, userJSON)

    res.status(200).json(
        {
            fireStoreID: dataCol.id,
            // handle: userJSON.handle
        }
    )
}