import { CourierClient, ICourierClient } from "@trycourier/courier";

const authorizationToken = process.env.COURIER_TOKEN;

export class Courier {
    public static __client: ICourierClient;

    public static createOrGet(): ICourierClient {
        if (typeof window !== "undefined") {
            throw new Error("usage of courier on client-side is forbidden");
        }

        // Checking if Courier client is undefined or null.
        if (!Courier.__client) {
            const courier = CourierClient({ authorizationToken });
            Courier.__client = courier;
        }

        return Courier.__client;
    }
}