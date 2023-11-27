import Cookies from 'cookies'

export default async function getReviewLink(req, res) {
    // ALL THIS DOES CURRENTLY IS RETURN A LINK FROM THE REQUEST BACK AS A COOKIE
    // I MADE THIS FOR TESTING COOKIES

    //TODO: check for post request type
    const cookies = new Cookies(req, res)

    // console.log(req.body)
    const {link} = req.query;

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

    //Testing cookies
    // cookies.set("link", linkJSON, {httpOnly: false})
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63211');
    // res.setHeader('Set-Cookie', [`link=${linkJSON};max-age=86400`]);
    // res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.status(200).json(
            // `link=${linkJSON}`
            // fireStoreID: dataCol.id,
            // handle: requestJSON.handle
        )
    // res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);

    // res.json( //Sends a JSON response with body
    //     {
    //         // "set-cookie": linkJSON,
    //         // fireStoreID: dataCol.id,
    //         // handle: requestJSON.handle
    //     }
    // )
}