import React from 'react';
import {ActivityIndicator,} from 'react-native';
import {Colors} from '../../constants/style/ConstantStyling';

const Loader = ({
    visible = false,
    size = 'small',
    color = Colors.white,
}) => {
    if (!visible) {
        return null;
    }
    return (
        <ActivityIndicator
            size={size}
            color={color}
        />
    );
};


export default Loader;