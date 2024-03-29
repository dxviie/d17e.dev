import { Box } from "@chakra-ui/react";
import useThemeColors from "../core/hooks/useThemeColors";

export default function D17eIcon({ color }: { color?: string }) {
  const colors = useThemeColors();
  return (
    <>
      <Box
        width={"100%"}
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: 2,
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
          <path d="M510.133,22.092C779.554,22.092 998.29,240.828 998.29,510.25C998.29,779.671 779.554,998.407 510.133,998.407C240.711,998.407 21.975,779.671 21.975,510.25C21.975,240.828 240.711,22.092 510.133,22.092ZM411.585,546.341L411.585,329.82L510.931,329.82L510.931,805.054L411.585,805.054L411.585,771.037C386.066,792.571 353.129,805.55 317.189,805.55C236.26,805.55 170.557,739.743 170.557,658.689C170.557,577.634 236.26,511.828 317.189,511.828C353.129,511.828 386.066,524.807 411.585,546.341ZM323.359,595.48C359.398,595.48 388.657,624.511 388.657,660.269C388.657,696.028 359.398,725.059 323.359,725.059C287.32,725.059 258.06,696.028 258.06,660.269C258.06,624.511 287.32,595.48 323.359,595.48Z" />
        </svg>
      </Box>
    </>
  );
}
