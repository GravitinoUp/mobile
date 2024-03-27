import Svg, { Circle, Path } from 'react-native-svg'

const AssignedIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Circle cx={10} cy={10} r={10} fill="#0784D1" />
        <Path
            stroke="#fff"
            strokeWidth={2}
            d="M11.139 5.546c.488-.325.732-.488.995-.507a1 1 0 0 1 .338.034c.255.07.462.277.876.692l.887.887c.415.414.622.621.692.876a1 1 0 0 1 .034.338c-.02.263-.182.507-.507.995l-.696 1.044a7.665 7.665 0 0 0-1.139 2.748l-.111.558a.585.585 0 0 1-.906.366 20.47 20.47 0 0 1-5.179-5.179.585.585 0 0 1 .366-.906l.557-.111a7.664 7.664 0 0 0 2.749-1.139l1.044-.696Z"
        />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={2}
            d="m5.917 14.084 2.625-2.625"
        />
    </Svg>
)
export default AssignedIcon
