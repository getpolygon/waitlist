import { CourierClient } from "@trycourier/courier";
const { COURIER_TOKEN: authorizationToken } = process.env;
export const courier = CourierClient({ authorizationToken });
