import {HStack} from "@chakra-ui/react";
import {ArticleDTO} from "../../../services/ContentTypes";
import Avatar from "../../core/elements/Avatar";

export default function ArticleFooter({article}: { article: ArticleDTO }) {
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <HStack justifyContent={"flex-end"}>
      <Avatar/>
    </HStack>
  );
}
