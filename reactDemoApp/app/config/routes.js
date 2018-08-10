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
          style={{ width: 25, height: 25, marginLeft: 5}}
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
        title: 'Crud Operation',
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
        title: 'Video Listing',
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
CrudOperation: {
  screen: FirstActivity_StackNavigator
},

VideoListing: {
  screen: SecondActivity_StackNavigator
},

CalendarView: {
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
