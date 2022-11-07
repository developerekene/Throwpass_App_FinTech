import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#14142B"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m9.974 18.843 3.74 3.736a1.926 1.926 0 0 0 3.19-.753l6.14-18.433A1.926 1.926 0 0 0 20.608.957L2.174 7.1a1.927 1.927 0 0 0-.753 3.185l4.7 4.704-.16 5.94 4.013-2.087ZM22.493 1.34 6.12 14.99" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
