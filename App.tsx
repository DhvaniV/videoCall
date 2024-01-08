// // App.js
import {Button, StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import GenerateMeetingIDScreen from './Screens/GenerateMeetingIDScreen';
import {NavigationContainer} from '@react-navigation/native';
import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import LoginScreen from './Screens/LoginScreen';
const Stack = createNativeStackNavigator();

const App = ({navigation}: any) => {

  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* <Stack.Screen
        name="GenerateMeetingIDScreen" component={GenerateMeetingIDScreen}
        /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          options={{headerShown: false}}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          // DO NOT change the name
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />
      </Stack.Navigator>

      <ZegoUIKitPrebuiltCallFloatingMinimizedView />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
