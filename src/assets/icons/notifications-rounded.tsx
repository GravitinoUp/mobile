import Svg, { Path } from 'react-native-svg'

const NotificationsRoundedIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path
            fill="#F8F8F8"
            d="M20 40c11.015 0 20-8.985 20-20C40 8.984 31.016 0 20 0S0 8.984 0 20c0 11.015 8.984 20 20 20Z"
        />
        <Path
            stroke="#9197A0"
            strokeWidth={2}
            d="M15.836 16.977a4.19 4.19 0 0 1 8.328 0l.189 1.7c.097.872.38 1.712.832 2.465l.434.722c.193.322.29.483.325.608a1 1 0 0 1-.704 1.245c-.126.033-.314.033-.69.033h-9.1c-.376 0-.564 0-.69-.033a1 1 0 0 1-.704-1.245c.036-.125.132-.286.326-.608l.433-.722a6.099 6.099 0 0 0 .832-2.465l.189-1.7Z"
        />
        <Path
            stroke="#9197A0"
            strokeLinecap="round"
            strokeWidth={2}
            d="M17 23.75a3 3 0 1 0 6 0"
        />
    </Svg>
)
export default NotificationsRoundedIcon
