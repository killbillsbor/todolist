var React = require('react'),
	TodoListItem = require('./TodoListItem.jsx');

import { TodoUtils } from './TodoUtils';


var TodoList = React.createClass({
	getInitialState: function() {
		return {
			editing: null,
			newTodo: '',
		};
	},

	createNewTask: function() {
		// Create new task:
		var newValue = this.state.newTodo;

		if (newValue) {
			this.props.model.addNewTodo(newValue);
			this.setState({
				newTodo: ''
			});
		}
	},

	handleToggle: function(id) {
		// TodoListName - задел на будущее, чтоб сделать несколько списков
		this.props.model.toggle(this.props.model.TodoListName, id);

		// Rerender:
		this.setState({
			editing: null
		});
		this.createNewInput.focus();
	},

	handleDelete: function(id) {
		// TodoListName - задел на будущее, чтоб сделать несколько списков
		this.props.model.remove(this.props.model.TodoListName, id);

		// Rerender:
		this.setState({
			editing: null
		});
		this.createNewInput.focus();
	},

	handleFocus: function(id, value) {
		console.log("Editing id: " + id + ", text: " + value);
		this.setState({
			editing: id,
		});
	},

	handleChangeInput: function(event) {
		// В React поле не может измениться независимо от свойства которое было ему присвоено
		this.setState({
			newTodo: event.target.value
		});
	},

	handleExitEditing: function(event) {

		if ( event.target.value ) {
			// Save to local storage when input loses its focus
			this.props.model.edit(this.props.model.TodoListName, this.state.editing, event.target.value);
		} else {
			// In case of zero length - remove Todo Item
			this.props.model.remove( this.props.model.TodoListName, this.state.editing )
		}
		
		this.setState({
			editing: null
		});
	},

	handleTodoKeyDown: function(event) {
		if (event.keyCode !== TodoUtils.ENTER_KEY) {
			return;
		}

		event.preventDefault();

		if (this.state.editing !== null) {
			// Set focus to create new input (it includes saving)
			this.createNewInput.focus();
		} else {
			this.createNewTask();
		}
	},

	handleBlur: function(event) {
		this.createNewTask();
	},

	render: function() {
		// Get todo list:
		var shownTodoListItems = this.props.model.TodoList;

		// Prepare list of todo items:
		// ES6 arrow function because it automatically preserve the current this context
		var todoListItems = shownTodoListItems.map( (item, index) => {
			let classListItem = (item[2] ? "todo-list__item todo-list__item_completed" : "todo-list__item" ),
				isEditing = ( index === this.state.editing ? true : false );

			return (
				<TodoListItem
					// Click handlers:
					handleFocus={this.handleFocus}
					handleToggle={this.handleToggle}
					handleDelete={this.handleDelete}
					// Editing:
					handleTodoKeyDown={this.handleTodoKeyDown}
					handleExitEditing={this.handleExitEditing}
					// Properties:
					classListItem={classListItem}
					index={index}
					item={item}
					key={item[0]}
				/>
			);
		});

		// Print Todo list with a create new form:
		return (
			<section>
				<ul className="todo-list">
					{todoListItems}
				</ul>
				<div className="todo-list__create-item">
					<input
						type="text"
						ref={input => this.createNewInput = input}
						onChange={this.handleChangeInput}
						onKeyDown={this.handleTodoKeyDown}
						onBlur={this.handleBlur}
						value={this.state.newTodo}
						autoFocus={true}
					/>
				</div>
			</section>
		);
	}
});

export { TodoList };