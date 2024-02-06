import { Center } from "native-base";
import Svg, { Circle, Path } from "react-native-svg";

const AddIcon = (props: any) => (
  <Center>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <Circle cx={10} cy={10} r={10} fill="#C4C4C4" />
      <Circle cx={10} cy={10} r={5.25} stroke="#fff" strokeWidth={2} />
      <Path
        stroke="#fff"
        strokeLinecap="square"
        strokeWidth={2}
        d="M10 11.75v-3.5M11.75 10h-3.5"
      />
    </Svg>
  </Center>
)

export default AddIcon;