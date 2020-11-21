import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ImpactCalculScreen from '../screens/ImpactCalculScreen';
import ActionListScreen from '../screens/ActionListScreen';
import { ImpactCalculParamList, ActionListParamList } from '../types';

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ImpactCalculStack = createStackNavigator<ImpactCalculParamList>();
const ActionListStack = createStackNavigator<ActionListParamList>();

function ImpactCalculNavigator() {
  return (
    <ImpactCalculStack.Navigator>
      <ImpactCalculStack.Screen
        name="ImpactCalculScreen"
        component={ImpactCalculScreen}
        options={{ headerTitle: 'Calculer son impact carbone du jour' }}
      />
    </ImpactCalculStack.Navigator>
  );
}

function ActionListNavigator() {
  return (
    <ActionListStack.Navigator>
      <ActionListStack.Screen
        name="ActionListScreen"
        component={ActionListScreen}
        options={{ headerTitle: 'Choisir une action' }}
      />
    </ActionListStack.Navigator>
  );
}
