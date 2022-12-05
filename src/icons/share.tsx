import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ShareSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.868 11.8a1.974 1.974 0 1 0 3.948 0 1.974 1.974 0 0 0-3.948 0ZM14.553 17.326a1.974 1.974 0 1 0 3.947 0 1.974 1.974 0 0 0-3.947 0ZM14.553 6.274a1.974 1.974 0 1 0 3.947 0 1.974 1.974 0 0 0-3.947 0Z"
      stroke="#14142B"
      strokeWidth={1.5}
    />
    <Path
      d="m9.816 12.984 4.497 3.212M14.313 7.458 9.816 10.67"
      stroke="#14142B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ShareSvg;
