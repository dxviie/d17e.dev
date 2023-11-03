import {Box, VStack} from "@chakra-ui/react";
import EmailSubscriptionForm from "../../core/interactive/EmailSubscriptionForm";
import Markdown from "../../core/elements/Markdown";

export default function ContactBlock({description}: { description: string }) {
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        scrollSnapAlign={"start"}
        id={"contact"}
      >
        <VStack
          width={"80vw"}
          maxWidth={"30rem"}
          fontSize={"large"}
          alignItems={"flex-start"}
        >
          <Markdown markdown={description}/>
          <Box height={"2rem"}/>
          <EmailSubscriptionForm/>
        </VStack>
      </VStack>
    </>
  );
}
