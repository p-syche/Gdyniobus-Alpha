import {busRoutesMachine} from './lista-linii';

// const {initialState} = busRoutesMachine;

// export const busRoutesLoadedState = busRoutesMachine.transition(
//   initialState,
//   'dataLoaded',
// );

import {Machine, interpret} from 'xstate';

const machine = Machine(busRoutesMachine);

// Interpret the machine, and add a listener for whenever a transition occurs.
export const stateService = interpret(machine).onTransition((state) => {
  console.log(state.value);
});

// Start the service
stateService.start();
