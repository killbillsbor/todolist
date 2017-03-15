// Загружаем утилиты
import {TodoUtils} from './TodoUtils';

// Create a TodoModel constructor
function TodoModel(TodoListName, items) {
    this.TodoListName = TodoListName;
    
    // Load existing items:
    this.TodoList = TodoUtils.storage(TodoListName);

    // Add elements to a list
    if (!this.TodoList) {
        if (items) {
            this.TodoList = items;
        } else {
            this.TodoList = [];
        }

        this.save();
    }
}

// Добавляем всякие методы
// Add new Todo:
TodoModel.prototype.addNewTodo = function(title) {
    let timestamp = new Date(),
        //        [ timestamp, title, is_closed ]
        newTodo = [ timestamp.getTime(), title, false ];

    this.TodoList.push(newTodo);

    this.save();
};

// Toggle Todo:
TodoModel.prototype.toggle = function(TodoListName, id) {
    this.TodoList[id][2] = !this.TodoList[id][2];

    this.save();
}

// Edit Todo:
TodoModel.prototype.edit = function(TodoListName, id, value) {
    this.TodoList[id][1] = value;

    this.save();
}

// Remove Todo:
TodoModel.prototype.remove = function(TodoListName, id) {
    console.log("Removing todo #" + id + " from " + TodoListName);
    this.TodoList.splice(id, 1);

    this.save();
}

// Rename Todo List:
TodoModel.prototype.rename = function(TodoListName, TodoListNameNew) {
    // Unfortunately, according to the official specification, there is no way to rename the key.
    if (TodoListNameNew !== TodoListName) {
        TodoUtils.storage(TodoListNameNew, this.TodoList);
        delete localStorage[TodoListName];
    }
}

// Delete Todo list:
TodoModel.prototype.deleteList = function(TodoListName) {
    localStorage.removeItem(TodoListName);
}

// Save changes:
TodoModel.prototype.save = function() {
    console.log("Saving to " + this.TodoListName + ", TodoList: " + this.TodoList);
    TodoUtils.storage(this.TodoListName, this.TodoList);
};

export {TodoModel};