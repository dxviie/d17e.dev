import {Box, VStack} from "@chakra-ui/react";
import EmailSubscriptionForm from "../../core/interactive/EmailSubscriptionForm";
import Markdown from "../../core/elements/Markdown";
import FindMeOn from "../../core/FindMeOn";

export default function ContactBlock({description}: { description: string }) {
  return (
    <>
      <VStack
        paddingTop={"4rem"}
        paddingBottom={"4rem"}
        minHeight={"110svh"}
        width={"100%"}
        justifyContent={"center"}
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
          <FindMeOn title={""}/>
        </VStack>
      </VStack>
    </>
  );
}
