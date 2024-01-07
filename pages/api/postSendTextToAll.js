import {collection, doc, getCountFromServer, getDocs, query, setDoc, where} from "firebase/firestore";
// import firebase from "firebase/compat";
// import firebase from "firebase.firestore";
import {db} from "config/firebase.config";
import {twilioClient} from "config/twilio.config"



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

        let i = 1;

        async function test() {
            // doc.data() is never undefined for query doc snapshots

            try {
                await twilioClient.messages
                    .create({
                        body: 'Text Test ' + i,
                        from: '+18669539161',
                        to: doc.data().phone,
                    })
                    .then(message => console.log(message.sid))
            } catch (e) {
                console.log(e)
            }


            console.log("Send To: " + doc.data().phone + ' test #' + i)

            // console.log(doc.id, " => ", doc.data());
            ++i
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            try {
                    twilioClient.messages
                    .create({
                        body: 'Text Test ' + i,
                        from: '+18669539161',
                        to: doc.data().phone,
                    })
                    .then(message => console.log(message.sid))

            } catch (e) {
                console.log(e)
            }

            console.log("Send To: " + doc.data().phone + ' test #' + i)

            // console.log(doc.id, " => ", doc.data());
            ++i
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
