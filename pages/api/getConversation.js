import {collection, doc, getDoc, getDocs, query, where,} from "firebase/firestore";
import {db, printFirebaseConfig} from "config/firebase.config"
import {all} from "express/lib/application";

export default async function getReviewRequest(req, res) {

    // const {q_requestID} = req.query
    // const {h_requestID} = req.headers

    // const requestID = h_requestID === undefined ? q_requestID : h_requestID

    const conversationID = req.body.id;

    let messageList = []

    let phoneNumber = "+14355900217"

    console.log(phoneNumber.substring(2,5) + '-' + phoneNumber.substring(5,8) + '-' + phoneNumber.substring(8,12))
    // const query = query()
    const querySnapshot = await getDocs(collection(db, "Text-Conversation", conversationID, "Conversation" ));

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        messageList.push(doc.data())
    });
    // const allData = querySnapshot.docs.map((doc) => doc.data());
    // DocumentReference guy = null;

    console.log(messageList)

    // const docRef = doc(db, "Text-Conversation" + conversationID + "Conversation")
    // const colSnapshot = await getDoc(docRef)

    // request = allData

    if (messageList.length === 0)
    {
        res.status(404).json(
            {
                errorMessage: "No messages found for " + conversationID
            }
        )
    }
    else
    {
        res.status(200).json(
            {
                messages: messageList
            }
        )
    }
}