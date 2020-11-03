import {Machine, assign} from 'xstate';
import {
  getRoutesData,
  getStopsData,
  getStopsForTripsData,
} from '../utils/async-stored-data';

const refreshBusRoutesEvent = {
  type: 'REFRESH_BUS_ROUTES', // event type
};

export const busRoutesMachine = Machine({
  id: 'busRoutes',
  initial: 'loadingData',
  context: {
    routes: [],
    stops: [],
    stopsForTrips: [],
  },
  states: {
    loadingData: {
      type: 'parallel',
      states: {
        busRoutes: {
          initial: 'loadingRoutes',
          states: {
            loadingRoutes: {
              invoke: {
                id: 'fetch-routes',
                src: getRoutesData,
                onDone: {
                  target: 'success',
                  actions: assign({
                    routes: (context, event) => event.data,
                  }),
                },
                onError: 'failure',
              },
            },
            success: {
              type: 'final',
            },
            failure: {},
          },
        },
        busStops: {
          initial: 'loadingStops',
          states: {
            loadingStops: {
              invoke: {
                id: 'fetch-stops',
                src: getStopsData,
                onDone: {
                  target: 'success',
                  actions: assign({
                    stops: (context, event) => event.data,
                  }),
                },
                onError: 'failure',
              },
            },
            success: {
              type: 'final',
            },
            failure: {},
          },
        },
        stopsForTrips: {
          initial: 'loadingStopsForTrips',
          states: {
            loadingStopsForTrips: {
              invoke: {
                id: 'fetch-stops-for-trips',
                src: getStopsForTripsData,
                onDone: {
                  target: 'success',
                  actions: assign({
                    stopsForTrips: (context, event) => event.data,
                  }),
                },
                onError: 'failure',
              },
            },
            success: {
              type: 'final',
            },
            failure: {},
          },
        },
      },
      onDone: 'dataLoaded',
      onError: 'dataFailure',
    },
    dataLoaded: {},
    dataFailure: {},
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
