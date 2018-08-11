import React from 'react';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Modal ,TouchableHighlight, WebView} from 'react-native';
import { Button, Badge ,Icon, FormLabel, FormInput, FormValidationMessage, Card, ListItem, List} from 'react-native-elements';

import { database } from "../../config/firebase";
export default class extends React.Component {
  state = {
    modalVisible: false,
    videoModalVisible : false,
    videoName : '',
    description : '',
    videUrl : '',
    videoArray:[],
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setVideoModalVisible(visible) {
    this.setState({videoModalVisible: visible});
  }

  setFormData(name, description, url){
    const dataToSend = {
      name : name,
      description : description,
      url : url
    }
    this.videoRef.push(dataToSend)
    this.setModalVisible(false);
  }

  getVideos(){
    this.videoRef.on('value', function(snapshot) {
      const temp = [];
      snapshot.forEach(function (val) {
        temp.push(val.val());
      })
      this.videoArray = temp;
  });
  }

  constructor(props) {

        super(props);
        this.videoRef = database.ref().child('videos');
        YellowBox.ignoreWarnings([
         'Warning: componentWillMount is deprecated',
         'Warning: componentWillReceiveProps is deprecated',
       ]);
       this.getVideos();
      }

         render()
         {
           const list = [
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President'
            },
            {
              name: 'Chris Jackson',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Vice Chairman'
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
                      <FormLabel>Video Name</FormLabel>
                        <FormInput onChangeText={(videoName) => this.setState({videoName})}/>
                      <FormLabel>Description</FormLabel>
                        <FormInput onChangeText={(description) => this.setState({description})}/>
                      <FormLabel>Video Url</FormLabel>
                        <FormInput onChangeText={(videoUrl) => this.setState({videoUrl})}/>
                      <Button
                      raised
                      icon={{name: 'cached'}}
                      title='ADD'
                      backgroundColor="#2a6edc"
                      onPress={() => {
                      this.setFormData(this.state.videoName, this.state.description, this.state.videoUrl);
                      }} />
                    </View>

                  </View>
                  </View>
                  </Modal>
                    <TouchableHighlight
                      onPress={() => {
                      this.setModalVisible(true);
                      }}>
                      <Badge containerStyle={{ backgroundColor: '#2a6edc'}}>
                        <Text style={{ color:'#ffffff' }}>Add Video</Text>
                      </Badge>
                    </TouchableHighlight>
                  </View>

                  <View>
                  <List containerStyle={{marginBottom: 20}}>
                    {
                      list.map((l) => (
                        <ListItem
                          roundAvatar
                          avatar={{uri:l.avatar_url}}
                          key={l.name}
                          title={l.name}
                          onPress={() => {
                          this.setVideoModalVisible(true);
                          }}
                        />
                      ))
                    }
                  </List>
                  </View>

                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.videoModalVisible}
                    onRequestClose={() => {
                      alert('Modal has been closed.');
                    }}>
                    <View style={{marginTop: 22}}>
                    <View>

                      <TouchableHighlight
                        onPress={() => {
                        this.setVideoModalVisible(!this.state.videoModalVisible);
                        }}>
                        <Icon
                        raised
                        name='close'
                        type='font-awesome'
                        color='#4d4d4d'/>
                      </TouchableHighlight>
                      <View>
                      <View style={{ height: 300 }}>

                        <WebView
                                style={ styles.WebViewContainer }
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{uri: 'https://www.youtube.com/embed/dFKhWe2bBkM' }}
                        />

                          </View>
                      </View>
                    </View>
                    </View>
                    </Modal>
               </View>
            );
         }

}

const styles = StyleSheet.create({

WebViewContainer: {

    marginTop: (Platform.OS == 'ios') ? 20 : 0,

  }

});
