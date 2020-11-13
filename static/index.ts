import Task from './task';
console.log('test');
$('#exampleModal').on('shown.bs.modal', function () {
    console.log('open window');
    $('#myInput').trigger('focus')
  })
const taskList = new Task;
const defaultTaskList = taskList.defaultTaskList;
const UrlTaskList = '/get_all_tasks';

document.getElementById("btn-create-task")?.addEventListener("click",async (e) =>{
    console.log('on submit');
    const form = document.forms[0];
    fetch(form.action, {method:'post', body: new FormData(form)});

    console.log('We send post asynchronously (AJAX)');
    e.preventDefault();
})

document.getElementById("btn-truncate-tasks")?.addEventListener("click",async (e) =>{
    fetch("http://localhost:5000/truncate_tasks", {method:'post',body:''});

    console.log('We send post asynchronously (AJAX)');
    e.preventDefault();
})



const buildTaskList = async ( ) => {
    console.log('UrlTaskList',UrlTaskList);
    const list = await taskList.getTaskList(UrlTaskList);
    for(let task of list){
        console.log(task.name);
        let item = `
        <div class="card-group">
            <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
                <div class="card-header">${task.created_on}</div>
                <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
                    <p class="card-text">${task.comment ? task.comment : ''}</p>
                </div>
            </div>
        </div>
        `;
        let listElement = document.getElementsByClassName('task-list')[0];
        console.log(listElement);
        listElement?.insertAdjacentHTML('beforeend',item);
    }

}

const run = () => {
    console.log('run');
    buildTaskList();
}

run();