var React = require('react'),
	ReactDOM = require('react-dom'),
	List = require('./components/TodoList'),
	todoLists = [],
	model;

var app = app || {};

require('./components/main.css');

import {TodoUtils} from './components/TodoUtils';
import {TodoList} from './components/TodoList';
import {TodoModel} from './components/TodoModel';
import {Sidebar} from './components/Sidebar.jsx';

// Создаем отдельный объект, используя конструктор TodoModel.
// Это нужно, чтобы можно было использовать модель несколько раз.
if (localStorage.length > 0) {
	for (var i = 0; i < localStorage.length; i++) {
		todoLists.push(localStorage.key(i));
	}
	// Load the first existing todo list:
	model = new TodoModel(TodoUtils.storage());
} else {
	// If there is no any models, create a new one.
	model = new TodoModel('Untitled');
	todoLists.push('Untitled');
}

console.log(todoLists);

(function () {
	'use strict';

	var TodoApp = React.createClass({
		getInitialState: function() {
			return {
				// App state:
				selectedList: TodoUtils.storage(),

				// Deleted todo list (history):
				deletedTodoLists: {},

				// Current Todo List state:
				editing: null,
				showDetails: null,
				newTodo: '',
			};
		},
 
		changeRootState: function(state) {
			console.log(state);
			this.setState(state);
		},

		chooseList: function(selectedList) {
			model = new TodoModel(selectedList);

			this.setState({
				selectedList: selectedList,
				isDeletedCurrentList: false
			});
		},

		createList: function(listname, items) {
			if (!listname)
				listname = 'New List';

			// Check is this list name already exists?
			listname = this.checkAlreadyExists(todoLists, listname);

			// If not, let's add this new list to todoLists array and create a new model:
			if (listname) {
				todoLists.push(listname);
				
				model = new TodoModel(listname, items);

				this.setState({
					selectedList: listname,
					isDeletedCurrentList: false
				});	
			}
		},

		checkAlreadyExists: function(array, value) {
			// This function checks is this todolist already exist.
			// If exists, try to find free number recursively
			// TODO: Rework this, POSSIBLE PERFORMANCE ISSUE. Maybe it's better to use Last created element state? But tested with 1000 elements, no lags.

			while(array.includes(value)) {
				let number = value.match(/ \d+/g);
				if (number) {
					// Increment list number if it exists
					number.reverse();
					value = value.slice(0, -number[0].length);
					number[0]++;
					value = value + ' ' + number[0];
				} else {
					// Or just add a number if it doesn't exist
					value = value + ' 1';
				}
			}
			return value;
		},

		renameList: function(index, event) {
			let listname = event.target.value;

			// Check is there any changes:
			if (listname === todoLists[index] )
				return false;

			// Rename list:
			if (!listname)
				listname = "Untitled";

			// Check is this list name already exists?
			listname = this.checkAlreadyExists(todoLists, listname);

			// I'm using uncontrolled input here, so change DOM directly:
			event.target.value = listname;

			todoLists[index] = listname;
			model.rename(this.state.selectedList, listname);
			this.chooseList(listname);
		},

		deleteList: function(index, listname) {
			// Add list to temporary deleted lists:
			let deletedLists = this.state.deletedTodoLists,
				isDeletedCurrentList = this.state.isDeletedCurrentList;
				
			if (!isDeletedCurrentList)
				isDeletedCurrentList = (listname === this.state.selectedList ? true : false);
			
			deletedLists[listname] = TodoUtils.storage(listname);

			this.setState({
				deletedTodoLists: deletedLists,
				isDeletedCurrentList: isDeletedCurrentList
			});	

			console.log("State: " + this.state.deletedTodoLists);

			// Remove list from localStorage:
			model.deleteList(listname);
		},

		restoreList: function(listname) {
			let deletedLists = this.state.deletedTodoLists;

			// Add list to localStorage again:
			model = new TodoModel(listname, deletedLists[listname] );

			this.setState({
				selectedList: listname,
				isDeletedCurrentList: false
			});	

			// Remove list from temporary deleted lists:
			delete deletedLists[listname];
		},

		render: function() {
			return (
				<div className="TodoApp__container">
					<div className="TodoApp__container_animation-wrapper">
						<div className="TodoApp__color">
							<Sidebar
								todoLists={todoLists}
								createList={this.createList}
								renameList={this.renameList}
								chooseList={this.chooseList}
								deleteList={this.deleteList}
								restoreList={this.restoreList}
								selectedList={this.state.selectedList}
								deletedTodoLists={this.state.deletedTodoLists}
							/>
							<TodoList 
								model={model}
								chooseList={this.chooseList}
								changeRootState={this.changeRootState}
								// Send app state:
								selectedList={this.state.selectedList}
								editing={this.state.editing}
								isDeleted={this.state.isDeletedCurrentList}
								showDetails={this.state.showDetails}
								newTodo={this.state.newTodo}
							/>
						</div>
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(<TodoApp/>, document.getElementById("TodoAppDIV"));

})();