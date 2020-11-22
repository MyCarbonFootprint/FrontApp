import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CalculButton from '../components/ImpactCalcul/CalculButton';
import ActionOfTheDay from '../components/ImpactCalcul/ActionOfTheDay';
import CalculResult from '../components/ImpactCalcul/CalculResult';
import MyHeader from '../components/ImpactCalcul/MyHeader';

export default class ImpactCalculScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myActions: [],
      dayImpact: null,
      modalVisible: false,
      errorMessage: false
    };
    this.onDayImpactChange = this.onDayImpactChange.bind(this)
    this.addAction = this.addAction.bind(this)
    this.removeAction = this.removeAction.bind(this)
    this.onChangeCoef = this.onChangeCoef.bind(this)
    this.displayErrorMessage = this.displayErrorMessage.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  setModalVisible = (visible: Boolean) => {
    this.setState({ modalVisible: visible });
  }

  onDayImpactChange(newDayImpact: number) {
    this.setState({dayImpact: newDayImpact});
  }

  displayErrorMessage(display: Boolean) {
    this.setState({errorMessage: display});
  }

  onChangeCoef(coef, myActionIndex) {
    // Set inputValidity to false if it is not a number
    if (coef%1 != 0 || coef == '' || coef == 0) {
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
      }
    });

    const { errorMessage, modalVisible, dayImpact, myActions } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <MyHeader
          title="Calculer son empreinte du jour"
        />
        <View>
          { myActions.map((action) =>
            <ActionOfTheDay
              key={action.myActionId}
              myActions={myActions}
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
            buttonStyle={{ backgroundColor: "#2ecc71" }}
            icon={
              <Icon
                name="plus-circle"
                size={20}
                color="white"
              />
            }
          />
        </View>
        <View style={[styles.horizontal]}>
          <CalculButton
            dayImpact={dayImpact}
            myActions={myActions}
            onDayImpactChange={this.onDayImpactChange}
            displayErrorMessage={this.displayErrorMessage}
          />
        </View>
        <CalculResult
          dayImpact={dayImpact}
          errorMessage={errorMessage}
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
        />
      </View>
    );
  }
}
