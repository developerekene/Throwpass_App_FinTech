import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CellPhoneSvg(props: SvgProps | any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16 18H7V4h9v14zm-4.5 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4-21h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1z"
        fill="#A0A3BD"
      />
    </Svg>
  )
}

export default CellPhoneSvg;
