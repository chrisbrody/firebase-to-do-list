// connect to firebase
var fireBaseRef = new Firebase("https://todo-wk16.firebaseio.com/")

// run this everythime a task is added to firebase
fireBaseRef.on('child_added', function(snapshot) {
    // store all current tasks from firebase data snapshot
    var task = snapshot.val().task
    // create text node from task value
    var text = document.createTextNode(task)
    // create a new li tag
    var newItem = document.createElement("LI")
    
    // add the task to the li
    newItem.appendChild(text); 
    
    // add li to to-do list
    document.getElementById("todoList").appendChild(newItem)
})

// when user submits new task, do this
function todoList() {
    // get the user task and store in a variable
	var item = document.getElementById("todoInput").value
    
    // stop form from being submitted if empty
    if(!item || item == "undefined") {return}
    
    // add the new task as an object to firebase
	fireBaseRef.push({task: item}, function(error) {
        // alert the error if there is one
        if (error !== null) {
            alert(error);
        }
    })
    
}

// add event listener to the element with id="addToDo"
document.getElementById('addToDo').addEventListener('click', todoList, false)