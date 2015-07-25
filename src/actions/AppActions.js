/**
 * Created by Ivana on 25.7.2015..
 */

import ToDoDispatcher from '../dispatchers/ToDoDispatcher';
import ToDoConstants from '../constants/ToDoConstants';
import http from 'superagent';

export default {

  loadPage(path, cb) {
    ToDoDispatcher.handleViewAction({
      actionType: ToDoConstants.LOAD_PAGE,
      path
    });

    http.get('/api/page' + path)
      .accept('application/json')
      .end((err, res) => {
          ToDoDispatcher.handleServerAction({
          actionType: ToDoConstants.LOAD_PAGE,
          path,
          err,
          page: res.body
        });
        if (cb) {
          cb();
        }
      });
  }

};
