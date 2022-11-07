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
      <Path d="M20.571 12.857V9.43a1.714 1.714 0 0 0-1.714-1.715H2.57A1.714 1.714 0 0 0 .857 9.43v12a1.714 1.714 0 0 0 1.714 1.714h16.286a1.714 1.714 0 0 0 1.714-1.714v-4.286M6.583 3.428l9.72-2.537a.84.84 0 0 1 1.045.617l.48 1.92" />
      <Path d="M22.285 12.857H18a.857.857 0 0 0-.857.857v2.571c0 .474.383.858.857.858h4.285a.857.857 0 0 0 .858-.858v-2.57a.857.857 0 0 0-.858-.858Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SvgComponent
