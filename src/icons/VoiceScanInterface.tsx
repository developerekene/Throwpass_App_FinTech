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
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.286 9.737v7.097M11.143 9.737v7.097M7.714 11.263v4.046M18 9.737v7.097M14.571 11.263v4.046M0 7.714V3.43a1.714 1.714 0 0 1 1.714-1.715H6M22.286 7.714V3.43a1.714 1.714 0 0 0-1.715-1.715h-4.285M0 18v4.286A1.714 1.714 0 0 0 1.714 24H6M22.286 18v4.286A1.714 1.714 0 0 1 20.57 24h-4.285" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
