import { SpinnerIcon } from "../../icons/SpinnerIcon";
import { keyframes } from "@chakra-ui/react";

export default function Spinner({ opacity }: { opacity?: string | "1" }) {
  const bounce = keyframes`
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg)
    }
  `;
  const bounceAnimation = `${bounce} infinite .8s linear`;
  return (
    <>
      <SpinnerIcon animation={bounceAnimation} opacity={opacity} />
    </>
  );
}
