import {collection, doc, getDoc, getDocs, where, orderBy, query} from "firebase/firestore";
import {db, printFirebaseConfig} from "config/firebase.config"
import {all} from "express/lib/application";
import NextCors from "nextjs-cors";

export default async function getConversation(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // const {q_requestID} = req.query
    // const {h_requestID} = req.headers

    // const requestID = h_requestID === undefined ? q_requestID : h_requestID

    // const userID = req.body.id;


    let contactList = []

    const q = query(collection(db, "Text-Conversation"), orderBy("whenAdded"))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        let newData =  doc.data()
        newData["id"] = doc.id

        contactList.push(newData)
    });

    // const allData = querySnapshot.docs.map((doc) => doc.data());
    // DocumentReference guy = null;

    // console.log(contactList)

    // const docRef = doc(db, "Text-Conversation" + userID + "Conversation")
    // const colSnapshot = await getDoc(docRef)

    // request = allData

    if (contactList.length === 0)
    {
        res.status(404).json(
            {
                errorMessage: "No contacts found "// + userID
            }
        )
    }
    else
    {
        res.status(200).json(
            {
                contacts: contactList
            }
        )
    }
}