import {collection, doc, setDoc} from "firebase/firestore";

export default async function getReviewLink(req, res) {

    //TODO: check for post request type

    const {link} = req.headers;

    console.log(link)

    const linkJSON = JSON.parse(link)

    // console.log(requestJSON)

    // const handle = requestJSON.handle.toString()
    // delete requestJSON.handle;

    // const dataCol = await doc(collection(db, "Review-Requests"))
    //
    // await setDoc(dataCol, requestJSON)

    res.headers.json({
        "set-cookie": linkJSON,
    })
    res.status(200).json(
        {
            // fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        }
    )
}