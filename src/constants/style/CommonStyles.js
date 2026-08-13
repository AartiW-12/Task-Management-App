import { Colors, Spacings } from "./ConstantStyling";

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
    }
}