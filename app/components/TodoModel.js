// Загружаем утилиты
import {TodoUtils} from './TodoUtils';

// Создаем конструктор TodoModel
function TodoModel(TodoListName) {
    this.TodoListName = TodoListName;
    
    // Загружаем существующие записи:
    this.TodoList = TodoUtils.storage(TodoListName);

    // DEBUG:
    if (!this.TodoList) {
        console.log("Adding testing elements.");
        this.TodoList = new Array(
            [1488311265000, "Покормить кролика Николашу", true],
            [1488311266000, "Покормить собаку Яффи", false],
            [1488311267000, "Покормить хомячков", false]
        );
        
        this.save();
    }

}

// Добавляем всякие методы
// Создание новой записи:
TodoModel.prototype.addNewTodo = function(title) {
    let timestamp = new Date(),
        //        [timestamp, title, is_closed]
        newTodo = [timestamp.getTime(), title, false];

    this.TodoList.push(newTodo);

    this.save();
};

// Toggle Todo:
TodoModel.prototype.toggle = function(TodoListName, id) {
    console.log("Toggle from Model file - " + id);
    this.TodoList[id][2] = !this.TodoList[id][2];

    this.save();
}

// Edit Todo:
TodoModel.prototype.edit = function(TodoListName, id, value) {
    console.log("Saving todo #" + id + " with value: " + value);
    this.TodoList[id][1] = value;

    this.save();
}

// Remove Todo:
TodoModel.prototype.remove = function(TodoListName, id) {
    console.log("Removing todo #" + id + " from " + TodoListName);
    this.TodoList.splice(id,1);

    this.save();
}

// Save changes:
TodoModel.prototype.save = function() {
    console.log("Saving to " + this.TodoListName + ", TodoList: " + this.TodoList);
    TodoUtils.storage(this.TodoListName, this.TodoList);
};


export {TodoModel};