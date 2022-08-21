

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./app/screens/Dashboard";
import DeviceList from "./app/screens/DeviceList";
import Login from "./app/screens/Login";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View,Button } from 'native-base';
  export default function App() {
    const Stack = createNativeStackNavigator();
    const DrawerStack =createDrawerNavigator();

    function DashboardDrawerScreen(){
      return(
        <DrawerStack.Navigator>
          <DrawerStack.Screen name="Dashboard" component={Dashboard} 
          options={{ headerShown:true}} ></DrawerStack.Screen>
        </DrawerStack.Navigator>
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DashboardDrawerScreen"  component={DashboardDrawerScreen}  options={{ headerShown:false}}/>
        <Stack.Screen name="DeviceList" component={DeviceList} options={{ headerShown:true}}></Stack.Screen>
        </Stack.Navigator>
        
      </NavigationContainer>
    );
  }
