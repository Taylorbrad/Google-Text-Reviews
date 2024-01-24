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
import {collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where} from "firebase/firestore";
import {db} from "../../config/firebase.config";

export default async function postReceiveText(req, res) {

  //TODO: check for post request type

  // const {linkId} = req.query;

  // console.log(req.body.Body)
  console.log(req.body.From)

  let phoneNumber = req.body.From
  let username
  // let username = req.body.username

  phoneNumber = phoneNumber.substring(2,5) + '-' + phoneNumber.substring(5,8) + '-' + phoneNumber.substring(8,12)
  // phoneNumber =

  // res.setHeader('Set-Cookie', [`link=${linkIdJSON};max-age=86400`]);
  // const docRef = doc(db, "Review-Requests-Public/" + linkId + "/Requests/init")
  // const docSnapshot = await getDoc(docRef)
  // let request = docSnapshot.data()

  let textJSON = {
    body: req.body.Body,
    timestamp: Date.now(),
    type: "incoming"
  }

  const q = query(collection(db, `Texting-User`), where("number", "==", phoneNumber), limit(1))
  // const q = query(collection(db, `Texting-User/${username}/Contacts`, conversationID, "Conversation" ), orderBy("timestamp"), /*limit(6)*/)
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {

    username = doc.id
  });

  const dataCol = await doc(collection(db, `Texting-User/${username}/Contacts/` + phoneNumber + "/Conversation"))

  await setDoc(dataCol, textJSON)

  // console.log(request)
  res.status(200).json("")

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
