import { Center } from "native-base";
import Svg, { Circle, Path } from "react-native-svg";

const PendingIcon = (props: any) => {
  return <Center>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <Circle cx={10} cy={10} r={10} fill="#FFD240" />
      <Circle cx={10} cy={10} r={5.667} stroke="#fff" strokeWidth={2} />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M12.625 10H10.25a.25.25 0 0 1-.25-.25V7.958"
      />
    </Svg>
  </Center>
};

export default PendingIcon;