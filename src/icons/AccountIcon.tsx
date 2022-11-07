import * as React from "react"
import Svg, { SvgProps, Path, PathProps } from "react-native-svg"
export interface AccountIconProps{
  svgProps? : SvgProps;
  pathProps?:PathProps; 
}
const AccountIcon = (props: AccountIconProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props.svgProps}
  >

    <Path
      d="M20.248 20.406c-.043-2.765-.904-5.28-2.436-7.1C16.289 11.496 14.225 10.5 12 10.5s-4.29.996-5.812 2.806c-1.53 1.819-2.391 4.33-2.436 7.091.865.434 4.446 2.103 8.248 2.103 4.111 0 7.446-1.66 8.248-2.094ZM12 9.75a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Z"
      fill="#828282"
      {...props.pathProps}
    />
  </Svg>
)

export default AccountIcon