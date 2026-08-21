import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/dashboard/Dashboard'
import Projects from '../screens/projects/Projects'
import Tasks from '../screens/tasks/Tasks'
import Team from '../screens/team/Team'
import Profile from '../screens/profile/Profile'

import Home from '../assets/images/bottomTab/Home.svg'
import ProjectsIcon from '../assets/images/bottomTab/Projects.svg'
import TaskIcon from '../assets/images/bottomTab/Tasks.svg'
import TeamIcon from '../assets/images/bottomTab/Team.svg'
import ProfileIcon from '../assets/images/bottomTab/Profile.svg'

import { Colors, Fonts, fontSizes, Numbers, Spacings } from '../constants/style/ConstantStyling'
import { Platform, StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()


const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textColor,
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          // height: Spacings.h65,
          position: 'absolute',
          height: Platform.OS === 'android' ? 59 + insets.bottom : 70,
          paddingBottom: 5,
          paddingTop: verticalScale(2),
          paddingBottom: Spacings.vxs,
          backgroundColor: Colors.white,
          borderTopWidth: Numbers.zp1,
          borderTopColor: Colors.textColor,
          elevation: 5,
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
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
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Projects'
        component={Projects}
        options={{
          tabBarLabel: 'Projects',

          tabBarIcon: ({ focused }) => (
            <ProjectsIcon
              width={22}
              height={22}
              opacity={focused ? 1 : 0.5}
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Tasks'
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',

          tabBarIcon: ({ focused }) => (
            <TaskIcon
              width={22}
              height={22}
              opacity={focused ? 1 : 0.5}
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Team'
        component={Team}
        options={{
          tabBarLabel: 'Team',

          tabBarIcon: ({ focused }) => (
            <TeamIcon
              width={22}
              height={22}
              opacity={focused ? 1 : 0.5}
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              width={22}
              height={22}
              opacity={focused ? 1 : 0.5}
              color={focused ? Colors.primary : Colors.darkGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

  tabBarLabelStyle: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.xs,
  }
})

export default BottomTabNavigator