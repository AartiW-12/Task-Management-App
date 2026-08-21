import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import {Colors, Fonts, fontSizes, Spacings} from '../../constants/style/ConstantStyling'
import {Strings} from '../../constants/strings/Strings'
import Button from '../../constants/button/Button'
import ProjectsIcon from '../../assets/images/bottomTab/Projects.svg'
import { useNavigation } from '@react-navigation/native'

const EmptyProjects = () => {

  const navigation = useNavigation()
  return (
      <View style={styles.container}>
          <View style={styles.iconContainer}>
            <ProjectsIcon 
            height={30}
            width ={30}
            color={Colors.primary}
          />
          </View>
          <Text style={styles.title}>{Strings.emptyProjects}</Text>
          <Text style={styles.subtitle}>{Strings.createFirstProject}</Text>
          <Button 
            text={Strings.buttonText.createProject}
            onPress={() => navigation.navigate("ProjectForm")}
            style={styles.btn}
          />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.screenBackground,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:Spacings.vxxl
  },
  iconContainer : {
    height : 60,
    width  : 60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.fileBackground,
    borderRadius:Spacings.halfWidth
  },
  title :{
    fontFamily:Fonts.bold,
    fontSize:fontSizes.lg,
    color:Colors.textColor,
    paddingTop:Spacings.xs,
  },
  subtitle : {
    fontFamily:Fonts.regular,
    fontSize:fontSizes.xs,
    paddingVertical:Spacings.xxs,
    color: Colors.textColor,
    paddingBottom:Spacings.vxl
  },
  btn : {
    width:Spacings.halfWidth,
  }
})

export default EmptyProjects