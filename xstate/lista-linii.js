import {Machine, assign} from 'xstate';

// sample SELECT event
const selectEvent = {
  type: 'SELECT', // event type
  name: 'reactjs', // subreddit name
};

const invokeFetchSubreddit = async () => {
  try {
    let response = await fetch(
      'http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4128329f-5adb-4082-b326-6e1aea7caddf/download/routes.json',
    );
    let json = await response.json();
    const lastUpdateDate = Object.keys(json)[0];
    const listOfAllRoutes = json[lastUpdateDate].routes;
    let listOfAllRoutesInGdynia = [
      ...listOfAllRoutes.filter(isRouteInGdyniaPKT),
      ...listOfAllRoutes.filter(isRouteInGdyniaPKA),
    ];

    return listOfAllRoutesInGdynia;
  } catch (error) {
    console.error(error);
  }
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
            src: invokeFetchSubreddit,
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
