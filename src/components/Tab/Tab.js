/**
 * Created by Ivana on 26.7.2015..
 */

import './Tab.css';
import React, { PropTypes } from 'react';

class Tab extends React.Component {

    static propTypes = {
        tab: PropTypes.object.isRequired
    };

    render() {

        var tab = this.props.todo;

        return (
            <button className={cx({
                  'active': this.isActive(filter),
                  'editing': this.state.isEditing
                })}
                    onlick={this._onClick}>
                    {tab.title}
                </button>

        );
    }
}


export default ToDoList;
