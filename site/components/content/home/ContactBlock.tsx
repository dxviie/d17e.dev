import { VStack } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";
import EmailSubscriptionForm from "../../core/interactive/EmailSubscriptionForm";

export default function ContactBlock() {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        // bg={colors.color}
        // color={colors.bgColor}
        scrollSnapAlign={"start"}
        id={"contact"}
      >
        <VStack>
          <EmailSubscriptionForm />
        </VStack>
      </VStack>
    </>
  );
}
