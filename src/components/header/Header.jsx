import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

import {
  Colors,
  Fonts,
  fontSizes,
  fontWeights,
  Spacings,
} from '../../constants/style/ConstantStyling';

import LeftIcon from '../../assets/images/Icons/LeftIcon.svg'

const Header = ({
  title = '',
  leftIcon,
  rightIcon,
  onBackPress,
  onRightPress,
  showBack = true,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>

      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            {leftIcon || (
              <LeftIcon height={20} width={20}/>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* RIGHT */}
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    backgroundColor: Colors.screenBackground,
  },

  leftContainer: {
    width: scale(40),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightContainer: {
    width: scale(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  iconButton: {
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:moderateScale(20),
    backgroundColor:Colors.inputBackground
  },

  backArrow: {
    // fontSize: moderateScale(40),
    color: Colors.textColor,
    fontFamily: Fonts.regular,
    lineHeight: moderateScale(30),
  },

  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.w700,
    color: Colors.textColor,
    fontFamily: Fonts.semiBold,
  },

});

export default Header;