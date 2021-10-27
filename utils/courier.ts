import { CourierClient } from "@trycourier/courier";
const authorizationToken = process.env.COURIER_TOKEN;
export const courier = CourierClient({ authorizationToken });
