import * as React from 'react';
import { Button, Input, Text, Badge } from 'react-native-elements';
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
    // Get props
    let { myAction, myActions, removeAction, onChangeCoef } = this.props
    let myActionId = myAction.myActionId
    let myActionIndex = myActions.indexOf(myAction);

    // Define color or the border
    let color_per_score = {
      // Black
      5: "#2c3e50",
      // Red
      4: "#e74c3c",
      // Orange
      3: "#f39c12",
      // Yellow
      2: "#f1c40f",
      // Green
      1: "#2ecc71"
    }
    let myActionColor = color_per_score[myActions[myActionIndex].score]

    const styles = StyleSheet.create({
      coef: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
      },
      title: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
      },
      container: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#EAEAEA'
      }
    });

    return (
      <View style={[styles.container]}>
        <View style={[styles.title]}>
          <Text h4>{myActions[myActionIndex].name} </Text>
          <Badge
            value={myActions[myActionIndex].score}
            badgeStyle={{ backgroundColor: myActionColor}}
          />
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
