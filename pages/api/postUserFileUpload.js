// import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "@/firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {collection, doc, setDoc} from "firebase/firestore";

export default async function postReviewRequest(req, res) {

    //TODO: check for post request type

    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    // res.setHeader('Access-Control-Allow-Headers', "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, request" );

    // console.log(req.body)
    // string test = req.body


    const requestJSON = JSON.parse(req.body)
    const {file} = requestJSON;
    // console.log(body)
    // const array = new Uint8Array(new TextEncoder("utf-8").encode(file))

    console.log(requestJSON)
    // console.log(req.body.)
    // console.log(file)
    // console.log(array)



    // console.log(body)
    // console.log(requestJSON)
    const bytes = new Uint8Array(file)
    //
    // console.log(bytes)
    //

    const fileName = requestJSON.file_name
    const filePath = requestJSON.id + "/" + fileName;

    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, bytes).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });



    let fileDownloadUrl = ""

    await getDownloadURL(ref(storage, filePath))
        .then((url) => {
            fileDownloadUrl = url
        })

    console.log(filePath)
    console.log(fileDownloadUrl)


    const jsonDocumentToSave = {
        time_submitted: requestJSON.time_submitted,
        completed: requestJSON.completed,
        review_link: requestJSON.review_link,
        file_download: fileDownloadUrl
    }

    const dataCol = await doc(collection(db, "Review-Requests-Public/" + requestJSON.id + "/Files"), fileName)
    await setDoc(dataCol, jsonDocumentToSave)

    res.status(200).json(
        {
            storageUrl: fileDownloadUrl,
            // handle: requestJSON.handle
        }
    )

}
