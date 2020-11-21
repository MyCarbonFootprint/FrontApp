import * as React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { ListItem, ThemeProvider, SearchBar, Header } from 'react-native-elements'


export default class ActionListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      search: '',
      isLoading: true
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  componentDidMount() {
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
              unit: item.unit
            }))
          });
        }
      )
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onItemClickHandler(item) {
    this.props.route.params.myActions[this.props.route.params.myActionId] = {
      'id': item.id,
      'name': item.name,
      'description': item.description,
      'coef': 1,
      'unit': item.unit,
      'myActionId': this.props.route.params.myActionId,
      'inputValidity': item.inputValidity
    }
    this.props.navigation.navigate(
      'calcul',
      {
        myActions: this.props.route.params.myActions
      })
  }

  keyExtractor = (id) => id.toString()

  renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      key={item.id}
      onPress={() => this.onItemClickHandler(item)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  render() {
    const { actions, search, isLoading } = this.state;

    // filter actions displayed based on search bar
    let displayActions = actions.filter(
      action => action.name.toLowerCase().includes(search.toLowerCase())
    )

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
        <Header
          leftComponent={{ icon: 'menu' }}
          centerComponent={{ text: 'Choisir une action' }}
          rightComponent={{ icon: 'home' }}
        />
        { isLoading == true ?
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
          </View>
        :
          <View>
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
