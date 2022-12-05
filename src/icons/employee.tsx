import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const EmployeeSvg = (props: SvgProps | any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#A0A3BD">
      <Path d="M9 10c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5ZM4.75 12C2.13 12 0 14.13 0 16.75v3.5c0 .41.34.75.75.75H10v-3.25c0-1.88 1.4-3.43 3.21-3.7.26-.76.75-1.4 1.38-1.86-1-.286-1.054-.19-9.84-.19ZM22.25 16H21v-.75c0-.965-.785-1.75-1.75-1.75h-2.5c-.965 0-1.75.785-1.75 1.75V16h-1.25a1.74 1.74 0 0 0-1.253.533L18 19.404l5.503-2.871A1.74 1.74 0 0 0 22.25 16Zm-5.75 0v-.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V16h-3Z" />
      <Path d="M18.347 20.915a.75.75 0 0 1-.693 0L12 17.965v4.285c0 .965.785 1.75 1.75 1.75h8.5c.965 0 1.75-.785 1.75-1.75v-4.285l-5.653 2.95Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default EmployeeSvg;
