import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import ProjectDetails from '../screens/projects/ProjectDetails'
import ProjectForm from '../screens/projects/ProjectForm'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{ headerShown : false}}
        >
            <Stack.Screen 
                name='BottomTabNavigator'
                component={BottomTabNavigator}
            />
            <Stack.Screen 
                name='ProjectDetails'
                component={ProjectDetails}
            />
            <Stack.Screen 
                name='ProjectForm'
                component={ProjectForm}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator