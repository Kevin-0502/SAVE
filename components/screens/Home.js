import { StyleSheet, Text, SafeAreaView ,FlatList,View, Image,Dimensions,BackHandler,Alert,ScrollView} from 'react-native'
import React from 'react'
import advices from '../data'
import colors from '../colors'
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)


const {width,height}=Dimensions.get('screen')

const SlideItem = ({item}) =>{
  //BackHandler.addEventListener("hardwareBackPress",Alert.alert('CERRAR SESIÓN','Desea cerrar sesión?',[{text: 'Cancel',style:'cancel'},{text: 'Ok'}],{cancelable: false}))
   return (
    <ScrollView>
      <View style={styles.container_item}>
        <Text style={styles.content_txt_title}>Consejo {item.id}</Text>
        <Image style={styles.image_item} source={item.img}/>
        <Icon name={item.icon} color={colors.LightColor} size={25} style={styles.arrow}/>
        <View style={styles.content_item}>
          <Text style={styles.content_txt_title}>{item.title}</Text>
          <Text style={styles.content_txt_description}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.bottom}></View>
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
      marginTop:5,
      paddingHorizontal:30,
      alignItems: 'center',
      backgroundColor:colors.LightColor,
      width:width,
      borderTopStartRadius:30,
      borderTopEndRadius:30,
      paddingBottom:height*0.15,
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
    arrow:{
      marginRight:30,
      textAlign:'right',
      width:width,
    },
    bottom:{
      height: height/15,
    }
})