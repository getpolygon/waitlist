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
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import pg from "utils/pg";
import { nth } from "lodash";
import cookies from "next-cookies";
import { NextSeo } from "next-seo";
import Links from "components/Links";
import splitbee from "utils/splitbee";
import { useEffect, useState } from "react";
import { useJoinedStore } from "stores/useJoinedStore";
import JoinedWaitlist from "components/JoinedWaitlist";
import WaitlistCounter from "components/WaitlistCounter";
import type { GetServerSideProps, NextPage } from "next";
import JoinWaitlistForm from "components/JoinWaitlistForm";
import { GithubRelease, MemoizedReleaseList } from "components/ReleaseList";

interface Props {
  count: number;
  joined: boolean;
}

// prettier-ignore
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { joined } = cookies(ctx);
  const { rows: data } = await pg.query("SELECT COUNT(*) FROM waitlist;");

  return {
    props: {
      count: nth(data, 0).count,
      // releases,
      joined: JSON.parse(joined!! || (false as any)),
    },
  };
};

const Home: NextPage<Props> = ({ count, joined: __joined }) => {
  const toast = useToast();
  const joined = useJoinedStore((state) => state.joined || __joined);
  // prettier-ignore
  const [{ fetching, releases }, setState] = useState<{ fetching: boolean, releases: GithubRelease[] }>({ fetching: true, releases: [] });

  useEffect(() => {
    // Fetching `core` releases
    const fetchCoreReleases = async () => {
      try {
        // prettier-ignore
        const { data } = await axios.get<GithubRelease[]>("https://api.github.com/repos/polygon-isecure/core/releases");
        return setState({ fetching: false, releases: data });
      } catch (error) {
        console.error(error);
        return toast({
          status: "error",
          title: "There was an error",
          description: "We couldn't fetch the releases of core repository",
        });
      }
    };

    fetchCoreReleases();
    splitbee.track("Main page visits");
  }, [toast]);

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
          <Alert variant={"solid"} colorScheme={"purple"}>
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
                <Box>
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

                {/* Number of people that joined the waitlist */}
                <WaitlistCounter count={count} />

                {joined ? <JoinedWaitlist /> : <JoinWaitlistForm />}

                {/* Related links */}
                <Links />

                <Divider />

                <Box>
                  <Stack spacing={4}>
                    {/* Link with keyboard style */}
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      <chakra.a
                        color={"purple.200"}
                        href={"https://github.com/polygon-isecure/core"}
                      >
                        <Kbd>core</Kbd>
                      </chakra.a>{" "}
                      releases
                    </Text>

                    {/* For displaying the list of GitHub releases */}
                    {fetching ? (
                      <Center>
                        <Spinner colorScheme={"purple"} />
                      </Center>
                    ) : (
                      <MemoizedReleaseList releases={releases} />
                    )}
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
