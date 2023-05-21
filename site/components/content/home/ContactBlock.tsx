import { Button, VStack } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";
import EmailSubscriptionForm from "../../core/interactive/EmailSubscriptionForm";
import { captureException } from "@sentry/nextjs";

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
          <Button
            onClick={() => {
              try {
                throw new Error("well have ya ever");
              } catch (e) {
                console.log(e);
                captureException(e);
              }
            }}
          >
            Boom!
          </Button>
        </VStack>
      </VStack>
    </>
  );
}
