import {Box, Flex, Spacer} from "@chakra-ui/react";
import {LinkedInIcon} from "../icons/LinkedInIcon";
import {GitHubIcon} from "../icons/GitHubIcon";
import InstaIcon from "../icons/InstaIcon";
import {TwitterIcon} from "../icons/TwitterIcon";
import PlainTextLink from "./interactive/PlainTextLink";
import useIsPhone from "./hooks/useIsPhone";

export default function FindMeOn({title = "Find me on"}: { title?: string }) {
  const listDirection = "row";
  const itemDirection = "row";
  const gap = "1rem";
  const gapChar = ".";
  let isPhone = useIsPhone();
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Box marginBottom={".5rem"}>
          {title}
        </Box>
        {isPhone ?
          <>
            <Flex direction={"row"} gap={"2rem"}>
              <Flex direction={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={gap}>
                {buildItem(itemDirection, <GitHubIcon/>, "dxviie", "https://github.com/dxviie")}
                {buildItem(itemDirection, <TwitterIcon/>, "david_d17e", "https://twitter.com/david_d17e")}
              </Flex>
              <Flex direction={"column"} justifyContent={"center"} alignItems={"flex-start"} gap={gap}>
                {buildItem(itemDirection, <InstaIcon/>, "d17e.dev", "https://www.instagram.com/d17e.dev/")}
                {buildItem(itemDirection, <LinkedInIcon/>, "d16de", "https://www.linkedin.com/in/d16de/")}
              </Flex>
            </Flex>
          </>
          :
          <>
            <Flex direction={listDirection} justifyContent={"center"} alignItems={"flex-start"} gap={gap}>
              {buildItem(itemDirection, <GitHubIcon/>, "dxviie", "https://github.com/dxviie")}
              {gapChar}
              {buildItem(itemDirection, <InstaIcon/>, "d17e.dev", "https://www.instagram.com/d17e.dev/")}
              {gapChar}
              {buildItem(itemDirection, <TwitterIcon/>, "david_d17e", "https://twitter.com/david_d17e")}
              {gapChar}
              {buildItem(itemDirection, <LinkedInIcon/>, "d16de", "https://www.linkedin.com/in/d16de/")}
            </Flex>
          </>}
      </Flex>
    </>
  );
}

function buildItem(direction: "column" | "row", icon: React.ReactElement, label: string, url: string) {
  console.log("direction", direction);
  return (
    <Flex direction={direction} alignItems={"center"}>
      {icon}
      <Spacer width={".5rem"}/>
      <PlainTextLink link={url} description={label}/>
      {/*<Spacer width={"10rem"}/>*/}
    </Flex>
  );
}