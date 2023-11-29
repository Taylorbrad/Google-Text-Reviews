import {collection, doc, getCountFromServer, setDoc} from "firebase/firestore";
import {db} from "@/firebase.config";
import {wrapRequestHandlerWorker} from "next/dist/experimental/testmode/server";

export default async function postReviewRequest(req, res) {

    //TODO: check for post request type

    // const {request} = req.headers;
    console.log(req.body)
    // console.log(request)

    const requestJSON = JSON.parse(req.body)

    console.log(requestJSON)

    // const handle = requestJSON.handle.toString()
    // delete requestJSON.handle;

    const dataCol = await doc(collection(db, "Review-Requests"))

    await setDoc(dataCol, requestJSON)



    res.status(200).json(
        {
            fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        }
    )
}
