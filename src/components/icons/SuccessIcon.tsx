import { Center } from '@gluestack-ui/themed'
import Svg, { Circle, Path } from 'react-native-svg'

const SuccessIcon = (props: any) => {
    return (
        <Center>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                {...props}
            >
                <Circle cx={10} cy={10} r={10} fill={props.color} />
                <Circle
                    cx={10}
                    cy={10}
                    r={5.25}
                    stroke="#fff"
                    strokeWidth={2}
                />
                <Path
                    stroke="#fff"
                    strokeWidth={2}
                    d="m7.667 10 1.75 1.75 2.916-3.5"
                />
            </Svg>
        </Center>
    )
}

export default SuccessIcon
