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
          <g id="Layer1">
            <path
              d="M510,20C780.438,20 1000,239.562 1000,510C1000,780.438 780.438,1000 510,1000C239.562,1000 20,780.438 20,510C20,239.562 239.562,20 510,20ZM510,120C294.753,120 120,294.753 120,510C120,725.247 294.753,900 510,900C725.247,900 900,725.247 900,510C900,294.753 725.247,120 510,120Z"
              // style="stroke:black;stroke-opacity:0;stroke-width:1px;"
            />
            <g transform="matrix(0.977436,0,0,0.973411,7.40835,13.9777)">
              <path d="M308.461,698.998L308.424,698.998L308.424,283.637L309.727,283.637L309.727,270.984L725.087,270.984L725.087,274.861L725.265,274.861L725.265,690.222L725.087,690.222L725.087,742.74L308.461,742.74L308.461,698.998ZM682.691,652.241L682.691,313.559L350.998,313.559L350.998,652.241L682.691,652.241Z" />
            </g>
          </g>
        </svg>
      </Box>
    </>
  );
}
