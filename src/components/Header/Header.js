/**
 * Created by Ivana on 25.7.2015..
 */

import './Header.css';
import React from 'react';
import TodoActions from '../../actions/TodoActions';
import ToDoTextBox from '../ToDoTextBox/ToDoTextBox';

class Header {


  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <ToDoTextBox
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
          />
      </header>
    );
  }

  _onSave(text) {
  if (text.trim()){
    TodoActions.createToDo(text);
  }

}

}

export default Header;
