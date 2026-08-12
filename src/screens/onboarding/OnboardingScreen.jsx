import React, { useRef, useState } from 'react';
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

    const [currentPage, setCurrentPage] = useState(0);
    const onboardingRef = useRef(null);

    const handleNext = () => {
        onboardingRef.current?.goNext();
    };

    const handleDone = () => {
        navigation.navigate("Login")
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
    return (
        <View style={styles.screen}>
            <Onboarding
                ref={onboardingRef}

                onDone={handleDone}
                onSkip={handleDone}

                showSkip={false}
                showDone={false}
                showNext={false}

                pageIndexCallback={(index) => {
                    setCurrentPage(index);
                }}

                DotComponent={Dot}

                containerStyles={styles.container}
                imageContainerStyles={styles.imageContainer}
                bottomBarColor={Colors.screenBackground}

                pages={[
                    {
                        backgroundColor: Colors.screenBackground,
                        image: (
                            <View style={styles.imageCard}>
                                <Container1
                                    height={IconStyling.onboardingIconHeight}
                                    width={IconStyling.onboardingIconWidth}
                                />
                            </View>
                        ),
                        title: (
                            <Text style={styles.title}>{Strings.onboardingTitle.title1}</Text>
                        ),
                        subtitle: (
                            <Text style={styles.subtitle}>{Strings.onboardingSubtitle.subtitle1}</Text>
                        )
                    },
                    {
                        backgroundColor: Colors.screenBackground,
                        image: (
                            <View style={styles.imageCard}>
                                <Container2
                                    height={IconStyling.onboardingIconHeight}
                                    width={IconStyling.onboardingIconWidth}
                                />
                            </View>
                        ),
                        title: (
                            <Text style={styles.title}>{Strings.onboardingTitle.title2}</Text>
                        ),
                        subtitle: (
                            <Text style={styles.subtitle}>{Strings.onboardingSubtitle.subtitle2}</Text>
                        )
                    },
                    {
                        backgroundColor: Colors.screenBackground,
                        image: (
                            <View style={styles.imageCard}>
                                <Container3
                                    height={IconStyling.onboardingIconHeight}
                                    width={IconStyling.onboardingIconWidth}
                                />
                            </View>
                        ),
                        title: (
                            <Text style={styles.title}>{Strings.onboardingTitle.title3}</Text>
                        ),
                        subtitle: (
                            <Text style={styles.subtitle}>{Strings.onboardingSubtitle.subtitle3}</Text>
                        ),
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

            <Button
                varient="primary"
                text={
                    currentPage === 2
                        ? Strings.buttonText.getStarted
                        : Strings.buttonText.continue
                }
                style={styles.bottomButton}
                onPress={
                    currentPage === 2
                        ? handleDone
                        : handleNext
                }
            />
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
        fontFamily: Fonts.bold,
        fontWeight: fontWeights.w700,
        color: Colors.textColor,
        textAlign: 'center',
        width: Spacings.halfWidth,
        alignSelf: 'center',
        marginBottom: Spacings.onboardingTitleSubtitle,
        paddingVertical: Spacings.vlg,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: Colors.textColor,
        textAlign: 'center',
        width: Spacings.w90,
        alignSelf: 'center',
        lineHeight: fontSizes.md * 1.5,
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
    dot: {
        width: Numbers.num7,
        height: Numbers.num7,
        borderRadius: Spacings.mxs,
        backgroundColor: Colors.onboardingDot,
        marginHorizontal: Numbers.num4,
        marginBottom: Numbers.num120,
    },
    selectedDot: {
        width: Spacings.title,
        height: Numbers.num7,
        borderRadius: Spacings.mxs,
        backgroundColor: Colors.primary,
    },
    bottomButton: {
        position: 'absolute',
        bottom: Spacings.vxxl,
        alignSelf: 'center',
        width: Spacings.w90,
        height: Spacings.h45,
        borderRadius: Spacings.md,
        backgroundColor: Colors.primary,
        zIndex: Numbers.num20,
    },
});


export default OnboardingScreen;