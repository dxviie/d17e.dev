import {Button, HStack, Input, Text, VStack} from "@chakra-ui/react";
import {headerFont} from "../../../styles/fonts";

export default function EmailSubscriptionForm() {

  return (
    <>
      <VStack>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/d17e.dev"
          method="post"
          target="popupwindow"
          onSubmit={() => window.open('https://buttondown.com/d17e.dev', 'popupwindow')}
          className="embeddable-buttondown-form"
        >
          <HStack marginBottom={"3rem"}>
            <Input
              type="email"
              name="email"
              id="bd-email"
              placeholder="you@example.com"
            />
            <Button
              type={"submit"}
              variant={"solid"}
              fontFamily={headerFont.style.fontFamily}
            >
              <Text padding={"0 1rem"}>Stay tuned!</Text>
            </Button>
          </HStack>
        </form>
      </VStack>
    </>
  );
}
