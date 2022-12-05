import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

interface PadlockSvgProps{
  svgProps?: React.SVGProps<Svg>
  pathProps?: React.SVGProps<Path>
  rectProps?: React.SVGProps<Rect>
}

function PadlockSvg(props: PadlockSvgProps | any) {

  const { svgProps, pathProps, rectProps } = props;

  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <Rect
        x={3}
        y={10}
        width={18}
        height={12}
        rx={2}
        stroke="#6E7191"
        strokeWidth={2}
        {...rectProps}
      />
      <Path
        d="M7 10V6a5 5 0 1110 0v4"
        stroke="#6E7191"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </Svg>
  )
}

export default PadlockSvg;
