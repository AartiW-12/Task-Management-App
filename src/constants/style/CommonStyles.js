import { moderateScale } from "react-native-size-matters";
import { Colors, Fonts, fontSizes, Spacings } from "./ConstantStyling";

export const CommonStyles = {
    flex1: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },
    parentContainer: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingTop: Spacings.vsm
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(16),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        paddingHorizontal: Spacings.xl,
    },
    emptyList: {
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 150,
        fontFamily: Fonts.medium,
        fontSize: fontSizes.xl,
        color: Colors.danger
    },
    emptyListText: {
        fontFamily: Fonts.medium,
        fontSize: fontSizes.md,
        color: Colors.danger,
        alignSelf: 'center',
        paddingVertical: Spacings.xxl
    }
}