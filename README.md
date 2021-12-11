# Polygon

Polygon is an upcoming open-source & privacy-oriented social network that is not hungry for your data. This repository contains the source code for the [waitlist website](https://polygon.am/) of Polygon

## Contributor guide

To contribute to the waitlist of polygon you will need to have the following:

- [Firebase](https://firebase.com/) account. **(Free)**
    - You will need to enable anonymous [Firebase Authentication](https://firebase.google.com/docs/auth) and create a new [Firestore Database](https://firebase.google.com/docs/firestore) from the Firebase control panel
- [Courier](https://courier.com/) account. **(Free)**
    - Make sure to [create a brand](https://help.courier.com/en/articles/4181342-customize-your-default-brand) at Courier.
    - Make sure to [create an event](https://help.courier.com/en/articles/4202416-how-to-create-and-map-event-triggers-for-your-notifications) at Courier.
- [Splitbee](https://splitbee.io/) account. **(Free)** | **(Optional)**
- [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) configuration from your email provider.  **(Free / Paid)**

After completing the steps above, make sure to create a `.env.local` file in project root.

Environment configuration for Firebase:
```txt
NEXT_PUBLIC_FIREBASE_APP_ID="firebase app id"
NEXT_PUBLIC_FIREBASE_API_KEY="firebase api key"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="firebase project id"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="firebase auth domain"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="firebase storage bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="firebase messaging sender id"
FIREBASE_COLLECTION_NAME="firebase collection name to store records in"
```

for Courier:
```
COURIER_TOKEN="courier api token"
COURIER_BRAND_ID="courier brand id"
COURIER_EVENT_ID="courier event id"
```

for SMTP:
```
SMTP_PORT=123
SMTP_PASS="somepassword"
SMTP_USER="someone@polygon.am"
SMTP_HOST="smtp.yourdomain.com"
```

for Splitbee (Optional):
```
# Splitbee configuration (Optional)
# NEXT_PUBLIC_SPLITBEE_TOKEN="splitbee token"
```
