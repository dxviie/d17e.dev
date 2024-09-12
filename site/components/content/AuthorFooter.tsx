import {HStack, Text} from "@chakra-ui/react";
import {headerFont} from "../../styles/fonts";
import Avatar from "../core/elements/Avatar";

export default function AuthorFooter() {
  return (
    <>
      <HStack>
        <Text fontFamily={headerFont.style.fontFamily}>Content</Text>
        <Avatar size={"5rem"}/>
        <Text fontFamily={headerFont.style.fontFamily}>
          by David
        </Text>
      </HStack>
    </>
  );
}
