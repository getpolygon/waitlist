import {
  Box,
  Center,
  Flex,
  Text,
  Button,
  Link,
  Stack,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import splitbee from "@splitbee/web";
import { SiGoogleanalytics } from "react-icons/si";
import type { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const { SPLITBEE_TOKEN: token, NODE_ENV: env } = process.env;

  if (env !== "production") {
    splitbee.init({
      token,
      disableCookie: true,
    });

    splitbee.track("Visits");
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode !== "dark") setColorMode("dark");
  }, []);

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
            rounded={"2xl"}
            boxShadow={"xl"}
            userSelect={"none"}
            border={"3px solid"}
            bgColor={"gray.800"}
            borderColor={"purple.400"}
          >
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
                  <chakra.span color={"purple.400"}>private</chakra.span> social
                  network that is not hungry for your data and personal life,
                  coming soon.
                </Text>
              </Box>
            </Center>
          </Box>
        </Flex>

        <Box mt={-36} pos={"relative"} bottom={0}>
          <Stack spacing={4}>
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
              <Text fontWeight={"semibold"} color={"gray.500"}>
                &copy; Polygon 2021
              </Text>
            </Center>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Home;
