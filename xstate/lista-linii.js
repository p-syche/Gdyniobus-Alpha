import {Machine, assign} from 'xstate';
import {getRoutesFromApiAsync} from '../utils/fetch-bus-data';

// sample SELECT event
const selectEvent = {
  type: 'SELECT', // event type
  name: 'reactjs', // subreddit name
};

export const redditMachine = Machine({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null,
    posts: null,
  },
  states: {
    idle: {},
    selected: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-subreddit',
            src: getRoutesFromApiAsync,
            onDone: {
              target: 'loaded',
              actions: assign({
                posts: (context, event) => event.data,
              }),
            },
            onError: 'failed',
          },
        },
        loaded: {},
        failed: {},
      },
    },
  },
  on: {
    SELECT: {
      target: '.selected',
      actions: assign({
        subreddit: (context, event) => event.name,
      }),
    },
  },
});
