import { memo } from "react";
import { Text, chakra, Box } from "@chakra-ui/react";

const WaitlistCounter = ({ count }: { count: number }) => {
  return (
    <Box p={4} rounded={"xl"} border={"2px solid"} borderColor={"purple.500"}>
      <Text fontSize={"lg"}>
        {count > 0 ? (
          <>
            <chakra.span color={"purple.400"} fontWeight={"bold"}>
              {count} {count === 1 ? "person" : "people"}
            </chakra.span>{" "}
            {count === 1 ? "has" : "have"} already joined our waitlist 🥳
          </>
        ) : (
          "No one has joined the waitlist yet. You can be the first person!"
        )}
      </Text>
    </Box>
  );
};

export default memo(WaitlistCounter);
