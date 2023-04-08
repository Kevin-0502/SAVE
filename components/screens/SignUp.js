//import elements(Importación de elementos básicos de react-native)
import * as React from 'react';
import { ScrollView ,StyleSheet, Text, View, Button, TextInput, Image, Alert,TouchableHighlight } from 'react-native';
import colors from '../colors';
import { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)


export default function SignUp({navigation}) {

    const [user_id, setUser_id] = useState('');//Variable for get the input user(variable para capturar el input de usuario)
    const [user_name, setUser_name] = useState('');//Variable for get the input user(variable para capturar el input de usuario)
    const [user_email, setUser_email] = useState('');//Variable for get the input user(variable para capturar el input de usuario)
    const [password, setPassword] = useState('');//Variable for get the input password(variable para capturar el input de contraseña)
    const [password_confirm, setPasswordConfirm] = useState('');//Variable for get the input password(variable para capturar el input de contraseña)
    const [showhide, setShowhide] = useState(true);//Variable to protect the password(variable para mostrar y esconder la contraseña)
    const [loading, setLoading] = useState(false);//variable for loading spinner(variable para el spinner de loading)


    function startLoading(succes,time){
        setLoading(true);
        setTimeout(() => {
        if(!succes)
            Alert.alert('Registro Fallido','Debe rellenar todos los campos')
            else
            Alert.alert('Registro Exitoso','Ya puede ingresar con su usario y contraseña')
        setLoading(false);
        }, time);
    };

  return (
  <ScrollView style={styles.scroll_container}>
    <View style={styles.container}>  
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={{color:'#FFFFFF',}}
        />              
        <Image source={require('../../assets/logo.png')} style={styles.image} />
        <TextInput style={styles.inputTxt} placeholder='Carnet de Estudiante' onChangeText={user_id => setUser_id(user_id)} defaultValue={user_id} placeholderTextColor={'gray'}/>
        <TextInput style={styles.inputTxt} placeholder='Nombre completo' onChangeText={user_name => setUser_name(user_name)} defaultValue={user_name} placeholderTextColor={'gray'}/>
        <TextInput style={styles.inputTxt} placeholder='Email' onChangeText={user_email => setUser_email(user_email)} defaultValue={user_email} placeholderTextColor={'gray'}/>
        <TextInput style={styles.inputTxt} placeholder='Password' onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={showhide} placeholderTextColor={'gray'}/> 
        <TextInput style={styles.inputTxt} placeholder='Confirm Password' onChangeText={password_confirm => setPasswordConfirm(password_confirm)} defaultValue={password_confirm} secureTextEntry={showhide} placeholderTextColor={'gray'}/> 
        <Icon.Button 
            name={showhide?'eye':'eye-off'} 
            color={colors.DarkColor} size={15} 
            backgroundColor={colors.LightColor}
            onPress={() => showhide? setShowhide(false):setShowhide(true)}>
            <Text style={styles.showhide_txt}>{showhide?'Mostrar contraseña':'Ocultar contraseña'}</Text>
        </Icon.Button>
        <TouchableHighlight style={styles.button} onPress={() => {
            if (user!='' && password!='' && password_confirm!='') {
                global.iduser=user;
                startLoading(true,500);  
                navigation.goBack();
                setUser('');
                setPassword('');
                setPasswordConfirm('');
            }
            else{
              startLoading(false,2000) 
            }
        }}>
            <Text style={styles.button_txt}>Guardar</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => {         
            navigation.goBack();
        }}>
            <Text style={styles.button_txt}>Regresar</Text>
        </TouchableHighlight>
    </View>
</ScrollView>
  )
}

const styles = StyleSheet.create({
    scroll_container: {
        backgroundColor: colors.LightColor/*'#fff'*/,
    },
    container: {
      flex: 1,
      marginTop:'40%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom:'30%',
    },
    image:{
        height: 280, 
        width: 280, 
        margin:10,
    },
    inputTxt:{
        backgroundColor:colors.LightColor,
        padding:15,
        margin:10,
        borderRadius:10,
        borderColor:colors.SecondaryColor,
        borderWidth:3,
        color:colors.DarkColor,
        width:'70%',
        height:'8%',
        textAlign:'center',
    },
    showhide_txt:{
        color:colors.DarkColor,
    },
    button:{
        backgroundColor:colors.SecondaryColor,
        margin:10,
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