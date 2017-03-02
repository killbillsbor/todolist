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

// Unix timestamp in ms to human readable format
TodoUtils.timeConverter = function(timestamp) {
    let a = new Date(),
        d = new Date(timestamp + a.getTimezoneOffset() * 60000),
        //months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        year = d.getFullYear(),
        //month = months[d.getMonth()],
        month = "0" + d.getMonth(),
        date = d.getDate(),
        hours = d.getHours(),
        minutes = "0" + d.getMinutes(),
        seconds = "0" + d.getSeconds(),
        result = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + " " + date + "." + month.substr(-2) + "." + year;
        
    return result;
}

export {TodoUtils};