import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import { moveFile } from 'react-native-fs'
import { HStack } from '@gluestack-ui/themed'

export default function CameraScreen({ navigation, route }: any) {
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)

    const [cameraEnabled, setCameraEnabled] = useState(false)

    const files = route.params.files

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

            navigation.navigate({
                name: 'CloseOrderScreen',
                params: { files: [...files, newUri] },
                merge: true,
            })
        }
    }

    const onInitialized = useCallback(() => {
        setCameraEnabled(true)
    }, [])

    if (device == null) return <View />
    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={camera}
                style={{ width: '100%', height: '100%' }}
                device={device}
                isActive={true}
                photo={true}
                onInitialized={onInitialized}
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
        borderWidth: 6,
        borderColor: 'white',
    },
})
