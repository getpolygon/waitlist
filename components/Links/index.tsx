import { memo } from "react";
import links from "./links.json";
import type { LinkProps } from "@chakra-ui/react";
import { Box, Stack, Link, Center } from "@chakra-ui/react";

interface Link {
  href: string;
  description: string;
  target: LinkProps["target"];
}

const Links = () => {
  return (
    <Box>
      <Center>
        <Stack textAlign={"center"} direction={["column", null, "row"]}>
          {links.map((link: Link) => (
            <Link
              key={link.href}
              href={link.href}
              color={"blue.400"}
              target={link.target}
              textDecor={"underline"}
              rel={"noreferrer noopener"}
            >
              {link.description}
            </Link>
          ))}
        </Stack>
      </Center>
    </Box>
  );
};

export default memo(Links);
