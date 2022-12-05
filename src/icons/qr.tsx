import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg";

interface QRSvgProps{
  svgProps: React.SVGProps<Svg>
  pathProps: React.SVGProps<Path>
}

const QRSvg = (props: QRSvgProps | any) => {
  const { svgProps, pathProps } = props;

  return(
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 .75A.75.75 0 0 1 .75 0h4.5a.75.75 0 1 1 0 1.5H1.5v3.75a.75.75 0 0 1-1.5 0V.75Zm18 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 1 1-1.5 0V1.5h-3.75A.75.75 0 0 1 18 .75ZM.75 18a.75.75 0 0 1 .75.75v3.75h3.75a.75.75 0 1 1 0 1.5H.75a.75.75 0 0 1-.75-.75v-4.5A.75.75 0 0 1 .75 18Zm22.5 0a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 1 1 0-1.5h3.75v-3.75a.75.75 0 0 1 .75-.75ZM4.5 4.5H9V9H4.5V4.5Zm0 10.5H9v4.5H4.5V15ZM15 4.5h4.5V9H15V4.5ZM10.5 3H3v7.5h7.5V3Zm0 10.5H3V21h7.5v-7.5Zm3-10.5H21v7.5h-7.5V3ZM6 6h1.5v1.5H6V6Zm10.5 0H18v1.5h-1.5V6Zm-9 10.5H6V18h1.5v-1.5Zm5.25-4.5H12v3h1.5v1.5H12V18h3v-3h1.5v3H18v-1.5h3V15h-4.5v-3h-3.75ZM15 15v-1.5h-1.5V15H15Zm6 5.25V18h-1.5v1.5h-3V21H21v-.75ZM15 21v-1.5h-3V21h3Zm3-7.5h3V12h-3v1.5Z"
        fill="#14142B"
        {...pathProps}
      />
    </Svg>
  )
}

export default QRSvg;