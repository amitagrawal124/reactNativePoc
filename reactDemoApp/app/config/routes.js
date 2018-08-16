import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';

import Home from '../modules/Home/Home';
import ProgramList from '../modules/ProgramList/ProgramList';
import Calendar from '../modules/Calendar/Calendar';

class Routes extends React.Component {

  constructor() {
         super();
         this.state = {
             isReady: false,
             isLoggedIn: false
         }
     }

  toggleDrawer=()=>{

    console.log(this.props.navigationProps);

    this.props.navigationProps.toggleDrawer();

  }

  render(){

    return (

      <View style={{flexDirection: 'row'}}>

      <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >

        <Image
          source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png'}}
          style={{ width: 25, height: 25, marginLeft: 10}}
        />

      </TouchableOpacity>

    </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
    First: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Programs',
        headerLeft : <Routes navigationProps={ navigation }/>,

        headerStyle: {
          backgroundColor: '#2a6edc'
        },
        headerTintColor: '#fff',
      })
    },
  });


  const SecondActivity_StackNavigator = createStackNavigator({
    Second: {
      screen: ProgramList,
      navigationOptions: ({ navigation }) => ({
        title: 'Videos',
        headerLeft : <Routes navigationProps={ navigation }/>,

        headerStyle: {
          backgroundColor: '#2a6edc'
        },
        headerTintColor: '#fff',
      })
    },
  });

  const ThirdActivity_StackNavigator = createStackNavigator({
    Third: {
      screen: Calendar,
      navigationOptions: ({ navigation }) => ({
        title: 'Calendar',
        headerLeft : <Routes navigationProps={ navigation }/>,

        headerStyle: {
          backgroundColor: '#2a6edc'
        },
        headerTintColor: '#fff',
      })
    },
  });


export default MyDrawerNavigator = createDrawerNavigator({
Program: {
  screen: FirstActivity_StackNavigator
},

Video: {
  screen: SecondActivity_StackNavigator
},

Calendar: {
  screen: ThirdActivity_StackNavigator
}
});


const styles = StyleSheet.create({

MainContainer :{

flex:1,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
alignItems: 'center',
justifyContent: 'center',

}

});
