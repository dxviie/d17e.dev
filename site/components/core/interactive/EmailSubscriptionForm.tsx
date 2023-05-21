import { useRef, useState } from "react";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";
import { headerFont } from "../../../styles/fonts";
import Spinner from "../elements/Spinner";

export default function EmailSubscriptionForm() {
  const colors = useThemeColors();
  const [response, setResponse] = useState("");
  const [working, setWorking] = useState(false);
  const [inputData, setInputData] = useState("");
  const inputRef = useRef(null);

  const handleButtonClick = async (event: any) => {
    try {
      // clear previous response
      setResponse("");
      // @ts-ignore
      if (inputRef.current.value === "") {
        console.debug("nothing filled out. skipping api call.");
        event.preventDefault();
        // @ts-ignore
        inputRef.current.focus();
        return;
      }
      if (working) {
        console.error("already working on it. skipping api call.");
        event.preventDefault();
        return;
      }
      // @ts-ignore
      if (!inputRef.current.validity.valid) {
        console.debug("invalid email. skipping api call.");
        // we allow default behavior here so that the browser can show the invalid email message
        // @ts-ignore
        inputRef.current.focus();
        return;
      }
      // call API route
      setWorking(true);
      event.preventDefault();
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: inputData }),
      });
      const json = await response.json();
      setWorking(false);
      setInputData("");
      setResponse(json.message);
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
    }
  };

  return (
    <>
      <VStack>
        <form>
          <HStack>
            <Input
              type="email"
              name="email"
              placeholder="me@example.com"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              ref={inputRef}
              disabled={working}
            />
            <Button
              type={"submit"}
              onClick={handleButtonClick}
              cursor={working ? "auto" : "pointer"}
              color={working ? colors.buttonBgColor : colors.color}
              disabled={working}
              variant={"solid"}
              fontFamily={headerFont.style.fontFamily}
            >
              <Text padding={"0 1rem"}>Stay tuned!</Text>
            </Button>
          </HStack>
          <Box
            margin={"1rem"}
            height={"2rem"}
            width={"calc(100% - 2rem)"}
            display={"flex"}
          >
            {working ? <Spinner /> : <Text>{response}</Text>}
          </Box>
        </form>
      </VStack>
    </>
  );
}
