import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ImpactCalcul: {
            screens: {
              ImpactCalculScreen: 'calcul',
            },
          },
          ActionList: {
            screens: {
              ActionListScreen: 'actions',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
