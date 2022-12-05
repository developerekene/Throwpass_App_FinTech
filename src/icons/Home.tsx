import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

interface HomeSvgProps{
    svgProps: React.SVGProps<Svg>
    GProps: React.SVGProps<G>
}

function HomeSvg(props: HomeSvgProps | any) {

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
        <Path d="M12 6.306l-8.56 7.056c0 .01-.002.025-.007.045a.204.204 0 00-.007.044v7.146c0 .258.094.481.283.67a.916.916 0 00.67.283h5.716v-5.717h3.811v5.717h5.716a.915.915 0 00.67-.284.915.915 0 00.283-.67v-7.145a.21.21 0 00-.015-.089L12 6.306z" />
        <Path d="M23.834 11.754l-3.26-2.709V2.971a.463.463 0 00-.134-.342.462.462 0 00-.342-.134H17.24a.464.464 0 00-.342.134.464.464 0 00-.134.342v2.903l-3.632-3.037A1.737 1.737 0 0012 2.45c-.436 0-.813.13-1.131.387L.165 11.754a.432.432 0 00-.163.32c-.01.134.024.251.104.35l.923 1.102c.08.09.183.144.312.164.12.01.239-.025.358-.104L12 4.996l10.301 8.59c.08.069.184.103.313.103h.045a.509.509 0 00.312-.163l.923-1.102c.08-.1.115-.216.104-.35a.434.434 0 00-.164-.32z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default HomeSvg;
