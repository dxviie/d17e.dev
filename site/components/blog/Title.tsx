import { Text } from "@chakra-ui/react";

export default function Title({ title }: { title: string }) {
  return (
    <>
      <Text fontSize={"xx-large"} fontWeight={"bold"}>
        {title}
      </Text>
    </>
  );
}
