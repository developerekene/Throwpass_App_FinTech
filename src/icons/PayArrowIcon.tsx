import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={100}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect opacity={0.1} width={100} height={100} rx={8} fill="#00BA88" />
    <Path
      d="M54.286 44h6.857v6.857"
      stroke="#00BA88"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m61.143 44-9.686 9.686a.857.857 0 0 1-1.2 0l-3.943-3.943a.857.857 0 0 0-1.2 0L38.857 56"
      stroke="#00BA88"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
