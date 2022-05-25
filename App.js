/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { NativeModules, Button, PermissionsAndroid, NativeEventEmitter} from "react-native";
import LocationView from "./components/LocationView";
import {
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const App = () => {
  const { NavigineModule } = NativeModules;
  const [permission, setPermission] = React.useState(false)
  const requestCameraPermission1 = async () => {
    try {
      const accessFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Get access",
          message:
            "These permissions are necessary for" +
            "the navigation to work.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (accessFineLocation === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true);
        console.log("You can use the navigition");
      } else {
        console.log("navigition permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NavigineModule);
    this.eventListener = eventEmitter.addListener('EventReminder', (event) => {
       console.log(event.eventProperty);
    });
  });

  React.useEffect(() => {
    if(permission == true){
      NavigineModule.init("F90F-0202-58ED-7F06", "https://api.navigine.com");
    }
  }, [permission]);

  return (
    <SafeAreaView>
      <View>
        <LocationView style={{ width: "100%", height: 400 }} />
        <Button
          title="Get Permissions"
          color="#231234"
          onPress={requestCameraPermission1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
