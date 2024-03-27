import { Center } from '@gluestack-ui/themed'
import Svg, { Circle, Path } from 'react-native-svg'

export const FileIcon = (props: any) => (
    <Center>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <Path
                stroke={props.color}
                strokeLinecap="round"
                strokeWidth={2}
                d="M9 13h6M9 9h4M9 17h4"
            />
            <Path
                stroke={props.color}
                strokeWidth={2}
                d="M19 13v2c0 2.828 0 4.243-.879 5.121C17.243 21 15.828 21 13 21h-2c-2.828 0-4.243 0-5.121-.879C5 19.243 5 17.828 5 15V9c0-2.828 0-4.243.879-5.121C6.757 3 8.172 3 11 3"
            />
            <Path
                stroke={props.color}
                strokeLinecap="round"
                strokeWidth={2}
                d="M18 3v6M21 6h-6"
            />
        </Svg>
    </Center>
)

export const ReportIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Circle cx={12} cy={12} r={9} stroke={props.color} strokeWidth={2} />
        <Circle cx={12} cy={12} r={4} stroke={props.color} strokeWidth={2} />
        <Path
            stroke={props.color}
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 3v4.5M18 18l-3-3m3-9-3 3M3 12h4.5"
        />
    </Svg>
)

export const NotificationsIcon = (props: any) => (
    <Center>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={26}
            height={26}
            fill="none"
            {...props}
        >
            <Path
                fill={props.color}
                fillRule="evenodd"
                d="M14.455 4.474a6.586 6.586 0 0 0-9.001 5.385l-.252 2.266-.006.054a7 7 0 0 1-.939 2.782l-.028.047-.578.963-.024.04c-.242.403-.46.768-.606 1.077-.148.314-.307.74-.23 1.224a2 2 0 0 0 .691 1.222c.375.314.822.397 1.168.432.34.034.766.034 1.235.034h12.23c.469 0 .894 0 1.235-.034.345-.035.792-.118 1.167-.432a2 2 0 0 0 .692-1.222c.076-.483-.082-.91-.23-1.224-.146-.31-.365-.674-.606-1.077l-.024-.04-.578-.963-.028-.047a7.001 7.001 0 0 1-.815-2.047 5.022 5.022 0 0 1-2.045-.04 9 9 0 0 0 1.141 3.11l.032.053.578.963c.273.456.438.733.536.94l.014.032-.035.004c-.227.023-.55.024-1.081.024H5.932c-.531 0-.854-.001-1.082-.024a2.323 2.323 0 0 1-.035-.004l.015-.032c.098-.207.263-.484.536-.94l.578-.963.032-.053a9 9 0 0 0 1.207-3.577l.007-.06.252-2.267a4.586 4.586 0 0 1 5.893-3.882 5.006 5.006 0 0 1 1.12-1.724Zm2.527 1.804a2 2 0 0 0-.937 2.145c.12.225.222.461.305.707a1.998 1.998 0 0 0 2.203.793l-.007-.064a6.565 6.565 0 0 0-1.564-3.581Z"
                clipRule="evenodd"
            />
            <Path
                stroke={props.color}
                strokeLinecap="round"
                strokeWidth={2}
                d="M9.102 19.665c.171.957.548 1.802 1.072 2.405.524.603 1.166.93 1.826.93.66 0 1.302-.327 1.826-.93s.9-1.448 1.072-2.405"
            />
            <Circle
                cx={18}
                cy={8}
                r={2.5}
                fill={props.color}
                stroke={props.color}
            />
            <Circle
                cx={19.5}
                cy={6.5}
                r={5.5}
                fill="#FC5555"
                stroke="#fff"
                strokeWidth={2}
            />
        </Svg>
    </Center>
)

export const ProfileIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            fill={props.color}
            fillRule="evenodd"
            d="M5.809 15.19C7.028 14.412 8.5 14 10 14c1.5 0 2.972.411 4.191 1.19 1.22.78 2.135 1.9 2.557 3.21l-1.904.612c-.263-.816-.854-1.576-1.73-2.136C12.237 16.315 11.142 16 10 16s-2.237.315-3.114.876c-.875.56-1.467 1.32-1.73 2.136L3.252 18.4c.422-1.31 1.337-2.43 2.557-3.21ZM10 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
            clipRule="evenodd"
        />
        <Path
            fill={props.color}
            fillRule="evenodd"
            d="M12 2H8c-1.942 0-3.198.004-4.123.129-.867.116-1.139.305-1.291.457-.152.152-.34.424-.457 1.291C2.004 4.802 2 6.057 2 8v4c0 1.942.004 3.198.129 4.123.116.867.305 1.139.457 1.291.152.152.424.34 1.291.457.925.125 2.18.129 4.123.129h4c1.942 0 3.198-.004 4.123-.129.867-.116 1.139-.304 1.291-.457.152-.152.34-.424.457-1.291.125-.925.129-2.18.129-4.123V8c0-1.942-.004-3.198-.129-4.123-.116-.867-.304-1.139-.457-1.291-.152-.152-.424-.34-1.291-.457C15.198 2.004 13.943 2 12 2ZM1.172 1.172C0 2.343 0 4.229 0 8v4c0 3.771 0 5.657 1.172 6.828C2.343 20 4.229 20 8 20h4c3.771 0 5.657 0 6.828-1.172C20 17.657 20 15.771 20 12V8c0-3.771 0-5.657-1.172-6.828C17.657 0 15.771 0 12 0H8C4.229 0 2.343 0 1.172 1.172Z"
            clipRule="evenodd"
        />
    </Svg>
)