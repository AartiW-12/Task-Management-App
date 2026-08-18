import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { scale } from 'react-native-size-matters';

import { Colors, Fonts, fontSizes, fontWeights, Spacings,} from '../../constants/style/ConstantStyling';

const STATUS_STYLES = {
  // Priority
  High: Colors.statusBadge.high,
  Critical: Colors.statusBadge.critical,
  Medium: Colors.statusBadge.medium,
  Low: Colors.statusBadge.low,

  // Project / Task status
  'In Progress': Colors.statusBadge.inProgress,
  Todo: Colors.statusBadge.todo,
  Review: Colors.statusBadge.review,
  Completed: Colors.statusBadge.completed,
  Backlog: Colors.statusBadge.backlog,
  Testing: Colors.statusBadge.testing,
};

const StatusBadge = ({
  text,
  style,
  textStyle,
}) => {
  const badgeStyle =
    STATUS_STYLES[text] || STATUS_STYLES.Backlog;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: badgeStyle.background,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: badgeStyle.text,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.vxxs,
    borderRadius: Spacings.xxl,
    marginLeft: scale(5),
    alignSelf: 'center',
  },

  text: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.w600,
    fontFamily: Fonts.semiBold,
  },
});

export default StatusBadge;