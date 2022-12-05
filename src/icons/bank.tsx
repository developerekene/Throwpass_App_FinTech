import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function BankSvg(props: SvgProps | any) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.999 21.185H.001V24h23.998v-2.815zM23.999 6.14H.001v2.815h23.998V6.14zM12 0L.564 4.734h22.872L12 0zM4.937 10.362H2.11v9.417h2.826v-9.417zM10.587 10.362H7.762v9.417h2.825v-9.417zM16.238 10.362h-2.825v9.417h2.825v-9.417zM21.889 10.362h-2.826v9.417h2.826v-9.417z"
        fill="#0122AE"
      />
    </Svg>
  )
}

export default BankSvg;
