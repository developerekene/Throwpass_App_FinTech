import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

interface AlertInfoSvgProps{
    svgProps: React.SVGProps<Svg>;
    CircleProps: React.SVGProps<Circle>;
    pathProps: React.SVGProps<Path>;
}

const AlertInfoSvg = (props: AlertInfoSvgProps | any) =>{
    const { svgProps, CircleProps, pathProps } = props;

    return(
        <Svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <Circle cx={12} cy={12} r={11} stroke="#4F4F4F" strokeWidth={2} {...CircleProps}/>
            <Path
            d="M12 7v5M12 16v.5"
            stroke="#4F4F4F"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...pathProps}
            />
        </Svg>
    )
}

export default AlertInfoSvg;
