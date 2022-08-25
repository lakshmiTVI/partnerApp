
import React from 'react';
import { SafeAreaView,StyleSheet,View,Text,StatusBar,TouchableOpacity,Alert } from 'react-native';
import TVLibNativeModule from "../services/TVLibNativeModule";

function Terra({navigation}) {



const takeVitalReadings=()=>
{
    console.log("Taking vital reading from TV Lib");
    TVLibNativeModule.readVitalReading();
    
}


// ================================================ Frontend=======================================================
return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
              
        <View  style={styles.bottomRow}>
        <TouchableOpacity style={styles.terraBtn} onPress={takeVitalReadings}>
        <Text style={styles.deviceText}  >Take Vital Reading</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}><Text style={styles.titleText}  >[Note: After Completion of vital reading you can view the results in Dashboard]</Text></View>
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
      titleText:
      {
        fontSize:18,
        alignItems: "center",
        justifyContent: "center",
        color:"grey",
        paddingHorizontal:20,
        top:20
      },
      
})
export default Terra;