import React from 'react';

import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import SearchIcon from '../../assets/images/Icons/SearchIcon.svg';

import {
  Colors,
  Fonts,
  fontSizes,
  Spacings,
} from '../../constants/style/ConstantStyling';

const Searchbar = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  searchIcon: SearchIconComponent = SearchIcon,
  containerStyle,
  inputStyle,
  editable = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>

      <SearchIconComponent
        width={Spacings.lg}
        height={Spacings.lg}
        opacity={0.5}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.darkGray}
        editable={editable}
        style={[styles.input, inputStyle]}
        numberOfLines={1}
      />

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    width:Spacings.fullWidth,
    height: verticalScale(38),
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: scale(12),

    backgroundColor: Colors.inputBackground,

    borderWidth: 1,
    borderColor: Colors.gray,

    borderRadius: scale(20),
  },

  input: {
    flex: 1,

    marginLeft: scale(8),

    paddingVertical: 0,

    fontSize: fontSizes.xs,
    fontFamily: Fonts.regular,

    color: Colors.textColor,
  },

});

export default Searchbar;