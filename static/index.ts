import Task from './task';
$('#exampleModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
const taskList = new Task;
const defaultTaskList = taskList.defaultTaskList;
const UrlTaskList = '/get_all_tasks';
const UrlClearTaskList = '/truncate_tasks';
const UrlRemoveTask = '/remove_task'
const UrlCreateTask = '/create_task'

/**
 * Обработчик создания новой задачи
 */
document.getElementById("btn-create-task")?.addEventListener("click",async (e) =>{
    const form = document.forms[0];
    fetch(UrlCreateTask, {method:'post', body: new FormData(form)});
    e.preventDefault();
})
/**
 * Обработчик удаление всех текущих задач
 */
document.getElementById('btn-truncate-tasks')?.addEventListener('click',async (e) =>{
    fetch(UrlClearTaskList, {method:'post',body:''});
    e.preventDefault();
})
/**
 * Построение списка всех текущих задач, хранящихся в базе
 */
const buildTaskList = async ( ) => {
    const list = await taskList.getTaskList(UrlTaskList);
    for(let task of list){
        let item = `
        <div class="card-group">
            <div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
                <div class="card-header">
                    <div class="date">${task.created_on}</div>
                        <button type="button" data-id=${task.id} id="btn-delete-task_${task.id}" class="btn btn-danger btn-delete-task">X</button>
                    </div>
                <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
                    <p class="card-text">${task.comment ? task.comment : ''}</p>
                </div>
            </div>
        </div>
        `;
        let listElement = document.getElementsByClassName('task-list')[0];
        listElement?.insertAdjacentHTML('beforeend',item);
        // на каждую кнопку вешаем свой обработчик удаления задачи
        document.getElementById(`btn-delete-task_${task.id}`)?.addEventListener('click',async (e:any) =>{
            const id = e.target.dataset.id;
            fetch(`${UrlRemoveTask}/${id}`, {method:'delete',body:''});
            e.preventDefault();
        });
    }
}
/**
 * Запуск текущего функционала приложения
 */
const run = () => {
    buildTaskList();

}

run();