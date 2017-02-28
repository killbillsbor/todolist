var React = require('react');

var TodoListItem = React.createClass({

    // item[0] - timestamp, [1] - text, [2] - state
    handleToggle: function (event) {
        this.props.handleToggle( this.props.index );
    },

    handleFocus: function(event) {
        this.props.handleFocus( this.props.index, this.props.item[1] )
    },

    handleKeyDown: function(event) {
        this.props.handleTodoKeyDown(event);
    },

    handleBlur: function(event) {
        this.props.handleExitEditing(event);
    },

    handleDelete: function (event) {
        this.props.handleDelete( this.props.index );
    },

    render: function () {
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
                    className="todo-list__remove-item"
                    onClick={this.handleDelete}
                >
                    &#10005;
                </div>
            </li>
        );
    }
});

module.exports = TodoListItem;