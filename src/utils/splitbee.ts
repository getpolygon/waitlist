import splitbee from "@splitbee/web";

const splitbeeToken = process.env.NEXT_PUBLIC_SPLITBEE_TOKEN;
// prettier-ignore
splitbee.init({ token: splitbeeToken, disableCookie: true });

export default splitbee;
