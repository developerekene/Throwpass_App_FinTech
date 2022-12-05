


import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
interface WalletSvgProps{
    svgProps: React.SVGProps<Svg>
    GProps: React.SVGProps<G>
    PathProps: React.SVGProps<Path>
    ClipPathProps: React.SVGProps<ClipPath>
}


const SvgComponent = (props: WalletSvgProps | any) => {
    const { svgProps, GProps, PathProps,  ClipPathProps } = props;
  return (
    <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <G
      clipPath="url(#a)"
      stroke="#4E4B66"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...GProps}
    >
      <Path d="M14.571.857h-12A1.714 1.714 0 0 0 .857 2.57v18.857a1.714 1.714 0 0 0 1.714 1.715h18.857a1.714 1.714 0 0 0 1.715-1.715v-12L14.57.857Z"  {...PathProps}/>
      <Path d="M14.571 8.571V.857l8.572 8.571h-7.715a.857.857 0 0 1-.857-.857ZM7.714 7.714V5.143M5.143 14.571c0 1.286 1.148 1.714 2.571 1.714 1.423 0 2.571 0 2.571-1.714C10.285 12 5.143 12 5.143 9.428c0-1.714 1.148-1.714 2.571-1.714 1.423 0 2.571.651 2.571 1.714M7.714 16.286v2.571M14.571 16.286h5.143"{...PathProps} />
    </G>
    <Defs>
      <ClipPath id="a" {...ClipPathProps}>
        <Path fill="#fff" d="M0 0h24v24H0z" {...PathProps}/>
      </ClipPath>
    </Defs>
  </Svg>
  )
    
  
}

export default SvgComponent



