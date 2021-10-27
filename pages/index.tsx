import Head from "next/head";
import { useEffect, useState } from "react";
import cookies from "next-cookies";
import Links from "../components/Links";
import splitbee from "../utils/splitbee";
import { firestore } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import JoinedWaitlist from "../components/JoinedWaitlist";
import WaitlistCounter from "../components/WaitlistCounter";
import JoinWaitlistForm from "../components/JoinWaitlistForm";
import { Box, Flex, Text, Stack, Alert } from "@chakra-ui/react";

type Props = {
  count: number;
  joined: boolean;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { joined } = cookies(ctx);
  const collectionName = process.env.FIREBASE_COLLECTION_NAME;

  const { size: count } = await getDocs(
    collection(firestore, collectionName!!)
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

  useEffect(() => {
    splitbee.track("Visits");
  }, []);

  return (
    <>
      <Head>
        <title>Polygon — Coming Soon</title>
      </Head>

      <Box>
        <Box top={0} position={"relative"}>
          <Alert variant={"top-accent"} colorScheme={"purple"}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Polygon becomes open-source after being maintained privately for
              more than a year!
            </Text>
          </Alert>
        </Box>

        <Box mt={[-4, -8, -14]}>
          <Flex
            p={4}
            h={"100vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
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
                    A new, modern and private social network that is not hungry
                    for your data. Coming soon.
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
        </Box>
      </Box>
    </>
  );
};

export default Home;
