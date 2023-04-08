//import elements(Importación de elementos básicos de react-native)
import * as React from 'react';
import { ScrollView ,StyleSheet, Text, View, Button, TextInput, Image, Alert,TouchableHighlight  } from 'react-native';
import colors from '../colors';
import { useState,useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)



export default function Login({navigation}) {

    const [user, setUser] = useState('');//Variable for get the input user(variable para capturar el input de usuario)
    const [password, setPassword] = useState('');//Variable for get the input password(variable para capturar el input de contraseña)
    const [showhide, setShowhide] = useState(true);//Variable to protect the password(variable para mostrar y esconder la contraseña)
    const [loading, setLoading] = useState(false);//variable for loading spinner(variable para el spinner de loading)
    const [dbusers, setDbusers] = useState([]);
    var url_users='https://save-appudb.000webhostapp.com/api/users'

    useEffect(()=>{
        fetch(url_users).then(response=>response.json()).then(resjson=>setDbusers(resjson))
    },[])

    function startLoading(succes,time){
        setLoading(true);
        setTimeout(() => {
        switch(succes){
            case 'succes_data':
                
                break;
            case 'bad_data':
                Alert.alert('Ingreso Fallido','Su usuario o contraseña no son correctos')
                break;
            case 'no_data':
                Alert.alert('Ingreso Fallido','Debe rellenar todos los campos')
                break;
            
        }
        setLoading(false);
        }, time);
    }

    const auth_user = (dbusers,user,password)=>{
        var is_auth=false;
        dbusers.forEach(user_data => {
            if(user_data.user_id==user && user_data.password==password){
                console.log(user_data);
                global.iduser=user_data.user_id;
                global.nameuser=user_data.name;
                global.emailuser=user_data.email;
                is_auth=true;
            }
        });
        return is_auth;
    }

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
                <TextInput style={styles.inputTxt} placeholder='Carnet de Estudiante' onChangeText={user => setUser(user)} defaultValue={user} placeholderTextColor={'gray'}/>
                <TextInput style={styles.inputTxt} placeholder='Password' onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={showhide} placeholderTextColor={'gray'}/> 
                <Icon.Button 
                    name={showhide?'eye':'eye-off'} 
                    color={colors.DarkColor} size={15} 
                    backgroundColor={colors.LightColor}
                    onPress={() => showhide? setShowhide(false):setShowhide(true)}>
                    <Text style={styles.showhide_txt}>{showhide?'Mostrar contraseña':'Ocultar contraseña'}</Text>
                </Icon.Button>
                <TouchableHighlight style={styles.button} onPress={() => {         
                    if (user!='' && password!='') {
                        if(auth_user(dbusers,user,password)){
                            startLoading('succes_data',500);  
                            navigation.navigate('Main');
                            setUser('');
                            setPassword('');    
                        }else{startLoading('bad_data',2000)}
                    }
                    else{
                      startLoading('no_data',2000) 
                    }
                }}>
                    <Text style={styles.button_txt}>Ingresar</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => {         
                    navigation.navigate('SignUp');
                }}>
                    <Text style={styles.button_txt}>Registrarse</Text>
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
        borderRadius:15,
        borderColor:colors.SecondaryColor,
        borderWidth:3,
        color:colors.DarkColor,
        width:'70%',
        height:'10%',
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