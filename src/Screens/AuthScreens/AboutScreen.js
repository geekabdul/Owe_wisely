import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  NativeModules,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {getStaticApi} from '../../Api/StaticApi';
import {image} from '../../assets';
import { Header } from '../../components';
import Spinner from 'react-native-loading-spinner-overlay'

const AboutScreen = ({route, navigation}) => {
  const [webUrl, setwebUrl] = useState();
  const [showSppinner, setshowSppinner] = useState(false);
console.log("termcondition[0]?",route.params.name)
console.log("termcondition[0]?data",route.params.data)
  return (
    <View style={styles.containerStyle}>
        <Header
        // backOnPress={() => navigation.navigate("DrawerNavigator")}
        backOnPress={() => navigation.goBack()}
        // iconUri={image.infoIcon}
        // iconUri2={image.notificationLogo}
        // onPress={() => {
        //   setShowModal(true);
        // }}
        label={route.params.name}
      />
      <Spinner visible={showSppinner}/>
      <WebView
      onLoadEnd={()=>{
       setshowSppinner(false)
      }}
      onLoadStart={()=>{
       setshowSppinner(false)
      }}
        source={{html: route.params.data}}
        style={{height: '100%', width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export {AboutScreen};
