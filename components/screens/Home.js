import { StyleSheet, Text, SafeAreaView ,FlatList,View, Image,Dimensions,BackHandler,Alert,ScrollView} from 'react-native'
import React from 'react'
import advices from '../data'
import colors from '../colors'

const {width,height}=Dimensions.get('screen')

const SlideItem = ({item}) =>{
  //BackHandler.addEventListener("hardwareBackPress",Alert.alert('CERRAR SESIÓN','Desea cerrar sesión?',[{text: 'Cancel',style:'cancel'},{text: 'Ok'}],{cancelable: false}))
   return (
    <ScrollView>
      <View style={styles.container_item}>
        <Text style={styles.content_txt_title}>Consejo {item.id}</Text>
        <Image style={styles.image_item} source={item.img}/>
        <View style={styles.content_item}>
          <Text style={styles.content_txt_title}>{item.title}</Text>
          <Text style={styles.content_txt_description}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
    )
}

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
      data={advices}
      renderItem={({item})=><SlideItem item={item}/>}
      horizontal
      pagingEnabled
      ShowsHorizontalScrollIndicator={false}
     />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.SecondaryColor,
    height: height,
  },
    container_item:{
      width: width,
      alignItems: 'center',
      backgroundColor:colors.SecondaryColor,
    },
    image_item:{
      width:height*0.30,
      height:height*0.30,
    },
    content_item:{
      marginTop:30,
      paddingHorizontal:30,
      alignItems: 'center',
      backgroundColor:colors.LightColor,
      width:width,
      height:height/2,
      borderTopStartRadius:30,
      borderTopEndRadius:30,
    },
    content_txt_title:{
      textAlign:'center',
      fontSize:32,
      fontWeight: 'bold',
      marginVertical:20,
    },
    content_txt_description:{
      fontSize:19,
      textAlign:'justify',
    },
})