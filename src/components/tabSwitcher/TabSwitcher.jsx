import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { scale, verticalScale, } from 'react-native-size-matters';

import Button from '../../constants/button/Button';
import { Colors, Fonts, fontSizes, fontWeights, Spacings,} from '../../constants/style/ConstantStyling';

const TabSwitcher = ({
  tabs,
  activeTab,
  onTabPress,
  variant = 'pill',
  containerStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        variant === 'underline' && styles.underlineContainer,
        containerStyle,
      ]}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.value;
        if (variant === 'underline') {
          return (
            <TouchableOpacity
              key={tab.value}
              style={[
                styles.underlineTab,
                isActive && styles.activeUnderlineTab,
                buttonStyle,
              ]}
              activeOpacity={0.7}
              onPress={() => onTabPress(tab.value)}
            >
              <Text
                style={[
                  styles.underlineText,
                  isActive && styles.activeUnderlineText,
                  buttonTextStyle,
                ]}
              >
                {tab.label}
              </Text>

              {isActive && (
                <View style={styles.activeUnderline} />
              )}
            </TouchableOpacity>
          );
        }

        return (
          <Button
            key={tab.value}
            text={tab.label}
            varient={isActive ? 'primary' : 'secondary'}
            onPress={() => onTabPress(tab.value)}
            style={[
              styles.tabButton,
              isActive && styles.activeTabButton,
              buttonStyle,
            ]}
            textStyle={[
              styles.tabText,
              isActive && styles.activeTabText,
              buttonTextStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm,
  },
  tabButton: {
    width: 'auto',
    minWidth:Spacings.h55,
    height: Spacings.vheading,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: Spacings.md,
    borderRadius: Spacings.mtitle,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
  },

  activeTabButton: {
    backgroundColor: Colors.primary,
  },

  tabText: {
    fontSize: fontSizes.xs,
    color: Colors.darkGray,
    fontFamily: Fonts.regular,
    fontWeight:fontWeights.w600
  },

  activeTabText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
  },
  underlineContainer: {
    width: Spacings.fullWidth,
    gap: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  underlineTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacings.vsm,
    position: 'relative',
  },
  underlineText: {
    fontSize: fontSizes.xs,
    color: Colors.darkGray,
    fontFamily: Fonts.regular,
  },
  activeUnderlineText: {
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
  },
  activeUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: verticalScale(2),
    backgroundColor: Colors.primary,
  },
});

export default TabSwitcher;