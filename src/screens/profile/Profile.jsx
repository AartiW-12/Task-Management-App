import { View, Text, Alert } from 'react-native'
import React from 'react'
import Button from '../../constants/button/Button'
import { logoutUser } from '../../services/authServices'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Colors } from '../../constants/style/ConstantStyling'
import {customSnackbar} from '../../components/snackbar/SnackBar'

const Profile = () => {

  const handleLogout = async () => {
          try {
              customSnackbar("Logout Successfull", 'success')
              try {
                  await GoogleSignin.signOut()
                  console.log("GOOGLE SIGN OUT")
              } catch (googleError) {
                  console.log(
                      'GOOGLE SIGNOUT ERROR:',
                      googleError.code || googleError.message
                  )
              }

              await logoutUser()
          } catch (error) {
              Alert.alert('Logout failed:', error)
          }
      }
  return (
    <View style={{flex: 1 , justifyContent:'center' , alignItems:'center'}}>
      <Text>Profile</Text>
      <Button 
        text={'Logout'}
        onPress={handleLogout}
        style={{width:'50%', marginTop:'30', backgroundColor : Colors.danger}}
      />
    </View>
  )
}

export default Profile