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
    id:''
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
      this.programRef.push(dataToSend)
    }else if (context === 'edit') {
      const dataToSend = {
        name:name,
        description :description
      };
      let updates = {}
      updates['programs/' + id] = dataToSend;
      database
      .ref('programs/'+id)
      .update(updates);
    }
    this.setModalVisible(false);
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
                  <TouchableHighlight
                    onPress={() => {
                    this.addProgram();
                    }}>
                    <View style={{ paddingBottom : 10 }}>
                    <Badge containerStyle={{ backgroundColor: '#2a6edc'}}>
                      <Text style={{ color:'#ffffff' }}>Add Program</Text>
                    </Badge>
                    </View>
                  </TouchableHighlight>
                  </View>

                  <View>
                  <ScrollView style={styles.scrollContainer}>
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
                            title="Edit Program"
                            titleStyle={{fontWeight: '500'}}
                            buttonStyle={{backgroundColor: '#2a6edc', borderColor: 'transparent', borderWidth: 0, borderRadius: 30, paddingVertical: 10}}
                            containerStyle={{width: 200, height: 30}}
                            onPress={() => {
                            this.setModalVisible(true);
                            this.editProgramData(l);
                            }}
                            />
                            <Button
                              title="Delete Program"
                              titleStyle={{fontWeight: '500'}}
                              buttonStyle={{backgroundColor: '#2a6edc', borderColor: 'transparent', borderWidth: 0, borderRadius: 30, paddingVertical: 10}}
                              containerStyle={{width: 200, height: 30}}
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
    paddingBottom:100
  }
});
