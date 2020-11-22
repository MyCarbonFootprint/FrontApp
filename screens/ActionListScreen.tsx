import * as React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { ListItem, ThemeProvider, SearchBar, Header } from 'react-native-elements'

import MyHeader from '../components/ImpactCalcul/MyHeader';

export default class ActionListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      search: '',
      isLoading: true,
      errorMessage: false
    };
  }

  updateSearch = (search: string) => {
    this.setState({ search });
  };

  componentDidMount() {
    // Get actions
    fetch('http://backapp.fafa10b7-aa93-4e11-b165-44f0139739c2.nodes.k8s.fr-par.scw.cloud/v1/action', {
      headers: new Headers({
        'Authorization': 'Basic cJjSeZVVh98VLHjKpjfVR5cZyqh9hC'
      }),
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(
        (data) => {
          this.setState({ 
            actions: data.map(item => ({
              id: item.id,
              name: item.name,
              description: item.description,
              unit: item.unit,
              source: item.source,
              family: item.family_id,
              score: item.score
            })),
            errorMessage: false
          });
        }
      )
      .catch((error) => {
        console.error(error)
        this.setState({ errorMessage: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onItemClickHandler(item) {

    let { myActions, myActionId} = this.props.route.params
    // Create params to change layout
    myActions[myActionId] = {
      'id': item.id,
      'name': item.name,
      'description': item.description,
      // Default coef
      'coef': 0,
      // Unit of the action
      'unit': item.unit,
      // ID of the action in the array
      'myActionId': myActionId,
      // Bool to know if the coef input is valid
      'inputValidity': myActions[myActionId].inputValidity,
      // score of the action
      'score': item.score,
      // Family of the action
      'family': item.family
    }
    // Change layout to calcul page
    this.props.navigation.navigate(
      'Mon Empreinte Carbone',
      {
        myActions: myActions
      })
  }

  // Get the key for each item
  keyExtractor = (item) => item.id.toString()
  // Rendering of each item
  renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => this.onItemClickHandler(item)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron/>
    </ListItem>
  )

  render() {
    // Get state
    const { errorMessage, actions, search, isLoading } = this.state;

    // filter actions displayed based on search bar
    let displayActions = actions.filter(
      action => action.name.toLowerCase().includes(search.toLowerCase())
    )

    // CSS
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
    });

    return (
      <ThemeProvider>
        <MyHeader
          title="Choisir une action"
        />
        { isLoading == true ?
          // Display loading
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
          </View>
        :
          <View>
            { errorMessage ?
              // Display an error message if there is a problem with the API call
              <Text>
                Il y a un problème avec le serveur, contactez l'administrateur svp.
              </Text>
            : null }
            <SearchBar
              placeholder="Rechercher une action..."
              onChangeText={this.updateSearch}
              value={search}
            />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={displayActions}
              renderItem={this.renderItem}
            />
          </View>
        }
      </ThemeProvider>
    );
  }
}
