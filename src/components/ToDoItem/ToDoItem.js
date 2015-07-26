/**
 * Created by Ivana on 25.7.2015..
 */

import './ToDoItem.css';
import React, { PropTypes } from 'react';
import ToDoActions from '../../actions/ToDoActions';
import ToDoTextBox from '../ToDoTextBox/ToDoTextBox';
import cx from'react/lib/cx';
import ToDoList from '../ToDoList/ToDoList'
import ToDoStore from '../../stores/ToDoStore'

class ToDoItem extends React.Component {

    static propTypes = {
        todo: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {isEditing: false};
        this._onDragEnd = this._onDragEnd.bind(this);
        this._onDragOver = this._onDragOver.bind(this);
        this._onDragStart = this._onDragStart.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onDestroyClick = this._onDestroyClick.bind(this);
        this._update = this._update.bind(this);
        this._sort = this._sort.bind(this);
    }

    render() {
        var todo = this.props.todo;

        var input;

        if (this.state.isEditing) {
            input =
                <ToDoTextBox
                    className="edit"
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
                key={todo.id}
                data-id={todo.position}
                data-key = {todo.id}
                draggable = "true"
                onDragEnd={this._onDragEnd}
                onDragOver={this._onDragOver}
                onDragStart={this._onDragStart}>
                <div>
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
        ToDoActions.toggleToDoComplete(this.props.todo);
    }

    _update(to) {
        ToDoStore.update(to)
    }

    _sort(to, placement) {

        ToDoStore.sort(to, this.props.todo.id, placement)
    }

    _onDragStart(e) {

        ToDoStore.sortStart(e, this.props.todo.id)
    }

    _onDragEnd() {

        ToDoStore.sortEnd()
    }

    _onDragOver(e) {

        ToDoStore.dragOver(e, this.props.todo.id)
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
