import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
interface MoneyBagsSvgProps{
    svgProps: React.SVGProps<Svg>
    GProps: React.SVGProps<G>
    ClipPathProps: React.SVGProps<ClipPath>
}

const SvgComponent = (props: MoneyBagsSvgProps| any) =>{ 
  const { svgProps, GProps , ClipPathProps} = props;

  return(
  <Svg
    width={24}
    height={24}
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
        <Path d="M21.428 5.143H2.571c-.947 0-1.714.767-1.714 1.714V12c0 .947.767 1.714 1.714 1.714h18.857c.947 0 1.715-.768 1.715-1.714V6.857c0-.947-.768-1.714-1.715-1.714ZM21.428 13.714v7.714a1.714 1.714 0 0 1-1.714 1.714H4.286a1.714 1.714 0 0 1-1.715-1.714v-7.714M12 5.143v18M17.143.857 12 5.143 6.857.857" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a" {...ClipPathProps}>
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
      <ClipPath id="b" {...ClipPathProps}>
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)}

export default SvgComponent
