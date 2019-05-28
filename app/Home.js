import React from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert} from 'react-native';
  import GradientButton from 'react-native-gradient-buttons';
  import { Font, LinearGradient } from 'expo';


import styles from './styles/Home';

export default class Home extends React.Component {
  constructor() {
      super()
      this.state = {
         BTCprice: '0.00000000',
         XUEZprice: '0.00000000',
         blockHeight: '0',
         fontLoaded: false
      }
   }
   async componentDidMount() {
     await Font.loadAsync({
       'made-evolve-thin': require('../assets/fonts/made-evolve-thin.ttf'),
       'made-evolve-light': require('../assets/fonts/made-evolve-light.ttf')
     });

     this.setState({ fontLoaded: true });
   }
  render() {
    return (
      <View>
      { this.state.fontLoaded ? (
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
      <View style={styles.logoWrapper}>
      <Image
      source={require('../assets/headerLogo.png')}
      style={styles.logo}/>
      </View>
      <Text style={styles.balance1}>BALANCE</Text>
      <Text style={[styles.balanceTitle, {fontFamily: 'made-evolve-light'}]}>0.00000</Text>
      <Text style={[styles.balance1, {marginTop: 5}]}>XUEZ</Text>
      <View style={styles.btnContainers}>
      <View style={styles.stBtnCon}>
      <GradientButton
      style={{ marginVertical: 8, marginLeft: 40 }}
      textStyle={{ fontSize: 15, fontFamily: 'made-evolve-thin' }}
      gradientBegin="#1b3069"
      gradientEnd="#4b6899"
      gradientDirection="diagonal"
      height={30}
      width={90}
      radius={15}
      impact
      impactStyle='Light'
      text="Send"
      onPressAction={() => this.props.navigation.navigate('Send')}
    />
      </View>
      <View>
      <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate('Settings')
      }
      }>
      <Image
      source={require('../assets/settings.png')}
      style={styles.settings}/>
      </TouchableOpacity>
      </View>
      <View style={styles.stBtnCon}>
      <GradientButton
      style={{ marginVertical: 8, marginRight: 40 }}
      textStyle={{ fontSize: 15, fontFamily: 'made-evolve-thin' }}
      gradientBegin="#1b3069"
      gradientEnd="#4b6899"
      gradientDirection="diagonal"
      height={30}
      width={90}
      radius={15}
      impact
      impactStyle='Light'
      text="Receive"
      onPressAction={() => this.props.navigation.navigate('Receive')}
    />
      </View>
      </View>
      <View style={styles.op1}>
      <Text style={styles.statsTitle}>STATS / INFORMATION</Text>
      <View style={styles.statsWrapper}>
      <View style={{marginRight: 50}}>
      <Text style={styles.stats}>
      <Text style={[styles.stats, {fontFamily: 'made-evolve-light'}]}>BTC</Text>
      <Text style={styles.stats}> Price </Text>
      </Text>
      <Text style={styles.stats}>
      <Text style={[styles.stats, {fontFamily: 'made-evolve-light'}]}>XUEZ</Text>
      <Text style={styles.stats}>  Price </Text>
      </Text>
      <Text style={[styles.stats, {fontFamily: 'made-evolve-light'}]}>Block Height </Text>
      </View>
      <View style={{marginLeft: 50}}>
      <Text style={styles.stats}>
      <Text style={[styles.stats, {fontFamily: 'made-evolve-light'}]}>{this.state.BTCprice}</Text>
      </Text>
      <Text style={styles.stats}>
      <Text style={[styles.stats, {fontFamily: 'made-evolve-light'}]}>{this.state.XUEZprice}</Text>
      </Text>
      <Text style={[styles.stats, {fontFamily: 'made-evolve-light'}]}>{this.state.blockHeight}</Text>
      </View>
      </View>
      </View>
      <View style={styles.op2}>
      <Text style={[styles.ltTitle, {fontFamily: 'made-evolve-light'}]}>LATEST TRANSACTIONS</Text>
      <Image
      source={require('../assets/watermark.png')}
      style={{height: 150, width: 350, marginTop: 5}}/>
      </View>
      </ImageBackground>
    ) : null
    }
      </View>
    );
  }
}
//https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz
