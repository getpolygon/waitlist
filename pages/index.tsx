import {
  META_DESCRIPTION,
  META_TITLE,
  SITE_NAME,
  TYPE,
  WEBSITE_URL,
} from "../constants";
import {
  Box,
  Flex,
  Text,
  Stack,
  Alert,
  Divider,
  Kbd,
  chakra,
} from "@chakra-ui/react";
import axios from "axios";
import cookies from "next-cookies";
import { NextSeo } from "next-seo";
import Links from "../components/Links";
import splitbee from "../utils/splitbee";
import { useEffect, useState } from "react";
import { signInAnonymously } from "@firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import JoinedWaitlist from "../components/JoinedWaitlist";
import WaitlistCounter from "../components/WaitlistCounter";
import JoinWaitlistForm from "../components/JoinWaitlistForm";
import { authentication, firestore } from "../utils/firebase";
import { GithubRelease, ReleaseList } from "../components/ReleaseList";

interface HomeProps {
  count: number;
  joined: boolean;
  releases: GithubRelease[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const { joined } = cookies(ctx);
  const collectionName = process.env.FIREBASE_COLLECTION_NAME;

  const [_, { size: count }, { data: releases }] = await Promise.all([
    // Authenticating firebase
    await signInAnonymously(authentication),
    await getDocs(collection(firestore, collectionName!!)),
    // Fetching `core` releases
    // prettier-ignore
    await axios.get<GithubRelease[]>("https://api.github.com/repos/polygon-isecure/core/releases"),
  ]);

  return {
    props: {
      count,
      releases,
      joined: JSON.parse(joined!! || (false as any)),
    },
  };
};

const Home: NextPage<HomeProps> = ({ count, joined: __joined, releases }) => {
  const [joined, setJoined] = useState<boolean>(__joined);

  useEffect(() => {
    splitbee.track("visits");
  }, []);

  return (
    <>
      <NextSeo
        title={META_TITLE}
        description={META_DESCRIPTION}
        openGraph={{
          type: TYPE,
          url: WEBSITE_URL,
          title: META_TITLE,
          site_name: SITE_NAME,
          description: META_DESCRIPTION,
          // prettier-ignore
          images: [{ url: "https://polygon.am/banner.png" }],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Box h={"100vh"}>
        <Box top={0} position={"relative"}>
          <Alert variant={"top-accent"} colorScheme={"purple"}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Polygon becomes open-source after being maintained privately for
              more than a year!
            </Text>
          </Alert>
        </Box>

        <Box mt={[0, 24, 28]}>
          <Flex p={4} alignItems={"center"} justifyContent={"center"}>
            <Box maxW={"xl"}>
              <Stack spacing={6}>
                <Box userSelect={"none"}>
                  <Text
                    fontSize={"6xl"}
                    color={"purple.400"}
                    fontWeight={"semibold"}
                  >
                    Polygon
                  </Text>

                  <Text fontSize={"lg"}>
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
                <Divider />

                <Box>
                  <Stack spacing={4}>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      <chakra.a
                        color={"purple.200"}
                        href={"https://github.com/polygon-isecure/core"}
                      >
                        <Kbd>core</Kbd>
                      </chakra.a>{" "}
                      releases
                    </Text>

                    <ReleaseList releases={releases} />
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
