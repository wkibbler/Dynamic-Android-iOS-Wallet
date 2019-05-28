import React from 'react';
import { Text, View, ImageBackground, Button, Alert, TouchableOpacity, Image, TextInput, ScrollView, NetInfo, Clipboard } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import { SecureStore } from 'expo'
import styles from './styles/Receive'

export default class Receive extends React.Component {
  constructor() {
      super()
      this.state = {
        address: "",
        privateKey: "",
        renderMain: false,
        noConnection: false
      }
   }
   getAddress = async () => {
     NetInfo.getConnectionInfo().then((connectionInfo) => {
       if (connectionInfo.type == 'none'){
         this.setState({noConnection: true})
       } else {
         this.requestKeyPair()
       }
     });
   }
   requestKeyPair = async () => {
     //var respose = await fetch('http://insight.duality.solutions/api/block-index/1')
     //console.log(json)
     var data = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
     return fetch('http://207.148.121.21:3000/keyPair/' + data)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.address)
      SecureStore.setItemAsync('address', responseJson.address)
      SecureStore.setItemAsync('privateKey', responseJson.privateKey)
      this.setState({address: responseJson.address, renderMain: true, privateKey: responseJson.privateKey})
    })
    .catch((error) => {
      console.error(error);
    });
   }
   async componentDidMount() {
      var address = await SecureStore.getItemAsync('address')
      var privatekey = await SecureStore.getItemAsync('privateKey')
      if (address !== null){
        this.setState({renderMain: true, address: address, privateKey: privatekey})
      } else {
        this.getAddress()
      }
   }
  render() {
    return (
      <View>
      {
        this.state.renderMain ? (
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
      <View style={styles.logoWrapper}>
      <Image
      source={require('../assets/headerLogo.png')}
      style={styles.logo}/>
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.navigate('Home')}>
      <Image
      source={require('../assets/backIcon.png')}
      style={styles.backIcon}/>
      </TouchableOpacity>
    <View style={styles.op1}>
    <Text style={styles.title}>RECEIVE</Text>
    <View style={styles.qrWrapper}>
    <QRCode
      value={this.state.address}
    />
    </View>
    <Text style={styles.disAddress}>{this.state.address}</Text>
    <View style={styles.recBtnWrapper}>
    <GradientButton
    style={{ marginVertical: 8 }}
    textStyle={{ fontSize: 15, fontFamily: 'made-evolve-thin' }}
    gradientBegin="#1b3069"
    gradientEnd="#4b6899"
    gradientDirection="diagonal"
    height={30}
    width={90}
    radius={15}
    impact
    impactStyle='Light'
    text="Copy"
    onPressAction={() => {
      Alert.alert('Copied to Clipboard')
      Clipboard.setString(this.state.address);
    }}
  />
  <GradientButton
  style={{ marginVertical: 8 }}
  textStyle={{ fontSize: 15, fontFamily: 'made-evolve-thin' }}
  gradientBegin="#1b3069"
  gradientEnd="#4b6899"
  gradientDirection="diagonal"
  height={30}
  width={90}
  radius={15}
  impact
  impactStyle='Light'
  text="Backup"
  onPressAction={() => {
    Alert.alert("Copied private key to clipboard")
    Clipboard.setString(this.state.privateKey);
  }}
/>
    </View>
    </View>
    </ImageBackground>
  ) : this.state.noConnection ? (
    <ImageBackground source={require('../assets/background.png')} style={styles.image}>
    <View style={styles.noConnectionWrapper}>
    <Image
    style={styles.warningIcon}
    source={require('../assets/warning.png')}/>
    <Text style={styles.warning}>You do not have connection to the internet. Please connect and try again. You will not have to do this again after the wallet setup</Text>
    <GradientButton
    style={{ marginVertical: 8 }}
    textStyle={{ fontSize: 15, fontFamily: 'made-evolve-thin' }}
    gradientBegin="#1b3069"
    gradientEnd="#4b6899"
    gradientDirection="diagonal"
    height={40}
    width={150}
    radius={15}
    impact
    impactStyle='Light'
    text="Try Again"
    onPressAction={() => this.getAddress()}
  />
    </View>
    </ImageBackground>
  ) : null
}
      </View>
    );
  }
}
