import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const CardSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={2}
      y={5}
      width={20}
      height={15}
      rx={2}
      stroke="#14142B"
      strokeWidth={2}
    />
    <Path d="M1 10h22" stroke="#14142B" strokeWidth={2} />
  </Svg>
)

export default CardSvg;
