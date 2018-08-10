import React from 'react';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';

export default class extends React.Component {
  constructor(props) {

        super(props);

        YellowBox.ignoreWarnings([
         'Warning: componentWillMount is deprecated',
         'Warning: componentWillReceiveProps is deprecated',
       ]);

      }

         render()
         {
            return(

               <View style = { styles.MainContainer }>

                  <Text style={{fontSize: 23}}> This is Activity - 3 </Text>

               </View>
            );
         }

}

const styles = StyleSheet.create({

MainContainer :{

flex:1,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
alignItems: 'center',
justifyContent: 'center',

}

});
