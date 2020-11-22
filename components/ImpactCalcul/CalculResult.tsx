import * as React from 'react';
import { Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';

export default class CalculResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Get props
    const { errorMessage, modalVisible, dayImpact, setModalVisible } = this.props;

    // CSS
    const styles = StyleSheet.create({
      result: {
        flexDirection: "row",
        padding: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#1BFF00'
      },
      centeredView: { // Content modal style
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: { // Modal style
        margin: 10,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#EAEAEA'
      }
    });

    return (
      <View>
        { errorMessage == true ?
          // Display error message if something's wrong with the API call
          <Text>
            Il y a un problème avec le serveur, contactez l'administrateur svp.
          </Text>
        : null }

        {dayImpact != null ?
          // When the dayImpact is calculated
          <View style={[styles.result]}>
            <Text h4>{dayImpact} gCO2eq</Text>
            <Button
              onPress={() => setModalVisible(true)}
              icon={
                <Icon
                  name="info-outline"
                  size={20}
                  color="white"
                />
              }
            />
          </View>
        : null }
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ justifyContent: "center" }}>
                  Le gCO2eq (gramme d’équivalent CO2) est l'unité de mesure de l'empreinte carbone.
                  Cela correspond à l'impact direct et indirect d'une action de l'homme en terme d'émissions de gaz à effet de serre.
                </Text>
                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  icon={
                    <Icon
                      name="close"
                      size={20}
                      color="white"
                    />
                  }
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
