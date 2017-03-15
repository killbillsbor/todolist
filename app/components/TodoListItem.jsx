var React = require('react');

import {TodoUtils} from './TodoUtils';

var TodoListItem = React.createClass({

    // item[0] - timestamp, [1] - text, [2] - state
    handleToggle: function() {
        this.props.handleToggle(this.props.index);
    },

    handleFocus: function() {
        this.props.handleFocus(this.props.index, this.props.item[1] )
    },

    handleKeyDown: function(event) {
        this.props.handleTodoKeyDown(event);
    },

    handleBlur: function(event) {
        this.props.handleExitEditing(event);
    },

    handleDelete: function() {
        this.props.handleDelete(this.props.index);
    },

    toggleDetails: function(event) {
        this.props.toggleDetails(this.props.index);
    },

    render: function() {
        
        let details = (
            <div className="todo-list__details">
                Todo: {this.props.item[1]}
                <div className="todo-list__created-on">Created on: { TodoUtils.timeConverter(this.props.item[0] ) }</div>
            </div>
        );

        return (
            <li className={this.props.classListItem}>
                <i onClick={this.handleToggle}></i>
                <input 
                    type="text"
                    defaultValue={this.props.item[1]}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                <div
                    className="todo-list__controls"
                    title="Show Details"
                    onClick={this.toggleDetails}
                >i</div>
                <div
                    className="todo-list__controls"
                    title="Delete Item"
                    onClick={this.handleDelete}
                >&#10005;</div>

                {this.props.isShowDetails ? details : ''}
            </li>
        );
    }
});

module.exports = TodoListItem;