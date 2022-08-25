import React from 'react';
import { SafeAreaView,StyleSheet,View,Text,StatusBar,TouchableOpacity,Alert,ScrollView ,RefreshControl} from 'react-native';
import {useState,useEffect} from 'react';
import {useIsFocused, useRoute,} from '@react-navigation/native';
export default function Dashboard({ navigation }) {

    // ======================================== Variable DEclarations======================================
    const [tempValue,setTValue]= useState([]);
    const [bgValue,setBGValue]= useState([]);
    const [bpValue,setBPValue]= useState([]);
    const [htValue,setHTValue]= useState([]);
    const [wtValue,setWTValue]= useState([]);
    const [spo2Value,setSPO2Value]= useState([]);
    const [pulseValue,setPULSEValue]= useState([]);
    const [bmiValue,setbmiValue]= useState([]);
    const [stepValue,setStepValue]= useState([]);
    const [cyclingValue,setCyclingValue]= useState([]);
    
    const [resfresh,toggleRefresh]= useState(false);
    const MINUTE_MS = 30000;
    const route=useRoute();
    var loginObj=route.params.userObj;
    const focus = useIsFocused();
    
//    ================================================= Fuction Logic=====================================

useEffect(() => {

    if(focus)
    {
    loadVitalData();

  const interval = setInterval(() => {
    loadVitalData();
  }, MINUTE_MS );

  return () => clearInterval(interval);

}
}, [focus])


const resetValues=()=>{
    setTValue([]);
    setWTValue([]);
    setHTValue([]);
    setBGValue([]);
    setPULSEValue([]);
    setSPO2Value([]);
    setBPValue([]);
}

  const loadVitalData=()=>
 {
    console.log("Loading vitals of "+loginObj.username)
    toggleRefresh(true);
    resetValues();
    captureVitalData(1);
    captureVitalData(2);
    captureVitalData(3);
    captureVitalData(4);
    captureVitalData(5);
    captureVitalData(6);
    captureVitalData(8);
    captureVitalData(9);
    captureVitalData(11);
    captureVitalData(12);


 }
const  captureVitalData=(paramId)=>
{
    toggleRefresh(false);
    fetch(global.serverURL+'/getVitals?patientId='+loginObj.id+'&readingLimit=1&paramId='+paramId, 
      {  
        method: 'GET',  
        headers: { Accept: 'application/json', 'Content-Type': 'application/json','Authorization':"Bearer "+loginObj.token},})
        .then((response) => response.json()).then((json) => 
        {
           
          if(json.status=="ok")
          {
          if(paramId==1){setTValue(json.data);}
          else if(paramId==2){setWTValue(json.data);}
          else if(paramId==3){setHTValue(json.data);}
          else if(paramId==4){setBGValue(json.data);}
          else if(paramId==5){setPULSEValue(json.data);}
          else if(paramId==6){setSPO2Value(json.data);}
          else if(paramId==8){setBPValue(json.data);}
          else if(paramId==11){setbmiValue(json.data);}
          else if(paramId==9){setStepValue(json.data);}
          else if(paramId==12){setCyclingValue(json.data);}
          
          }
          console.log(json);
      })
      .catch((error) => {console.error(error);})
}

function VitalvalidDisplay(props)
{
    const vitalData = props.vitalData[0];
    const vitalName=props.vitalName;
    if(props.vitalData.length>0)
    {
    return(
        <View style={styles.row2}>
        <Text style={styles.vitalTitle}>{vitalName}:{'\n'}<Text style={styles.smallFont}>({vitalData.readingDateandTime})</Text></Text>
        {vitalData.parameterId==8 || vitalData.parameterId==9 || vitalData.parameterId==11 || vitalData.parameterId==12?
        <Text style={styles.vitalValue}>{vitalData.paramvalue} {vitalData.paramunit}</Text>:
        (
            vitalData.parameterId==1?
            <Text style={styles.vitalValue}>{Math.round(vitalData.paramvalue).toFixed(1)} {vitalData.paramunit}</Text>:
            <Text style={styles.vitalValue}>{Math.round(vitalData.paramvalue)} {vitalData.paramunit}</Text>
        )
        }
        </View>
    )
    }
    else
    {
        return(
            <View style={styles.row2}>
            <Text style={styles.vitalTitle}>{vitalName}:</Text>
            <Text style={styles.vitalValue}>N/A</Text>
            </View>
        )
    }
}
// ================================================ Frontend=======================================================
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.row1}>
                <Text style={styles.heading}>{loginObj.username}'s Vital Readings:</Text>
            </View>
            
            <View style={styles.scrollDiv}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }} refreshControl={
          <RefreshControl
            refreshing={resfresh}
            onRefresh={(loadVitalData)}
          />
        }>
            <VitalvalidDisplay  vitalName={"Blood Glucose"} vitalData={bgValue} />
            <VitalvalidDisplay  vitalName={"Blood Pressure"} vitalData={bpValue} />
            <VitalvalidDisplay  vitalName={"Temperature"} vitalData={tempValue} />
            <VitalvalidDisplay  vitalName={"SPO2"} vitalData={spo2Value} />
            <VitalvalidDisplay  vitalName={"Heart Rate"} vitalData={pulseValue} />
            <VitalvalidDisplay  vitalName={"Weight"} vitalData={wtValue} />
            <VitalvalidDisplay  vitalName={"Height"} vitalData={htValue} />
            <VitalvalidDisplay  vitalName={"BMI"} vitalData={bmiValue} />
            <VitalvalidDisplay  vitalName={"Stepcount"} vitalData={stepValue} />
            <VitalvalidDisplay  vitalName={"Cycling"} vitalData={cyclingValue} />

            </ScrollView>
            </View>
           
            {/* <View style={styles.bottomRow} >
            <TouchableOpacity style={styles.deviceBtn} onPress={(loadVitalData)}>
            <Text style={styles.deviceText}  >Refresh Readings</Text>
            </TouchableOpacity> */}
            {/* </View> */}
            
            
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
    scrollDiv:{
        height:"80%",
        padding:0,
        margin:0,
        marginTop:30,
        width:"100%"
    },
    scrollView: {
        flex:1,
        marginHorizontal: 2,
        bottom:30,
       
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
            // bottom:20,
            // position:"absolute"
      },
      smallFont:
      {
        fontSize:12
      }
      
});
