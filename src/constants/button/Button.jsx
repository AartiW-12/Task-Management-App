import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors, Spacings } from '../style/ConstantStyling'
import Loader from '../../components/loader/Loader'

const Button = ({
    varient = 'primary',
    text,
    onPress,
    style,
    textStyle,
    icon,
    loading = false
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.btn,
                varient === 'primary' ? styles.primary : styles.secondary,
                style
            ]}
        >
            {loading ? <Loader visible={true} size='large'/> :
                <View style={styles.buttonContent}>
                    {icon && icon}

                    <Text
                        style={[
                            styles.text,
                            varient === 'primary'
                                ? styles.primaryText
                                : styles.secondaryText,
                            textStyle
                        ]}
                    >
                        {text}
                    </Text>
                </View>
            }

        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: Spacings.fullWidth,
        height: 45,
        borderRadius: Spacings.lg,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: Colors.primary,
        elevation: 9,
    },

    primary: {
        backgroundColor: Colors.primary,
    },

    secondary: {
        backgroundColor: Colors.socialButtonBackground,
    },

    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacings.sm,
    },

    text: {},

    primaryText: {
        color: Colors.screenBackground
    },

    secondaryText: {
        color: Colors.primary
    }
})

export default Button