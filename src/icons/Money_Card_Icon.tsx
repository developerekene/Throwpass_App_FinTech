import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21.428 3.857H2.571c-.947 0-1.714.767-1.714 1.714v12.857c0 .947.767 1.715 1.714 1.715h18.857c.947 0 1.715-.768 1.715-1.715V5.571c0-.947-.768-1.714-1.715-1.714ZM.857 9.857h22.286M16.286 15.857h2.571"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
