import dynamic from "next/dynamic";
import cookies from "next-cookies";
import { Typography, Box } from "@mui/material";
import { Postgres } from "~/services/_postgres";
import type { GetServerSideProps, NextPage } from "next";
import { useJoinedStore } from "~/stores/useJoinedStore";
import { useEffect } from "react";
import { useCountStore } from "~/stores/useCountStore";

const Image = dynamic(() => import("next/image"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const WaitlistCounter = dynamic(() => import("~/ui/components/WaitlistCounter"));
const JoinWaitlistForm = dynamic(() => import("~/ui/components/JoinWaitlistForm"));

interface Props {
  count: number;
  joined: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const pg = await Postgres.createOrGet();
  const { rows: data } = await pg?.query("SELECT COUNT(id) FROM waitlist;")!;
  const joined = Number(cookies(ctx).joined);
  return {
    props: {
      joined,
      count: Number(data[0]?.count),
    }
  };
};

const Home: NextPage<Props> = ({ count: __count, joined: __joined }) => {
  const setCount = useCountStore((state) => state.setCount);
  const setJoined = useJoinedStore((state) => state.setJoined);
  const joined = useJoinedStore((state) => Boolean(state.joined) || Boolean(__joined));
  const count = useCountStore((state) => __count >= state.count ? __count : state.count);

  useEffect(() => {
    setJoined(Number(joined)); setCount(count);
  }, [joined, count]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        layout="fill"
        loading="eager"
        objectFit="fill"
        src="/images/background.jpg"
        alt="Mesh Gradient Background"
        style={{ userSelect: "none", zIndex: -1, filter: "brightness(72%)" }}
      />

      <Box>
        <Box paddingX="12px" sx={{ width: { sm: "80vw", md: "60vw", lg: "40vw" } }}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography fontWeight="800" variant="h4">
                Polygon
              </Typography>

              <Typography fontWeight="500">
                Polygon Project is an effort to create a fast, scalable, privacy-focused and open social networking protocol.
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <WaitlistCounter />
              {!joined && <JoinWaitlistForm />}
            </Stack>

            <Stack direction="row" spacing={1}></Stack>

            <Typography textAlign="center" variant="caption">
              &copy; {new Date().getFullYear()} Polygon Project
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

