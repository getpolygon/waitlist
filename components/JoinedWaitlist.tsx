import { memo } from "react";
import { Box, Center, Text } from "@chakra-ui/react";

const JoinedWaitlist = () => {
  return (
    <Box
      p={4}
      rounded={"xl"}
      border={"2px solid"}
      bgColor={"purple.500"}
      borderColor={"purple.500"}
    >
      <Center>
        <Text fontSize={["md", "lg", "xl"]}>
          Congrats 🎉, you now are on our waitlist!
        </Text>
      </Center>
    </Box>
  );
};

export default memo(JoinedWaitlist);
