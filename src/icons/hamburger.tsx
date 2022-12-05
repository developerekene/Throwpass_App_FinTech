import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function HamburgerSvg(props: SvgProps | any) {
  return (
    <Svg
      width={22}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.492 16.077h19.363m-19.363-15h19.363H1.492zm0 7.5h19.363H1.492z"
        stroke="#6E7191"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default HamburgerSvg;
