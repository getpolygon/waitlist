import { NextApiHandler } from "next";
import { fst as firestore } from "../../utils/firebase";
import Response, { Status } from "../../utils/Response";
import { collection, addDoc } from "firebase/firestore";
import { email as emailPattern } from "../../utils/patterns";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);

    if (!email) {
      return res
        .status(400)
        .json(Response(Status.ERR, "Email was not provided"));
    } else {
      if (emailPattern.exec(email)) {
        try {
          // Insert the new email to the waitlist table
          await addDoc(collection(firestore, "waitlist"), {
            email,
          });

          return res
            .status(200)
            .json(Response(Status.OK, "Successfully joined the waitlist"));
        } catch (error) {
          console.error(error);

          return res
            .status(500)
            .json(Response(Status.ERR, "There was an error"));
        }
      } else return res.status(400).json(Response(Status.ERR, "Invalid email"));
    }
  } else return res.status(404).json(Response(Status.ERR, "Not Found"));
};

export default handler;
