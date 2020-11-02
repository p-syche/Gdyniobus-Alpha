import {interpret} from 'xstate';
import {assert} from 'chai';

import {busRoutesMachine} from '../../xstate/lista-linii';

describe('busRoutesMachine machine (live)', () => {
  it('should load all routes for buses in Gdynia', (done) => {
    const busRouteService = interpret(busRoutesMachine)
      .onTransition((state) => {
        // when the state finally reaches 'selected.loaded',
        // the test has succeeded.

        if (state.matches('loaded')) {
          assert.isNotEmpty(state.context.routes);

          done();
        }
      })
      .start(); // remember to start the service!

    // Test that when the 'SELECT' event is sent, the machine eventually
    // reaches the { selected: 'loaded' } state with posts
    // redditService.send('REFRESH_BUS_ROUTES');
  });
});
