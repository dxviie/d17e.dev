import { HStack, Text } from "@chakra-ui/react";
import { headerFont } from "../../styles/fonts";
import Avatar from "../core/elements/Avatar";
import { AuthorDTO } from "../../services/ContentTypes";

export default function AuthorFooter(props: { author: AuthorDTO }) {
  return (
    <>
      <HStack>
        <Text fontFamily={headerFont.style.fontFamily}>Content</Text>
        <Avatar author={props.author} size={"5rem"} />
        <Text fontFamily={headerFont.style.fontFamily}>
          by {props.author.name}
        </Text>
      </HStack>
    </>
  );
}
