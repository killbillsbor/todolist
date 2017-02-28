// Создаем объект TodoUtils, в котором будут все полезные функции
var TodoUtils = {
    ENTER_KEY: 13,
}

// Save to local storage
TodoUtils.storage = function(TodoListName, data) {
    if (data) {
        return localStorage.setItem(TodoListName, JSON.stringify(data));
    }

    var existingData = localStorage.getItem(TodoListName);
    return JSON.parse(existingData);
};

export {TodoUtils};