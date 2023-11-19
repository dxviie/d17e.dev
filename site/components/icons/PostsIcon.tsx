import { Box } from "@chakra-ui/react";
import useThemeColors from "../core/hooks/useThemeColors";

export default function PostsIcon({ color }: { color?: string }) {
  const colors = useThemeColors();
  return (
    <>
      <Box
        width={"100%"}
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 1.5,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          fill={color || colors.color}
        >
          <g id="Layer2">
            <path d="M510,20C780.438,20 1000,239.562 1000,510C1000,780.438 780.438,1000 510,1000C239.562,1000 20,780.438 20,510C20,239.562 239.562,20 510,20ZM308.909,694.39L308.909,736.969L716.135,736.969L716.135,685.847L716.309,685.847L716.309,281.531L716.135,281.531L716.135,277.757L310.147,277.757L310.147,290.073L308.873,290.073L308.873,694.39L308.909,694.39ZM674.695,648.877L350.487,648.877L350.487,319.199L674.695,319.199L674.695,648.877Z" />
          </g>
        </svg>
      </Box>
    </>
  );
}
