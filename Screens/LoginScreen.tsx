import {View, Text, Button, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
  ZegoCountdownLabel,
  ZegoMultiCertificate,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirstInstallTime } from 'react-native-device-info'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

const LoginScreen = ({navigation, props}: any) => {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');

  const storeUserInfo = async (info: any) => {
    await AsyncStorage.setItem('userID', info.userID);
    await AsyncStorage.setItem('userName', info.userName);
  };

  const loginHandler = () => {
    // Simulated login successful

    // Store user info to auto login
    storeUserInfo({userID, userName});

    // Init the call service
    onUserLogin(userID, userName, props).then(() => {
      // Jump to HomeScreen to make new call
      navigation.navigate('HomeScreen', {userID});
    });
  };

  const onUserLogin = async (userID: any, userName: any, props: any) => {
    return ZegoUIKitPrebuiltCallService.init(
      //   KeyCenter.appID,
      //   KeyCenter.appSign,
      204287030,
      '725cb25a8b07c988d311c5f6b1e3dc65762d9d2c93f59cd6c77b3775dd1102c6',
      userID,
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/chaar-din-ki-chandni-chandni-o-meri-chandni-toton-14155.mp3',
          outgoingCallFileName: 'https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/chaar-din-ki-chandni-chandni-o-meri-chandni-toton-14155.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
        certificateIndex: ZegoMultiCertificate.first,
        avatarBuilder: ({userInfo}: any) => {
          return (
            <View style={{width: '100%', height: '100%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{uri: `https://robohash.org/${userInfo.userID}.png`}}
              />
            </View>
          );
        },
        requireConfig: (data: any) => {
          console.log('requireConfig, callID: ', data.callID);
          return {
            // foregroundBuilder: () => <ZegoCountdownLabel maxDuration={10} onCountdownFinished={() => { console.log("Countdown finished!!"); ZegoUIKitPrebuiltCallService.hangUp(true); }} />,
            onHangUp: (duration: any) => {
              console.log('########CallWithInvitation onHangUp', duration);
              navigation.navigate('HomeScreen');
            },
            timingConfig: {
              isDurationVisible: true,
              onDurationUpdate: (duration: any) => {
                console.log(
                  '########CallWithInvitation onDurationUpdate',
                  duration,
                );
                if (duration === 10 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            topMenuBarConfig: {
              buttons: [ZegoMenuBarButtonName.minimizingButton],
            },
            onWindowMinimized: () => {
              console.log('[Demo]CallInvitation onWindowMinimized');
              navigation.navigate('HomeScreen');
            },
            onWindowMaximized: () => {
              console.log('[Demo]CallInvitation onWindowMaximized');
              navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
            },
          };
        },
      },
    );
  };

  useEffect(() => {
    
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(firstInstallTime).slice(-5);
      setUserID(id);
      const name = 'user_' + id
      setUserName(name);
    });
    ;
  }, [])
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}>
        <Text>appID: 204287030</Text>
        <Text>userID: {userID}</Text>
        <Text>userName: {userName}</Text>
      </View>
      <View style={{width: 160}}>
        <Button title="Login" onPress={loginHandler}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});

export default LoginScreen;
