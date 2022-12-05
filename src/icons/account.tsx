import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function AccountSvg(props: SvgProps | any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 4a4 4 0 110 8 4 4 0 010-8zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
        fill="#6E7191"
      />
    </Svg>
  )
}

export default AccountSvg;
