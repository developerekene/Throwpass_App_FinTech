import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function FileSvg(props: SvgProps | any) {
  return (
    <Svg
      width={23}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4 4a2 2 0 012-2h3.421a3 3 0 013 3v2.5a2.5 2.5 0 002.5 2.5H17a3 3 0 013 3v7a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        stroke="#6E7191"
        strokeWidth={2}
      />
      <Path
        d="M4 4a2 2 0 012-2h3.234a8 8 0 016.12 2.847l2.765 3.285A8 8 0 0120 13.285V20a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        stroke="#6E7191"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default FileSvg;
