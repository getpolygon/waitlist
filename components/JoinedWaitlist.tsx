import { Box, Center, Text } from "@chakra-ui/react";

const JoinedWaitlist = () => {
  return (
    <Box
      p={4}
      rounded={"xl"}
      userSelect={"none"}
      border={"2px solid"}
      bgColor={"purple.500"}
      borderColor={"purple.500"}
    >
      <Center>
        <Text fontFamily={"ubuntu"} fontSize={["md", "lg", "xl"]}>
          Congrats 🎉, you have joined our waitlist
        </Text>
      </Center>
    </Box>
  );
};

export default JoinedWaitlist;
