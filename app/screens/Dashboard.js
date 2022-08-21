import React from 'react';
import { SafeAreaView,StyleSheet,View,Text,StatusBar,TouchableOpacity,Alert } from 'react-native';
import {useState,useEffect} from 'react';
import {useRoute,} from '@react-navigation/native';
import {serverURL } from "../services/storageService";
import TVLibNativeModule from "../services/TVLibNativeModule";
import { ActivityIndicator} from 'react-native';
function Dashboard({ navigation }) {

    // ======================================== Variable DEclarations======================================
    const [tempValue,setTValue]= useState("N/A");
    const [bgValue,setBGValue]= useState("N/A");
    const [bpValue,setBPValue]= useState("N/A");
    const [htValue,setHTValue]= useState("N/A");
    const [wtValue,setWTValue]= useState("N/A");
    const [spo2Value,setSPO2Value]= useState("N/A");
    const [pulseValue,setPULSEValue]= useState("N/A");
    const [animating,toggleAnimating]=useState(false);
    const route=useRoute();
    var loginObj=route.params.userObj;
//    ================================================= Fuction Logic=====================================

const MINUTE_MS = 30000;
useEffect(() => {
    loadVitalData();


  const interval = setInterval(() => {
    loadVitalData();
  }, MINUTE_MS );

  return () => clearInterval(interval);
}, [])


 function loadVitalData()
 {
    captureVitalData(1);
    captureVitalData(2);
    captureVitalData(3);
    captureVitalData(4);
    captureVitalData(5);
    captureVitalData(6);
    captureVitalData(7);
    captureVitalData(8);

 }
function captureVitalData(paramId)
{
    fetch(serverURL+'/getVitals?patientId='+loginObj.id+'&readingLimit=1&paramId='+paramId, 
      {  
        method: 'GET',  
        headers: { Accept: 'application/json', 'Content-Type': 'application/json','Authorization':"Bearer "+loginObj.token},})
        .then((response) => response.json()).then((json) => 
        {
          if(json.status=="ok")
          {
          if(paramId==1){setTValue(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          else if(paramId==2){setWTValue(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          else if(paramId==3){setHTValue(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          else if(paramId==4){setBGValue(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          else if(paramId==5){setPULSEValue(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          else if(paramId==6){setSPO2Value(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          else if(paramId==8){setBPValue(json.data[0].paramvalue+"("+json.data[0].paramunit+")");}
          }
      })
      .catch((error) => {console.error(error);})
}

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
// ================================================ Frontend=======================================================
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.row1}>
                <Text style={styles.heading}>{loginObj.username}'s Vital Readings:</Text>
            </View>
            
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>Blood Glucose:</Text>
            <Text style={styles.vitalValue}>{bgValue}</Text>
            </View>
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>Blood Pressure:</Text>
            <Text style={styles.vitalValue}>{bpValue}</Text>
            </View>
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>Temperature:</Text>
            <Text style={styles.vitalValue}>{tempValue}</Text>
            </View>
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>SpO2:</Text>
            <Text style={styles.vitalValue}>{spo2Value}</Text>
            </View>
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>Pulse Rate:</Text>
            <Text style={styles.vitalValue}>{pulseValue}</Text>
            </View>
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>Weight:</Text>
            <Text style={styles.vitalValue}>{wtValue}</Text>
            </View>
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>Height:</Text>
            <Text style={styles.vitalValue}>{htValue}</Text>
            </View>

            <View style={styles.bottomRow} >
            <TouchableOpacity style={styles.deviceBtn} onPress={() => navigation.navigate('DeviceList',{userObj:loginObj,})}>
            <Text style={styles.deviceText}  >View Device List</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.bottomRow} >
            <TouchableOpacity style={styles.terraBtn} onPress={configureTerra}>
            <Text style={styles.deviceText}  >Authenticate Terra</Text>
            </TouchableOpacity>
            </View>

            <ActivityIndicator animating = {animating} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>
            <View style={styles.bottomRow} >
            <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.deviceText}  >Logout</Text>
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
    row1:
    {
       
        justifyContent:"center",
        backgroundColor:"#37aee5",
        padding:15,
        width:"100%",
        
        borderRadius:2
    },
    row2:
    {
        justifyContent:"center",
        backgroundColor:"white",
        padding:10,
        width:"100%",
        flexDirection:"row"
    },
    heading:
    {
        fontSize:20,
        fontWeight:"bold"
        

    }
    ,
    vitalTitle:
    {
        flex:1,
        fontSize:20,
        alignSelf:'flex-start',
        backgroundColor:"white",
    },
    vitalValue:
    {
        flex:1,
        fontSize:20,
        alignItems:'flex-end',
        textAlign:'right',
        backgroundColor:"white",
        fontWeight:"bold"
    },
    deviceBtn: {
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

      footerBtn: {
        position:"relative",
        left: 0,
        right: 0,
        bottom: 0,
        top:50,
        backgroundColor:'green',
        alignItems:'center',
        width: "50%",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        marginTop: 40,
        
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
})
export default Dashboard;