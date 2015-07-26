/**
 * Created by Ivana on 25.7.2015..
 */

import './ToDoList.css';
import React, { PropTypes } from 'react';
import TodoActions from '../../actions/TodoActions';
import ToDoItem from '../ToDoItem/ToDoItem';
import ToDoStore from '../../stores/ToDoStore'
import ReactTabs from '../../../node_modules/react-tabs/lib/main'
import _ from 'lodash';

var Tab	= ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


class ToDoList extends React.Component {

    static propTypes = {
        allTodos: PropTypes.object.isRequired
    };


    render() {
        if (Object.keys(this.props.allTodos).length < 1) {
            return null;
        }

        var allTodos = this.props.allTodos;

        var todosAll = [];
        var todosActive = [];
        var todosCompleted = [];

        for (var key in allTodos) {
            todosAll.push(<ToDoItem dragging="true" key={key} todo={allTodos[key]}/>);
            if(allTodos[key].completed)
            {
                todosCompleted.push(<ToDoItem dragging="true" key={key} todo={allTodos[key]}/>);
            }
            else{
                todosActive.push(<ToDoItem dragging="true" key={key} todo={allTodos[key]}/>);
            }

            console.log(todosAll, todosActive, todosCompleted)
        }

        return (
            <section className='well white'>
                <Tabs>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Active</Tab>
                        <Tab>Completed</Tab>
                    </TabList>
                    <TabPanel>
                        <ul className='list-unstyled'>{todosAll}</ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className='list-unstyled'>{todosActive}</ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className='list-unstyled'>{todosCompleted}</ul>
                    </TabPanel>
                </Tabs>

            </section>
        );
    }

}

export default ToDoList;
