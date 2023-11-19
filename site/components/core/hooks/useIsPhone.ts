import { useMediaQuery } from "@chakra-ui/react";

export default function useIsPhone(): boolean {
  const [isPhone] = useMediaQuery("(max-width: 480px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return isPhone;
}
