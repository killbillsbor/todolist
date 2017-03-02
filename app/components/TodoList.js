var React = require('react'),
	TodoListItem = require('./TodoListItem.jsx');

import { TodoUtils } from './TodoUtils';
import FlipMove from 'react-flip-move';

// Variables for container animation:
var appWrapper,
	appContainer,
	containerHeightBefore;

var TodoList = React.createClass({
	getInitialState: function() {
		return {
			editing: null,
			showDetails: null,
			newTodo: '',
		};
	},

	componentWillUpdate: function() {
		// Before rendering save previous height value:
		appWrapper = document.getElementsByClassName("TodoApp__container_animation-wrapper")[0];
		appContainer = document.getElementsByClassName("TodoApp__color")[0];
		containerHeightBefore = appContainer.clientHeight;

		appWrapper.setAttribute( "style", "height: " + containerHeightBefore + "px;" );
	},

	componentDidUpdate: function() {
		// Then set a new value so it will be changed smoothly
		appWrapper.setAttribute("style","height: " + appContainer.clientHeight + "px;");
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
		//this.createNewInput.focus();
	},

	handleDelete: function(id) {
		// TodoListName - задел на будущее, чтоб сделать несколько списков
		this.props.model.remove(this.props.model.TodoListName, id);

		// Rerender:
		this.setState({
			editing: null
		});
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

	toggleDetails: function(id) {
		if ( this.state.showDetails !== id ) {
			this.setState({
				showDetails: id,
			});
		} else {
			this.setState({
				showDetails: null,
			});
		}	
	},

	render: function() {
		// Get todo list:
		var shownTodoListItems = this.props.model.TodoList;

		// Prepare list of todo items:
		// ES6 arrow function because it automatically preserve the current this context
		var todoListItems = shownTodoListItems.map( (item, index) => {
			let isShowDetails = ( index === this.state.showDetails ? true : false ),
				classListItem = "todo-list__item" + ( item[2] ? " todo-list__item_completed" : "" ) + ( isShowDetails ? " todo-list__item_detailed" : "" ),
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

					isShowDetails={isShowDetails}
					toggleDetails={this.toggleDetails}
				/>
			);
		});

		// Print Todo list with a create new form:
		return (
			<section>
				<ul className="todo-list">
					<FlipMove
						duration={500} easing="ease"
						enterAnimation="accordianVertical"
						leaveAnimation="accordianVertical"
					>
						{todoListItems}
					</FlipMove>
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