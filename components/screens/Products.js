import { StyleSheet, Text, ScrollView,View,Image,Dimensions,SafeAreaView} from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../colors'
import images from '../images';
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)

const {width,height}=Dimensions.get("screen")

export default function Products() {

  const [products,setProdcuts]=useState([])

  var url_products='https://save-appudb.000webhostapp.com/api/products'

  useEffect(()=>{
    fetch(url_products).then(response=>response.json()).then(resjson=>setProdcuts(resjson))
  },[])
 
  return (
    <ScrollView style={styles.container}>
      {
        products.map((item,index)=>{
          return(
            <View key={item.id} style={styles.item}>
              <Image
                style={styles.img}
                source={images.img_id[item.product_id]}
              />
              <Text style={styles.item_name}>{item.product_name}</Text>
            </View>
          )
        }
        )
      }
      <View style={styles.bottom}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.LightColor,
    },
    item:{
      alignItems: 'center',
      margin:10,
      padding:10,
      backgroundColor:colors.SecondaryColor,
      borderRadius:10,
      borderColor:colors.DarkColor,
      borderWidth:5,
    },
    img: {
      width: height/4,
      height: height/4,
    },
    item_name:{
      fontSize:40,
      fontWeight: 'bold',
    },
    bottom:{
      height: height/10,
    }
})