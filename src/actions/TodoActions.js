/**
 * Created by Ivana on 25.7.2015..
 */

import ToDoDispatcher from '../dispatchers/ToDoDispatcher';
import TodoConstants from '../constants/TodoConstants';

export default {

  createToDo(text) {
    ToDoDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  updateToDoText(id, text) {
    ToDoDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  toggleToDoComplete(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    ToDoDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  deleteToDo(id) {
    ToDoDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  deleteCompletedToDos() {
    ToDoDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

};

