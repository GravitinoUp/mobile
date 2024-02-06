import Svg, { Circle, Path } from "react-native-svg";

const CancelledIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={10} fill="#FF6B6B" />
    <Circle cx={10} cy={10} r={5.25} stroke="#fff" strokeWidth={2} />
    <Path stroke="#fff" strokeWidth={2} d="M7.375 10h5.25" />
  </Svg>
)

export default CancelledIcon;