import React from 'react';
import { Text, View, StyleSheet, Pressable, } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

import Container1 from '../../assets/images/onboarding/Container1';
import Container2 from '../../assets/images/onboarding/Container2';
import Container3 from '../../assets/images/onboarding/Container3';

import { Strings } from '../../constants/strings/Strings';
import { Colors, Fonts, fontSizes, fontWeights, IconStyling, Numbers, Spacings, } from '../../constants/style/ConstantStyling';

import Button from '../../constants/button/Button';

import { useNavigation } from '@react-navigation/native';


const OnboardingScreen = () => {

    const navigation = useNavigation();

    const handleDone = () => {
        navigation.replace('Login');
    };

    const NextButton = ({ onPress }) => {
        return (
            <Button
                varient="primary"
                text={Strings.buttonText.continue}
                style={styles.nextButton}
                onPress={onPress}
            />
        );
    };
    const DoneButton = ({ onPress }) => {
        return (
            <Button
                varient="primary"
                text={Strings.buttonText.getStarted}
                style={styles.nextButton}
                onPress={onPress}
            />
        );
    };


    const Dot = ({ selected }) => {
        return (
            <View
                style={[
                    styles.dot,
                    selected && styles.selectedDot,
                ]}
            />
        );
    };


    const ImageCard = ({ children }) => {
        return (
            <View style={styles.imageCard}>
                {children}
            </View>
        );
    };


    return (
        <View style={styles.screen}>
            <Onboarding

                onDone={handleDone}
                onSkip={handleDone}

                showSkip={false}

                NextButtonComponent={NextButton}
                DoneButtonComponent={DoneButton}

                DotComponent={Dot}
                containerStyles={styles.container}
                imageContainerStyles={styles.imageContainer}

                titleStyles={styles.title}

                subTitleStyles={styles.subtitle}


                pages={[
                    {
                        backgroundColor: Colors.screenBackground,

                        image: (
                            <ImageCard>
                                <Container1
                                    height={IconStyling.onboardingIconHeight}
                                    width={IconStyling.onboardingIconWidth}
                                />
                            </ImageCard>
                        ),

                        title:
                            Strings.onboardingTitle.title1,

                        subtitle:
                            Strings.onboardingSubtitle.subtitle1,
                    },


                    {
                        backgroundColor: Colors.screenBackground,

                        image: (
                            <ImageCard>
                                <Container2
                                    height={IconStyling.onboardingIconHeight}
                                    width={IconStyling.onboardingIconWidth}
                                />
                            </ImageCard>
                        ),

                        title:
                            Strings.onboardingTitle.title2,

                        subtitle:
                            Strings.onboardingSubtitle.subtitle2,
                    },


                    {
                        backgroundColor: Colors.screenBackground,

                        image: (
                            <ImageCard>
                                <Container3
                                    height={IconStyling.onboardingIconHeight}
                                    width={IconStyling.onboardingIconWidth}
                                />
                            </ImageCard>
                        ),

                        title:
                            Strings.onboardingTitle.title3,

                        subtitle:
                            Strings.onboardingSubtitle.subtitle3,
                    },
                ]}
            />

            <Pressable
                onPress={handleDone}
                style={styles.skipButton}
            >
                <Text style={styles.skipText}>
                    {Strings.buttonText.skip}
                </Text>
            </Pressable>

        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },
    container: {
        backgroundColor: Colors.screenBackground,
    },
    imageContainer: {
        paddingBottom: Spacings.onboardingIconTitle,
    },
    imageCard: {
        width: Numbers.num120,
        height: Numbers.num120,
        borderRadius: Spacings.mlg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: fontSizes.xxl,
        fontFamily:Fonts.bold,
        fontWeight: fontWeights.w700,
        color: Colors.textColor,
        textAlign: 'center',
        width: Spacings.w75,
        alignSelf: 'center',
        marginBottom: Spacings.onboardingTitleSubtitle,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: Colors.textColor,
        textAlign: 'center',
        width: Spacings.halfWidth,
        alignSelf: 'center',
    },
    skipButton: {
        position: 'absolute',
        top: Spacings.vxxl,
        right: Spacings.xxl,
        paddingHorizontal: Spacings.xs,
        paddingVertical: Spacings.vxs,
        zIndex: Spacings.mxs,
    },
    skipText: {
        fontSize: fontSizes.md,
        color: Colors.textColor,
        fontWeight: fontWeights.w500,
    },
    nextButton: {
        width: Spacings.fullWidth,
        height: Spacings.h45,
        borderRadius:Spacings.mheading,
        alignSelf:"flex-start",
    },
    dot: {
        width: Numbers.num7,
        height: Numbers.num7,
        borderRadius: Spacings.mxs,
        backgroundColor: Colors.onboardingDot,
        marginHorizontal: Numbers.num4,
        marginBottom:120
    },
    selectedDot: {
        width: Spacings.title,
        height: Numbers.num7,
        borderRadius: Spacings.mxs,
        backgroundColor: Colors.primary,
    },

});


export default OnboardingScreen;