import Svg, { Path } from "react-native-svg";

export const AddCircleIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#B6B8B8"
      fillRule="evenodd"
      d="M12 22.4c5.744 0 10.4-4.656 10.4-10.4 0-5.744-4.656-10.4-10.4-10.4C6.256 1.6 1.6 6.256 1.6 12c0 5.744 4.656 10.4 10.4 10.4Zm0 1.6c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
      clipRule="evenodd"
    />
    <Path
      fill="#B6B8B8"
      fillRule="evenodd"
      d="M12 5.867a.8.8 0 0 1 .8.8v10.666a.8.8 0 1 1-1.6 0V6.667a.8.8 0 0 1 .8-.8Z"
      clipRule="evenodd"
    />
    <Path
      fill="#B6B8B8"
      fillRule="evenodd"
      d="M18.133 12a.8.8 0 0 1-.8.8H6.667a.8.8 0 0 1 0-1.6h10.666a.8.8 0 0 1 .8.8Z"
      clipRule="evenodd"
    />
  </Svg>
)