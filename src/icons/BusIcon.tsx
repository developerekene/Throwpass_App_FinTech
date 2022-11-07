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
      d="M19.714.857H4.286c-.947 0-1.715.767-1.715 1.714v16.286c0 .947.768 1.714 1.715 1.714h15.428c.947 0 1.714-.767 1.714-1.714V2.57c0-.947-.767-1.714-1.714-1.714ZM6 20.571v2.572M18 20.571v2.572M2.571 12h18.857"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.857 17.142a.857.857 0 1 0 0-1.714.857.857 0 0 0 0 1.714ZM17.143 17.142a.857.857 0 1 0 0-1.714.857.857 0 0 0 0 1.714Z"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
