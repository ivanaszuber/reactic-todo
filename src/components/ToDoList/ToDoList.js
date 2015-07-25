/**
 * Created by Ivana on 25.7.2015..
 */

import './ToDoList.css';
import React, { PropTypes } from 'react';
import TodoActions from '../../actions/TodoActions';
import ToDoItem from '../ToDoItem/ToDoItem';

class ToDoList extends React.Component{

  static propTypes = {
    allTodos: PropTypes.object.isRequired
  };

  render() {
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<ToDoItem key={key} todo={allTodos[key]}/>);
    }


    return (
        <section id='main'>
          <input
            id="toggle-all"
            type="checkbox"
            />
          <ul className='dd-list' id="todo-list">{todos}</ul>
        </section>
    );
  }

}

export default ToDoList;
