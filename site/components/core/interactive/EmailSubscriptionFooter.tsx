import {Box, Text, VStack} from "@chakra-ui/react";
import EmailSubscriptionForm from "./EmailSubscriptionForm";
import FindMeOn from "../FindMeOn";

export default function EmailSubscriptionFooter() {
  return (
    <>
      <VStack>
        <Text>
          Don&apos;t miss out on any future content and drop your email below!
        </Text>
        <EmailSubscriptionForm/>
        <FindMeOn title={""}/>
        <Box height={"4rem"}/>
      </VStack>
    </>
  );
}
