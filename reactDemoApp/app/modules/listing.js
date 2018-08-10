import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    const users = [
    { id: 1, name: 'Mario', photo: 'mario-photo.jpg' },
    { id: 2, name: 'Luigi', photo: 'luigi-photo.jpg' },
    { id: 3, name: 'Bowser', photo: 'bowser-photo.jpg' },
  ];
    return (
      <View style={styles.container}>
      <Text style={styles.title}>All Users</Text>
      <Image
        style={styles.image}
        source={{ uri: users[0].photo }}
      />
      <List style={styles.list}>
        {
          users.map(user => {
            return (
              <View>
                <ListItem
                  avatar={{ uri: user.photo }}
                  containerStyle={styles.listItem}
                  title={user.name}
                  key={user.id}
                />
              </View>
            );
          })
        }
      </List>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    flex: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'left'
  },
  text: {
    textAlign: 'left'
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#02a4ff'
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 5
  }
});
