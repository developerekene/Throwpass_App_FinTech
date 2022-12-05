import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

function EyeOutlineSvg(props: SvgProps | any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.335 13.256a2.522 2.522 0 010-2.512C3.685 6.651 7.444 4 11.68 4c4.236 0 7.995 2.65 10.345 6.744a2.522 2.522 0 010 2.512C19.675 17.349 15.915 20 11.68 20c-4.236 0-7.995-2.65-10.345-6.744z"
        stroke="#A0A3BD"
        strokeWidth={2}
      />
      <Circle cx={11.68} cy={12} r={3} stroke="#A0A3BD" strokeWidth={2} />
    </Svg>
  )
}

export default EyeOutlineSvg;
