import Task from './task';
console.log('test');
const taskList = new Task;
const defaultTaskList = taskList.defaultTaskList;

const buildTaskList = ( list: string[]) => {
    for(let task of list){
        console.log(task);
        let item = `<li class="list-group-item list-group-item-action list-group-item-dark text-task">${task}</li>`;
        let listElement = document.getElementsByClassName('task-list')[0];
        console.log(listElement);
        listElement?.insertAdjacentHTML('beforeend',item);
    }

}
const run = () => {
    console.log('run');
    buildTaskList(defaultTaskList);
}

run();