import {Machine} from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getRouteDataFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gdyniobus_routes_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

// sample SELECT event
const loadBusRoutesEvent = {
  type: 'LOAD_BUS_ROUTES', // event type
  name: 'routes', // subreddit name
};

function invokeFetchSubreddit(context) {
  const {subreddit} = context;

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => response.json())
    .then((json) => json.data.children.map((child) => child.data));
}

const busRoutesMachine = Machine({
  // Machine identifier
  id: 'busRoutesMachine',

  // Initial state
  initial: 'pending',

  // Local context for entire machine
  context: {
    redditId: none,
    busRoutes: [],
  },

  // State definitions
  states: {
    pending: {},
    success: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-subreddit',
            src: invokeFetchSubreddit,
            onDone: {
              target: 'loaded',
              actions: assign({
                busRoutes: (context, event) => event.data
              })
            },
            onError: 'failed'
          }
        },
        loaded: {},
        failed: {}
    },
    rejected: {},
  },
  on: {
    LOAD_BUS_ROUTES: {
      target: '.success',
      actions: assign({
        redditId: (context, event) => event.name,
      }),
    },
  },
});
