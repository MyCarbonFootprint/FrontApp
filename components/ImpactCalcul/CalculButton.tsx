import * as React from 'react';
import { Button } from 'react-native-elements';


export default class CalculButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily_impact: this.props.daily_impact
    };
  }

  calculCarbonFingerprint(props) {
    let dictActions = []
    props.myActions.forEach(action =>
      dictActions.push({
        'id': action.id,
        'coef': action.coef
      })
    )

    fetch('http://backapp.fafa10b7-aa93-4e11-b165-44f0139739c2.nodes.k8s.fr-par.scw.cloud/v1/action/impact', {
      headers: new Headers({
        'Authorization': 'Basic cJjSeZVVh98VLHjKpjfVR5cZyqh9hC',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(dictActions),
      method: 'POST'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(
        (data) => {
          this.setState({ daily_impact: data.daily_impact });
          this.props.displayErrorMessage(false)
        }
      )
      .catch((error) => {
        console.error(error)
        this.props.displayErrorMessage(true)
      })
      .finally(() => {
        this.props.onDayImpactChange(this.state.daily_impact)
      });
  }

  render() {
    return (
      <Button
        title="Calculer son empreinte"
        buttonStyle={{ width: 150 }}
        containerStyle={{ margin: 5 }}
        disabled={
          // Check if not inputValidity is false
          ((this.props.myActions.filter(action => action.inputValidity == false)).length > 0 && this.props.myActions.length > 0) ||
          // Check if myActions isn't empty
          this.props.myActions.length == 0
        }
        onPress={() =>
          this.calculCarbonFingerprint(
            this.props
          )
        }
      />
    );
  }
}
