import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

export const Colors = {
    primary: '#2563EB',
    gardient:'#7C3AED',
    inputBackground: '#F1F5F9',
    priorityBadge : "#FFF1D2",
    BagdeText : "#C48700",
    inputPlaceholder : 'rgba(17, 24, 39, 0.5)',
    

    white: '#FFFFFF',


    screenBackground: '#F8FAFC',

    textColor: '#111827',
    gray : '#E2E8F0',
    darkGray : '#94979a',
    sucess :  '#16C784',
    danger : '#EF4444',


    onboardingDot :'#D7E3F7',

    statusBadge: {
        // Priority
        high: {
            background: '#FEF3C7',
            text: '#92400E',
        },

        critical: {
            background: '#FEE2E2',
            text: '#991B1B',
        },

        medium: {
            background: '#DFF2FF',
            text: '#258FC4',
        },

        low: {
            background: '#DCFCE7',
            text: '#166534',
        },

        // Project / Task Status
        inProgress: {
            background: '#DBEAFE',
            text: '#2563EB',
        },

        todo: {
            background: '#F1F3F7',
            text: '#718096',
        },

        review: {
            background: '#FFF7ED',
            text: '#9A3412',
        },

        completed: {
            background: '#DFF8E8',
            text: '#26A05D',
        },

        backlog: {
            background: '#F1F3F7',
            text: '#718096',
        },

        testing: {
            background: '#F3E5FF',
            text: '#8B43F5',
        },
    },

}

export const fontSizes = {
    xxs : moderateScale(8),
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
    xxs : scale(5),
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
    vxxs : verticalScale(5),
    vxs: verticalScale(10),
    vsm: verticalScale(12),
    vmd: verticalScale(14),
    vlg: verticalScale(16),
    vxl: verticalScale(18),
    vxxl: verticalScale(20),

    vtitle: verticalScale(24),
    vheading: verticalScale(28),

    varrowSize:verticalScale(36),
    v40:verticalScale(40),
    v47: verticalScale(47),

    // constant styling
    mxxs : moderateScale(5),
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
    w90:'90%',
    w15 : '15%',
    w10:'10%',
    w45:'45%',
    w48:'48%',
    w85:'85%',
    w38: '38%',

    //height
    h45:45,
    h65:65,
    h110 : 110,
    h54 : 54,
    h55:55,
}

export const fontWeights = {
    w700 : '700',
    w500 : '500',
    w600:'600',
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
    num20 : 20,
    num90 : 90,
    num16 : 16,
    num34 : 34,

    //opacity
    p1:1,
    p5:0.5,
    p2 : 0.2,
    zp1:0.1,
}
export const IconStyling = {
    onboardingIconHeight:100,
    onboardingIconWidth: 100,
}