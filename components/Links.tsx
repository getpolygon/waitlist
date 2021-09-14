import { Box, Stack, Link, Center, Text } from "@chakra-ui/react";

const Links = () => {
  return (
    <Box>
      <Center>
        <Stack direction={"row"}>
          <Link
            target={"_blank"}
            color={"blue.400"}
            textDecor={"underline"}
            rel={"noreferrer noopener"}
            href={"https://app.splitbee.io/public/polygon.am"}
          >
            Website Analytics
          </Link>
          <Link
            target={"_blank"}
            color={"blue.400"}
            textDecor={"underline"}
            rel={"noreferrer noopener"}
            href={"mailto:welcome@polygon.am"}
          >
            Support Email
          </Link>
        </Stack>
      </Center>
    </Box>
  );
};

export default Links;
