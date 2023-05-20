import { Button, Input, InputGroup, VStack } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";
import { useRef, useState } from "react";

export default function ContactBlock() {
  const [response, setResponse] = useState(0);
  const [inputData, setInputData] = useState("");
  const inputRef = useRef(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputData }),
      });

      setResponse(response.status);

      console.log(
        "great success?",
        response.status,
        // @ts-ignore
        inputRef.current.validity.valid
      );
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
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
          <InputGroup>
            <Input
              placeholder={"me@example.com"}
              type={"email"}
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              ref={inputRef}
            />
            <Button onClick={handleButtonClick}>Subscribe</Button>
          </InputGroup>
        </VStack>
      </VStack>
    </>
  );
}
