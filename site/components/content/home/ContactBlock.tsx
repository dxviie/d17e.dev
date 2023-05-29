import { VStack } from "@chakra-ui/react";
import useThemeColors from "../../core/hooks/useThemeColors";
import EmailSubscriptionForm from "../../core/interactive/EmailSubscriptionForm";
import Markdown from "../../core/elements/Markdown";

export default function ContactBlock({ description }: { description: string }) {
  const colors = useThemeColors();
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
          <Markdown markdown={description} />
          <EmailSubscriptionForm />
        </VStack>
      </VStack>
    </>
  );
}
