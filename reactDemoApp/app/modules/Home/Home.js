import React from 'react';
import {
   StyleSheet,
   Platform,
   View,
   Text,
   Image,
   TouchableOpacity,
   YellowBox,
   Modal,
   TouchableHighlight,
   TextInput,
   ScrollView
 } from 'react-native';

import {
   Button,
   Badge,
   Icon,
   FormLabel,
   FormInput,
   FormValidationMessage,
   Card,
   ListItem
 } from 'react-native-elements';

import { database } from "../../config/firebase";

export default class extends React.Component {
  state = {
    modalVisible: false,
    programName:'',
    description : '',
    programArray: [],
    modalContext: '',
    id:'',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  addProgram(){
    this.setState({
      modalVisible: true,
      modalContext : 'add'
    });
  }

  editProgramData(l){
    this.setState({
      programName : l.name,
      description : l.description,
      id: l.id,
      modalContext : 'edit',
      modalVisible: true,
    });
  }

  setFormData(name, description, context,id){
    if(context === 'add'){
      const dataToSend = {
        id:Math.random().toString(36).substring(2),
        name : name,
        description : description
      }
       database.ref('programs/' + dataToSend.id).set(dataToSend);
    }else if (context === 'edit') {
      database.ref('programs/'+ id).update({
        name:name,
        description :description
      });
    }
    this.setModalVisible(false);
  }

  deleteProgram(l){
  database.ref('programs/' + l.id).remove();
  }

  componentDidMount() {
      this.programRef.on('value', (snapshot) =>{
      const  programArray = Object.values(snapshot.val());
      this.setState({programArray});
    });
  }


  constructor(props) {
        super(props);
        this.programRef = database.ref().child('programs');

        YellowBox.ignoreWarnings([
         'Warning: componentWillMount is deprecated',
         'Warning: componentWillReceiveProps is deprecated',
       ]);
      }

         render()
         {
           const list = this.state.programArray;
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
                    <FormInput
                     placeholder="Enter program name"
                     onChangeText={(programName) => this.setState({programName})}
                     value={this.state.programName}
                     />
                  <FormLabel>Description</FormLabel>
                    <FormInput
                    placeholder="Enter description"
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}/>
                    <Button
                    raised
                    icon={{name: 'cached'}}
                    title='SUBMIT'
                    backgroundColor="#2a6edc"
                    onPress={() => {
                    this.setFormData(this.state.programName, this.state.description, this.state.modalContext, this.state.id);
                    }}  />
                  </View>
                  </View>
                  </View>
                  </Modal>
                  <TouchableHighlight style={styles.addButton}
                      underlayColor='#ff7043'
                      onPress={() => {
                      this.addProgram();
                      }}>
                      <Text style={{fontSize: 50, color: 'white'}}>+</Text>
                  </TouchableHighlight>
                  </View>

                  <View style={{paddingBottom:30}}>
                  <ScrollView contentContainerStyle={styles.scrollContainer}>
                  {
                    list.map((l) => (
                      <Card
                       title={l.name}
                       image={require('./digital-program-code-2271732.jpg')}>
                          <Text style={{marginBottom: 10}}>
                            {l.description}
                          </Text>
                          <View style={styles.buttonsContainer}>
                          <Button
                            title="Edit"
                            titleStyle={{fontWeight: '500'}}
                            buttonStyle={{
                              backgroundColor: '#2a6edc',
                              borderColor: 'transparent',
                              borderWidth: 0,
                              borderRadius: 30,
                              paddingVertical: 10
                            }}
                            containerStyle={{width: 200, height: 30}}
                            onPress={() => {
                            this.setModalVisible(true);
                            this.editProgramData(l);
                            }}
                          />
                            <Button
                              title="Delete"
                              titleStyle={{fontWeight: '500'}}
                              buttonStyle={{
                                backgroundColor: '#2a6edc',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 30,
                                paddingVertical: 10
                              }}
                              containerStyle={{
                                width: 200,
                                height: 30
                              }}
                              onPress={() => {
                              this.deleteProgram(l);
                              }}
                            />
                          </View>
                      </Card>
                    ))
                  }
                  </ScrollView>
                  </View>
               </View>
            );
         }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#4F80E1',
    marginBottom: 20
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  scrollContainer :{
    paddingBottom:30,
  },
  addButton: {
    backgroundColor: '#2a6edc',
    borderColor: '#2a6edc',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right:10,
    top:430,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    zIndex:1
  }
});
