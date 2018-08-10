import React from 'react';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Modal ,TouchableHighlight} from 'react-native';
import { Button, Badge ,Icon, FormLabel, FormInput, FormValidationMessage, Card, ListItem} from 'react-native-elements';

export default class extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor(props) {

        super(props);

        YellowBox.ignoreWarnings([
         'Warning: componentWillMount is deprecated',
         'Warning: componentWillReceiveProps is deprecated',
       ]);

      }

         render()
         {
           const users = [
            {
               name: 'brynn',
               avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
               name: 'brynn',
               avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
           ]
            return(
               <View>
               <View style={{marginTop: 22}}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    alert('Modal has been closed.');
                  }}>
                  <View style={{marginTop: 22}}>
                  <View>

                  <TouchableHighlight
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Icon
                    raised
                    name='close'
                    type='font-awesome'
                    color='#4d4d4d'/>
                  </TouchableHighlight>

                  <View>
                  <FormLabel>Program Name</FormLabel>
                    <FormInput/>
                  <FormLabel>Description</FormLabel>
                    <FormInput/>
                    <Button
                    raised
                    icon={{name: 'cached'}}
                    title='SUBMIT'
                    backgroundColor="#2a6edc" />
                  </View>

                  </View>
                  </View>
                  </Modal>
                  <TouchableHighlight
                    onPress={() => {
                    this.setModalVisible(true);
                    }}>
                    <Badge containerStyle={{ backgroundColor: '#2a6edc'}}>
                      <Text style={{ color:'#ffffff' }}>Add Program</Text>
                    </Badge>
                  </TouchableHighlight>
                  </View>

                  <View>
                  <Card
                    title='HELLO WORLD'
                    image={require('./digital-program-code-2271732.jpg')}>
                    <Text style={{marginBottom: 10}}>
                      The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                      icon={{name: 'code'}}
                      backgroundColor='#03A9F4'
                      fontFamily='RobotoRegular'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='VIEW NOW' />
                  </Card>
                  </View>
               </View>
            );
         }

}
