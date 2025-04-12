const inputElement = document.querySelector(".input-new-task");
const addTask = document.querySelector(".button-new-task");
const taskContainer = document.querySelector(".task-container")



const validateInput = () => inputElement.value.trim().length>0;

const handleAddTask = () => {
    const inputValid = validateInput();
    if (!inputValid) {
        return inputElement.classList.add("error");
    };
    const taskItem = document.createElement('div');
    taskItem.classList.add("task-item");

    const paragraph = document.createElement('p');
    paragraph.innerText = inputElement.value;

    paragraph.addEventListener('click', () => handleClick(paragraph));


    const deleteItem = document.createElement("i");
    console.log (deleteItem)
    taskContainer.appendChild(taskItem);
    taskItem.appendChild(paragraph);
    taskItem.appendChild(deleteItem);
    inputElement.value ="";
    deleteItem.addEventListener('click', () => handleDelete(taskItem, paragraph));
    
    updateLocalStorage()

    
    
};

const handleClick = (paragraph) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        if (task.firstChild && task.firstChild.isSameNode(paragraph)) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage()
};

const handleDelete = (taskItem,paragraph) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        if (task.firstChild && task.firstChild.isSameNode(paragraph)) {
            taskContainer.removeChild(task);
        }
    }
    updateLocalStorage()
};

const handleInputChange = () => {
    const inputValid = validateInput();
    
    if (inputValid) {
       inputElement.classList.remove("error");
    }
    
};

const updateLocalStorage = () => {
    const tasks = taskContainer.children; // só pega elementos válidos

    const localStorageTasks = [...tasks].map(task => {
        const paragraph = task.querySelector("p"); // garante que seja o <p>

        if (!paragraph) {
            console.warn("Parágrafo não encontrado em:", task);
            return null; // pula esse item se algo der errado
        }

        const iscompleted = paragraph.classList.contains('completed');

        return {
            description: paragraph.innerText,
            completed: iscompleted
        };
    }).filter(task => task !== null); // remove os nulls

    console.log({ localStorageTasks });
    localStorage.setItem("tarefas", JSON.stringify(localStorageTasks));
};

const refresh = () => {
const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tarefas'))
};


addTask.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('input', () => handleInputChange());
