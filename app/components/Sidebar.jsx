var React = require('react'),
            selectedListNameInput,
            todoListsAmount = 1;

import {TodoUtils} from './TodoUtils';

var Sidebar = React.createClass({
    handleClick: function() {
        this.props.createList();
    },

    chooseList: function(event, listname) {
        console.log("CHOOSE");
        if (this.props.deletedTodoLists.hasOwnProperty(listname)) {
            return false;
        }

        if (this.props.selectedList === listname) {
            console.log("This list is already selected. Starting renaming");
            selectedListNameInput = event.currentTarget.getElementsByTagName('input')[0];
            selectedListNameInput.disabled = false;
            selectedListNameInput.focus();

        } else {
            console.log("Another listname selected: " + listname);
            this.props.chooseList(listname);
        }

    },

    todoListRename: function(index, event) {
        selectedListNameInput.disabled = true;
		this.props.renameList(index, event);
	},

    handleRenameKeyDown: function(index, event) {
		if (event.keyCode !== TodoUtils.ENTER_KEY) {
			return;
		}

		event.preventDefault();
        event.target.disabled = true;
    },

    todoListDelete: function(index, listname) {
        console.log("DELETE");
        this.props.deleteList(index, listname)
    },
    
    todoListRestore: function(listname) {
        this.props.restoreList(listname)
    },

    scrollToBottom: function() {
        if (this.props.todoLists.length > todoListsAmount) {
            this.todoLists.scrollTop = 99999;
            todoListsAmount = this.props.todoLists.length;
        }
    },

    componentDidUpdate() {
        this.scrollToBottom();
    },

    componentDidMount() {
        todoListsAmount = this.props.todoLists.length;
    },

    render: function() {
        // Show all lists:
        var todoLists = this.props.todoLists.map((listname, index) => {
            let isDeleted = this.props.deletedTodoLists.hasOwnProperty(listname),
                classListName = "todo-list__name"
                                + (this.props.selectedList === listname ? " todo-list__name_selected" : '')
                                + (isDeleted ? " todo-list__name_deleted" : '');
			return (
				<li
                    className={classListName}
                    key={index}
                    onClick={(event) => this.chooseList(event, listname)}
                >
                    <input
                        defaultValue={listname}
                        onBlur={(event) => this.todoListRename(index, event)}
                        placeholder="Untitled"
                        onKeyDown={(event) => this.handleRenameKeyDown(index, event)}
                        disabled={true}
                    />
                    { !isDeleted ? <span className="todo-list__controls todo-list__delete" onClick={() => this.todoListDelete(index, listname)} title="Remove List">&#10005;</span> : <span className="todo-list__controls todo-list__restore" onClick={() => this.todoListRestore(listname)} title="Restore List">Restore</span> }
                </li>
            );
        });

        return (
            <div className="todo-sidebar">
                <ul ref={(div) => { this.todoLists = div; }}>
                    {todoLists}
                </ul>
                <button
                    className="todo-list__create"
                    onClick={this.handleClick}
                >
                    Create List
                </button>
            </div>
        );
    }
});

export {Sidebar};