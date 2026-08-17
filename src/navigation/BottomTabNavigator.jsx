import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/dashboard/Dashboard'

import Home from '../assets/images/bottomTab/Home.svg'
import { Colors, Fonts, fontSizes, Numbers, Spacings } from '../constants/style/ConstantStyling'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textColor,
        tabBarStyle: {
          height: Spacings.h65,
          paddingTop: Spacings.vxs,
          paddingBottom: Spacings.vxs,
          backgroundColor: Colors.white,
          borderTopWidth: Numbers.zp1,
          borderTopColor: Colors.textColor,
          elevation: 5,
        },

        tabBarLabelStyle: {
          fontFamily: Fonts.regular,
          fontSize: fontSizes.xs,
        },
      }}
    >

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({ focused }) => (
            <Home
              width={22}
              height={22}
              opacity={focused ? 1 : 0.5}
            />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator