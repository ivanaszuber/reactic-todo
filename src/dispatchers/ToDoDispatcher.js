/**
 * Created by Ivana on 25.7.2015..
 */

import Flux from 'flux';
import ToDoConstants from '../constants/ToDoConstants';
import assign from 'react/lib/Object.assign';

let Dispatcher = assign(new Flux.Dispatcher(), {

  handleServerAction(action) {
    var payload = {
      source: ToDoConstants.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction(action) {
    var payload = {
      source: ToDoConstants.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

export default Dispatcher;
