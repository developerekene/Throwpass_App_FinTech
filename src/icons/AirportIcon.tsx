import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m22.611 6.48-2.348-.754a.789.789 0 0 0-.875.291l-1.611 2.555L8.93 4.166A5.554 5.554 0 0 0 .926 6.995 1.509 1.509 0 0 0 1.92 8.88l5.811 1.886.583.188 1.097 3.755a.772.772 0 0 0 .532.548l2.64.857a.822.822 0 0 0 1.131-.925l-.549-2.675.378.12 5.674 1.835a1.475 1.475 0 0 0 1.903-.892l1.988-6.171a.755.755 0 0 0-.497-.926v0ZM.857 23.143h22.286"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
