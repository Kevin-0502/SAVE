import { 
  StyleSheet, 
  TextInput,
  Text, 
  ScrollView,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  Modal,
  Alert} from 'react-native'
  import React, {useEffect,useState,useCallback, useMemo, useRef} from 'react'
import colors from '../colors'
import images from '../images';
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)
import BottomSheet from '@gorhom/bottom-sheet';

const {width,height}=Dimensions.get("screen")

export default function Products() {

  const [products,setProdcuts]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [add_products,setAdd_prodcuts]=useState([])
  
  const [description,setDescription]=useState("");
  const [units,setUnits]=useState(0);
  const [unitPrice,setUnitPrice]=useState(0.0);

  var url_products='https://save-appudb.000webhostapp.com/api/products'
  var url_buy_item='https://save-appudb.000webhostapp.com/api/expenses'

  function close_modal(){
    setDescription("")
    setUnits(0)
    setUnitPrice(0.0)
    setModalVisible(!modalVisible) 
  } 

  useEffect(()=>{
    fetch(url_products).then(response=>response.json()).then(resjson=>setProdcuts(resjson))
  },[])
 
  return (
    <ScrollView style={styles.container}>
      {
        products.map((item,index)=>{
          return(
            <TouchableHighlight key={item.id} onPress={()=>{setModalVisible(!modalVisible),setAdd_prodcuts(item)}}>
              <View  style={styles.item}>
                <Image
                  style={styles.img}
                  source={images.img_id[item.product_id]}
                />
                <Text style={styles.item_name}>{item.product_name}</Text>
              </View>
            </TouchableHighlight>
          )
        }
        )
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
              <Text style={styles.modal_txt}>Comprar {add_products.product_name}</Text>
              <TextInput style={styles.inputTxt} placeholder='Descripción' onChangeText={description => setDescription(description)} defaultValue={description} placeholderTextColor={'gray'}/>
              <TextInput style={styles.inputTxt} placeholder='Unidades' onChangeText={units => setUnits(units)} defaultValue={units} placeholderTextColor={'gray'} keyboardType='numeric'/>
              <TextInput style={styles.inputTxt} placeholder='Precio Unitario $' onChangeText={unitPrice => setUnitPrice(unitPrice)} defaultValue={unitPrice} placeholderTextColor={'gray'} keyboardType='numeric'/>
            <View style={styles.buttons}>
              <TouchableHighlight
                style={[styles.button,{backgroundColor:'red'}]}
                onPress={() => close_modal()}>
                <Text style={styles.button_text}>Cancelar  <Icon name='close-circle' size={24}/></Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  //validaciones de campos del modal
                  if(description==''||units<=0||unitPrice<=0)
                  {
                    Alert.alert('Datos incomplentos','Ingrese correctamente los datos')
                  }else
                  {
                    var data={
                      product_id: add_products.product_id,
                      user_id: global.iduser,
                      expense_description: description,
                      expense_units: units,
                      expense_unitprice: unitPrice
                    }
                    fetch(url_buy_item, {
                      method: 'POST',
                      body: JSON.stringify(data),
                      headers: {
                        'Content-Type': 'application/json',
                      }
                    })
                    console.log(JSON.stringify(data))
                    close_modal()
                  }
                }}>
                <Text style={styles.button_text}>Comprar  <Icon name='add-circle' size={24}/></Text>
              </TouchableHighlight>
            </View>
          </View>
      </Modal>
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
    },
    modalView: {
      marginVertical:height*0.3,
      marginHorizontal:width/8,
      backgroundColor: colors.LightColor,
      borderRadius: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent:'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modal_txt:{
      fontSize:30,
      fontWeight:'bold',
      color: colors.DarkColor,
      textAlign:'center',
    },
    inputTxt:{
      backgroundColor:colors.LightColor,
      borderColor:colors.SecondaryColor,
      color:colors.DarkColor,
      paddingVertical:15,
      borderRadius:15,
      borderWidth:3,
      marginVertical:5,
      fontSize:18,
      textAlign:'center',
      width:'70%',
    },
    buttons:{
      flexDirection: 'row'
    },
    button: {
      borderRadius: 20,
      padding: 5,
      elevation: 2,
      marginTop:10,
      marginHorizontal:5,
      backgroundColor:colors.SecondaryColor,
    },
    button_text: {
      fontSize: 20,
      margin:5,
    },  

})