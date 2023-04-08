import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//importacion de las pantallas 
import Login from '../screens/Login';
import TabBar_Navigation from './TabBar';
import SignUp from '../screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';


export default function LoginNavigation() {

    const Stack=createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' 
    screenOptions={{
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor: '#394263',
      },
    }}>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false,gestureEnabled:false}}/>
      <Stack.Screen name="Main" component={TabBar_Navigation} options={{headerShown:false,gestureEnabled:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
    
  )
}