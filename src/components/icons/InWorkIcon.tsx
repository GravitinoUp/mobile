import Svg, { Circle, Path } from "react-native-svg";

const InWorkIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={10} r={10} fill="#8B63E7" />
    <Path
      fill="#fff"
      d="M10 7c0-.241 0-.362.086-.436.087-.075.195-.06.412-.028a3.5 3.5 0 1 1-3.25 5.628c-.135-.173-.203-.259-.18-.371.02-.112.125-.172.334-.293l2.348-1.356c.122-.07.183-.105.217-.163.033-.058.033-.129.033-.27V7Z"
    />
    <Circle cx={10} cy={10} r={5.667} stroke="#fff" strokeWidth={2} />
  </Svg>
)

export default InWorkIcon;