import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts, fontSizes, fontWeights, IconStyling, Numbers, Spacings } from '../../constants/style/ConstantStyling'

import { CommonStyles } from '../../constants/style/CommonStyles'
import TaskFlowIcon from '../../assets/images/Icons/TaskFlowIcon.svg'
import SpiralIcon from '../../assets/images/Icons/SpiralIcon.svg'

import LinearGradient from 'react-native-linear-gradient'

import { Strings } from '../../constants/strings/Strings'
import Loader from '../../components/loader/Loader'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.primary, Colors.gardient]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.splashBackground}
            >
                <View style={styles.spiralContainer}>
                    <SpiralIcon width={'500'} height="900" />
                </View>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <TaskFlowIcon
                            height={100}
                            width={100}
                        />
                    </View>

                    <Text style={styles.heading}>{Strings.taskFlow}</Text>
                    <Text style={styles.appSlogen}>{Strings.appSlogen}</Text>
                </View>
                <View style={styles.loaderContainer}>
                    <Loader visible={true} size='30'/>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{ flex:1},
    splashBackground: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    spiralContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },

    iconContainer: {
        paddingTop: Spacings.vsm,
        alignItems: 'center',
    },

    heading: {
        fontFamily: Fonts.bold,
        fontSize: fontSizes.heading,
        color: Colors.white,
        textAlign: 'center',
        paddingTop:Spacings.vsm
    },

    appSlogen: {
        fontFamily: Fonts.medium,
        fontSize: fontSizes.xs,
        color: Colors.white,
        opacity: Numbers.p5,
        textAlign: 'center',
    },
    loaderContainer : {
        paddingTop:Spacings.vheading
    }
});
export default SplashScreen