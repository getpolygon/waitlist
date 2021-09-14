import Head from "next/head";
import { useState } from "react";
import cookies from "next-cookies";
import splitbee from "@splitbee/web";
import { collection, getDocs } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";

import Links from "../components/Links";
import { fst as firestore } from "../utils/firebase";
import JoinedWaitlist from "../components/JoinedWaitlist";
import WaitlistCounter from "../components/WaitlistCounter";
import JoinWaitlistForm from "../components/JoinWaitlistForm";

const { NEXT_PUBLIC_SPLITBEE_TOKEN: splitbeeToken } = process.env;

splitbee.init({
  disableCookie: true,
  token: splitbeeToken,
});

splitbee.track("Visits");

type Props = {
  count: number;
  joined: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { joined } = cookies(ctx);
  const { NODE_ENV: env } = process.env;
  const { size: count } = await getDocs(
    collection(firestore, env === "production" ? "waitlist" : "waitlist-dev")
  );
  return {
    props: {
      count,
      joined: JSON.parse((joined as any) || false),
    },
  };
};

const Home: NextPage<Props> = ({ count, joined: __joined }) => {
  const [joined, setJoined] = useState<boolean>(__joined);

  return (
    <>
      <Head>
        <title>Polygon</title>
        <meta name="title" content="Polygon" />
        <meta
          name="description"
          content="A new, modern, and private social network that is not hungry for your data"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Polygon" />
        <meta property="og:url" content="https://polygon.am/" />
        <meta property="og:image" content="https://polygon.am/banner.png" />
        <meta
          property="og:description"
          content="A new, modern, and private social network that is not hungry for your data"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://polygon.am/" />
        <meta property="twitter:title" content="Polygon" />
        <meta
          property="twitter:description"
          content="A new, modern, and private social network that is not hungry for your data"
        />
        <meta
          property="twitter:image"
          content="https://polygon.am/banner.png"
        />
      </Head>

      <Flex p={4} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Box maxW={"xl"}>
          <Stack spacing={6}>
            <Box userSelect={"none"}>
              <Text
                fontSize={"6xl"}
                color={"purple.400"}
                fontFamily={"ubuntu"}
                fontWeight={"semibold"}
              >
                Polygon
              </Text>

              <Text fontFamily={"ubuntu"} fontSize={"lg"}>
                A new, modern and private social network that is not hungry for
                your data. Coming soon.
              </Text>
            </Box>

            <WaitlistCounter count={count} />

            {joined ? (
              <JoinedWaitlist />
            ) : (
              <JoinWaitlistForm setJoined={setJoined} />
            )}

            <Links />
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
