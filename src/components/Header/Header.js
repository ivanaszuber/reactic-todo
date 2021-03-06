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
            <header className="page-header">
                <h1><i className="md md-camera"></i> Reactic </h1>

                <p className="lead"> What awesome things are you going to do today? </p>

                <div id="todo">
                    <ToDoTextBox
                        id="new-todo"
                        onSave={this._onSave}
                        />
                    <span className="pull-right">
                        <button className="btn btn-default" onClick={this._onSave}>Add ToDo
                        </button>
                    </span>
                </div>

            </header>
        );
    }

    _onSave(text) {
        if (text.trim()) {
            TodoActions.createToDo(text);
        }

    }

}

export default Header;
