import { Center } from '@gluestack-ui/themed'
import Svg, { Path } from 'react-native-svg'

export const CalendarAddIcon = (props: any) => {
    return (
        <Center>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                {...props}
            >
                <Path
                    stroke="#33363F"
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M2 9h16M8 14h4m-2-2v4M6 1v4m8-4v4M5 19h10c1.886 0 2.828 0 3.414-.586C19 17.828 19 16.886 19 15V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H5c-1.886 0-2.828 0-3.414.586C1 5.172 1 6.114 1 8v7c0 1.886 0 2.828.586 3.414C2.172 19 3.114 19 5 19Z"
                />
            </Svg>
        </Center>
    )
}
