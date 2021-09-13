import {
  Box,
  Center,
  Flex,
  Text,
  Button,
  Link,
  Stack,
  chakra,
} from "@chakra-ui/react";
import Head from "next/head";
import splitbee from "@splitbee/web";
import type { NextPage } from "next";
import { SiGoogleanalytics } from "react-icons/si";

splitbee.init({
  disableCookie: true,
  token: process.env.NEXT_PUBLIC_SPLITBEE_TOKEN,
});

splitbee.track("Visits");

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Polygon — Coming Soon</title>
        <link rel={"preload preconnect"} href={"https://fonts.gstatic.com"} />
        <link
          rel={"preload preconnect"}
          href={"https://fonts.googleapis.com"}
        />
        <link
          rel={"stylesheet"}
          href={"https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"}
        />
        <meta
          name={"description"}
          content={
            "A new, modern and private social network that is not hungry for your data"
          }
        />
      </Head>

      <Box h={"100vh"} w={"full"}>
        <Flex h={"full"} alignItems={"center"} justifyContent={"center"}>
          <Box
            p={4}
            m={8}
            rounded={"2xl"}
            boxShadow={"xl"}
            userSelect={"none"}
            border={"3px solid"}
            bgColor={"gray.800"}
            borderColor={"purple.400"}
          >
            <Stack spacing={4}>
              <Center>
                <Text
                  color={"purple.400"}
                  fontFamily={"ubuntu"}
                  fontSize={["4xl", "5xl", "6xl"]}
                >
                  polygon
                </Text>
              </Center>

              <Center>
                <Box maxW={"lg"}>
                  <Text
                    textAlign={"center"}
                    fontFamily={"ubuntu"}
                    fontSize={["sm", "lg", "xl"]}
                  >
                    <chakra.span color={"purple.400"}>New</chakra.span>,{" "}
                    <chakra.span color={"purple.400"}>modern</chakra.span>, and{" "}
                    <chakra.span color={"purple.400"}>private</chakra.span>{" "}
                    social network that is not hungry for your data and personal
                    life, coming soon.
                  </Text>
                </Box>
              </Center>

              <Stack mt={4}>
                <Center>
                  <Link
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                    href={"https://app.splitbee.io/public/polygon.am"}
                  >
                    <Button
                      size={"sm"}
                      colorScheme={"yellow"}
                      leftIcon={<SiGoogleanalytics />}
                    >
                      Splitbee analytics
                    </Button>
                  </Link>
                </Center>

                <Center userSelect={"none"}>
                  <Text
                    fontSize={"sm"}
                    color={"gray.500"}
                    fontWeight={"semibold"}
                  >
                    &copy; Polygon 2021
                  </Text>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
