import { Card } from "@chakra-ui/react";

export default function CardBase({ children }: { children: any }) {
  return <>{<Card>{children}</Card>}</>;
}
