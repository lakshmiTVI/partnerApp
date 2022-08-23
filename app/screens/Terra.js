
import React from 'react';
import { SafeAreaView,StyleSheet,View,Text,StatusBar,TouchableOpacity,Alert } from 'react-native';
import TVLibNativeModule from "../services/TVLibNativeModule";
import { ActivityIndicator} from 'react-native';
import {useState,useEffect} from 'react';
function Terra({navigation}) {

    const [animating,toggleAnimating]=useState(false);
    
const configureTerra=()=>
{
    toggleAnimating(true);
     
    console.log("================Configuring Terra================");

    console.log(TVLibNativeModule);
    TVLibNativeModule.configureTerra(resp=>
    {
        toggleAnimating(false);
        Alert.alert(resp)
    });
    
    TVLibNativeModule.loginUser("Televital","Televital@123",resp=>{console.log("The Login User response is "+resp);});
    TVLibNativeModule.loginUser("Tele","Televital@123",resp=>{console.log("The Login User response is "+resp);});

    TVLibNativeModule.greetings(resp=>{console.log("The greetings response is "+resp);});
    TVLibNativeModule.addEvent("Lakshmi","Hi",123,resp=>{console.log("The addEvent response is "+resp);});
    
}

const takeVitalReadings=()=>{

    console.log("Taking vital reading from TVLib");
}

const updateDeviceList=()=>{
    console.log("Updating device list from TVLib");
}

// ================================================ Frontend=======================================================
return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <View  style={styles.bottomRow}>
        <TouchableOpacity style={styles.terraBtn} onPress={configureTerra}>
        <Text style={styles.deviceText}  >Authenticate Terra</Text>
        </TouchableOpacity>
        </View>
        <ActivityIndicator animating = {animating} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>
        
        <View  style={styles.bottomRow}>
        <TouchableOpacity style={styles.terraBtn} onPress={takeVitalReadings}>
        <Text style={styles.deviceText}  >Take Vital Reading</Text>
        </TouchableOpacity>
        </View>

        <View  style={styles.bottomRow}>
        <TouchableOpacity style={styles.terraBtn} onPress={updateDeviceList}>
        <Text style={styles.deviceText}  >Update Device List</Text>
        </TouchableOpacity>
        </View>

    </SafeAreaView>
    
);
}


// =========================================================CSS====================================================
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
        justifyContent:"center",
        flexDirection:'row',
        alignItems:'flex-start',
        padding:0,
        flexWrap:'wrap',
    },

      terraBtn: {
        width: "50%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        
        backgroundColor: "#366cdb",
      },

      deviceText:
      {
        fontSize:20,
        fontWeight:"bold",
        color:"white"
      },
      bottomRow:
      {
            width:"100%" ,
            flexDirection:"row",   
            alignItems:"flex-end",
            justifyContent:"center" ,
      },
})
export default Terra;