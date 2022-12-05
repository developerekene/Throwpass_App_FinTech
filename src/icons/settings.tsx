import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg";

interface SettingsSvgProps{
    svgProps: React.SVGProps<Svg>;
    CircleProps: React.SVGProps<Circle>;
    pathProps: React.SVGProps<Path>;
}

function SettingsSvg(props: SettingsSvgProps | any) {
    const { svgProps, CircleProps, pathProps } = props;
  return (
    <Svg
      width={26}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <Circle cx={13} cy={13} r={4} stroke="#F2F2F2" strokeWidth={2} {...CircleProps} />
      <Path
        d="M11.284 2.863c.777-1.296 2.655-1.296 3.432 0l.705 1.178a2 2 0 002.202.912l1.332-.334c1.465-.367 2.793.96 2.426 2.426l-.334 1.332a2 2 0 00.912 2.202l1.178.705c1.296.777 1.296 2.655 0 3.432l-1.178.705a2 2 0 00-.912 2.202l.334 1.332c.367 1.465-.96 2.793-2.426 2.426l-1.332-.334a2 2 0 00-2.202.912l-.705 1.178c-.777 1.296-2.655 1.296-3.432 0l-.705-1.178a2 2 0 00-2.202-.912l-1.332.334c-1.465.367-2.793-.96-2.426-2.426l.334-1.332a2 2 0 00-.912-2.202l-1.178-.705c-1.296-.777-1.296-2.655 0-3.432l1.178-.705a2 2 0 00.912-2.202l-.334-1.332c-.367-1.465.96-2.793 2.426-2.426l1.332.334a2 2 0 002.202-.912l.705-1.178z"
        stroke="#F2F2F2"
        strokeWidth={2}
        {...pathProps}
      />
    </Svg>
  )
}

export default SettingsSvg;
