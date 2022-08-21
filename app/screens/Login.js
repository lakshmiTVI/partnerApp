import React, { useState } from "react";
import { StyleSheet,  Text,  View,  Image,  TextInput,  TouchableOpacity,  Alert,  SafeAreaView} from "react-native";
 import {serverURL } from "../services/storageService";
function Login({navigation}) {

  const [email, setEmail] = useState("p.kishore");
  const [password, setPassword] = useState("Televital@123");

  function loginSubmit()
  {
    if(!email || !password) Alert.alert("Error","Please enter User name and password",[{"text":"Ok"}])
    
    else if(email && password)                                                                                                                                             
    {
      fetch(serverURL+'/auth', 
      {  method: 'POST',  
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'  },
        body: JSON.stringify({ userId: email, password: password })}).then((response) => response.json())
        .then((json) => 
        {
          console.log(json);
    
           if(json.status=="ok")
          {
    
            navigation.navigate('DashboardDrawerScreen', 
            {
              screen: 'Dashboard',
              params: {userObj:json,},
            });
          }
      else   
      { 
        Alert.alert(json.error,"Username or Password is wrong",[{"text":"Ok"}])
      }
      })
      .catch((error) => {console.error(error);})
    }
    else
    {
      Alert.alert("Error","Please enter valid User name and password",[{"text":"Ok"}])
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container1}>
      <Image style={styles.image} source={require("../assets/icon.png")} />
 
      {/* <StatusBar style="auto" /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Email"
          placeholderTextColor="#003f5c"
          autocapitalize="none"
          
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity style={styles.loginBtn} onPress={loginSubmit}>
        <Text style={styles.loginText}  >LOGIN</Text>
      </TouchableOpacity>
      
    </View>
    </SafeAreaView>
    
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop:150,
    
  },
  container1: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#d7dfdc",
    borderRadius: 10,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems:'center',
    justifyContent:'center'
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    alignItems:'center',
    justifyContent:'center',
    textAlign:"center"
  },
 
  loginBtn: {
    width: "50%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    
    backgroundColor: "#366cdb",
  },
  loginText:
  {
    fontSize:20,
    fontWeight:"bold",
    color:"white"
  },
  loginButton:{
    backgroundColor: "#366cdb",
  }
});

export default Login;