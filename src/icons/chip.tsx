import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const ChipSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={4}
      y={4}
      width={16}
      height={16}
      rx={3}
      stroke="#A0A3BD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x={9}
      y={9}
      width={6}
      height={6}
      rx={0.5}
      stroke="#A0A3BD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 1v3M23 9h-3M23 15h-3M4 9H1M4 15H1M9 1v3M15 20v3M9 20v3"
      stroke="#A0A3BD"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChipSvg;
