import { serialize } from "cookie";
import { NextApiHandler } from "next";
import { fst as firestore } from "../../utils/firebase";
import Response, { Status } from "../../utils/Response";
import { email as emailPattern } from "../../utils/patterns";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const { NODE_ENV: env } = process.env;
const collectionName = env === "production" ? "waitlist" : "waitlist-dev";

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
          // Checking if another entry with this email exists
          const existingDocQuery = query(
            collection(firestore, collectionName),
            where("email", "==", email)
          );
          const existingDocSnap = await getDocs(existingDocQuery);

          // If there is an entry with this email
          if (existingDocSnap.size === 1) {
            return res
              .status(403)
              .json(Response(Status.OK, "This email was already registered"));
          } else {
            // Add the document to firestore
            await addDoc(collection(firestore, collectionName), {
              email,
            });

            return res
              .status(200)
              .setHeader(
                "Set-Cookie",
                serialize("joined", "true", { path: "/" })
              )
              .json(Response(Status.OK, "Successfully joined the waitlist"));
          }
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
