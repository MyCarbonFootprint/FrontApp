import * as React from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { View, Text, Dimensions } from 'react-native';

export default class AverageChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action_families: [],
      errorMessage: false,
      isLoading: false
    };
  }

  componentDidMount() {
    // Get actions
    fetch('http://backapp.fafa10b7-aa93-4e11-b165-44f0139739c2.nodes.k8s.fr-par.scw.cloud/v1/action_family', {
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
              description: item.description
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

  render() {
    const data = {
      labels: ["Moi", "Moyenne française"],
      legend: ["Impact carbone journalier"],
      data: [
        [this.props.dayImpact],
        [2000]
      ],
      barColors: ["#5FB900"]
    };

    const chartConfig = {
      backgroundColor: "#DAF7A6",
      backgroundGradientFrom: "#DAF7A6",
      backgroundGradientTo: "#DAF7A6",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      showLegend: false,
      style: {
        padding: 50
      },
    }
 
    return (
      <StackedBarChart
        data={data}
        width={Dimensions.get("window").width/2}
        height={220}
        chartConfig={chartConfig}
        style={{
          borderRadius: 10,
          margin: 20,
          padding: 20
        }}
        yAxisLabel="$"
      />
    );
  }
}
