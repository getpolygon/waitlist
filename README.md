# Polygon

Polygon is an upcoming open-source & privacy-oriented social network that is not hungry for your data. This repository contains the source code for the [waitlist website](https://polygon.am/) of Polygon

## Contributor guide

To contribute to the waitlist of polygon you will need to have the following:

- [Supabase](https://supabase.com/) account. **(Free)**
  - Go to `Database` > `Connection Pooling` > scroll down to `Connection string` at the bottom and copy the PostgreSQL connection string
- [Courier](https://courier.com/) account. **(Free)**
  - Make sure to [create a brand](https://help.courier.com/en/articles/4181342-customize-your-default-brand) at Courier.
  - Make sure to [create an event](https://help.courier.com/en/articles/4202416-how-to-create-and-map-event-triggers-for-your-notifications) at Courier.
- [Splitbee](https://splitbee.io/) account. **(Free)** | **(Optional)**
- [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) configuration from your email provider. **(Free / Paid)**

After completing the steps above, make sure to create a `.env.local` file in project root.

Environment configuration for Supabase PostgreSQL:

```txt
POSTGRES_URL="postgresql connection string"
# When deploying to services such as Vercel, make sure to specify a `GOOSE_DBSTRING` environment variable with the same value
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
