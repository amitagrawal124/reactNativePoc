import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  YellowBox,
  Modal ,
  TouchableHighlight,
  WebView
} from 'react-native';
import {
   Button,
   Badge ,
   Icon,
   FormLabel,
   FormInput,
   FormValidationMessage,
   Card,
   ListItem,
   List
 } from 'react-native-elements';

import { database } from "../../config/firebase";
import Swipeout from 'react-native-swipeout';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.videoRef = database.ref().child('videos');
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
   ]);
  }

  state = {
    modalVisible: false,
    videoModalVisible : false,
    videoName : '',
    description : '',
    videUrl : '',
    videoArray : [],
    modalData : {},
    selectedListItem : '',
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setVideoModalVisible(visible, l) {
    l ? this.setState({modalData : l}) : '';
    this.setState({videoModalVisible: visible});
  }

  setFormData(name, description, url){
    const dataToSend = {
      id : Math.random().toString(36).substring(2),
      name : name,
      description : description,
      url : url
    }
     database.ref('videos/' + dataToSend.id).set(dataToSend);
    this.setModalVisible(false);
  }

    deleteVideo(item){
        database.ref('videos/' + item.id).remove();
        this.componentDidMount();
    }

  swipeAction(l){
    this.setState({selectedListItem : l});
  }

    componentDidMount() {
      this.videoRef.on('value', (snapshot) =>{
      const  videoArray = Object.values(snapshot.val());
      videoArray.forEach(function(video) {
        let youtubeUrlId = video.url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/);
        video.image = 'http://img.youtube.com/vi/' + youtubeUrlId[2] + '/default.jpg';
      })
      this.setState({videoArray});
    });
  }

         render()
         {
           let swipeBtns = [{
             text: 'Delete',
             backgroundColor: '#4d4d4d',
             underlayColor: '#4d4d4d',
             onPress: () => { this.deleteVideo(this.state.selectedListItem)}
           }];
           const list = this.state.videoArray
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
                      style={{alignItems : 'center'}}
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
                        <Swipeout right={swipeBtns}
                          autoClose='true'
                          backgroundColor= 'transparent'
                          onOpen={()=>{
                            this.swipeAction(l);
                          }}>
                            <View>
                            <ListItem
                              roundAvatar
                              avatar={{uri:l.image}}
                              key={l.name}
                              title={l.name}
                              onPress={() => {
                              this.setVideoModalVisible(true, l);
                              }}
                            />
                            </View>
                        </Swipeout>
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
                          <Text style={{ fontWeight: 'bold', fontSize:20, marginLeft:18, marginBottom :10 }}>
                          {this.state.modalData.name}
                          </Text>
                            <WebView
                                    style={ styles.WebViewContainer }
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    source={{uri: this.state.modalData.url }}
                            />
                            <Text style={{fontSize:15,margin:15,color:'#4b4b4b'}}>
                            {this.state.modalData.description}
                            </Text>
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
