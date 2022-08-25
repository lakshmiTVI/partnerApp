import React, { useEffect } from 'react';
import { SafeAreaView,StyleSheet,View,Text,StatusBar,Button,TouchableOpacity ,FlatList, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useState} from 'react';
import TVLibNativeModule from '../services/TVLibNativeModule';
import { ActivityIndicator} from 'react-native';

function DeviceList(props) {
    // ================================================Logic Part===================================================================

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    const [deviceDetailList,setValue]= useState([]);
    var loginObj=global.userObj;
    const focus = useIsFocused();
    const [animating,toggleAnimating]=useState(false);

  useEffect(()=>{
      if(focus)
      {
        console.log("Inside DeviceList Component");
        loginObj=global.userObj;
        setValue([]);
        loadDeviceList();
      }
  } ,[focus])  //This is the place which lead to memory leak warning. i missed adding "[]" so it was showing error

const loadDeviceList=()=>
{
  console.log(loginObj);
  fetch(global.serverURL+'/devicedata/getPatientDevices?patientId='+loginObj.id, 
  {  method: 'GET',  
    headers: { 
        Accept: 'application/json', 
    'Content-Type': 'application/json'  ,
    'Authorization':"Bearer "+loginObj.token},
}).then((response) => response.json())
    .then((json) => 
    {
      console.log(json);
      if(json.status=="ok")
      {
        setValue(json.data);
      }
    
  })
  .catch((error) => {console.error(error);})

}

const updateDeviceList=()=>{
if(deviceDetailList.length>0)
{
  console.log("Updating TVLib device list");
  toggleAnimating(true);
  TVLibNativeModule.tvSDKUpdateDeviceList(deviceDetailList,resp=>{toggleAnimating(false);console.log("Response from the TVLib after device update \n",JSON.parse(resp[1]));Alert.alert(resp[0])});
}
else
{
  Alert.alert("No Devices found to update to TVLib");
}
}

    return (

        <SafeAreaView style={styles.container}>

        <View  style={styles.bottomRow}>
        <TouchableOpacity style={deviceDetailList.length>0? styles.terraBtnActive:styles.terraBtnInActive} onPress={deviceDetailList.length>0?updateDeviceList:()=>{}}>
        <Text style={styles.deviceText}  >Update Device List To TVLib</Text>
        </TouchableOpacity>
        </View>

         <ActivityIndicator animating = {animating} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>

        { deviceDetailList.length>0?
        <FlatList data={deviceDetailList} renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>
              <B>{item.type}:</B>{'\n'}{'\n'}
              {item.name},{item.make},{'\n'}{item.model},{item.serialnumber}{'\n'}{'\n'}
              {item.description}
              </Text>
            </View>
        )}/>:<View style={styles.bottomRow}><Text style={styles.titleText}  >No Devices found to update to TVLib</Text></View>}
      </SafeAreaView>
    )
}

// ================================================CSS Part======================================================================
const styles = StyleSheet.create({
    

      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor:"#e5dbdb",
      },
      title: {
        fontSize: 15,
      },
      terraBtnActive: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        
        backgroundColor: "#366cdb",
      },
      terraBtnInActive: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        
        backgroundColor: "grey",
      },
      deviceText:
      {
        fontSize:20,
        fontWeight:"bold",
        color:"white",
      },
      titleText:
      {
        fontSize:20,
        fontWeight:"bold",
        alignItems: "center",
        justifyContent: "center",
      },
      bottomRow:
      {
            width:"100%" ,
            flexDirection:"row",   
            alignItems:"flex-end",
            justifyContent:"center" ,
      },
})
export default DeviceList;