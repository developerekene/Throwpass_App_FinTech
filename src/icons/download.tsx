import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DownloadSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m8.385 11.615 3.5 3.77 3.5-3.77"
      stroke="#14142B"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 16v3h14v-3M11.947 14.447V4.553"
      stroke="#000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default DownloadSvg;
