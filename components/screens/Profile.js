//import elements(Importación de elementos básicos de react-native)
import * as React from 'react';
import { StyleSheet, Text, View, Image, Alert,TouchableHighlight,Linking } from 'react-native';
import colors from '../colors';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)

export default function Profile({navigation}) {

    const [loading, setLoading] = useState(false);//variable for loading spinner(variable para el spinner de loading)
    let url_facebok = "https://www.facebook.com/UDBelsalvador/"
    let url_instagram = "https://www.instagram.com/udbelsalvador/"
    let url_linkedin = "https://www.linkedin.com/school/udbelsalvador/mycompany/"

    function startLoading(succes,time){
        setTimeout(() => {
        setLoading(false);
        }, time);
    };

  return (
    <View style={styles.container}>  
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={{color:'#FFFFFF',}}
        />              
        <Image source={require('../../assets/man.png')} style={styles.image} />
        <Text style={styles.txt}>{global.iduser}</Text>
        <TouchableHighlight style={styles.button} onPress={() => {    
            startLoading(true,500)     
            navigation.navigate('Login')
        }}>
            <Text style={styles.button_txt}>Cerrar Sesion</Text>
        </TouchableHighlight>
        <Text>
            <Icon.Button 
                name={'logo-facebook'} 
                color={colors.PrimaryColor} size={30} 
                backgroundColor={colors.LightColor}
                onPress={() => Linking.openURL(url_facebok)}>
            </Icon.Button>
            <Icon.Button 
                name={'logo-instagram'} 
                color={colors.PrimaryColor} size={30} 
                backgroundColor={colors.LightColor}
                onPress={() => Linking.openURL(url_instagram)}>
            </Icon.Button>
            <Icon.Button 
                name={'md-logo-linkedin'} 
                color={colors.PrimaryColor} size={30} 
                backgroundColor={colors.LightColor}
                onPress={() => Linking.openURL(url_linkedin)}>
            </Icon.Button>
        </Text>      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.LightColor/*'#fff'*/,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
        height: 280, 
        width: 280, 
        margin:30,
    },
    txt:{
        color:colors.DarkColor,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:32,
    },
    button:{
        backgroundColor:colors.SecondaryColor,
        margin:30,
        borderRadius:20,
        borderColor:colors.SecondaryColor,
        width:'70%',
        height:'7.5%',
        justifyContent:'center',
    },
    button_txt:{
        color:colors.LightColor,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
    }
})