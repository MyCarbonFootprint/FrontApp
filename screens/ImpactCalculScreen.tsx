import * as React from 'react';
import { Button, Text, Header } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CalculButton from '../components/ImpactCalcul/CalculButton';
import ActionOfTheDay from '../components/ImpactCalcul/ActionOfTheDay';

export default class ImpactCalculScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myActions: [],
      dayImpact: null
    };
    this.onDayImpactChange = this.onDayImpactChange.bind(this)
    this.addAction = this.addAction.bind(this)
    this.removeAction = this.removeAction.bind(this)
    this.onChangeCoef = this.onChangeCoef.bind(this)
  }

  onDayImpactChange(newDayImpact: number) {
    this.setState({dayImpact: newDayImpact});
  }

  onChangeCoef(coef, myActionIndex) {
    // Set inputValidity to false if it is not a number
    if (coef%1 != 0 || coef == '') {
      this.state.myActions[myActionIndex].inputValidity = false
    } else {
      // Change coef and inputValidity of the action
      this.state.myActions[myActionIndex].coef = parseInt(coef)
      this.state.myActions[myActionIndex].inputValidity = true
    }

    // Update myActions state
    let cMyActions = this.state.myActions
    this.setState({
      myActions: cMyActions
    })
  }

  // Remove action after pushing the trash button
  removeAction(myActionId) {
    this.setState(
      {myActions: this.state.myActions.filter(action => action.myActionId != myActionId) }
    )
  }

  // Add action after pushing the + button
  addAction() {
    // Get ID of the new action*
    let id
    if (this.state.myActions.length == 0) {
      id = 0
    } else {
      id = this.state.myActions[this.state.myActions.length - 1].myActionId + 1;
      console.log(id)
    }
    // Update state with the new action
    let cMyActions = this.state.myActions
    cMyActions.push(
      { 
        'myActionId': id,
        'inputValidity': false
      }
    );
    this.setState({myActions: cMyActions })
    // Go to ActionListScren
    this.props.navigation.navigate(
      'actions',
      {
        myActions: cMyActions,
        myActionId: id
      }
    )
  }

  render() {
    // Styles
    const styles = StyleSheet.create({
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20
      },
      result: {
        flexDirection: "row",
        padding: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#1BFF00'
      }
    });

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header
          leftComponent={{ icon: 'menu' }}
          centerComponent={{ text: 'Calculer son empreinte carbone du jour' }}
          rightComponent={{ icon: 'home' }}
        />
        <View style={{padding: 15}}>
          { this.state.myActions.map((action) =>
            <ActionOfTheDay
              key={action.myActionId}
              myActions={this.state.myActions}
              myAction={action}
              navigation={this.props.navigation}
              removeAction={this.removeAction}
              onChangeCoef={this.onChangeCoef}
            />
          )}
        </View>
        <View style={[styles.horizontal]}>
          <Button
            onPress={() => this.addAction()}
            containerStyle={{ margin: 5 }}
            icon={
              <Icon
                name="plus-circle"
                size={20}
                color="white"
              />
            }
          />
        </View>
        <View>
          <View style={[styles.horizontal]}>
            <CalculButton
              dayImpact={this.state.dayImpact}
              myActions={this.state.myActions}
              onDayImpactChange={this.onDayImpactChange}
            />
          </View>
          {this.state.dayImpact != null ?
            <View style={[styles.result]}>
              <Text h4>{this.state.dayImpact}</Text><Text> gCO2eq</Text>
            </View>
          : null }
        </View>
      </View>
    );
  }
}
