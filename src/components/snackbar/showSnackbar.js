import { Snackbar } from 'react-native-snackbar';

import { Colors } from '../../constants/style/ConstantStyling';

const SNACKBAR_TYPES = {
    success: {
        backgroundColor: Colors.sucess,
        textColor: Colors.white,
    },
    validation: {
        backgroundColor: Colors.validation,
        textColor: Colors.white,
    },
    error: {
        backgroundColor: Colors.danger,
        textColor: Colors.white,
    },
};
export const showSnackbar = ({
    msg,
    type = 'success',
    duration = 3000,
}) => {
    console.log("Snackbar called")
    const style =
        SNACKBAR_TYPES[type] ||
        SNACKBAR_TYPES.success;
    Snackbar.show({
        text: msg,
        duration,
        backgroundColor: style.backgroundColor,
        textColor: style.textColor,
    });
    console.log("EXecuted")
};