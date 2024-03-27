import Svg, { Path } from 'react-native-svg'

const OrganizationIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            stroke="#3F434A"
            strokeWidth={2}
            d="M4.167 10.633c0-1.132 0-1.697.228-2.195.229-.497.658-.865 1.518-1.601l.833-.715C8.299 4.792 9.075 4.126 10 4.126c.925 0 1.701.665 3.254 1.996l.833.715c.86.736 1.289 1.104 1.518 1.601.228.498.228 1.063.228 2.195v3.534c0 1.571 0 2.357-.488 2.845s-1.274.488-2.845.488h-5c-1.572 0-2.357 0-2.845-.488-.489-.488-.489-1.274-.489-2.845v-3.534Z"
        />
        <Path
            stroke="#3F434A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12.083 17.5v-4a1 1 0 0 0-1-1H8.916a1 1 0 0 0-1 1v4"
        />
    </Svg>
)
export default OrganizationIcon
