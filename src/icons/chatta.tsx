import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg";

interface ChattaSvgProps{
    svgProps: React.SVGProps<Svg>
    pathProps: React.SVGProps<Path>
    GProps: React.SVGProps<G>
  }

const ChattaSvg = (props: ChattaSvgProps | any) => {

    const { svgProps, pathProps, GProps } = props;

    return(
    <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}
    >
        <G opacity={0.5} fill="#0122AE" {...GProps}>
        <Path d="M12 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3l-1 1v1h1l2-2.03L9 18v-5H4V6h9v2h2V7a3 3 0 0 0-3-3ZM5 14a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66L10 13.77v5.51c0 .38.32.72.7.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .7-.34.7-.72v-5.51l-1.43-4.11Zm-8.16.34h7.19l1.03 3h-9.25l1.03-3ZM12 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" {...pathProps} />
        <Path d="M12 4H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3l-1 1v1h1l2-2.03L9 18v-5H4V6h9v2h2V7a3 3 0 0 0-3-3ZM5 14a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66L10 13.77v5.51c0 .38.32.72.7.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .7-.34.7-.72v-5.51l-1.43-4.11Zm-8.16.34h7.19l1.03 3h-9.25l1.03-3ZM12 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" {...pathProps} />
        </G>
    </Svg>
    )
}

export default ChattaSvg;
