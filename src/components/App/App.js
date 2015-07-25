/**
 * Created by Ivana on 25.7.2015..
 */

import './App.css';
import React, { PropTypes } from 'react';
import ToDoStore from '../../stores/ToDoStore';
import ToDoList from '../ToDoList/ToDoList';
import setViewport from './setViewport';
import Header from '../Header/Header';


function getTodoState() {
  return {
    allTodos: ToDoStore.getAllToDos()
  };
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = getTodoState();
    this._onChange = this._onChange.bind(this);
  }

  static propTypes = {
    path: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired
  };

  componentDidMount() {
    ToDoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ToDoStore.removeChangeListener(this._onChange);
  }


  render() {

    return (
      <div className="App">
        <Header />
        <ToDoList
          allTodos={this.state.allTodos}
          />
      </div>
    );
  }

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange() {
    this.setState(getTodoState());
  }
}

export default setViewport(App);
