import React, { useEffect } from 'react';
import { SafeAreaView,StyleSheet,View,Text,StatusBar,Button,TouchableOpacity ,FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {serverURL } from "../services/storageService";
import { color } from 'react-native-reanimated';
function DeviceList(props) {
    // ================================================Logic Part===================================================================

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    const [deviceDetailList,setValue]= useState([]);
    const route=useRoute();
    var loginObj=route.params.userObj;
    console.log(loginObj);

    useEffect(()=>{
    loadDeviceList();
  } ,[])  //This is the place which lead to memory leak warning. i missed adding "[]" so it was showing error

function loadDeviceList()
{
    fetch(serverURL+'/devicedata/getPatientDevices?patientId='+loginObj.id, 
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
    return (

        <SafeAreaView style={styles.container}>
        <FlatList
          data={deviceDetailList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>
              <B>{item.type}:</B>{'\n'}{'\n'}
              {item.name},{item.make},{'\n'}{item.model},{item.serialnumber}{'\n'}{'\n'}
              {item.description}
              </Text>
            </View>
    )}
      />
      </SafeAreaView>
    );
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
})
export default DeviceList;