import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    DimensionValue,
    Dimensions,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
    useWindowDimensions,
} from 'react-native'
import {
    Camera,
    CameraDeviceFormat,
    useCameraDevice,
    useCameraFormat,
    useFrameProcessor,
} from 'react-native-vision-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { moveFile } from 'react-native-fs'
import { HStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UnclosedOrderInterface } from '../../../types/interface/fetch'
import { OrderInterface } from '../../../types/interface/orders'
import { runOnJS } from 'react-native-reanimated'

export default function CameraScreen({ navigation, route }: any) {
    let update = 2
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)

    const [cameraEnabled, setCameraEnabled] = useState(false)

    const order: OrderInterface = route.params.order

    const takePhoto = async () => {
        setCameraEnabled(false)

        if (camera.current !== null) {
            const photo = await camera.current.takePhoto({
                flash: 'auto',
            })

            const savedPhoto = await CameraRoll.saveAsset(
                `file://${photo.path}`,
                {
                    type: 'photo',
                }
            )

            const newUri = savedPhoto.node.image.uri.replace(
                'mrousavy',
                'gravitino-'
            )
            await moveFile(
                savedPhoto.node.image.uri,
                savedPhoto.node.image.uri.replace('mrousavy', 'gravitino-')
            )

            const storedFiles = {
                order_id: order.order_id,
                comment: '',
                files: [],
            }
            const jsonStoredFiles = await AsyncStorage.getItem(
                `order-${order.order_id}`
            )
            if (jsonStoredFiles !== null) {
                storedFiles.files = JSON.parse(jsonStoredFiles).files
            }

            const data: UnclosedOrderInterface = {
                order_id: order.order_id,
                order_name: `${order.order_name}`,
                files: [...storedFiles.files, newUri],
            }

            await AsyncStorage.setItem(
                `order-${order.order_id}`,
                JSON.stringify(data)
            )

            navigation.navigate({
                name: 'OrderScreen',
                params: { orderID: order.order_id },
                merge: true,
            })
        }
    }

    const onInitialized = () => {
        setCameraEnabled(true)
    }

    if (!device) return <View />

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={camera}
                device={device}
                resizeMode={'contain'}
                isActive={true}
                photo={true}
                onInitialized={onInitialized}
                style={StyleSheet.absoluteFill}
            />
            <HStack style={styles.bottomBar}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.captureButton}
                    onPress={cameraEnabled ? takePhoto : undefined}
                />
            </HStack>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    bottomBar: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 24,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#00000033',
        backgroundColor: 'white',
    },
})
