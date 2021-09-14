import Head from "next/head";
import splitbee from "@splitbee/web";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { Box, Flex, Text, Stack, chakra } from "@chakra-ui/react";

import { fst as firestore } from "../utils/firebase";
import JoinedWaitlist from "../components/JoinedWaitlist";
import JoinWaitlistForm from "../components/JoinWaitlistForm";
import WaitlistCounter from "../components/WaitlistCounter";

splitbee.init({
  disableCookie: true,
  token: process.env.NEXT_PUBLIC_SPLITBEE_TOKEN,
});

splitbee.track("Visits");

export type View = "JoinedWaitlist" | "JoinWaitlist";

type Props = {
  count: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { size: count } = await getDocs(collection(firestore, "waitlist"));
  return {
    props: {
      count,
    },
  };
};

const Home: NextPage<Props> = ({ count }) => {
  const [view, setView] = useState<View>("JoinWaitlist");

  useEffect(() => {
    typeof window !== "undefined" &&
      JSON.parse(localStorage.joined || null) === true &&
      setView("JoinedWaitlist");
  }, []);

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

            {view === "JoinWaitlist" ? (
              <JoinWaitlistForm setView={setView} />
            ) : (
              <JoinedWaitlist />
            )}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
