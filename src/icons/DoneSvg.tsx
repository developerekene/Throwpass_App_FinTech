import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

const DoneSvg = (props: SvgProps) => (
  <Svg
    width={106}
    height={106}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={106} height={106} rx={53} fill="#00BA88" />
    <Path
      d="m43 53.392 7.071 7.071 14.142-14.142"
      stroke="#FCFCFC"
      strokeWidth={5}
      strokeLinecap="round"
    />
  </Svg>
)

export default DoneSvg
