import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import ColorModeToggle from "./ColorModeToggle";
import { useRouter } from "next/router";
import {
  BLOG_PATH,
  HOME_PATH,
  isAtBlogPage,
  isAtHomePage,
  isAtPostsPage,
  POSTS_PATH,
} from "../../../services/RouterUtils";
import useThemeColors from "../hooks/useThemeColors";
import useIsPhone from "../hooks/useIsPhone";
import Link from "next/link";
import D17eIcon from "../../icons/D17eIcon";
import { headerFont } from "../../../styles/fonts";
import PostsIcon from "../../icons/PostsIcon";
import BlogIcon from "../../icons/BlogIcon";

export default function Navigation() {
  const colors = useThemeColors();
  const isPhone = useIsPhone();
  const router = useRouter();
  const menu = (
    <>
      {/*  HOME BUTTON */}
      <Link href={HOME_PATH}>
        <Flex padding={"1rem"}>
          <Box width={"24px"} height={"24px"}>
            <D17eIcon
              color={
                isAtHomePage(router.asPath) ? colors.buttonBgColor : undefined
              }
            />
          </Box>
        </Flex>
      </Link>

      <Spacer />

      {/*  POSTS BUTTON */}
      <Link href={POSTS_PATH}>
        <Flex padding={"1rem"}>
          <Box width={"24px"} height={"24px"}>
            <PostsIcon
              color={
                isAtPostsPage(router.asPath) ? colors.buttonBgColor : undefined
              }
            />
          </Box>
          {isPhone ? (
            <></>
          ) : (
            <Text
              marginLeft={".5rem"}
              color={
                isAtPostsPage(router.asPath) ? colors.buttonBgColor : undefined
              }
            >
              posts
            </Text>
          )}
        </Flex>
      </Link>

      {/*  BLOG BUTTON */}
      <Link href={BLOG_PATH}>
        <Flex padding={"1rem"}>
          <Box
            width={"24px"}
            height={"24px"}
            style={{
              fillRule: "evenodd",
              clipRule: "evenodd",
              strokeLinejoin: "round",
              strokeMiterlimit: 2,
              strokeWidth: 5,
            }}
          >
            <BlogIcon
              color={
                isAtBlogPage(router.asPath) ? colors.buttonBgColor : undefined
              }
            />
          </Box>
          {isPhone ? (
            <></>
          ) : (
            <Text
              marginLeft={".5rem"}
              color={
                isAtBlogPage(router.asPath) ? colors.buttonBgColor : undefined
              }
            >
              blog
            </Text>
          )}
        </Flex>
      </Link>

      {/*  SETTINGS*/}
      {/*  COLOR MODE TOGGLE */}
      <ColorModeToggle></ColorModeToggle>
    </>
  );
  return (
    <HStack
      fontFamily={headerFont.style.fontFamily}
      width={"100%"}
      bg={colors.bgColor}
      padding={"0 .5rem 0 .5rem"}
      opacity={0.9}
    >
      {menu}
    </HStack>
  );
}
