import { Text, VStack } from "@chakra-ui/react";
import EmailSubscriptionForm from "./EmailSubscriptionForm";

export default function EmailSubscriptionFooter() {
  return (
    <>
      <VStack padding={"2rem"}>
        <Text>
          Don't miss out on any future content and drop your email below!
        </Text>
        <EmailSubscriptionForm />
      </VStack>
    </>
  );
}
