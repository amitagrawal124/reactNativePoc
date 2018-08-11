import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';

//Splash Component
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

const FirstActivity_StackNavigator = StackNavigator({
    First: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Program',
        headerLeft : <Routes navigationProps={ navigation }/>,

        headerStyle: {
          backgroundColor: '#2a6edc'
        },
        headerTintColor: '#fff',
      })
    },
  });


  const SecondActivity_StackNavigator = StackNavigator({
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

  const ThirdActivity_StackNavigator = StackNavigator({
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


export default MyDrawerNavigator = DrawerNavigator({
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
