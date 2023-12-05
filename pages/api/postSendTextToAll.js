import {collection, doc, getCountFromServer, getDocs, query, setDoc, where} from "firebase/firestore";
// import firebase from "firebase/compat";
// import firebase from "firebase.firestore";
import {db} from "@/firebase.config";
import {twilioClient} from "twilio.config"



export default async function postSendTextToAll(req, res) {

    //TODO: check for post request type

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63211');

    try {
        // const requestJSON = JSON.parse(req.body)
        // console.log(requestJSON)

        // const dataCol = await doc(collection(db, "Review-Requests-Public/" + requestJSON["id"] + "/Requests"))
        // await setDoc(dataCol, requestJSON)

        const q = query(collection(db, "TextTest"), where("phone", "!=", null));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            twilioClient.messages
                .create({
                    body: 'Text Test',
                    from: '+18669539161',
                    to: '+18017062051'
                })
                .then(message => console.log(message.sid))

            console.log(doc.id, " => ", doc.data());
        });

        res.status(200).json(
            {
                // fireStoreID: dataCol.id,
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
