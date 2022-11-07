import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
interface BankSvgProps{
    svgProps: React.SVGProps<Svg>
    GProps: React.SVGProps<G>
    ClipPathProps: React.SVGProps<ClipPath>
}

const SvgComponent = (props: BankSvgProps| any) => {
    const { svgProps, GProps , ClipPathProps} = props;
  return (
    <Svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <G clipPath="url(#a)" {...GProps}>
      <G {...GProps}
        clipPath="url(#b)"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M22.131 9.856H1.868c-.96 0-1.371-1.045-.617-1.542l10.132-6.635a1.217 1.217 0 0 1 1.234 0l10.131 6.635c.755.497.343 1.542-.617 1.542ZM22.285 19.285H1.715a.857.857 0 0 0-.858.857v2.572c0 .473.384.857.857.857h20.572a.857.857 0 0 0 .857-.857v-2.572a.857.857 0 0 0-.858-.857ZM3.428 9.856v9.429M7.714 9.856v9.429M12 9.856v9.429M16.286 9.856v9.429M20.571 9.856v9.429" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a" {...ClipPathProps}>
        <Path fill="#fff" d="M0 0h24v24.668H0z" />
      </ClipPath>
      <ClipPath id="b" {...ClipPathProps} >
        <Path fill="#fff" transform="translate(0 .428)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
  )
}

export default SvgComponent
