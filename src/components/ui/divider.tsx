import { ComponentProps } from 'react'
import { View } from '@gluestack-ui/themed'
import { AppColors } from '../../constants/colors'

type ViewProps = ComponentProps<typeof View>
type DividerProps = {
    borderStyle?: 'solid' | 'dotted' | 'dashed' | undefined
} & ViewProps

const Divider = ({ borderStyle = 'dashed', ...props }: DividerProps) => (
    <View
        style={{
            height: 1,
            width: '100%',
            borderWidth: 1,
            borderColor: AppColors.border,
            borderStyle: borderStyle,
        }}
        {...props}
    />
)

export default Divider
