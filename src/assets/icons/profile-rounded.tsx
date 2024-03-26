import Svg, { Circle, Path } from 'react-native-svg'

const ProfileRoundedIcon = (props: any) => (
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
        <Circle
            cx={20}
            cy={16.25}
            r={3}
            stroke="#9197A0"
            strokeLinecap="round"
            strokeWidth={2}
        />
        <Path
            stroke="#9197A0"
            strokeLinecap="round"
            strokeWidth={2}
            d="M14.945 25.002C15.423 22.733 17.68 21.5 20 21.5v0c2.319 0 4.577 1.233 5.055 3.502.053.253.098.512.131.774.068.535-.373.974-.913.974h-8.546c-.54 0-.98-.439-.913-.974.033-.262.078-.521.13-.774Z"
        />
    </Svg>
)
export default ProfileRoundedIcon
