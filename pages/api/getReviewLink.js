import {collection, doc, setDoc} from "firebase/firestore";
import {Cookie} from "next/dist/compiled/@next/font/dist/google";
import {headers} from "next/headers";

export default async function getReviewLink(req, res) {

    //TODO: check for post request type

    const {link} = req.headers;

    // console.log(link)

    const linkJSON = JSON.parse(link)

    console.log(linkJSON)

    // const handle = requestJSON.handle.toString()
    // delete requestJSON.handle;

    // const dataCol = await doc(collection(db, "Review-Requests"))
    //
    // await setDoc(dataCol, requestJSON)

    // var cookie = Cookie("link", linkJSON);

    // res.status
    // res.status(200).headers({
    //
    // })
    res.status(200).json(
        {
            "set-cookie": linkJSON,
            // fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        }
    )
}