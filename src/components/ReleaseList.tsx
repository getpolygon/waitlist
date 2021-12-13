import {
  Badge,
  Box,
  Stack,
  Text,
  Divider,
  chakra,
  Image,
} from "@chakra-ui/react";
import { memo } from "react";
import { isEmpty } from "lodash";
import { formatDistanceToNowStrict } from "date-fns";

interface GithubReleaseAuthor {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  html_url: string;
  repos_url: string;
  gists_url: string;
  events_url: string;
  avatar_url: string;
  gravatar_id: string;
  starred_url: string;
  site_admin: boolean;
  following_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  received_events_url: string;
}

export interface GithubRelease {
  id: number;
  assets: [];
  url: string;
  name: string;
  body: string;
  draft: boolean;
  node_id: string;
  tag_name: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  created_at: string;
  prerelease: boolean;
  published_at: string;
  tarball_url: string;
  zipball_url: string;
  target_commitish: string;
  author: GithubReleaseAuthor;
}

interface ReleaseProps {
  release: GithubRelease;
}

interface ReleaseListProps {
  releases: GithubRelease[];
}

const Release = ({ release }: ReleaseProps) => {
  return (
    <Box
      __css={{
        _hover: {
          boxShadow: "xl",
          transform: "translateY(-5px)",
        },
      }}
      p={6}
      border={"2px"}
      rounded={"2xl"}
      maxW={["340", "full"]}
      borderColor={"gray.600"}
      transition={"150ms ease-in-out"}
    >
      <Stack>
        <Box>
          <chakra.a
            fontSize={"3xl"}
            fontWeight={"bold"}
            color={"purple.400"}
            href={release.html_url}
          >
            {release.name}
          </chakra.a>
        </Box>

        <Stack alignItems={"center"} direction={"row"}>
          <Badge colorScheme={"purple"} variant={"solid"}>
            {release.tag_name}
          </Badge>

          <Badge
            variant={"outline"}
            colorScheme={release.prerelease ? "yellow" : "green"}
          >
            {release.prerelease ? "Pre-release" : "Stable release"}
          </Badge>

          {release.draft && <Badge>Draft</Badge>}

          <Text fontWeight={"bold"} color={"gray.300"} fontSize={"xs"}>
            {formatDistanceToNowStrict(new Date(release.created_at), {
              addSuffix: true,
            })}
          </Text>
        </Stack>

        <Box>
          <chakra.span fontWeight={"semibold"}>
            <Stack spacing={[0, 1]} direction={["column", "row"]}>
              <Box>Release author:</Box>

              <chakra.a href={release.author.html_url}>
                <Stack spacing={1} direction={"row"}>
                  <Box color={"purple.300"}>{release.author.login}</Box>

                  <Box>
                    <Image
                      maxW={"25px"}
                      rounded={"full"}
                      src={release.author.avatar_url}
                      alt={`${release.author.login}'s avatar`}
                    />
                  </Box>
                </Stack>
              </chakra.a>
            </Stack>
          </chakra.span>
        </Box>

        {!isEmpty(release.body) && (
          <Box overflowX={"scroll"} overflowY={"scroll"} maxH={"250px"}>
            <Stack>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Release notes:{" "}
              </Text>

              <Box>
                <Text color={"gray.500"}>
                  <pre>{release.body}</pre>
                </Text>
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

const MemoizedRelease = memo(Release);

const ReleaseList = ({ releases }: ReleaseListProps) => {
  return (
    <Box pb={8}>
      <Stack spacing={4}>
        {releases.map((release, index) => {
          return (
            <Box key={release.id}>
              <Stack spacing={4}>
                <MemoizedRelease release={release} />
                {releases.length !== 1 && index !== releases.length - 1 && (
                  <Divider />
                )}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export const MemoizedReleaseList = memo(ReleaseList);
