import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

interface WalletSvgProps{
    svgProps: React.SVGProps<Svg>
    GProps: React.SVGProps<G>
}

function WalletSvg(props: WalletSvgProps | any) {

    const { svgProps, GProps } = props;
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <G clipPath="url(#prefix__clip0)" fill="#828282" {...GProps}>
        <Path d="M20.5 6.447h-17c-1.93 0-3.5 1.57-3.5 3.5v10c0 1.93 1.57 3.5 3.5 3.5h17c1.93 0 3.5-1.57 3.5-3.5v-10c0-1.93-1.57-3.5-3.5-3.5zm2.5 13.5c0 1.378-1.121 2.5-2.5 2.5h-17a2.503 2.503 0 01-2.5-2.5v-10c0-1.378 1.121-2.5 2.5-2.5h17c1.379 0 2.5 1.122 2.5 2.5v10z" />
        <Path d="M19.5 13.447c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm0 2a.5.5 0 11.002-1.002.5.5 0 01-.002 1.002z" />
        <Path d="M23.5 11.447h-4c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5h4a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5zm-.5 6h-3.5a2.503 2.503 0 01-2.5-2.5c0-1.378 1.121-2.5 2.5-2.5H23v5zM20.447 6.723L18.33 2.489A3.471 3.471 0 0016.256.718a3.482 3.482 0 00-2.716.255L3.263 6.507a.5.5 0 10.474.88l10.279-5.532a2.476 2.476 0 011.939-.183c.65.205 1.176.655 1.48 1.265l2.118 4.234a.5.5 0 10.894-.448z" />
        <Path d="M18.441 2.71a.502.502 0 00-.678-.203l-7.429 4a.5.5 0 10.475.88l7.43-4a.5.5 0 00.202-.676zM9 3.447H5.5a5.506 5.506 0 00-5.5 5.5v1a.5.5 0 001 0v-1c0-2.481 2.019-4.5 4.5-4.5H9a.5.5 0 000-1zM18.5 3.447a.5.5 0 000 1c2.481 0 4.5 2.019 4.5 4.5v1a.5.5 0 001 0v-1c0-3.033-2.468-5.5-5.5-5.5z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default WalletSvg
