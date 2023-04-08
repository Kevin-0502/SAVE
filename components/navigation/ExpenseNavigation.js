import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//importacion de las pantallas 
import Expenses from '../screens/Expenses';
import ExpenseDetail from '../screens/ExpenseDetail';

export default function ExpenseNavigation() {
    const Stack=createNativeStackNavigator();
    
  return (
    <Stack.Navigator initialRouteName='ExpensesList' 
        screenOptions={{
        headerTintColor:'#fff',
        headerStyle:{
            backgroundColor: '#394263',
        },
    }}>
        <Stack.Screen name="ExpensesList" component={Expenses} options={{headerShown:false}}/>
        <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} options={{headerShown:false,gestureEnabled:false}}/>
    </Stack.Navigator>
  )
}