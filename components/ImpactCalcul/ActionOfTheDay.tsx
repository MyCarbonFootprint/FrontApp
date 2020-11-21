import * as React from 'react';
import { Button, Input, Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ActionOfTheDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValidity: false
    }
  }

  render() {
    let { myAction, myActions, removeAction, onChangeCoef } = this.props
    let myActionId = myAction.myActionId
    let myActionIndex = myActions.indexOf(myAction);

    const styles = StyleSheet.create({
      coef: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: "red"
      },
      title: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: "blue"
      },
      container: {
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: '#EAEAEA'
      }
    });

    return (
      <View style={[styles.container]}>
        <View style={[styles.title]}>
          <Text h4>{myActions[myActionIndex].name}</Text>
        </View>
        <View style={[styles.coef]}>
          <Input
            containerStyle={{flex: 0.9}}
            keyboardType="numeric"
            placeholder={myActions[myActionIndex].unit != "count" ? myActions[myActionIndex].unit : 'Quantité'}
            onChangeText={(value) => onChangeCoef(value, myActionIndex) }
            errorMessage={myActions[myActionIndex].inputValidity ? "" : "Utilise des nombres entiers uniquement."}
            leftIcon={
              <Icon
                name='chevron-right'
                size={24}
                color='black'
              />
            }
          />
          <Button 
            icon={
              <Icon
                name="delete"
                size={20}
                color="white"
              />
            }
            buttonStyle={{backgroundColor: "red" }}
            onPress={() => removeAction(myActionId)}
          />
        </View>
      </View>
    );
  }
}
