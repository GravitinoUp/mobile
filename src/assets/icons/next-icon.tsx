import Svg, { Circle, Path } from 'react-native-svg'
const NextIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        fill="none"
        {...props}
    >
        <Circle cx={11} cy={11} r={10} fill="#fff" stroke="#EDEDED" />
        <Path stroke="#3F434A" strokeWidth={2} d="m10 14 3-3-3-3" />
    </Svg>
)

export default NextIcon
