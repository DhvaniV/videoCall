import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

const HomeScreen = ({navigation, props}: any) => {
  const [userID, setUserID] = useState('');
  const [invitees, setInvitees] = useState([]);

  const viewRef = useRef(null);
  const blankPressedHandle = () => {
    viewRef.current.blur();
  };

  const changeTextHandle = (value: any) => {
    setInvitees(value ? value.split(',') : []);
  };

  const getUserInfo = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID');
      const userName = await AsyncStorage.getItem('userName');
      if (userID == undefined) {
        return undefined;
      } else {
        return {userID, userName};
      }
    } catch (e) {
      return undefined;
    }
  };

  const onUserLogin = async (userID: any, userName: any, props: any) => {
    return ZegoUIKitPrebuiltCallService.init(
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
    // Simulated auto login if there is login info cache
    getUserInfo().then((info: any) => {
      if (info) {
        setUserID(info.userID);
        console.log('datatttaaatt', info);
        onUserLogin(info.userID, info.userName, props);
      } else {
        //  Back to the login screen if not login before
        navigation.navigate('LoginScreen');
      }
    });
  }, []);
  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={styles.container}>
      <TextInput
            ref={viewRef}
            style={styles.input}
            onChangeText={changeTextHandle}
            placeholder="Invitees ID, Separate ids by ','"
          />
        <Text>Your user id: {userID}</Text>
        <View style={styles.inputContainer}>
        
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={false}
            resourceID={'zego_data'}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={true}
            resourceID={'zegouikit_call'}
          />
        </View>
        <View style={{width: 220, marginTop: 100}}>
          <Button
            title="Back To Login Screen"
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
});

export default HomeScreen;


// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'
// import {
//     ZegoUIKitPrebuiltCall,
//     GROUP_VIDEO_CALL_CONFIG,
//     ZegoUIKitPrebuiltCallService
//   } from '@zegocloud/zego-uikit-prebuilt-call-rn';


// const HomeScreen = ({route}: any) => {
//     const userId = String(Math.floor(Math.random() * 100000))

//     let userID = route.params.callID
//   return (
//     <View style ={{flex: 1, backgroundColor: 'green'}}>
//     <ZegoUIKitPrebuiltCall
//           setOptions
//             appID={204287030}
//             appSign={
//               '725cb25a8b07c988d311c5f6b1e3dc65762d9d2c93f59cd6c77b3775dd1102c6'
//             }
//             userID={userID} // userID can be something like a phone number or the user id on your own user system.
//             userName={`user${userId}`}
//             callID={'group_123'} // callID can be any unique string.
//             config={{
//               // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
//               ... GROUP_VIDEO_CALL_CONFIG,
//               onOnlySelfInRoom: () => {
//                 console.log("console print")
//               },
//               onHangUp: () => {
//                 console.log("console.log print")
//               },
//             }}
//           />
//     </View>
//   )
// }

// export default HomeScreen
