import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CloseSvg(props: SvgProps | any) {
  return (
    <Svg
      width={12}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 3l6.387 6.387M3 9.387L9.387 3"
        stroke="#A0A3BD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default CloseSvg;
