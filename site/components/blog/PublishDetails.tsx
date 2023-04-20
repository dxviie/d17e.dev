import { Text } from "@chakra-ui/react";
import { formatDate } from "../../services/DateTimeFormatter";

export default function PublishDetails({
  createdAt,
  updatedAt,
  publishedAt,
  children,
}: {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  children?: any;
}) {
  return (
    <>
      <Text fontSize={"small"} fontStyle={"italic"}>
        published{" "}
        {publishedAt ? formatDate(publishedAt) : formatDate(createdAt)}{" "}
        {updatedAt ? ", last edited " + formatDate(updatedAt) : ""}
        {children}
      </Text>
    </>
  );
}
