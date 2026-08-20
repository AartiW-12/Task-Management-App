import React, {useEffect, useRef, useState} from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions,} from 'react-native';
import { Colors, Fonts, fontSizes, fontWeights, Spacings } from '../../constants/style/ConstantStyling';

const SCREEN_WIDTH = Dimensions.get('window').width;

let showSnackbar = () => {};

export const customSnackbar = (message, type = 'success') => {
  showSnackbar(message, type);
};

export const Snackbar = () => {
  const [data, setData] = useState({
    visible: false,
    message: '',
    type: 'success',
  });

  const translateX = useRef(
    new Animated.Value(SCREEN_WIDTH),
  ).current;

  const timeoutRef = useRef(null);

  useEffect(() => {
    showSnackbar = (message, type) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setData({
        visible: true,
        message,
        type,
      });

      translateX.setValue(SCREEN_WIDTH);

      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      timeoutRef.current = setTimeout(() => {
        Animated.timing(translateX, {
          toValue: SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setData(prev => ({
            ...prev,
            visible: false,
          }));
        });
      }, 2000);
    };

    return () => {
      showSnackbar = () => {};

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!data.visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateX}],
        },
      ]}>
      <View style={[styles.snackbar, styles[data.type]]}>
        <Text style={styles.message}>{data.message}</Text>

        <TouchableOpacity
          onPress={() => {
            Animated.timing(translateX, {
              toValue: SCREEN_WIDTH,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setData(prev => ({
                ...prev,
                visible: false,
              }));
            });
          }}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    left: 15,
    right: 15,
    zIndex: 9999,
    elevation: 9999,
  },

  snackbar: {
    minHeight: 50,
    borderRadius: Spacings.xxl,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  success: {
    backgroundColor: Colors.sucess,
  },

  error: {
    backgroundColor: Colors.danger,
  },

  validation: {
    backgroundColor: Colors.validation,
  },

  message: {
    flex: 1,
    color: Colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.w500,
    fontFamily : Fonts.semiBold,
  },

  close: {
    color: Colors.white,
    fontSize: fontSizes.xl,
    marginLeft: Spacings.sm,
  },
});