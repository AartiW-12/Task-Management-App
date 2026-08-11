import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

export const Colors = {
    primary: '#2563EB',
    

    white: '#FFFFFF',

    screenBackground: '#F8FAFC',

    textColor: '#111827',

    onboardingDot :'#D7E3F7'
}

export const fontSizes = {
    xs: moderateScale(10),
    sm: moderateScale(12),
    md: moderateScale(14),
    lg: moderateScale(16),
    xl: moderateScale(18),
    xxl: moderateScale(20),

    title: moderateScale(24),
    heading: moderateScale(28),

    arrowSize: moderateScale(36)
}

export const Spacings = {
    //horizantal scaling
    xs: scale(10),
    sm: scale(12),
    md: scale(14),
    lg: scale(16),
    xl: scale(18),
    xxl: scale(20),

    title: scale(24),
    heading: scale(28),

    arrowSize:scale(36),

    //verticle scaling
    vxs: verticalScale(10),
    vsm: verticalScale(12),
    vmd: verticalScale(14),
    vlg: verticalScale(16),
    vxl: verticalScale(18),
    vxxl: verticalScale(20),

    vtitle: verticalScale(24),
    vheading: verticalScale(28),

    varrowSize:verticalScale(36),

    // constant styling
    mxs: moderateScale(10),
    msm: moderateScale(12),
    mmd: moderateScale(14),
    mlg: moderateScale(16),
    mxl: moderateScale(18),
    mxxl: moderateScale(20),

    mtitle: moderateScale(24),
    mheading: moderateScale(28),

    marrowSize: moderateScale(36),


    //width
    fullWidth :'100%',
    halfWidth:'50%',
    w75:'75%',

    //height
    h45:45,
}

export const fontWeights = {
    w700 : '700',
    w500 : '500',
}

export const Fonts = {
    regular: 'Inter_18pt-Regular',
    light: 'Inter_18pt-Light',
    medium: 'Inter_18pt-Medium',
    semiBold: 'Inter_18pt-SemiBold',
    bold: 'Inter_18pt-Bold',
};
export const Numbers = {
    num120:120,
    num7: 7,
    num4:4,
}
export const IconStyling = {
    onboardingIconHeight:160,
    onboardingIconWidth: 160,
}