import Svg, { Circle, Path } from "react-native-svg"

const WarningIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={10} fill="#F8F8F8" />
    <Circle cx={10} cy={10} r={5.25} stroke="#FF6B6B" strokeWidth={2} />
    <Path
      fill="#FF6B6B"
      stroke="#FF6B6B"
      d="M10.292 7.375a.292.292 0 1 1-.584 0 .292.292 0 0 1 .584 0Z"
    />
    <Path stroke="#FF6B6B" strokeWidth={2} d="M10 12.917V8.834" />
  </Svg>
)
export default WarningIcon