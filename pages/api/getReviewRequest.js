import {collection, doc, getDoc, query, where,} from "firebase/firestore";
import {db, printFirebaseConfig} from "config/firebase.config"

export default async function getReviewRequest(req, res) {

    const {q_requestID} = req.query
    const {h_requestID} = req.headers

    const requestID = h_requestID === undefined ? q_requestID : h_requestID

    let request;

    // printFirebaseConfig()

    const docRef = doc(db, "Review-Requests", requestID)
    const docSnapshot = await getDoc(docRef)
    request = docSnapshot.data()

    if (request === undefined)
    {
        res.status(404).json(
            {
                errorMessage: "No request found with with ID: " + requestID
            }
        )
    }

    else
    {
        res.status(200).json(
            {
                request: request
            }
        )
    }
}