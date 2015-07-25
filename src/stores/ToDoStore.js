/**
 * Created by Ivana on 25.7.2015..
 */

import ToDoDispatcher from '../dispatchers/ToDoDispatcher';
import EventEmitter from 'eventemitter3';
import TodoConstants from'../constants/TodoConstants';
import assign from 'react/lib/Object.assign';

var CHANGE_EVENT = 'change';

var todoItems = {};

function createToDo(text) {
  var id = ((Math.random() * 999999)).toString(36);
  todoItems[id] = {
    id: id,
    complete: false,
    text: text
  };
}


function updateToDo(id, data) {
  todoItems[id] = assign({}, todoItems[id], data);
}


function deleteToDo(id) {
  delete todoItems[id];
}


function deleteCompletedToDos() {
  for (var id in todoItems) {
    if (todoItems[id].complete) {
      deleteToDo(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {

  getAllToDos: function() {
    return todoItems;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },


  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },


  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
ToDoDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        createToDo(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      updateToDo(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      updateToDo(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        updateToDo(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      deleteToDo(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      deleteCompletedToDos();
      TodoStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = TodoStore;
