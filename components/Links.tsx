import type { LinkProps } from "@chakra-ui/react";
import { Box, Stack, Link, Center } from "@chakra-ui/react";

type Link = {
  href: string;
  description: string;
  target: LinkProps["target"];
};

const links: Link[] = [
  {
    target: "_blank",
    description: "Website Analytics",
    href: "https://app.splitbee.io/public/polygon.am",
  },
  {
    target: "_blank",
    description: "Support email",
    href: "mailto:support@polygon.am",
  },
  {
    target: "_blank",
    description: "Join our Discord server!",
    href: "https://discord.gg/tExw2XqgtU"
  }
];

const Links = () => {
  return (
    <Box>
      <Center>
        <Stack direction={"row"}>
          {links.map((link) => (
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

export default Links;
