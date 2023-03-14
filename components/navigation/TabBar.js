import * as React from 'react';
import Home from '../screens/Home'
import Details from '../screens/Details'
import Locations from '../screens/Locations'
import Favorite from '../screens/Favorite'
import Profile from '../screens/Profile'
import colors from '../colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

 const TabBar=createBottomTabNavigator();

export default function TabBar_Navigation({navigation}){ 

  
  //BackHandler.addEventListener("hardwareBackPress",Alert.alert('CERRAR SESIÓN','Desea cerrar sesión?',[{text: 'Cancel',style:'cancel'},{text: 'Ok'}],{cancelable: false}))

  return(
    <TabBar.Navigator  
      screenOptions={({route})=>({
        tabBarStyle:{position:'absolute'},
        tabBarIcon:({focused,color,size})=>{
          let iconName

          switch(route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                  break;
              case 'Details':
                iconName = focused ? 'aperture' : 'aperture-outline';
                  break;
              case 'Locations':
                iconName = focused ? 'map' : 'map-outline';
                  break;
              case 'Favorite':
                iconName = focused ? 'bookmarks' : 'bookmarks-outline'
                  break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline'
                  break;
          }
          size= focused ? 35 : 20;
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerTintColor:'#fff',
        headerStyle:{
          backgroundColor: colors.SecondaryColor,
        },
        tabBarActiveTintColor: colors.PrimaryColor,
        tabBarInactiveTintColor:colors.SecondaryColor,
      })}>
      <TabBar.Screen name={'Home'} component={Home}/>
      <TabBar.Screen name={'Details'} component={Details}/>
      <TabBar.Screen name={'Favorite'} component={Favorite}/>
      <TabBar.Screen name={'Locations'} component={Locations}/>
      <TabBar.Screen name={'Profile'} component={Profile}/>
    </TabBar.Navigator>
  )
  
}