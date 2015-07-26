/**
 * Created by Ivana on 25.7.2015..
 */

import ToDoDispatcher from '../dispatchers/ToDoDispatcher';
import EventEmitter from 'eventemitter3';
import TodoConstants from'../constants/TodoConstants';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';

var CHANGE_EVENT = 'change';

var todoItems = [];

var startPosition = 0;

function createToDo(text) {
    var id = ((Math.random() * 999999)).toString(36);
    todoItems[id] = {
        id: id,
        position:startPosition,
        complete: false,
        text: text,
        parent_id: 0,
        children:[]
    };
    startPosition++;
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


/**
 * Remove item from the list and return the item
 * @param position
 * @param id
 * @returns {*}
 * @private
 */
function _remove(position, id) {
    var todo = todoItems[id];
    todoItems[id].children.splice(todo.position, 1);
    return todo;
}

/**
 * Insert item before and update parent
 * @param todo
 * @param dest
 * @param id
 * @private
 */
function _insertBefore(todo, dest, id) {
    var to = todoItems[id].parent_id;
    var index = todoItems[id].children.indexOf(todoItems[id]);
    _insert(todo, to, index);
}

/**
 * Insert item after and update parent
 * @param todo
 * @param dest
 * @param id
 * @private
 */
function _insertAfter(todo, dest, id) {
    var parent = _.pluck(_.where(todoItems, {'parent_id': dest}));
    var index = todo.position;
    _insert(todo, parent, index + 1, id);
}

/**
 * Insert item at new location
 * @param todo
 * @param to
 * @param index
 * @param id
 * @private
 */
function _insert(todo, to, index, id) {
    todo.parent_id = to;
    todo.children.splice(index, 0, todo);
}

/**
 * Prepend todo as first child
 * @param todo
 * @param dest
 * @private
 */
function _prepend(todo, dest) {
    console.log(todo, dest, 'APPEND')
    _insert(todo, dest, 0);
}

var dragging;

var ToDoStore = assign({}, EventEmitter.prototype, {

    getAllToDos: function () {
        return todoItems;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },


    sortEnd: function() {
        ToDoStore.sort(todoItems, undefined);
    },

    sortStart: function(e) {
        ToDoStore.dragged = e.currentTarget.dataset ?
            e.currentTarget.dataset.id :
            e.currentTarget.getAttribute('data-id');
        e.dataTransfer.effectAllowed = 'move';
        try {
            e.dataTransfer.setData('text/html', null);
        } catch (ex) {
            e.dataTransfer.setData('text', '');
        }
        console.log(ToDoStore.dragged, 'SORT_START')
    },

    move: function (over, placement) {
        var to = Number(over.dataset.id);
        var id = over.dataset.key;
        var from = dragging || Number(this.dragged);
        console.log(over, over.dataset, to, from, placement, id, 'MOVE');
        ToDoStore.sort(to, from, placement, id);
    },

    placement: function(x,y,over) {
        var width = over.offsetWidth / 2;
        return x > width;
    },

    dragEnd: function (e) {
        e.stopPropagation();
        e.preventDefault();
        ToDoStore.sort(undefined, undefined);
    },

    update: function (to) {
        dragging = to;
    },

    sort: function (to, from, placement, id) {
        dragging = from;
        console.log(to, from, placement, id, 'SORT');
        if (from != to) {
            var todo = _remove(from, id);
            if (placement == "before") {
                _insertBefore(todo, to, from);
            } else if (placement == "after") {
                _insertAfter(todo, to, from);
            } else if (placement == "append") {
                _prepend(todo, to);
            }
        }

        this.update(dragging);
    },

    dragOver: function (e, from) {

        e.stopPropagation();
        e.preventDefault();
        var over = e.currentTarget;
        var relY = e.clientY - over.getBoundingClientRect().top;
        var height = over.offsetHeight / 2;

        var relX = e.clientY - over.getBoundingClientRect().left;
        var width = over.offsetWidth / 2;

        console.log(from, 'dragOver');

        var placement;
        if (relX > width) {
            placement = "append"
        }
        else if (relY > height) {
            placement = "after";
        }
        else if (relY < height) {
            placement = "before"
        }
        console.log(over, over.dataset, over.dataset.reactid, from, placement, 'DRAG OVER');
        ToDoStore.move(over, placement);
    },

    getClassName: function () {
        return this.props.data.id == dragging ? "dragging" : "";
    }
});


ToDoDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                createToDo(text);
                ToDoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_UNDO_COMPLETE:
            updateToDo(action.id, {complete: false});
            ToDoStore.emitChange();
            break;

        case TodoConstants.TODO_COMPLETE:
            updateToDo(action.id, {complete: true});
            ToDoStore.emitChange();
            break;

        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                updateToDo(action.id, {text: text});
                ToDoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_DESTROY:
            deleteToDo(action.id);
            ToDoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY_COMPLETED:
            deleteCompletedToDos();
            ToDoStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = ToDoStore;
