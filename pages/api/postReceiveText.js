// const express = require('express');
// const { MessagingResponse } = require('twilio').twiml;
//
// const app = express();
//
// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();
//
//   twiml.message('The Robots are coming! Head for the hills!');
//
//   res.type('text/xml').send(twiml.toString());
// });
//
// app.listen(https, () => {
//   console.log('Express server listening on port 3000');
// });

import Cookies from 'cookies'
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../firebase.config";

export default async function postReceiveText(req, res) {

  //TODO: check for post request type

  // const {linkId} = req.query;

  console.log(req)

  // res.setHeader('Set-Cookie', [`link=${linkIdJSON};max-age=86400`]);

  // const docRef = doc(db, "Review-Requests-Public/" + linkId + "/Requests/init")
  // const docSnapshot = await getDoc(docRef)
  // let request = docSnapshot.data()

  // console.log(request)

  // if (request === undefined)
  // {
  //   const dataCol = await doc(collection(db, "Review-Requests-Public/" + linkId + "/Requests"), "init")
  //   await setDoc(dataCol, {})
  //   res.status(200).json("New collection created for link")
  // }
  // else {
  //   res.status(200).json("Entry already exists")
  // }
}