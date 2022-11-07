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
      d="M12 17.177v1.731M12 8.588V10.2M12 23.126c6 0 10.286-2.126 10.286-6.858 0-5.142-2.572-8.57-7.715-11.142l2.023-2.606a1.131 1.131 0 0 0-.96-1.714H8.366a1.131 1.131 0 0 0-.96 1.714l2.023 2.623C4.286 7.73 1.714 11.16 1.714 16.303 1.714 21 6 23.126 12 23.126Z"
      stroke="#14142B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.286 16.389a2.125 2.125 0 0 0 1.714.754 1.92 1.92 0 0 0 2.04-1.714A1.92 1.92 0 0 0 12 13.714 1.92 1.92 0 0 1 9.96 12 1.903 1.903 0 0 1 12 10.286a2.161 2.161 0 0 1 1.714.686"
      stroke="#14142B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
