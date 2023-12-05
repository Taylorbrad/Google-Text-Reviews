import {collection, doc, getCountFromServer, setDoc} from "firebase/firestore";
import {db} from "config/firebase.config";
import {wrapRequestHandlerWorker} from "next/dist/experimental/testmode/server";

export default async function postReviewRequestPublic(req, res) {

    //TODO: check for post request type

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63211');

    try {
        const requestJSON = JSON.parse(req.body)
        console.log(requestJSON)

        const dataCol = await doc(collection(db, "Review-Requests-Public/" + requestJSON["id"] + "/Requests"))

        await setDoc(dataCol, requestJSON)

        res.status(200).json(
            {
                fireStoreID: dataCol.id,
            }
        )
    } catch (e) {
        console.log(e)
        res.status(500).json(
            {
                message: "Internal server error"
            }
        )
    }


}
