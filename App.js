

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./app/screens/Dashboard";
import DeviceList from "./app/screens/DeviceList";
import Login from "./app/screens/Login";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View,Button } from 'react-native';
import Terra from "./app/screens/Terra";
  export default function App() {
    const Stack = createNativeStackNavigator();
    const DrawerStack =createDrawerNavigator();
    const RootStack = createNativeStackNavigator();

    function RootStackScreen()
    {
      return(
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={Login}></RootStack.Screen>
        </RootStack.Navigator>
      )
    }
    function DashboardDrawerScreen(){
      return(
        <DrawerStack.Navigator>
          <DrawerStack.Screen name="Dashboard" component={Dashboard} 
          options={{ headerShown:true }} 
          ></DrawerStack.Screen>
          <DrawerStack.Screen name="DeviceList" component={DeviceList} ></DrawerStack.Screen>
          <DrawerStack.Screen name="Terra" component={Terra}></DrawerStack.Screen>
          <DrawerStack.Screen name="Logout" component={RootStackScreen} options={{ headerShown:false}}></DrawerStack.Screen>
        </DrawerStack.Navigator>
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="RootLogin" component={RootStackScreen} options={{ headerShown:false}}/>
        <Stack.Screen name="DashboardDrawerScreen"  component={DashboardDrawerScreen}  options={{ headerShown:false}}/>
        {/* <Stack.Screen name="DeviceList" component={DeviceList} options={{ headerShown:true}}></Stack.Screen> */}
        </Stack.Navigator>
        
      </NavigationContainer>
    );
  }
