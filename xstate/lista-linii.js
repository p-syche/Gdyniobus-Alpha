import {Machine, assign} from 'xstate';
import {getRoutesData} from '../utils/bus-data';
// import {getRoutesFromApiAsync} from '../utils/fetch-bus-data';

const refreshBusRoutesEvent = {
  type: 'REFRESH_BUS_ROUTES', // event type
};

export const busRoutesMachine = Machine({
  id: 'busRoutes',
  initial: 'loading',
  context: {
    routes: [],
  },
  states: {
    loading: {
      invoke: {
        id: 'fetch-routes',
        src: getRoutesData,
        onDone: {
          target: 'loaded',
          actions: assign({
            routes: (context, event) => event.data,
          }),
        },
        onError: 'failed',
      },
    },
    loaded: {},
    failed: {},
    refresh: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-routes',
            src: getRoutesData,
            onDone: {
              target: 'loaded',
              actions: assign({
                routes: (context, event) => event.data,
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
    REFRESH_BUS_ROUTES: {
      target: '.refresh',
    },
  },
});
