import { StyleSheet, Text, ScrollView,View,Image,Dimensions,TouchableHighlight,Alert} from 'react-native'
import React,{useState,useEffect} from 'react'
import images from '../images';
import colors from '../colors';
import Icon from 'react-native-vector-icons/Ionicons'

const {width,height}=Dimensions.get('screen')

export default function ExpenseDetail({navigation,route}) {
    const {item}=route.params;
    const [product,setProduct]=useState([]);
    var url_get_product='https://save-appudb.000webhostapp.com/api/products/code/'+item.product_id;
    var url_delete_product='https://save-appudb.000webhostapp.com/api/expenses/'+item.id;

    function get_date(timestamp){
        const date = new Date(timestamp);
        const year = date.getFullYear(); // Get the year (e.g. 2021)
        const month = date.getMonth() + 1; // Get the month (0-11, add 1 to get 1-12)
        const day = date.getDate(); // Get the day (1-31)
        const hour = date.getHours(); // Get the hour (0-23)
        const minute = date.getMinutes(); // Get the minute (0-59)
        const second = date.getSeconds(); // Get the second (0-59)

        return (`${day}-${month}-${year}   ${hour}:${minute}:${second}`)
    }

    useEffect(()=>{
        fetch(url_get_product).then(response=>response.json()).then(resjson=>resjson.map((item,index)=>setProduct(item)))
    },[])

    return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <Icon.Button 
            name={'arrow-back-outline'}
            backgroundColor={colors.LightColor} 
            borderRadius={0}
            color={colors.PrimaryColor}
            size={40}
            onPress={()=>navigation.goBack()}/>
        </View>
        <Text style={styles.transactions}>
            Detalles de la compra:
        </Text>
        <View style={styles.details}>
            <Text style={styles.title}>{product.product_name}</Text>
            <Image
            style={styles.img}
            source={images.img_id[item.product_id]}/>
            <View style={styles.details_description}>
                <Text style={styles.txt}>Descripción:{'\n'+item.expense_description}</Text>
                <Text style={styles.txt}>Cantidad:{'\n'+item.expense_units} unidad/es</Text>
                <Text style={styles.txt}>Precio Unitario:{'\n$ '+item.expense_unitprice.toFixed(2)}</Text>                        
                <Text style={styles.txt}>Fecha y hora de compra:{'\n'+get_date(item.created_at)}</Text>                        
            </View>
            <TouchableHighlight style={styles.button} onPress={() => {    
                Alert.alert('Eliminar Compra','Esta seguro que desea eliminar este registro',
                [
                    {
                        text: 'OK',
                        onPress: ()=>{
                            fetch(url_delete_product, {
                                method: 'DELETE'
                              }).then((response)=>response.json).then((resjson)=>console.log(resjson)).catch((error)=>console.log(error));
                              
                            navigation.goBack()
                        },
                        style:'default',
                    },
                    {
                        text: 'Cancel',
                        onPress: ()=>{},
                        style:'cancel',
                    }
                ]) 
            }}>
                <Text style={styles.button_txt}>Eliminar Compra</Text>
            </TouchableHighlight>
        </View>
    </ScrollView>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:colors.LightColor,
    },
    header:{
        width:width,
    },
    transactions:{
        fontSize:26,
        fontWeight:'bold',
        textAlign:'center',
        margin:10,
        color:colors.SecondaryColor,
    },
    details:{
        alignItems:'center',
        borderRadius:15,
        margin:10,
    },
    title:{
        fontSize:40,
        marginBottom:10,
        fontWeight:'bold',
    },
    img:{
        width: width/2,
        height:width/2,
    },
    details_description:{
        backgroundColor:colors.LightColor,
        borderRadius:20,
        padding:20,
        width:'90%',
        borderWidth: 2,
        borderColor: '#eee',
        shadowColor: "#000000",
        shadowOffset: {
            width: -10,
            height: 10,
        },
        shadowOpacity:  0.05,
        shadowRadius: 3.05,
        elevation: 4,
        marginTop:20,
    },
    txt:{
        fontSize:20,
        marginBottom:10,
    },
    button:{
        backgroundColor:'red',
        marginTop:30,
        marginBottom:150,
        borderRadius:20,
        width:'70%',
        height:'7.5%',
        justifyContent:'center',
    },
    button_txt:{
        color:colors.LightColor,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
    }
})

