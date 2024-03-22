import CircularProgress from 'react-native-circular-progress-indicator'
import getQualityColor from './get-quality-color'

interface AppCircularProgressProps {
    value: number
}

const AppCircularProgress = ({ value }: AppCircularProgressProps) => (
    <CircularProgress
        value={value}
        activeStrokeColor={getQualityColor(value, false)}
        inActiveStrokeColor={getQualityColor(value, true)}
        radius={16}
        activeStrokeWidth={5}
        inActiveStrokeWidth={5}
        progressValueFontSize={12}
    />
)

export default AppCircularProgress
