import { Box, Typography } from "@mui/material";
import { useCountStore } from "~/stores/useCountStore";
import { useJoinedStore } from "~/stores/useJoinedStore";

const WaitlistCounter = () => {
  const count = useCountStore((state) => state.count);
  const joined = useJoinedStore((state) => Boolean(state.joined));

  return (
    <Box>
      <Typography fontWeight="500" sx={{ fontSize: { sm: "1rem", md: "1.2rem" } }} component="h4">
        {count > 0 ? (
          <>
            <Box fontWeight="500" component="span" color="#FFFBDB">{count} {count === 1 ? "person" : "people"}</Box>{joined && ", including yourself,"} {count > 1 ? "have" : "has"} already joined
            the waitlist!
          </>
        ) : (
          "Nobody has joined the waitlist yet. You can be the first person!"
        )}
      </Typography>
    </Box>
  );
};

export default WaitlistCounter;

