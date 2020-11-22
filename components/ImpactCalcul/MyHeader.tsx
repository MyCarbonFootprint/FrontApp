import * as React from 'react';
import { Header } from 'react-native-elements';

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title } = this.props
    return (
      <Header
        leftComponent={{ icon: 'menu' }}
        centerComponent={{ text: title }}
        containerStyle={{
          backgroundColor: '#2ecc71'
        }}
      />
    );
  }
}
