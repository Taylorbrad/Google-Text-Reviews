import Cookies from 'cookies'
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase.config";

export default async function postReviewLink(req, res) {

    //TODO: check for post request type
    // const cookies = new Cookies(req, res)

    // console.log(req.body)
    const {linkId} = req.query;

    // console.log(link)

    // const linkIdJSON = JSON.parse(linkId)

    console.log(linkId)

    // const handle = requestJSON.handle.toString()
    // delete requestJSON.handle;

    // const dataCol = await doc(collection(db, "Review-Requests"))
    //
    // await setDoc(dataCol, requestJSON)

    // var cookie = Cookie("link", linkIdJSON);

    // res.status
    // res.status(200).headers({
    //
    // })

    //Testing cookies
    // cookies.set("link", linkIdJSON, {httpOnly: false})
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63211');
    // res.setHeader('Set-Cookie', [`link=${linkIdJSON};max-age=86400`]);
    // res.setHeader('Access-Control-Allow-Credentials', 'true')
    const docRef = doc(db, "Review-Requests-Public/" + linkId + "/Requests/init")
    const docSnapshot = await getDoc(docRef)
    let request = docSnapshot.data()

    console.log(request)

    if (request === undefined)
    {
        const dataCol = await doc(collection(db, "Review-Requests-Public/" + linkId + "/Requests"), "init")
        await setDoc(dataCol, {})
        res.status(200).json("New collection created for link")
        // res.status(404).json(
        //     {
        //         errorMessage: "No link id found: " + linkIdJSON
        //     }
        // )
    }
    else {
        res.status(200).json("Entry already exists")
    }



    // res.status(200).json(
            // `link=${linkIdJSON}`
            // fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        // )
    // res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

    // res.json( //Sends a JSON response with body
    //     {
    //         // "set-cookie": linkIdJSON,
    //         // fireStoreID: dataCol.id,
    //         // handle: requestJSON.handle
    //     }
    // )
}