import { StyleSheet, Text, View,Dimensions,Platform } from 'react-native'
import React from 'react'
import colors from '../colors';
import markers from '../markers';
import MapView,{Marker,PROVIDER_GOOGLE} from 'react-native-maps';

const {width, height} =Dimensions.get('screen')



export default function Locations() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Cafeterias en Universidad Don Bosco</Text>
      </View>
      <MapView
          style={styles.bottom_map}
          initialRegion={{
          latitude: 13.715409,
          longitude: -89.1549308,
          latitudeDelta:0.01,
          longitudeDelta:0.01,
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
        >
          {
            markers.map((point,index)=>(
              <Marker 
                key={index}
                coordinate={{ latitude : point.latitude , longitude : point.longitude }}
                title={point.title}
                description={point.description}
                pinColor={colors.PrimaryColor}
                />
            ))
          }
        </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header:{
      padding:5,
      width:width,
      backgroundColor: colors.SecondaryColor,
      borderBottomEndRadius: 35,
      borderBottomStartRadius: 35,
    },
    text:{
        fontSize:30,
        color: colors.LightColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottom_map: {
      width:  width,
      height: height,
      borderRadius: 10,
      marginBottom: 20,
    },
})