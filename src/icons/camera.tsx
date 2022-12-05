import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

const CameraSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 9.257A3.257 3.257 0 0 1 5.257 6v0a3.257 3.257 0 0 0 2.71-1.45L8 4.5A3.369 3.369 0 0 1 10.803 3h2.394c1.127 0 2.178.563 2.803 1.5l.033.05A3.257 3.257 0 0 0 18.743 6v0A3.257 3.257 0 0 1 22 9.257V17a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9.257Z"
      stroke="#6E7191"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={12}
      cy={13}
      r={4}
      stroke="#6E7191"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CameraSvg
