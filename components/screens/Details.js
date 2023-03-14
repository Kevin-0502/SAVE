import { StyleSheet, Text, View,Button} from 'react-native'
import React from 'react'

export default function Details() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:60,
        color: 'purple',
        fontWeight: 'bold',
    }
})