/**
 * Created by Ivana on 25.7.2015..
 */

import './ToDoItem.css';
import React, { PropTypes } from 'react';
import ToDoActions from '../../actions/ToDoActions';
import ToDoTextBox from '../ToDoTextBox/ToDoTextBox';
import cx from'react/lib/cx';
import ToDoList from '../ToDoList/ToDoList'

class ToDoItem extends React.Component {

    static propTypes = {
        todo: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {isEditing: false};
        this._onToggleComplete = this._onToggleComplete.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onDestroyClick = this._onDestroyClick.bind(this);
    }

    render() {
        var todo = this.props.todo;

        var input;

        if (this.state.isEditing) {
            input =
                <ToDoTextBox
                    onSave={this._onSave}
                    value={todo.text}
                    type="checkbox"
                    />;
        }

        return (
            <li
                className={cx({
          'strike': todo.complete,
          'editing': this.state.isEditing
        })}
                key={todo.id}>
                <div className="dd-handle">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={this._onToggleComplete}
                        />
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <span className="pull-right">
                        <button className="btn-round" onClick={this._onDestroyClick}>
                            <i className="md md-delete"/>
                        </button>
                    </span>
                </div>
                {input}
            </li>
        );

    }


    _onToggleComplete() {
        ToDoActions.toggleComplete(this.props.todo);
    }

    _onDoubleClick() {
        this.setState({isEditing: true});
    }

    _onSave(text) {
        ToDoActions.updateToDoText(this.props.todo.id, text);
        this.setState({isEditing: false});
    }

    _onDestroyClick() {
        ToDoActions.deleteToDo(this.props.todo.id);
    }

}

export default ToDoItem;
