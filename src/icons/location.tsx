import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

const LocationSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M22 11c0 4.346-6.192 9.902-8.831 12.073a1.828 1.828 0 0 1-2.338 0C8.192 20.903 2 15.346 2 11 2 5.477 6.477 1 12 1s10 4.477 10 10Z"
      stroke="#6E7191"
      strokeWidth={2}
    />
    <Circle cx={12} cy={11} r={3} stroke="#6E7191" strokeWidth={2} />
  </Svg>
)

export default LocationSvg;
