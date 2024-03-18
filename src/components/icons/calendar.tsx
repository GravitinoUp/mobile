import { Center } from '@gluestack-ui/themed'
import Svg, { Path, SvgProps } from 'react-native-svg'

const CalendarIcon = (props: any) => {
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
                    fill="#595F69"
                    fillRule="evenodd"
                    d="M5.9 2a.75.75 0 0 1 .75.75v.504h2.6V2.75a.75.75 0 0 1 1.5 0v.504h2.5V2.75a.75.75 0 0 1 1.5 0v.504h.5A2.75 2.75 0 0 1 18 6.004v3.094a.75.75 0 0 1-1.5 0V6.004c0-.69-.56-1.25-1.25-1.25h-.5v.497a.75.75 0 0 1-1.5 0v-.497h-2.5v.497a.75.75 0 0 1-1.5 0v-.497h-2.6v.497a.75.75 0 0 1-1.5 0v-.497h-.4c-.69 0-1.25.56-1.25 1.25v9.25c0 .69.56 1.25 1.25 1.25h4.344a.75.75 0 0 1 0 1.5H4.75A2.75 2.75 0 0 1 2 15.254v-9.25a2.75 2.75 0 0 1 2.75-2.75h.4V2.75A.75.75 0 0 1 5.9 2Zm.72 6.554a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Zm2 .7a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Zm-2 2.03a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Zm2 .7a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Zm-2 2.01a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Zm2 .7a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Zm3.43-6.14a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Zm2 .7a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Z"
                    clipRule="evenodd"
                />
                <Path
                    fill="#595F69"
                    fillRule="evenodd"
                    d="M16.5 14.004a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm1.5 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-3.8-1a.5.5 0 0 0-1 0v1.5a.5.5 0 0 0 .5.5h1.2a.5.5 0 0 0 0-1h-.7v-1Z"
                    clipRule="evenodd"
                />
            </Svg>
        </Center>
    )
}

export default CalendarIcon