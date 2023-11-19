import {collection, doc, getCountFromServer, setDoc} from "firebase/firestore";
import {db} from "@/firebase.config";
import {wrapRequestHandlerWorker} from "next/dist/experimental/testmode/server";

export default async function postReviewRequest(req, res) {

    //TODO: check for post request type

    const {request} = req.headers;

    console.log(request)

    const requestJSON = JSON.parse(request)


    console.log(requestJSON)

    // const handle = requestJSON.handle.toString()
    // delete requestJSON.handle;

    const dataCol = await doc(collection(db, "Review-Requests-Public"))

    await setDoc(dataCol, requestJSON)

    res.status(200).json(
        {
            fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        }
    )
}