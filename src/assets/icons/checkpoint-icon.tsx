import Svg, { Path } from 'react-native-svg'

const CheckpointIcon = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={21}
        fill="none"
        {...props}
    >
        <Path
            stroke="#3F434A"
            strokeLinecap="round"
            strokeWidth={2}
            d="M15 10h.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C19 11.52 19 12.08 19 13.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C17.48 20 16.92 20 15.8 20H4.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C1 18.48 1 17.92 1 16.8v-3.6c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C2.52 10 3.08 10 4.2 10H5M3.5 20 5 10m11.5 10L15 10M10 16v-3"
        />
        <Path
            stroke="#3F434A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 4.833V2c0-.236 0-.354.073-.427.073-.073.191-.073.427-.073h3.667l-1.25 1.667 1.25 1.666H8Zm0 0v2.5"
        />
    </Svg>
)
export default CheckpointIcon
