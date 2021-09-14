import Head from "next/head";
import type { NextPage } from "next";
import splitbee from "@splitbee/web";
import JoinedWaitlist from "../components/JoinedWaitlist";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import JoinedWaitlistForm from "../components/JoinWaitlistForm";
import { useEffect, useState } from "react";
import JoinWaitlistForm from "../components/JoinWaitlistForm";

splitbee.init({
  disableCookie: true,
  token: process.env.NEXT_PUBLIC_SPLITBEE_TOKEN,
});

splitbee.track("Visits");

export type View = "JoinedWaitlist" | "JoinWaitlist";

const Home: NextPage = () => {
  const [view, setView] = useState<View>("JoinWaitlist");

  useEffect(() => {
    typeof window !== "undefined" &&
      JSON.parse(localStorage.joined || null) === true &&
      setView("JoinedWaitlist");
  }, []);

  return (
    <>
      <Head>
        <title>Polygon — Coming Soon</title>
        <meta
          name={"description"}
          content={
            "A new, modern and private social network that is not hungry for your data"
          }
        />
      </Head>

      <Flex p={4} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Box maxW={"xl"}>
          <Stack spacing={8}>
            <Box userSelect={"none"}>
              <Text
                fontSize={"6xl"}
                color={"purple.400"}
                fontFamily={"ubuntu"}
                fontWeight={"semibold"}
                // fontSize={["2xl", "4xl", "6xl"]}
              >
                Polygon
              </Text>

              <Text fontFamily={"ubuntu"} fontSize={"lg"}>
                A new, modern and private social network that is not hungry for
                your data. Coming soon.
              </Text>
            </Box>

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
