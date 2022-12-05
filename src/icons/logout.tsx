import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

interface LogoutSvgProps{
    svgProps: React.SVGProps<Svg>
    GProps: React.SVGProps<G>
}

function LogoutSvg(props: LogoutSvgProps | any) {
    const { svgProps, GProps } = props;

  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <G clipPath="url(#prefix__clip0_1068:483)" fill="#F51D1D" {...GProps}>
        <Path d="M23.25 11.25h-9.5a.75.75 0 010-1.5h9.5a.75.75 0 010 1.5z" />
        <Path d="M19.5 15a.75.75 0 01-.53-1.281l3.22-3.22-3.22-3.22a.75.75 0 011.06-1.06l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.745.745 0 01-.53.221zM8 24a2.06 2.06 0 01-.62-.093l-6.018-2.005A2.018 2.018 0 010 20V2C0 .899.897 0 2 0c.214 0 .417.03.62.094l6.018 2.005A2.018 2.018 0 0110 4V22c0 1.103-.897 2-2 2zM2 1.5c-.275 0-.5.226-.5.5v18c0 .213.143.411.347.482l5.99 1.996c.043.014.099.022.163.022.275 0 .5-.225.5-.5V4a.52.52 0 00-.347-.481l-5.99-1.996A.543.543 0 002 1.5z" />
        <Path d="M15.25 8a.75.75 0 01-.75-.75v-4.5c0-.688-.561-1.25-1.25-1.25H2A.75.75 0 012 0h11.25A2.752 2.752 0 0116 2.75v4.5a.75.75 0 01-.75.75zM13.25 21h-4a.75.75 0 010-1.5h4c.689 0 1.25-.56 1.25-1.25v-4.5a.75.75 0 011.5 0v4.5A2.752 2.752 0 0113.25 21z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1068:483">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default LogoutSvg;
