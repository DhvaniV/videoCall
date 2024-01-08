import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const GenerateMeetingIDScreen = ({navigation}: any) => {
  const [randomID, setRandomID] = useState('');

  const generateRandomId = () => {
    return `${Math.floor(Math.random() * 10000)}-${Math.floor(
      Math.random() * 10000,
    )}-${Math.floor(Math.random() * 10000)}`;
  };
  return (
    <View style={styles.container}>
      <TextInput value={randomID} 
      onChangeText={(id: string) => setRandomID(id)}/>
      <Button title="Join Meeting" 
      onPress={() => navigation.navigate('HomeScreen',{
        callID: randomID
      })}/>
      <TouchableOpacity
        onPress={() => {
          const id = generateRandomId();
          setRandomID(id);
        }}>
        <Text>Generate Meeting ID</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenerateMeetingIDScreen;
