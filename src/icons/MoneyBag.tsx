import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <G
        clipPath="url(#b)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M21.428 5.143H2.571c-.947 0-1.714.767-1.714 1.714V12c0 .947.767 1.714 1.714 1.714h18.857c.947 0 1.715-.768 1.715-1.714V6.857c0-.947-.768-1.714-1.715-1.714ZM21.428 13.714v7.714a1.714 1.714 0 0 1-1.714 1.714H4.286a1.714 1.714 0 0 1-1.715-1.714v-7.714M12 5.143v18M17.143.857 12 5.143 6.857.857" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
