var React = require('react'),
	ReactDOM = require('react-dom'),
	Header = require('./components/Header.jsx'),
	List = require('./components/TodoList');

var app = app || {};

require('./components/main.css');

import { TodoUtils } from './components/TodoUtils';
import { TodoList } from './components/TodoList';
import { TodoModel } from './components/TodoModel';

// Создаем отдельный объект, используя конструктор TodoModel.
// Это нужно, чтобы можно было использовать модель несколько раз.
// Можно, например, потом сделать несколько списков в одном приложении.
// Наверное.
var model = new TodoModel('first-app');

(function () {
	'use strict';

	var TodoApp = React.createClass({
		render: function() {
			return (
				<div className="TodoApp__container">
					<div className="TodoApp__container_animation-wrapper">
						<div className="TodoApp__color">
							<Header />
							<TodoList 
								model={model}
							/>
						</div>
					</div>
				</div>
			);
		}
	});

	ReactDOM.render(<TodoApp/>, document.getElementById("TodoAppDIV"));

})();