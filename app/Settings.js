import React from 'react';
import { Text, View, ImageBackground, Button, Alert, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import Modal from 'react-native-modal';
import { SecureStore } from 'expo'

import styles from './styles/Settings'

export default class Settings extends React.Component {
  state = {
      names: [
         {
            id: 1,
            name: 'Delete Wallet',
         }
      ],
      isDeleteWarningVisible: false,
      isRestoreWarningVisible: false,
      restore1: ""
   }
   DeleteWarning(){
     this.setState({ isDeleteWarningVisible: !this.state.isDeleteWarningVisible});
   }
   RestoreWarning(){
     this.setState({ isRestoreWarningVisible: !this.state.isRestoreWarningVisible});
   }
   onPresses = (item) => {
     if (item.id == 1){
        this.DeleteWarning()
      }
   }
   delete1 = () => {
     Alert.alert(
  'Are you sure',
  'This will remove your wallet data from this device',
  [
    {
      text: 'Cancel',
      onPress: () => console.log(''),
      style: 'cancel',
    },
    {text: 'Yes delete it', onPress: () => this.deleteWallet()},
  ],
  {cancelable: false},
);
   }
   deleteWallet = () => {
     SecureStore.deleteItemAsync("address")
     SecureStore.deleteItemAsync("privateKey")
     Alert.alert("Sucsess", "Address and private key have been removed from device")
   }
  render() {
    return (
      <View>
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
    <Text style={styles.advanced}>Advanced Settings</Text>
    <View style={styles.line}/>
    {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.onPresses(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
    <Modal isVisible={this.state.isDeleteWarningVisible}>
    <View style={styles.warningModal}>
    <View style={styles.warningModal1}>
    <Image
    source={require('../assets/warning.png')}
    style={styles.warningIcon}/>
    <Text style={styles.warningMsg}>Warning</Text>
    <Text style={styles.warningMsg1}>This will delete all wallet data from you device</Text>
    <TouchableOpacity style={styles.goBack} onPress={() => this.DeleteWarning()}>
    <Text style={styles.goBackText}>Go Back</Text>
    </TouchableOpacity>
    <GradientButton
    style={styles.deleteBtn}
    textStyle={{ fontSize: 15, fontFamily: 'made-evolve-thin' }}
    gradientBegin="red"
    gradientEnd="red"
    gradientDirection="diagonal"
    height={40}
    width={130}
    radius={30}
    impact
    impactStyle='Light'
    text="Delete Wallet"
    onPressAction={() => {
      this.delete1()
      this.DeleteWarning()
    }}
  />
    </View>
    </View>
    </Modal>
    </View>
    </ImageBackground>
      </View>
    );
  }
}
