import { StyleSheet, Text, ScrollView,View,Image,Dimensions,SafeAreaView} from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../colors'
import images from '../images';
import Icon from 'react-native-vector-icons/Ionicons';//import icons(Importación de iconos)
import { ListItem,Avatar } from 'react-native-elements';

const {width,height}=Dimensions.get('screen')

export default function Expenses({navigation}) {

  const [expenses,setExpenses]=useState([])
  var total_expenses=0;


  var url_get_products='https://save-appudb.000webhostapp.com/api/expenses/user/'+global.iduser;

  useEffect(()=>{
    fetch(url_get_products).then(response=>response.json()).then(resjson=>setExpenses(resjson))
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.transactions}>Transacciones</Text>
      <ScrollView style={styles.list}>
        {
          expenses.map((item,index)=>{
            total_expenses+=(item.expense_units*item.expense_unitprice)
            var units_per_price=item.expense_units*item.expense_unitprice;
            return (
              <ListItem 
              key={index}
              style={styles.item} 
              topDivider
              bottomDivider
              onPress={()=>navigation.navigate('ExpenseDetail',{item:item})}>
                <Avatar size={width/5} source={images.img_id[item.product_id]}></Avatar>
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>{item.expense_description}</ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitle}>Monto: $ {units_per_price.toFixed(2)}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron size={40}/>
              </ListItem>
            )      
          })
        }
        
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total_expenses}>Gasto total =  ${total_expenses.toFixed(2)}</Text>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:colors.LightColor,
    },
    transactions:{
      fontSize:36,
      fontWeight:'bold',
      textAlign:'center',
      padding:10,
      height:height*0.07
    },
    list:{
      height:height*0.65
    },
    item: {
    },
    title:{
      fontSize:22,
      fontWeight: 'bold',
      color:colors.PrimaryColor,
    },
    subtitle:{
      fontSize:22,
      fontWeight: 'bold',
    },
    footer:{
      height:height*0.1,
      backgroundColor:colors.PrimaryColor,
      borderTopStartRadius:20,
      borderTopEndRadius:20,
      justifyContent: 'center',
      borderWidth: 3,
      borderColor:colors.DarkColor,
    },
    total_expenses:{
      fontSize:36,
      textAlign:'center',
      color:colors.DarkColor,

    }
})