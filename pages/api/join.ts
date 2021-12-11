import { serialize } from "cookie";
import { NextApiHandler } from "next";
import { isEqual, isNil } from "lodash";
import { courier } from "../../utils/courier";
import { signInAnonymously } from "@firebase/auth";
import Response, { Status } from "../../utils/Response";
import { email as emailPattern } from "../../utils/patterns";
import { authentication, firestore } from "../../utils/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const nodeEnv = process.env.NODE_ENV;
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const courierBrand = process.env.COURIER_BRAND_ID;
const courierEvent = process.env.COURIER_EVENT_ID;
const collectionName = process.env.FIREBASE_COLLECTION_NAME;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    // If email was not provided
    if (isNil(email)) {
      return res
        .status(400)
        .json(Response(Status.ERR, "Email was not provided"));
    }

    // If the email is valid
    if (emailPattern.exec(email)) {
      try {
        await signInAnonymously(authentication);

        // Querying the document
        // prettier-ignore
        const existingDocSnapshot = await getDocs(query(collection(firestore, collectionName!!), where("email", "==", email)));

        // If there is an entry with the specified email
        if (!existingDocSnapshot.empty) {
          return res
            .status(403)
            .json(Response(Status.OK, "This email was already registered"));
        }

        // Add the document to firestore
        // prettier-ignore
        await addDoc(collection(firestore, collectionName!!), { email, createdAt: new Date() });

        // Only sending an email in production
        if (isEqual(nodeEnv, "production")) {
          // Send an email
          await courier.send({
            brand: courierBrand!!,
            eventId: courierEvent!!,
            recipientId: email,
            profile: {
              email,
            },
            override: {
              smtp: {
                config: {
                  auth: {
                    user: smtpUser!!,
                    pass: smtpPass!!,
                  },
                  host: smtpHost!!,
                  secure: true,
                  port: Number(smtpPort!!),
                },
              },
            },
          });
        }

        return res
          .status(200)
          .setHeader("Set-Cookie", serialize("joined", "true", { path: "/" }))
          .json(Response(Status.OK, "Successfully joined the waitlist"));
      } catch (error) {
        console.error(error);
        // Internal server error
        return res.status(500).json(Response(Status.ERR, "There was an error"));
      }
    }

    // If the email is invalid
    return res.status(400).json(Response(Status.ERR, "Invalid email"));
  }

  // No matching HTTP method
  return res.status(404).json(Response(Status.ERR, "Not Found"));
};

export default handler;
