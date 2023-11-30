import {collection, doc, getCountFromServer, setDoc} from "firebase/firestore";
import {db} from "@/firebase.config";
import {wrapRequestHandlerWorker} from "next/dist/experimental/testmode/server";

export default async function postReviewRequestPublic(req, res) {

    //TODO: check for post request type

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63211');
    try {
        // const {request} = req.headers;
        // console.log(request)
        // const requestJSON = JSON.parse(request)
        // console.log(requestJSON)


        console.log(req.body)
        const requestJSON = JSON.parse(req.body)
        console.log(requestJSON)
        console.log(requestJSON["id"])

        // const handle = requestJSON.handle.toString()
        // delete requestJSON.handle;

        const dataCol = await doc(collection(db, "Review-Requests-Public/" + requestJSON["id"] + "/Requests"))

        await setDoc(dataCol, requestJSON)

        res.status(200).json(
            {
                fireStoreID: dataCol.id,
                // handle: requestJSON.handle
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
