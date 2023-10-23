import {collection, doc, getDoc, getDocs, query, where,} from "firebase/firestore";
import {db} from "firebase.config"

export default async function getReviewRequest(req, res) {

    const {q_requestID} = req.query
    const {h_requestID} = req.headers

    const requestID = h_requestID === undefined ? q_requestID : h_requestID

    let request;

    const docRef = doc(db, "Review-Requests", requestID)
    const docSnapshot = await getDoc(docRef)
    request = docSnapshot.data()


    // Logic for querying is below:

    // const q = query(collection(db, "user"), where("id", "==", username));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     user = doc.data()
    // });

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


    //Construct response below

}